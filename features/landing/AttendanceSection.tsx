"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  ArrowRight, 
  Clock, 
  Bell, 
  BarChart3, 
  Smartphone, 
  Zap, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  Loader2,
  X,
  FileSpreadsheet,
  BrainCircuit,
  MessageSquare,
  ChevronDown,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Initial student state matching the screenshot math exactly:
// Total = 12, Present = 8, Late = 3, Absent = 0, Unmarked = 1
const INITIAL_STUDENTS = [
  { id: "001", name: "Emma Wilson", status: "Present", avatar: "👩" },
  { id: "002", name: "Liam Johnson", status: "Late", avatar: "👦" },
  { id: "003", name: "Olivia Brown", status: "Late", avatar: "👧" },
  { id: "004", name: "Noah Davis", status: "Present", avatar: "👦" },
  { id: "005", name: "Ava Martinez", status: "Late", avatar: "👧" },
  { id: "006", name: "Ethan Garcia", status: "Present", avatar: "👦" },
  { id: "007", name: "Sophia Taylor", status: "Present", avatar: "👧" },
  { id: "008", name: "Isabella Anderson", status: "Present", avatar: "👩" },
  { id: "009", name: "Mia Thomas", status: "Present", avatar: "👧" },
  { id: "010", name: "William White", status: "Present", avatar: "👦" },
  { id: "011", name: "Lucas Harris", status: "Present", avatar: "👦" },
  { id: "012", name: "Charlotte Martin", status: "Unmarked", avatar: "👧" }
];

const ATTENDANCE_BENEFITS = [
  { icon: Clock,       title: "Mark in Under 30 Seconds",      body: "Mark attendance in bulk or individually with responsive one-tap controls." },
  { icon: Bell,        title: "Real-Time Parent Alerts",       body: "Automatically notify parents via WhatsApp, SMS, or Push notification when a child is absent." },
  { icon: BrainCircuit, title: "AI Attendance Predictor",      body: "Get dynamic indicators flagging students at risk of chronic absenteeism." },
  { icon: BarChart3,   title: "Automated Compliance Reports",  body: "Instantly compile weekly/monthly data for curriculum board submissions." },
] as const;

export function AttendanceSection({ onGetStarted }: { onGetStarted: () => void }) {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  
  // Interactive Simulation states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [aiDraftOpen, setAiDraftOpen] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  // Auto-clear toast alert
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Scaler Hook for Mockup Layout
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      const parentWidth = containerRef.current?.getBoundingClientRect().width || 500;
      setScale(Math.max(0.38, parentWidth / 960));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Compute live statistics
  const totalCount = students.length;
  const presentCount = students.filter(s => s.status === "Present").length;
  const lateCount = students.filter(s => s.status === "Late").length;
  const absentCount = students.filter(s => s.status === "Absent").length;
  const unmarkedCount = students.filter(s => s.status === "Unmarked").length;
  
  // Attendance % calculation (Present + Late count / Total marked)
  const markedCount = totalCount - unmarkedCount;
  const attendanceRate = markedCount > 0 
    ? Math.round(((presentCount + lateCount) / totalCount) * 100) 
    : 0;

  const handleStatusChange = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: "Present" })));
    setToastMessage("✨ All students marked Present!");
  };

  const handleReset = () => {
    setStudents(INITIAL_STUDENTS);
    setToastMessage("🔄 Attendance ledger reset to default state.");
  };

  const handleNotifyParents = () => {
    setIsNotifying(true);
    setTimeout(() => {
      setIsNotifying(false);
      setToastMessage(`✉️ Notifications dispatched! Parents of absent/late students notified via SMS and WhatsApp.`);
    }, 1500);
  };

  return (
    <section id="attendance" className="py-10 sm:py-16 md:py-20 px-3 sm:px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Side: Product Value Pitch (Left side on desktop) */}
          <div className="lg:col-span-5 lg:order-1 text-white text-left space-y-6 sm:space-y-8">
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-white px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-xs">
              <Zap className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
              Smart Attendance Tracking
            </Badge>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-extrabold text-white text-2xl sm:text-4xl tracking-tight leading-tight">
                Replace Roll-Calls with Smart Digital Intelligence
              </h2>
              <p className="text-indigo-100 leading-relaxed text-xs sm:text-sm">
                EduTrio integrates attendance with parent notification networks and AI attendance predictive guards, transforming a compliance chore into a proactive school security system.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="space-y-4 sm:space-y-5">
              {ATTENDANCE_BENEFITS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-white border border-white/10">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{title}</h4>
                    <p className="text-xs text-indigo-100 mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Hints callout */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-3 sm:p-4 flex gap-3 text-xs text-indigo-100 leading-relaxed font-sans shadow-inner">
              <span className="text-base">💡</span>
              <p>
                <strong>Interactive Demo:</strong> Try clicking the <strong>Present (Check)</strong>, <strong>Late (Clock)</strong>, or <strong>Absent (X)</strong> buttons next to students in the mockup to see metrics update live.
              </p>
            </div>
          </div>

          {/* Right Side: High Fidelity Dashboard Mockup (Right side on desktop) */}
          <div className="lg:col-span-7 lg:order-2 flex flex-col justify-center relative w-full select-none" ref={containerRef}>
            
            {/* Notification alert toast */}
            {toastMessage && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-55 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 max-w-sm w-11/12 animate-fade-in">
                <Send className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span className="flex-grow text-left leading-normal">{toastMessage}</span>
              </div>
            )}

            {/* AI Draft Email Modal overlay (Viewport fixed) */}
            {aiDraftOpen && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
                <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 sm:p-6 max-w-sm w-full text-left space-y-4 shadow-2xl relative font-sans">
                  <button 
                    onClick={() => setAiDraftOpen(false)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                      <BrainCircuit className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-100">AI Assist: Parent Draft Email</h5>
                      <p className="text-[11px] text-slate-400">Recipient: parent.johnson@email.com</p>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg text-2xs text-slate-300 font-mono space-y-2 border border-slate-800 leading-normal">
                    <p><strong>Subject:</strong> Academic Attendance Alert: Liam Johnson</p>
                    <p>Dear Parent,</p>
                    <p>Our records show that Liam was marked <strong>LATE</strong> today (17-08-2026). This is his 3rd late attendance record this week.</p>
                    <p>As tardiness impacts academic pacing, we encourage a brief check-in. Let us know if you need any scheduling assistance.</p>
                    <p>Best regards,<br/>Super Admin John Anderson</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => {
                        setAiDraftOpen(false);
                        setToastMessage("✉️ AI Draft Email dispatched to Liam's parents!");
                      }}
                      className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded-lg"
                    >
                      Approve & Send
                    </Button>
                    <Button 
                      onClick={() => setAiDraftOpen(false)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard Mockup Container */}
            <div 
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-[#F8FAFC]"
              style={{ height: `${Math.max(250, 630 * scale)}px` }}
            >
              <div 
                className="absolute top-0 left-0 w-[960px] h-[630px] origin-top-left"
                style={{ transform: `scale(${scale})` }}
              >
                {/* Fake Web App Wrapper */}
                <div className="w-full h-full flex flex-col font-sans">
                  
                  {/* Header Dashboard section */}
                  <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div>
                      <h4 className="font-black text-slate-800 text-xl tracking-tight leading-none">Digital Attendance System</h4>
                      <p className="text-xs text-slate-500 mt-1">Mark attendance quickly and notify parents instantly</p>
                    </div>
                    
                    <div className="flex items-center gap-2 border-l border-slate-150 pl-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        JA
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xs font-black text-slate-800">John Anderson</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Super Admin</p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard body contents */}
                  <div className="p-5 space-y-4 flex-grow overflow-hidden flex flex-col justify-between">
                    
                    {/* Filters & selectors */}
                    <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col text-left">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Class</span>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mt-1">
                          <span>Class 10-A</span>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col text-left">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mt-1">
                          <span>17-08-2026</span>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex flex-col text-left relative">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Search Student</span>
                        <input 
                          type="text" 
                          placeholder="Name or roll number..." 
                          disabled 
                          className="text-xs font-semibold text-slate-700 mt-1 bg-transparent focus:outline-none placeholder:text-slate-450 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Stats summary row */}
                    <div className="grid grid-cols-5 gap-3 flex-shrink-0">
                      {[
                        { label: "Total Students", count: totalCount, icon: Users, color: "text-slate-500 bg-slate-50 border-slate-200" },
                        { label: "Present", count: presentCount, icon: CheckCircle, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                        { label: "Absent", count: absentCount, icon: XCircle, color: "text-rose-600 bg-rose-50 border-rose-100" },
                        { label: "Late", count: lateCount, icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-100" },
                        { label: "Attendance", count: `${attendanceRate}%`, icon: BarChart3, color: "text-indigo-650 bg-indigo-50 border-indigo-100" }
                      ].map(({ label, count, icon: Icon, color }) => (
                        <div key={label} className={cn("border p-2.5 rounded-xl flex items-center justify-between bg-white shadow-3xs", color)}>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
                            <span className="text-lg font-black text-slate-900 leading-none mt-1 block">{count}</span>
                          </div>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      ))}
                    </div>

                    {/* Main Layout Area */}
                    <div className="grid grid-cols-12 gap-4 flex-grow overflow-hidden items-stretch">
                      
                      {/* Left: Mark Attendance list */}
                      <div className="col-span-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-shrink-0">
                          <h6 className="font-bold text-slate-800 text-[12px] uppercase tracking-wider">Mark Attendance - Class 10-A</h6>
                          <div className="flex gap-2">
                            <button onClick={handleMarkAllPresent} className="bg-emerald-50 border border-emerald-250 border-emerald-200 text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-lg cursor-pointer">Mark All Present</button>
                            <button onClick={handleReset} className="bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[11px] px-2.5 py-1 rounded-lg cursor-pointer">Reset</button>
                          </div>
                        </div>

                        {/* Scrollable Student List area */}
                        <div className="flex-grow overflow-y-auto space-y-2.5 py-3 pr-1 text-[12px] max-h-[220px]">
                          {students.map((student) => (
                            <div 
                              key={student.id} 
                              className={cn(
                                "flex items-center justify-between p-2.5 rounded-xl border transition-all",
                                student.status === "Present" 
                                  ? "bg-emerald-50/30 border-emerald-100/50" 
                                  : student.status === "Late"
                                  ? "bg-amber-50/30 border-amber-100/50"
                                  : student.status === "Absent"
                                  ? "bg-rose-50/30 border-rose-100/50"
                                  : "bg-slate-50/50 border-slate-150 border-slate-200/50"
                              )}
                            >
                              
                              {/* Avatar and Info */}
                              <div className="flex items-center gap-2.5 text-left">
                                <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-xs shadow-3xs">
                                  {student.avatar}
                                </div>
                                <div className="leading-none">
                                  <p className="font-black text-slate-800">{student.name}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Roll No: {student.id}</p>
                                </div>
                              </div>

                              {/* Action Toggles */}
                              <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                                
                                {/* Present Checkbox */}
                                <button
                                  onClick={() => handleStatusChange(student.id, "Present")}
                                  className={cn(
                                    "p-1 rounded-md transition-all cursor-pointer",
                                    student.status === "Present" ? "bg-emerald-500 text-white shadow-3xs" : "text-slate-400 hover:text-slate-650"
                                  )}
                                  title="Mark Present"
                                >
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </button>

                                {/* Late Clock */}
                                <button
                                  onClick={() => handleStatusChange(student.id, "Late")}
                                  className={cn(
                                    "p-1 rounded-md transition-all cursor-pointer",
                                    student.status === "Late" ? "bg-amber-500 text-white shadow-3xs" : "text-slate-400 hover:text-slate-650"
                                  )}
                                  title="Mark Late"
                                >
                                  <Clock className="h-3.5 w-3.5" />
                                </button>

                                {/* Absent Cross */}
                                <button
                                  onClick={() => handleStatusChange(student.id, "Absent")}
                                  className={cn(
                                    "p-1 rounded-md transition-all cursor-pointer",
                                    student.status === "Absent" ? "bg-rose-500 text-white shadow-3xs" : "text-slate-400 hover:text-slate-650"
                                  )}
                                  title="Mark Absent"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                </button>
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Pie Chart, Submit, and AI Insights Card */}
                      <div className="col-span-5 flex flex-col justify-between gap-3 overflow-hidden">
                        
                        {/* Donut Chart / Today's Summary */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between shadow-2xs">
                          <div className="text-left">
                            <h6 className="font-bold text-slate-800 text-[12px] uppercase tracking-wider">Today&apos;s Summary</h6>
                          </div>
                          
                          <div className="flex justify-center items-center py-2 relative">
                            {/* SVG Donut chart representation */}
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 32 32">
                              <circle cx="16" cy="16" r="14" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                              
                              {/* Present slice - presentCount/12 (Green) */}
                              <circle 
                                cx="16" cy="16" r="14" fill="transparent" stroke="#10B981" strokeWidth="4" 
                                strokeDasharray={`${(presentCount / 12) * 88} 88`} 
                                strokeDashoffset="0" 
                              />

                              {/* Late slice - lateCount/12 (Amber) */}
                              <circle 
                                cx="16" cy="16" r="14" fill="transparent" stroke="#F59E0B" strokeWidth="4" 
                                strokeDasharray={`${(lateCount / 12) * 88} 88`} 
                                strokeDashoffset={`-${(presentCount / 12) * 88}`} 
                              />

                              {/* Absent slice - absentCount/12 (Red) */}
                              <circle 
                                cx="16" cy="16" r="14" fill="transparent" stroke="#EF4444" strokeWidth="4" 
                                strokeDasharray={`${(absentCount / 12) * 88} 88`} 
                                strokeDashoffset={`-${((presentCount + lateCount) / 12) * 88}`} 
                              />
                            </svg>
                          </div>

                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-sans font-bold text-slate-500 pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /><span>Present: {presentCount}</span></div>
                            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /><span>Absent: {absentCount}</span></div>
                            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /><span>Late: {lateCount}</span></div>
                            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300" /><span>Unmarked: {unmarkedCount}</span></div>
                          </div>
                        </div>

                        {/* ✨ AI Insights Card */}
                        <div className="bg-indigo-50/50 border border-indigo-150 border-indigo-100 rounded-2xl p-3 text-left shadow-2xs flex flex-col justify-between flex-grow">
                          <div className="flex items-center gap-1.5 border-b border-indigo-100 pb-1.5 flex-shrink-0">
                            <BrainCircuit className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
                            <span className="font-extrabold text-[11px] text-indigo-800 uppercase tracking-wider">AI Attendance Insights</span>
                          </div>
                          <div className="py-2 text-[11px] text-slate-700 leading-normal space-y-1.5 flex-grow">
                            <p>🚨 <strong>Tardiness Alert:</strong> Liam Johnson is late 3x this week. AI predicts an 85% chance of late attendance tomorrow.</p>
                          </div>
                          <button
                            onClick={() => setAiDraftOpen(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-75 bg-indigo-600 text-white font-bold text-[10px] py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs flex-shrink-0"
                          >
                            <MessageSquare className="h-2.5 w-2.5" />
                            Draft Parent Alert Email
                          </button>
                        </div>

                        {/* Actions panel */}
                        <div className="space-y-1.5 flex-shrink-0">
                          {unmarkedCount > 0 && (
                            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 border border-slate-200/60 p-2 rounded-xl text-[9px] font-bold text-left justify-center">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-500 animate-bounce-slow" />
                              <span>{unmarkedCount} student(s) unmarked today</span>
                            </div>
                          )}

                          <button 
                            onClick={handleNotifyParents}
                            disabled={isNotifying}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            {isNotifying ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Sending notifications...
                              </>
                            ) : (
                              <>
                                <Send className="h-3 w-3" />
                                Submit & Notify Parents
                              </>
                            )}
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
