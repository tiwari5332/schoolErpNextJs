"use client";

import { useCallback, useState } from "react";
import { MessageSquare } from "lucide-react";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";
import { NavBar } from "./NavBar";
import { HeroSection } from "./HeroSection";
import { AiExamBuilderSection } from "./AiExamBuilderSection";
import { AttendanceSection } from "./AttendanceSection";
import { FeeManagementSection } from "./FeeManagementSection";
import { CommunicationSection } from "./CommunicationSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { BenefitsSection } from "./BenefitsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { PricingSection } from "./PricingSection";
import { FaqSection } from "./FaqSection";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";
import { ScheduleDemoModal } from "@/components/shared/ScheduleDemoModal";
import { QuickContactModal } from "@/components/shared/QuickContactModal";

interface LandingPageProps {
  onGetStarted?: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);

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

      <main className="w-full">
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

        {/* 3.6 Interactive Spotlight: Multi-Channel Communication Hub */}
        <SectionErrorBoundary>
          <CommunicationSection />
        </SectionErrorBoundary>

        {/* 4. Complete Portal Showcase */}
        <SectionErrorBoundary>
          <ShowcaseSection onGetStarted={handleGetStarted} />
        </SectionErrorBoundary>

        {/* 5. Institutional Benefits (Measurable Impact Stats) */}
        <SectionErrorBoundary>
          <BenefitsSection onScheduleDemo={handleGetStarted} />
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
      <QuickContactModal isOpen={isQuickContactOpen} onClose={() => setIsQuickContactOpen(false)} />

      {/* WhatsApp Floating Action Widget */}
      {!isQuickContactOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[99999] flex items-center justify-center font-sans transition-all duration-300 animate-in fade-in pointer-events-auto">
          <button
            onClick={() => setIsQuickContactOpen(true)}
            className="group relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer border-2 border-white shadow-emerald-500/50"
            title="WhatsApp Support (+91 7398647812)"
            aria-label="Open WhatsApp Support Form"
          >
            {/* Active online pulse dot */}
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>
            <svg className="h-7 w-7 sm:h-8 sm:w-8 text-white fill-current group-hover:rotate-6 transition-transform" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            
            {/* Tooltip on desktop hover */}
            <div className="hidden lg:flex absolute right-16 bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-800 items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WhatsApp Support (7398647812)</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
