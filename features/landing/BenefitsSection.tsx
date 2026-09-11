"use client";

import { useState, useMemo } from "react";
import {
  Clock,
  TrendingUp,
  Heart,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Zap,
  Calculator,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";

interface BenefitsSectionProps {
  onScheduleDemo?: () => void;
}

// Key impact metrics aligned with EduTrio Indigo-Purple project theme
const IMPACT_PILLARS = [
  {
    id: "time",
    icon: Clock,
    badge: "Time Optimization",
    badgeColor: "indigo",
    title: "Save 20+ Hours Weekly",
    metric: "20+ hrs/wk",
    statLabel: "Saved Per Educator",
    description: "Automate attendance, grading, and exam prep, freeing teachers to focus entirely on student growth.",
    gainPercent: 88,
    details: [
      "Automated one-click attendance dispatch to parents",
      "Instant AI-powered exam & paper generation",
      "Auto-generated report cards & gradebook calculations",
    ],
    bgGradient: "from-indigo-600 via-purple-600 to-indigo-700",
    lightBg: "bg-indigo-50/60 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800/60",
  },
  {
    id: "academics",
    icon: TrendingUp,
    badge: "Academic Performance",
    badgeColor: "purple",
    title: "Improve Student Outcomes",
    metric: "+34%",
    statLabel: "Average Grade Uplift",
    description: "Real-time analytics and custom AI assessments help pinpoint and close learning gaps early.",
    gainPercent: 92,
    details: [
      "AI gap analysis pinpoints weak subjects per student",
      "Customized remedial quizzes generated instantly",
      "Parent visibility into daily academic progress",
    ],
    bgGradient: "from-purple-600 via-indigo-600 to-purple-700",
    lightBg: "bg-indigo-50/60 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800/60",
  },
  {
    id: "parent",
    icon: Heart,
    badge: "Community Alignment",
    badgeColor: "indigo",
    title: "Boost Parent Alignment",
    metric: "99.4%",
    statLabel: "Parent Sync Rate",
    description: "Instant grade push alerts, attendance notices, and automated fee reminders keep parents synced.",
    gainPercent: 96,
    details: [
      "Instant WhatsApp & Mobile App push notifications",
      "Direct mobile fee payment links with instant receipts",
      "Zero parent-teacher communication breakdown",
    ],
    bgGradient: "from-indigo-600 via-indigo-700 to-purple-600",
    lightBg: "bg-indigo-50/60 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800/60",
  },
  {
    id: "cost",
    icon: DollarSign,
    badge: "Financial Recovery",
    badgeColor: "purple",
    title: "Cut Admin Costs by 70%",
    metric: "70%",
    statLabel: "Operational Expense Saved",
    description: "Completely digitize student record archives, registration, and fee collection processes.",
    gainPercent: 94,
    details: [
      "100% paperless student records and digital admissions",
      "Automated fee overdue reminders increase collection by 28%",
      "Eliminate paper circulars and SMS vendor bloat",
    ],
    bgGradient: "from-purple-600 via-indigo-600 to-indigo-700",
    lightBg: "bg-indigo-50/60 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800/60",
  },
];

// Before vs After comparisons
const COMPARISONS = [
  {
    title: "Student Attendance & Roll Call",
    before: "Teachers spend 15–20 mins per class marking physical registers & manually sending SMS.",
    after: "Instant biometric/mobile digital roll call takes 30 seconds & auto-notifies absent parents via WhatsApp.",
  },
  {
    title: "Fee Collection & Outstanding Follow-ups",
    before: "Manual receipt registers, long queues at accounts counter, and 30%+ delayed fee payments.",
    after: "Automated UPI/Card payment links sent via WhatsApp with instant digital receipts & zero overdue backlog.",
  },
  {
    title: "Exam Creation & Question Banking",
    before: "Days spent compiling papers, formatting diagrams, and proofreading answer keys manually.",
    after: "AI Exam Builder creates CBSE/ICSE aligned papers with full answer keys & marking schemes in 2 minutes.",
  },
  {
    title: "Parent-School Communication",
    before: "Lost paper circulars, unorganized WhatsApp group spam, and zero audit trail of urgent notices.",
    after: "Centralized communication hub with official app notifications, read receipts & instant delivery.",
  },
];

export function BenefitsSection({ onScheduleDemo }: BenefitsSectionProps) {
  const [activeTab, setActiveTab] = useState<"matrix" | "calculator" | "comparison">("matrix");
  const [studentCount, setStudentCount] = useState<number>(500);
  const [activePillar, setActivePillar] = useState<string>("time");

  // Dynamic calculations based on student strength
  const calculatedMetrics = useMemo(() => {
    const hoursSavedPerYear = Math.round(studentCount * 3.8);
    const feeRecoveryEstimateINR = Math.round((studentCount * 1450) / 1000) * 1000;
    const paperSavedINR = Math.round((studentCount * 360) / 100) * 100;
    const adminHoursSaved = Math.round(studentCount * 1.4);

    return {
      hoursSavedPerYear,
      feeRecoveryEstimateINR,
      paperSavedINR,
      adminHoursSaved,
    };
  }, [studentCount]);

  return (
    <section className="py-10 sm:py-16 md:py-20 px-3 sm:px-6 bg-white border-b border-slate-200/50 font-sans overflow-hidden" aria-labelledby="benefits-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="Why Choose EduTrio"
          badgeClassName="bg-indigo-100 text-indigo-700 text-xs sm:text-sm"
          title="Measurable Impact on Your Institution"
          subtitle="Join thousands of schools that have transformed their operations with EduTrio"
        />

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-6 sm:mb-12">
          <div className="inline-flex flex-wrap justify-center items-center gap-1 bg-slate-100 rounded-2xl sm:rounded-full p-1 border border-slate-200/80 max-w-full">
            <button
              onClick={() => setActiveTab("matrix")}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "matrix"
                  ? "bg-white shadow-sm text-indigo-700"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Impact Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-white shadow-sm text-indigo-700"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>ROI Calculator</span>
              <span className="text-[9px] sm:text-[10px] bg-indigo-100 text-indigo-700 px-1.5 sm:px-2 py-0.5 rounded-full font-bold hidden xs:inline-block">
                Interactive
              </span>
            </button>

            <button
              onClick={() => setActiveTab("comparison")}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "comparison"
                  ? "bg-white shadow-sm text-indigo-700"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Before vs. After</span>
            </button>
          </div>
        </div>

        {/* TAB 1: IMPACT MATRIX */}
        {activeTab === "matrix" && (
          <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-300">
            {/* Grid of 4 Interactive Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {IMPACT_PILLARS.map((pillar) => {
                const isSelected = activePillar === pillar.id;
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar.id)}
                    className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 cursor-pointer border backdrop-blur-md ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-2xl scale-[1.01] sm:scale-[1.03] ring-2 ring-indigo-500/30"
                        : "bg-white/90 dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-md hover:shadow-xl"
                    }`}
                  >
                    {/* Header badge */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-r ${pillar.bgGradient} flex items-center justify-center shadow-md text-white group-hover:scale-110 transition-transform`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wide uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Stat callout */}
                    <div className="mb-2 sm:mb-3">
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        {pillar.metric}
                      </div>
                      <div className="text-[11px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {pillar.statLabel}
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3 sm:mb-4">
                      {pillar.description}
                    </p>

                    {/* Progress Bar Meter */}
                    <div className="space-y-1.5 pt-2 border-t border-indigo-50 dark:border-indigo-950">
                      <div className="flex justify-between text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        <span>Efficiency Gain</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{pillar.gainPercent}%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 w-full bg-indigo-100/60 dark:bg-indigo-950/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${pillar.bgGradient} rounded-full transition-all duration-1000`}
                          style={{ width: `${pillar.gainPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Pillar Feature Breakdown Banner */}
            {activePillar && (
              <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl sm:shadow-2xl border border-indigo-400/30 relative overflow-hidden animate-in fade-in duration-300">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white text-[10px] sm:text-xs font-bold border border-white/20">
                      <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Key Pillar Details: {IMPACT_PILLARS.find(p => p.id === activePillar)?.title}</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Why {IMPACT_PILLARS.find(p => p.id === activePillar)?.badge} Drives Institutional Growth
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2">
                      {IMPACT_PILLARS.find(p => p.id === activePillar)?.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-indigo-50 bg-white/10 p-2.5 sm:p-3 rounded-xl border border-white/15">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {onScheduleDemo && (
                    <Button
                      onClick={onScheduleDemo}
                      className="bg-white text-indigo-900 hover:bg-slate-100 font-extrabold text-xs px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer w-full md:w-auto justify-center"
                    >
                      <span>Schedule Walkthrough</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE ROI & SAVINGS CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl sm:shadow-2xl border border-indigo-100 dark:border-indigo-900/60 space-y-4 sm:space-y-8 animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold border border-indigo-200 dark:border-indigo-800">
                <Calculator className="h-3.5 w-3.5" />
                <span>Interactive Institutional ROI Simulator</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Calculate Estimated Annual Savings for Your School
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Adjust student strength slider below to see estimated teacher hours saved, fee recovery enhancement, and paper cost reductions.
              </p>
            </div>

            {/* Slider Control Container */}
            <div className="max-w-2xl mx-auto bg-indigo-50/60 dark:bg-indigo-950/30 p-4 sm:p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 space-y-3 sm:space-y-4">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Total Enrolled Students:</span>
                </label>
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-extrabold text-xs sm:text-base shadow-md">
                  {studentCount} Students
                </div>
              </div>

              <input
                type="range"
                min={100}
                max={3000}
                step={50}
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full h-2.5 sm:h-3 bg-indigo-200 dark:bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span>100 (Small)</span>
                <span>1,500 (Medium)</span>
                <span>3,000+ (Large)</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-2">
              {/* Metric 1 */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-1.5 sm:space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Clock className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-90">Teacher Time Saved</span>
                <div className="text-2xl sm:text-3xl font-black">{calculatedMetrics.hoursSavedPerYear.toLocaleString()} hrs</div>
                <p className="text-[10px] sm:text-[11px] opacity-90 leading-relaxed">
                  Saved per year in attendance, paper setting, and manual grading tasks.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-1.5 sm:space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <DollarSign className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-90">Fee Recovery Boost</span>
                <div className="text-2xl sm:text-3xl font-black">₹{(calculatedMetrics.feeRecoveryEstimateINR / 100000).toFixed(2)} Lakhs</div>
                <p className="text-[10px] sm:text-[11px] opacity-90 leading-relaxed">
                  Est. additional fees collected on time via WhatsApp payment links & reminders.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-1.5 sm:space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <ShieldCheck className="h-16 w-16 sm:h-20 sm:w-20" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-90">Paper & Printing Saved</span>
                <div className="text-2xl sm:text-3xl font-black">₹{(calculatedMetrics.paperSavedINR / 100000).toFixed(2)} Lakhs</div>
                <p className="text-[10px] sm:text-[11px] opacity-90 leading-relaxed">
                  Direct cost reduction in printing report cards, notice sheets & circulars.
                </p>
              </div>

              {/* Metric 4 */}
              <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-1.5 sm:space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Zap className="h-16 w-16 sm:h-20 sm:w-20 text-indigo-300" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-indigo-200">Admin Hours Freed</span>
                <div className="text-2xl sm:text-3xl font-black text-white">{calculatedMetrics.adminHoursSaved.toLocaleString()} hrs</div>
                <p className="text-[10px] sm:text-[11px] opacity-90 leading-relaxed">
                  Freed from manual register data entry, filing, and record retrieval.
                </p>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Custom Audit for Your Institution</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs">
                    Get a personalized institutional savings breakdown created by our education tech specialists.
                  </p>
                </div>
              </div>

              {onScheduleDemo && (
                <Button
                  onClick={onScheduleDemo}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md cursor-pointer shrink-0 w-full sm:w-auto"
                >
                  Request Custom Audit
                </Button>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BEFORE VS AFTER COMPARISON */}
        {activeTab === "comparison" && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Traditional Manual School Operations vs. EduTrio ERP
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                See how EduTrio replaces repetitive daily administrative friction with automated workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              {COMPARISONS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md sm:shadow-xl border border-indigo-100 dark:border-indigo-900/60 space-y-3 sm:space-y-4 hover:shadow-2xl transition-shadow"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2 border-b border-indigo-50 dark:border-indigo-950 pb-2.5 sm:pb-3">
                    <Layers className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{item.title}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                    {/* Before Column */}
                    <div className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 p-3 sm:p-4 rounded-2xl space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-300 text-[11px] sm:text-xs">
                        <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500 shrink-0" />
                        <span>Traditional Method</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                        {item.before}
                      </p>
                    </div>

                    {/* After Column */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200 dark:border-indigo-800 p-3 sm:p-4 rounded-2xl space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300 text-[11px] sm:text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 shrink-0" />
                        <span>With EduTrio ERP</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-100 font-semibold leading-relaxed text-[11px]">
                        {item.after}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Bottom Social Proof Strip */}
        <div className="mt-8 sm:mt-16 pt-4 sm:pt-8 border-t border-indigo-100 dark:border-indigo-950 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">500+</div>
            <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">Partner Schools Onboarded</div>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">250,000+</div>
            <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">Active Students Managed</div>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">99.8%</div>
            <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">Fee Recovery Accuracy</div>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">24/7</div>
            <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">WhatsApp Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
