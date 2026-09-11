"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  ArrowRight, 
  Brain, 
  Smartphone, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Heart,
  CheckCircle2,
  Sparkles,
  Award,
  Flame,
  Search,
  ChevronDown,
  Bell,
  Clock,
  Send,
  FileText,
  Check,
  Star,
  Zap,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureItem } from "@/components/shared/FeatureItem";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { COLOR_CLASSES } from "@/types/landing";
import { AdminDashboardMockup } from "@/components/shared/AdminDashboardMockup";
import { cn } from "@/lib/utils";

interface ShowcaseSectionProps {
  onGetStarted: () => void;
}

// Interactive Teacher Portal Mockup Component
function TeacherPortalMockup() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [grades, setGrades] = useState([
    { id: "1", name: "Aarav Patel", quiz1: "95", quiz2: "92", assignment: "A+", status: "Graded" },
    { id: "2", name: "Diya Sharma", quiz1: "88", quiz2: "90", assignment: "A", status: "Graded" },
    { id: "3", name: "Vihaan Kumar", quiz1: "78", quiz2: "82", assignment: "B+", status: "Graded" },
    { id: "4", name: "Ananya Singh", quiz1: "98", quiz2: "100", assignment: "A+", status: "Graded" },
  ]);

  const [toast, setToast] = useState<string | null>(null);

  const handleQuickGrade = (id: string) => {
    setGrades(prev => prev.map(g => g.id === id ? { ...g, assignment: "A+", status: "Updated" } : g));
    setToast("✨ Grade updated to A+ for student!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col font-sans text-left select-none relative overflow-hidden">
      {toast && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 animate-fade-in">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
            TP
          </div>
          <div>
            <h5 className="font-bold text-slate-800 text-xs leading-none">Teacher Hub</h5>
            <p className="text-[10px] text-slate-400 mt-0.5">Gradebook & Lesson Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-[11px] bg-purple-50 border border-purple-100 text-purple-700 font-bold rounded-lg px-2 py-1 cursor-pointer"
          >
            <option value="Class 10-A">Class 10-A (Math)</option>
            <option value="Class 9-B">Class 9-B (Physics)</option>
          </select>
          <div className="h-7 w-7 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center">
            MR
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 space-y-3 flex-grow overflow-hidden flex flex-col justify-between">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 flex-shrink-0">
          <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Avg Class Score</span>
            <p className="text-base font-black text-slate-900 mt-0.5">91.2%</p>
          </div>
          <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Submissions</span>
            <p className="text-base font-black text-emerald-600 mt-0.5">28/30</p>
          </div>
          <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Pending Review</span>
            <p className="text-base font-black text-amber-600 mt-0.5">2</p>
          </div>
        </div>

        {/* Gradebook Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex-grow flex flex-col justify-between shadow-2xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h6 className="font-bold text-[11px] uppercase text-slate-700">Live Gradebook ({selectedClass})</h6>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Auto Syncing</span>
          </div>

          <div className="overflow-x-auto text-[11px] flex-grow pt-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-100 text-[10px] uppercase">
                  <th className="py-1 px-1">Student</th>
                  <th className="py-1 px-1">Quiz 1</th>
                  <th className="py-1 px-1">Quiz 2</th>
                  <th className="py-1 px-1">Grade</th>
                  <th className="py-1 px-1 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {grades.map((g) => (
                  <tr key={g.id} className="hover:bg-purple-50/30">
                    <td className="py-1.5 px-1 font-bold text-slate-900">{g.name}</td>
                    <td className="py-1.5 px-1 text-slate-600">{g.quiz1}%</td>
                    <td className="py-1.5 px-1 text-slate-600">{g.quiz2}%</td>
                    <td className="py-1.5 px-1">
                      <span className="bg-purple-50 text-purple-700 font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                        {g.assignment}
                      </span>
                    </td>
                    <td className="py-1.5 px-1 text-right">
                      <button 
                        onClick={() => handleQuickGrade(g.id)}
                        className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white font-bold px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        + Grade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Interactive Student Portal Mockup Component
function StudentPortalMockup() {
  const [xp, setXp] = useState(2450);
  const [streak, setStreak] = useState(14);
  const [completedTask, setCompletedTask] = useState(false);

  const handleCompleteGoal = () => {
    if (!completedTask) {
      setCompletedTask(true);
      setXp(prev => prev + 100);
      setStreak(prev => prev + 1);
    }
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col font-sans text-left select-none relative overflow-hidden">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
            🎓
          </div>
          <div>
            <h5 className="font-extrabold text-xs leading-none">Student Workspace</h5>
            <p className="text-[10px] text-cyan-100 mt-0.5">Alex Vance · Grade 10-A</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white/15 backdrop-blur-xs px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Flame className="h-3 w-3 text-amber-300 fill-amber-300 animate-pulse" />
            <span>{streak} Days</span>
          </div>
          <div className="bg-amber-400 text-slate-900 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-sm">
            <Star className="h-3 w-3 fill-slate-900" />
            <span>{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 space-y-3 flex-grow overflow-hidden flex flex-col justify-between">
        
        {/* Daily Goal Banner */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between shadow-2xs">
          <div className="space-y-0.5">
            <span className="text-[9px] font-extrabold text-cyan-600 uppercase tracking-wider">Today&apos;s Quest</span>
            <p className="text-xs font-bold text-slate-800">Complete Quadratic Equations Quiz</p>
            <p className="text-[10px] text-slate-400">+100 XP upon completion</p>
          </div>
          <Button 
            onClick={handleCompleteGoal}
            disabled={completedTask}
            className={cn(
              "text-[11px] font-bold py-1 px-3 rounded-lg shadow-xs cursor-pointer transition-all",
              completedTask ? "bg-emerald-500 text-white" : "bg-cyan-600 hover:bg-cyan-700 text-white"
            )}
          >
            {completedTask ? "✓ Completed!" : "Start Quiz"}
          </Button>
        </div>

        {/* Courses & Badges Grid */}
        <div className="grid grid-cols-2 gap-2 flex-grow">
          {/* Mathematics Card */}
          <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-2xs">
            <div className="flex justify-between items-start">
              <span className="text-lg">📐</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">94% A</span>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-xs">Mathematics</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-cyan-500 h-full w-[94%]" />
              </div>
            </div>
          </div>

          {/* Science Card */}
          <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-2xs">
            <div className="flex justify-between items-start">
              <span className="text-lg">🧪</span>
              <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">88% B+</span>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-xs">Physical Science</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-blue-500 h-full w-[88%]" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Callout */}
        <div className="bg-cyan-50/70 border border-cyan-100 p-2.5 rounded-xl flex items-center gap-2 text-left">
          <div className="p-1.5 bg-cyan-600 text-white rounded-lg">
            <Brain className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-cyan-900">AI Tutor Helper Active</p>
            <p className="text-[10px] text-cyan-700 leading-tight">Ask AI for practice question hints or formula cheat-sheets!</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Interactive Parent Portal Mockup Component
function ParentPortalMockup() {
  const [child, setChild] = useState("Mia Anderson");
  const [sentMsg, setSentMsg] = useState(false);

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col font-sans text-left select-none relative overflow-hidden">
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
            PA
          </div>
          <div>
            <h5 className="font-extrabold text-slate-800 text-xs leading-none">Parent Portal</h5>
            <p className="text-[10px] text-slate-400 mt-0.5">Monitoring {child}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-1 rounded-lg text-[10px] font-bold">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          <span>Present Today</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 space-y-3 flex-grow overflow-hidden flex flex-col justify-between">
        
        {/* Child Academic Summary Card */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Recent Assessment</span>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">Grade A (95/100)</span>
          </div>
          <p className="font-bold text-slate-800 text-xs">Class 8 Algebra Term Examination</p>
          <p className="text-[10px] text-slate-500">Teacher Note: Excellent conceptual clarity and step-by-step problem solving!</p>
        </div>

        {/* Fee & Attendance Dual Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Fee Status</span>
            <p className="text-xs font-black text-emerald-600 mt-0.5">₹0 Dues (Paid)</p>
            <button className="text-[9px] text-indigo-600 font-bold underline mt-1 block">Download Receipt</button>
          </div>
          <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Overall Attendance</span>
            <p className="text-xs font-black text-slate-800 mt-0.5">98.5% Rate</p>
            <span className="text-[9px] text-slate-400 mt-1 block">1 Absense (Excused)</span>
          </div>
        </div>

        {/* Direct Teacher Chat Callout */}
        <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Message Class Teacher</p>
              <p className="text-[10px] text-slate-500">Mrs. Sarah Jenkins (Class 8-A)</p>
            </div>
          </div>
          <button 
            onClick={() => setSentMsg(!sentMsg)}
            className="text-[10px] font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors"
          >
            {sentMsg ? "✓ Sent!" : "Send Note"}
          </button>
        </div>

      </div>
    </div>
  );
}

export function ShowcaseSection({ onGetStarted }: ShowcaseSectionProps) {
  const handleGetStarted = useCallback(() => onGetStarted(), [onGetStarted]);

  // Scale references for mockups
  const adminContainerRef = useRef<HTMLDivElement>(null);
  const teacherContainerRef = useRef<HTMLDivElement>(null);
  const studentContainerRef = useRef<HTMLDivElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);

  const [adminScale, setAdminScale] = useState(0.5);
  const [teacherScale, setTeacherScale] = useState(0.5);
  const [studentScale, setStudentScale] = useState(0.5);
  const [parentScale, setParentScale] = useState(0.5);

  useEffect(() => {
    const updateScales = () => {
      if (adminContainerRef.current) {
        setAdminScale(adminContainerRef.current.getBoundingClientRect().width / 960);
      }
      if (teacherContainerRef.current) {
        setTeacherScale(teacherContainerRef.current.getBoundingClientRect().width / 550);
      }
      if (studentContainerRef.current) {
        setStudentScale(studentContainerRef.current.getBoundingClientRect().width / 550);
      }
      if (parentContainerRef.current) {
        setParentScale(parentContainerRef.current.getBoundingClientRect().width / 550);
      }
    };

    updateScales();
    window.addEventListener("resize", updateScales);
    return () => window.removeEventListener("resize", updateScales);
  }, []);

  return (
    <section
      id="portals"
      className="py-10 sm:py-16 md:py-24 px-3 sm:px-6 bg-slate-50/70 border-b border-slate-200/50 scroll-mt-20 overflow-hidden font-sans"
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="See It In Action"
          badgeClassName="bg-purple-100 text-purple-700 font-bold px-3 sm:px-4 py-1.5 text-xs rounded-full shadow-xs"
          title="Interactive User Portals for Every Role"
          subtitle="Experience intuitive, high-fidelity interfaces engineered specifically for administrators, teachers, students, and parents"
        />

        <div className="space-y-12 sm:space-y-16 lg:space-y-24 mt-8 sm:mt-12 lg:mt-16">
          
          {/* Portal 1: Admin Portal (Mockup RIGHT, Text LEFT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Copywriting Left */}
            <div className="lg:col-span-5 lg:order-1 space-y-3 sm:space-y-6 text-left">
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-1 font-bold text-xs">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  Admin Portal
                </Badge>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Comprehensive Administrative Control Center
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                Manage your entire institution from a single unified control suite. Track enrollment growth, monitor real-time fee revenues, inspect grade distributions, and execute data-driven administrative actions effortlessly.
              </p>

              <ul className="space-y-2 sm:space-y-3 font-sans">
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time enrollment trends & revenue analytics dashboards</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive staff, student, and administrator permissions</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Predictive institution health metrics powered by AI</span>
                </li>
              </ul>

              <Button onClick={handleGetStarted} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md text-xs sm:text-sm w-full sm:w-auto">
                Explore Admin Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Interactive Admin Mockup Right */}
            <div className="lg:col-span-7 lg:order-2 flex flex-col justify-center relative w-full select-none" ref={adminContainerRef}>
              <div 
                className="relative w-full rounded-2xl overflow-x-auto overflow-y-hidden max-w-full touch-pan-x shadow-xl sm:shadow-2xl border border-slate-200 bg-[#F8FAFC] min-h-[220px] sm:min-h-[300px]"
                style={{ height: `${Math.max(220, 630 * Math.max(0.45, adminScale))}px` }}
              >
                <div 
                  className="absolute top-0 left-0 min-w-[850px] w-[960px] h-[630px] origin-top-left"
                  style={{ transform: `scale(${Math.max(0.45, adminScale)})` }}
                >
                  <AdminDashboardMockup />
                </div>
              </div>
            </div>

          </div>

          {/* Portal 2: Teacher Portal (Mockup LEFT, Text RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Interactive Teacher Mockup Left */}
            <div className="lg:col-span-7 lg:order-1 flex flex-col justify-center relative w-full select-none" ref={teacherContainerRef}>
              <div 
                className="relative w-full rounded-2xl overflow-x-auto overflow-y-hidden max-w-full touch-pan-x shadow-xl sm:shadow-2xl border border-purple-200/80 bg-[#F8FAFC] min-h-[220px] sm:min-h-[280px]"
                style={{ height: `${Math.max(220, 360 * Math.max(0.55, teacherScale))}px` }}
              >
                <div 
                  className="absolute top-0 left-0 min-w-[500px] w-[550px] h-[360px] origin-top-left"
                  style={{ transform: `scale(${Math.max(0.55, teacherScale)})` }}
                >
                  <TeacherPortalMockup />
                </div>
              </div>
            </div>

            {/* Copywriting Right */}
            <div className="lg:col-span-5 lg:order-2 space-y-3 sm:space-y-6 text-left">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1 font-bold text-xs">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  Teacher Portal
                </Badge>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Streamlined Teaching & Digital Gradebook
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                Empower educators with intelligent tools that reduce administrative friction. Conduct 30-second roll-calls, update student marks dynamically, and generate board-standard lesson plans.
              </p>

              <ul className="space-y-2 sm:space-y-3 font-sans">
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>One-click gradebook entry with automated GPA calculations</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Assignment manager with instant submission tracking</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Direct parent communication & progress update broadcasts</span>
                </li>
              </ul>

              <Button onClick={handleGetStarted} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md text-xs sm:text-sm w-full sm:w-auto">
                Explore Teacher Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

          </div>

          {/* Portal 3: Student Portal (Mockup RIGHT, Text LEFT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Copywriting Left */}
            <div className="lg:col-span-5 lg:order-1 space-y-3 sm:space-y-6 text-left">
              <div className="flex items-center gap-2">
                <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200 px-3 py-1 font-bold text-xs">
                  <GraduationCap className="h-3.5 w-3.5 mr-1" />
                  Student Workspace
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 font-bold text-[11px]">
                  Gamified
                </Badge>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Gamified Learning & AI Study Assistant
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                Inspire student curiosity with a gamified workspace. Students earn XP points, maintain daily study streaks, track subject progress, and get instant tutoring hints from the built-in AI assistant.
              </p>

              <ul className="space-y-2 sm:space-y-3 font-sans">
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Streak counters, achievement badges, and class leaderboards</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>AI Tutor Assistant for 24/7 homework guidance & practice tests</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time subject mastery meters & assignment schedules</span>
                </li>
              </ul>

              <Button onClick={handleGetStarted} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md text-xs sm:text-sm w-full sm:w-auto">
                Explore Student Workspace
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Interactive Student Mockup Right */}
            <div className="lg:col-span-7 lg:order-2 flex flex-col justify-center relative w-full select-none" ref={studentContainerRef}>
              <div 
                className="relative w-full rounded-2xl overflow-x-auto overflow-y-hidden max-w-full touch-pan-x shadow-xl sm:shadow-2xl border border-cyan-200/80 bg-[#F8FAFC] min-h-[220px] sm:min-h-[280px]"
                style={{ height: `${Math.max(220, 360 * Math.max(0.55, studentScale))}px` }}
              >
                <div 
                  className="absolute top-0 left-0 min-w-[500px] w-[550px] h-[360px] origin-top-left"
                  style={{ transform: `scale(${Math.max(0.55, studentScale)})` }}
                >
                  <StudentPortalMockup />
                </div>
              </div>
            </div>

          </div>

          {/* Portal 4: Parent Portal (Mockup LEFT, Text RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Interactive Parent Mockup Left */}
            <div className="lg:col-span-7 lg:order-1 flex flex-col justify-center relative w-full select-none" ref={parentContainerRef}>
              <div 
                className="relative w-full rounded-2xl overflow-x-auto overflow-y-hidden max-w-full touch-pan-x shadow-xl sm:shadow-2xl border border-emerald-200/80 bg-[#F8FAFC] min-h-[220px] sm:min-h-[280px]"
                style={{ height: `${Math.max(220, 360 * Math.max(0.55, parentScale))}px` }}
              >
                <div 
                  className="absolute top-0 left-0 min-w-[500px] w-[550px] h-[360px] origin-top-left"
                  style={{ transform: `scale(${Math.max(0.55, parentScale)})` }}
                >
                  <ParentPortalMockup />
                </div>
              </div>
            </div>

            {/* Copywriting Right */}
            <div className="lg:col-span-5 lg:order-2 space-y-3 sm:space-y-6 text-left">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 font-bold text-xs">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  Parent Portal
                </Badge>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Real-Time Transparency for Parents
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
                Keep parents synchronized with their child&apos;s educational journey. Parents receive real-time check-in alerts, inspect exam scorecards, clear fee dues digitally, and message teachers directly.
              </p>

              <ul className="space-y-2 sm:space-y-3 font-sans">
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Instant push & SMS notifications for attendance & arrival</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Digital fee payment gateway with downloadable tax receipts</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Direct 1-on-1 teacher messaging & academic progress tracking</span>
                </li>
              </ul>

              <Button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md text-xs sm:text-sm w-full sm:w-auto">
                Explore Parent Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

          </div>

          {/* Bottom Card Row: Native Mobile Apps & AI Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            <Card className="border border-slate-200 shadow-xl overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl relative">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-purple-500/20 text-purple-300 rounded-2xl border border-purple-500/30">
                    <Smartphone className="h-7 w-7" />
                  </div>
                  <Badge className="bg-purple-500/30 text-purple-200 border-purple-400/30 font-bold px-3 py-1 text-xs">
                    iOS & Android
                  </Badge>
                </div>

                <div className="space-y-2 text-left">
                  <h4 className="text-2xl font-extrabold text-white">Native Mobile Applications</h4>
                  <p className="text-sm text-purple-200 leading-relaxed font-normal">
                    Native mobile apps for iOS and Android equipped with offline mark synchronization, touch ID authentication, instant push alerts, and bus tracking GPS.
                  </p>
                </div>

                <div className="pt-2">
                  <Button onClick={handleGetStarted} className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-3 rounded-xl shadow-lg w-full sm:w-auto">
                    Download Mobile Overview
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-xl overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl relative">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-cyan-500/20 text-cyan-300 rounded-2xl border border-cyan-500/30">
                    <Brain className="h-7 w-7" />
                  </div>
                  <Badge className="bg-cyan-500/30 text-cyan-200 border-cyan-400/30 font-bold px-3 py-1 text-xs">
                    AI Neural Engine
                  </Badge>
                </div>

                <div className="space-y-2 text-left">
                  <h4 className="text-2xl font-extrabold text-white">Advanced AI Analytics</h4>
                  <p className="text-sm text-cyan-200 leading-relaxed font-normal">
                    Machine learning algorithms provide predictive academic forecasting, automatic attendance risk detection, and intelligent curriculum recommendations.
                  </p>
                </div>

                <div className="pt-2">
                  <Button onClick={handleGetStarted} className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold px-6 py-3 rounded-xl shadow-lg w-full sm:w-auto">
                    Explore AI Engine
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
