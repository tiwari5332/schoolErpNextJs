import { useState, useEffect, useRef } from "react";
import { ArrowRight, Video, GraduationCap, ShieldCheck, Lock, CheckCircle2, Users, Bell, Clock, Sparkles, FileSpreadsheet } from "lucide-react";
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
      className="pt-28 sm:pt-36 pb-12 sm:pb-20 px-3 sm:px-6 bg-[#F8FAFC] border-b border-slate-200/50"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 max-w-full overflow-x-auto flex-nowrap pb-1 no-scrollbar">
            <Badge className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 sm:px-3 py-1 sm:py-1.5 font-bold shadow-xs text-[10px] sm:text-xs whitespace-nowrap shrink-0">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 text-emerald-600 animate-pulse shrink-0" />
              <span>🎉 1-Month FREE Trial</span>
            </Badge>
            <Badge className="bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 sm:px-3 py-1 sm:py-1.5 font-bold shadow-xs text-[10px] sm:text-xs whitespace-nowrap shrink-0">
              <span>⚡ Free Data Migration (48 Hrs)</span>
            </Badge>
            <Badge className="bg-purple-50 border border-purple-200 text-purple-800 px-2 sm:px-3 py-1 sm:py-1.5 font-bold shadow-xs text-[10px] sm:text-xs whitespace-nowrap shrink-0">
              <span>📊 1-Click Excel Reports</span>
            </Badge>
          </div>
          <div className="flex flex-col justify-center text-center items-center mt-3 lg:mt-6">
            <h1
              id="hero-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3 sm:mb-6 animate-none leading-tight"
            >
              The Complete School Management Platform
            </h1>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed mb-4 sm:mb-8">
              EduTrio empowers schools with AI-powered analytics, seamless
              communication, comprehensive student management, and intelligent
              automation. Everything you need to run a modern educational
              institution in one powerful platform.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left: Copy */}

          {/* Onboarding & Free Migration Callout Card */}
          <div>
            <div className="bg-gradient-to-r from-emerald-50/90 via-indigo-50/80 to-purple-50/80 border border-emerald-200/80 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-3.5 text-left shadow-xs">
              <div className="h-9 w-9 sm:h-10 sm:w-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-base sm:text-lg shadow-sm flex-shrink-0">
                ⚡
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-slate-900 text-xs sm:text-sm">30-Day Risk-Free Trial & Free 48-Hour Migration</p>
                <p className="text-slate-600 mt-0.5 leading-relaxed text-[12px] sm:text-xs">
                  Try EduTrio free for 1 full month with no credit card required. Our team handles <strong>100% of your data migration</strong> from Excel or legacy software into EduTrio within 48 hours completely free!
                </p>
              </div>
            </div>

            {/* 1-Click Report Generation & Excel Downloads Callout Card */}
            <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-cyan-50/80 border border-indigo-200/80 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-3.5 text-left shadow-xs mt-2.5 sm:mt-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-base sm:text-lg shadow-sm flex-shrink-0">
                📊
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-slate-900 text-xs sm:text-sm">1-Click Report Generation & Excel Downloads</p>
                <p className="text-slate-600 mt-0.5 leading-relaxed text-[12px] sm:text-xs">
                  Generate comprehensive school administrative reports instantly. Export attendance records, fee ledgers, exam marksheets, and compliance analytics to <strong>Excel (.xlsx) and PDF format with just 1-click</strong>!
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-4 sm:pt-8 border-t border-slate-200">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon
                    className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 mx-auto mb-1 sm:mb-2"
                    aria-hidden="true"
                  />
                  <div className="font-bold text-slate-900 text-sm sm:text-base">{stat.value}</div>
                  <div className="text-[12px] sm:text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* B2B Trust & Compliance Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 pt-6 border-t border-slate-200/60 text-slate-500 font-semibold text-[12px] uppercase tracking-wider">
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
    </section >
  );
}
