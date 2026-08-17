"use client";

import { useCallback, useState } from "react";
import { MessageSquare } from "lucide-react";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";
import { NavBar } from "./NavBar";
import { HeroSection } from "./HeroSection";
import { AiExamBuilderSection } from "./AiExamBuilderSection";
import { AttendanceSection } from "./AttendanceSection";
import { FeeManagementSection } from "./FeeManagementSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { BenefitsSection } from "./BenefitsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { PricingSection } from "./PricingSection";
import { FaqSection } from "./FaqSection";
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
        {/* 1. Hero Hook */}
        <SectionErrorBoundary>
          <HeroSection
            onGetStarted={handleGetStarted}
            onScheduleDemo={handleGetStarted}
          />
        </SectionErrorBoundary>

        {/* 2. Interactive Spotlight: AI Exam Builder */}
        <SectionErrorBoundary>
          <AiExamBuilderSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        {/* 3. Interactive Spotlight: Digital Attendance */}
        <SectionErrorBoundary>
          <AttendanceSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        {/* 3.5 Interactive Spotlight: Automated Fee Recovery */}
        <SectionErrorBoundary>
          <FeeManagementSection />
        </SectionErrorBoundary>

        {/* 4. Complete Portal Showcase */}
        <SectionErrorBoundary>
          <ShowcaseSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        {/* 5. Institutional Benefits (Measurable Impact Stats) */}
        <SectionErrorBoundary>
          <BenefitsSection />
        </SectionErrorBoundary>

        {/* 6. Social Proof & Testimonials */}
        <SectionErrorBoundary>
          <TestimonialsSection />
        </SectionErrorBoundary>

        {/* 7. Transparent Pricing & Onboarding Guarantee */}
        <SectionErrorBoundary>
          <PricingSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        {/* 8. Conversion Push */}
        <SectionErrorBoundary>
          <CtaSection
            onGetStarted={handleGetStarted}
            onScheduleDemo={handleGetStarted}
          />
        </SectionErrorBoundary>

        {/* 7.5 FAQ Objections */}
        <SectionErrorBoundary>
          <FaqSection />
        </SectionErrorBoundary>
      </main>

      <SectionErrorBoundary>
        <Footer onScheduleDemo={handleGetStarted} />
      </SectionErrorBoundary>

      <ScheduleDemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />

      {/* Floating Mock Chat Support Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-sans">
        <button
          onClick={handleGetStarted}
          className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/10"
          title="Chat with Onboarding Agent"
          aria-label="Open support demo booking"
        >
          {/* Active status dot */}
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
          <MessageSquare className="h-6 w-6 text-white group-hover:rotate-6 transition-transform" />
          
          {/* Slide-out tooltip */}
          <div className="absolute right-16 bg-slate-900 text-white text-2xs md:text-xs font-bold px-3.5 py-2 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-800">
            Chat with Onboarding Team
          </div>
        </button>
      </div>
    </div>
  );
}
