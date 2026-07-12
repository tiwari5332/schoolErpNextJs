"use client";

import { useCallback, useState } from "react";
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
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";

interface LandingPageProps {
  onGetStarted?: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleGetStarted = useCallback(() => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      setIsDemoModalOpen(true);
    }
  }, [onGetStarted]);

  const handleCloseDemoModal = useCallback(() => {
    setIsDemoModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen">
      <SectionErrorBoundary>
        <NavBar onGetStarted={handleGetStarted} />
      </SectionErrorBoundary>

      <main>
        <SectionErrorBoundary>
          <HeroSection
            onGetStarted={handleGetStarted}
            onScheduleDemo={handleGetStarted}
          />
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
          <CtaSection
            onGetStarted={handleGetStarted}
            onScheduleDemo={handleGetStarted}
          />
        </SectionErrorBoundary>
      </main>

      <SectionErrorBoundary>
        <Footer />
      </SectionErrorBoundary>

      <ScheduleDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />
    </div>
  );
}
