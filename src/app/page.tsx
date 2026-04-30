import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Pains } from "@/components/landing/pains";
import { Solution } from "@/components/landing/solution";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Calculator } from "@/components/landing/calculator";
import { Pricing } from "@/components/landing/pricing";
import { Cases } from "@/components/landing/cases";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <Hero />
        <Pains />
        <Solution />
        <HowItWorks />
        <Calculator />
        <Pricing />
        <Cases />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
