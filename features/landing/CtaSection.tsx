"use client";
// features/landing/CtaSection.tsx
import { useCallback } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  onGetStarted: () => void;
  onScheduleDemo: () => void;
}

export function CtaSection({ onGetStarted, onScheduleDemo }: CtaSectionProps) {
  const handleGetStarted = useCallback(() => onGetStarted(), [onGetStarted]);
  const handleScheduleDemo = useCallback(() => onScheduleDemo(), [onScheduleDemo]);

  return (
    <section
      id="demo"
      className="py-10 sm:py-16 md:py-20 px-3 sm:px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 id="cta-heading" className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 tracking-tight">
          Ready to Transform Your School?
        </h2>
        <p className="text-indigo-100 mb-8 leading-relaxed">
          Join 1000+ schools already using EduTrio. Start your free 30-day
          trial today—no credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-white text-indigo-600 hover:bg-slate-100 shadow-xl cursor-pointer"
          >
            Start Free Trial
            <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
          </Button>
          <Button
            onClick={handleScheduleDemo}
            size="lg"
            className="bg-transparent text-white hover:bg-white/10 shadow-xl cursor-pointer border border-white/40"
          >
            Schedule Demo
            <Calendar className="h-5 w-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
        <p className="text-sm text-indigo-200 mt-6">
          ✓ No credit card required &nbsp; ✓ Full feature access &nbsp; ✓ Cancel anytime
        </p>
      </div>
    </section>
  );
}
