"use client";

import { useCallback } from "react";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";
import { NavBar } from "./NavBar";
import { HeroSection } from "./HeroSection";
import { BenefitsSection } from "./BenefitsSection";
import { AttendanceSection } from "./AttendanceSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { FeaturesSection } from "./FeaturesSection";
import { PricingSection } from "./PricingSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";

interface LandingPageProps {
  onGetStarted?: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const handleGetStarted = useCallback(() => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onGetStarted]);

  return (
    <div className="min-h-screen">
      <SectionErrorBoundary>
        <NavBar onGetStarted={handleGetStarted} />
      </SectionErrorBoundary>

      <main>
        <SectionErrorBoundary>
          <HeroSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <BenefitsSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <AttendanceSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <ShowcaseSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <FeaturesSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <PricingSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <TestimonialsSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary>
          <CtaSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>
      </main>

      <SectionErrorBoundary>
        <Footer />
      </SectionErrorBoundary>
    </div>
  );
}
