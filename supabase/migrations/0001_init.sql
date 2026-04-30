-- StaffMind AI · initial schema
-- Run on Supabase (PostgreSQL 15+). Includes Row Level Security policies.

create extension if not exists "uuid-ossp";

-- ─── Organizations ───────────────────────────────────────────────────────────
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  size text,
  owner_id uuid not null references auth.users(id) on delete cascade,
  brand_color text default '#14B8A6',
  brand_logo_url text,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'start',
  trial_ends_at timestamptz default (now() + interval '14 days'),
  created_at timestamptz default now()
);

-- ─── Memberships (roles) ─────────────────────────────────────────────────────
create type public.member_role as enum ('owner', 'admin', 'viewer');

create table if not exists public.memberships (
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role public.member_role not null default 'viewer',
  created_at timestamptz default now(),
  primary key (organization_id, user_id)
);

-- ─── Employees (people surveyed) ─────────────────────────────────────────────
create table if not exists public.employees (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  full_name text,
  department text,
  role text,
  manager_id uuid references public.employees(id) on delete set null,
  joined_at date,
  created_at timestamptz default now(),
  unique (organization_id, email)
);

-- ─── Surveys & questions ─────────────────────────────────────────────────────
create type public.survey_status as enum ('draft', 'active', 'paused', 'archived');
create type public.survey_cadence as enum ('weekly', 'biweekly', 'monthly');
create type public.question_type as enum ('enps', 'scale', 'open');

create table if not exists public.surveys (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  status public.survey_status not null default 'draft',
  cadence public.survey_cadence not null default 'weekly',
  channels text[] not null default array['email']::text[],
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.questions (
  id uuid primary key default uuid_generate_v4(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  type public.question_type not null,
  text text not null,
  position int not null default 0
);

-- ─── Responses ───────────────────────────────────────────────────────────────
create table if not exists public.responses (
  id uuid primary key default uuid_generate_v4(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete set null,
  numeric_value numeric,
  text_value text,
  sentiment_score numeric,
  sentiment_label text,
  clusters text[],
  submitted_at timestamptz default now()
);

-- ─── Analytics cache ─────────────────────────────────────────────────────────
create table if not exists public.analytics_cache (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  key text not null,
  payload jsonb not null,
  computed_at timestamptz default now(),
  unique (organization_id, key)
);

-- ─── Waitlist (public, no auth) ──────────────────────────────────────────────
create table if not exists public.waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  name text,
  team_size text,
  module text,
  plan text,
  created_at timestamptz default now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
create index if not exists employees_org_idx on public.employees (organization_id);
create index if not exists surveys_org_idx on public.surveys (organization_id);
create index if not exists responses_survey_idx on public.responses (survey_id);
create index if not exists responses_employee_idx on public.responses (employee_id);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.employees enable row level security;
alter table public.surveys enable row level security;
alter table public.questions enable row level security;
alter table public.responses enable row level security;
alter table public.analytics_cache enable row level security;
alter table public.waitlist enable row level security;

-- Helper: user can access org if they are the owner OR have a membership.
create or replace function public.is_org_member(org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organizations o where o.id = org and o.owner_id = auth.uid()
  ) or exists (
    select 1 from public.memberships m where m.organization_id = org and m.user_id = auth.uid()
  );
$$;

-- Organizations: owners read/write; members read.
create policy "org owners full access"
  on public.organizations for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "org members read"
  on public.organizations for select
  using (public.is_org_member(id));

-- Memberships: owners manage; users see their own row.
create policy "memberships self select"
  on public.memberships for select
  using (user_id = auth.uid() or public.is_org_member(organization_id));

create policy "memberships owner manage"
  on public.memberships for all
  using (
    exists (select 1 from public.organizations o
            where o.id = organization_id and o.owner_id = auth.uid())
  )
  with check (
    exists (select 1 from public.organizations o
            where o.id = organization_id and o.owner_id = auth.uid())
  );

-- Employees, surveys, questions, responses, analytics_cache: org members only.
create policy "employees by member" on public.employees for all
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "surveys by member" on public.surveys for all
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "questions by member" on public.questions for all
  using (
    exists (select 1 from public.surveys s
            where s.id = survey_id and public.is_org_member(s.organization_id))
  )
  with check (
    exists (select 1 from public.surveys s
            where s.id = survey_id and public.is_org_member(s.organization_id))
  );

create policy "responses by member" on public.responses for all
  using (
    exists (select 1 from public.surveys s
            where s.id = survey_id and public.is_org_member(s.organization_id))
  )
  with check (
    exists (select 1 from public.surveys s
            where s.id = survey_id and public.is_org_member(s.organization_id))
  );

create policy "analytics by member" on public.analytics_cache for all
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

-- Waitlist: anyone can insert; only service role reads.
create policy "waitlist insert anon" on public.waitlist for insert
  with check (true);
