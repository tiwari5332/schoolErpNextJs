import { useState, useEffect, useRef } from "react";
import { ArrowRight, Video, GraduationCap, ShieldCheck, Lock, CheckCircle2, Users, Bell, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { STATS } from "./constants";
import { AdminDashboardMockup } from "@/components/shared/AdminDashboardMockup";

interface HeroSectionProps {
  onGetStarted: () => void;
  onScheduleDemo: () => void;
}

export function HeroSection({ onGetStarted, onScheduleDemo }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      const parentWidth = containerRef.current?.getBoundingClientRect().width || 500;
      setScale(parentWidth / 1000);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section
      className="pt-32 pb-20 px-6 bg-[#F8FAFC] border-b border-slate-200/50"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <Badge className="bg-white/80 backdrop-blur-sm border-indigo-200 text-indigo-700 px-4 py-2">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
              Transforming Education Through Technology
            </Badge>
            <div>
              <h1
                id="hero-heading"
                className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-none"
              >
                The Complete School Management Platform
              </h1>
              <p className="text-slate-600 leading-relaxed mb-8">
                EduTrio empowers schools with AI-powered analytics, seamless
                communication, comprehensive student management, and intelligent
                automation. Everything you need to run a modern educational
                institution in one powerful platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 hover:bg-white cursor-pointer"
                onClick={onScheduleDemo}
              >
                Schedule Demo
                <Video className="h-5 w-5 ml-2" aria-hidden="true" />
              </Button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon
                    className="h-6 w-6 text-indigo-600 mx-auto mb-2"
                    aria-hidden="true"
                  />
                  <div className="font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* B2B Trust & Compliance Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 pt-6 border-t border-slate-200/60 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                FERPA & COPPA Compliant
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                End-to-End SSL Security
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                99.9% Uptime SLA
              </span>
            </div>
          </div>

          {/* Right: Simulated School Admin Dashboard */}
          <div className="relative w-full lg:scale-105 transition-transform duration-300 animate-none" ref={containerRef}>
            {/* Soft decorative background glows */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />

            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-[#F8FAFC]"
              style={{ height: `${700 * scale}px` }}
            >
              <div
                className="absolute top-0 left-0 w-[950px] h-[800px] origin-top-left"
                style={{ transform: `scale(${scale})` }}
              >
                <AdminDashboardMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
