"use client";

import { useState, useRef, useEffect } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Search, 
  Bell, 
  Phone, 
  FileText, 
  ChevronDown, 
  Sparkles, 
  Send,
  X,
  PhoneCall
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock student fee data matching the user's screenshot
const INITIAL_FEE_RECORDS = [
  { 
    id: "STU001", 
    name: "Aarav Patel", 
    class: "SEC10A", 
    total: 5000, 
    discount: null,
    lateFee: 0, 
    paid: 5000, 
    balance: 0, 
    dueDate: "3/1/2024", 
    status: "Paid", 
    phone: "+91 98765 00001",
    avatarColor: "bg-amber-600"
  },
  { 
    id: "STU002", 
    name: "Diya Sharma", 
    class: "SEC10A", 
    total: 4300, 
    discount: 200,
    lateFee: 100, 
    paid: 2000, 
    balance: 2300, 
    dueDate: "4/15/2024", 
    status: "Pending", 
    phone: "+91 98765 00002",
    avatarColor: "bg-indigo-650 bg-indigo-600"
  },
  { 
    id: "STU003", 
    name: "Vihaan Kumar", 
    class: "SEC9A", 
    total: 4200, 
    discount: null,
    lateFee: 200, 
    paid: 0, 
    balance: 4200, 
    dueDate: "2/15/2024", 
    status: "Overdue", 
    phone: "+91 98765 00003",
    avatarColor: "bg-emerald-600"
  },
  { 
    id: "STU004", 
    name: "Ananya Singh", 
    class: "SEC9A", 
    total: 4500, 
    discount: 500,
    lateFee: 0, 
    paid: 4500, 
    balance: 0, 
    dueDate: "3/1/2024", 
    status: "Paid", 
    phone: "+91 98765 00004",
    avatarColor: "bg-purple-600"
  },
  { 
    id: "STU005", 
    name: "Arjun Gupta", 
    class: "SEC8B", 
    total: 6000, 
    discount: null,
    lateFee: 100, 
    paid: 3000, 
    balance: 3000, 
    dueDate: "5/10/2024", 
    status: "Pending", 
    phone: "+91 98765 00005",
    avatarColor: "bg-blue-650 bg-blue-600"
  }
];

export function FeeManagementSection() {
  const [records, setRecords] = useState(INITIAL_FEE_RECORDS);
  const [filterType, setFilterType] = useState<"All" | "Outstanding">("All");
  
  // Interactive Simulation states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [callingStudent, setCallingStudent] = useState<typeof INITIAL_FEE_RECORDS[0] | null>(null);
  const [bulkAlertSent, setBulkAlertSent] = useState(false);

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
      setScale(parentWidth / 960);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleSendReminder = (studentName: string, phone: string) => {
    setToastMessage(`🔔 Pre-due alert dispatched successfully to ${studentName}'s parents via SMS and WhatsApp!`);
  };

  const handleSendBulkReminders = () => {
    setBulkAlertSent(true);
    setToastMessage(`🚀 Bulk broadcast sent! Reminders successfully sent to all 3 parents with outstanding dues.`);
  };

  const triggerCallSimulation = (student: typeof INITIAL_FEE_RECORDS[0]) => {
    setCallingStudent(student);
  };

  // Filter records
  const displayedRecords = filterType === "All" 
    ? records 
    : records.filter(r => r.balance > 0);

  return (
    <section id="fees" className="py-20 px-6 bg-white border-b border-slate-200/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Product Value & Copy */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 font-semibold">
              <CreditCard className="h-3.5 w-3.5 mr-1.5" />
              Automated Fee Management
            </Badge>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Collect Fees 3x Faster with Smart Recovery
              </h2>
              <p className="text-slate-650 text-slate-650 leading-relaxed">
                Manually tracking payments, calculate late fees, and calling parents is exhausting. EduTrio digitizes the entire fee ledger, automates due reminders, and connects you to parents directly.
              </p>
            </div>

            {/* Core Features bullets */}
            <div className="space-y-4 font-sans">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Automated Pre-Due Alerts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sends automated notifications to parents 3 days before payment due dates, avoiding penalty friction.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">1-Click Bulk Reminder Broadcasts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Send bulk reminders to all parents with unpaid accounts instantly via SMS, WhatsApp, and parent app push alerts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Direct In-App Dialing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Access a filtered list of outstanding balances and initiate calls to parents directly from the interface.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Late Fees & Discount Logic</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Auto-calculate discounts (scholarships, siblings) and add late penalties accurately based on due date grace periods.</p>
                </div>
              </div>
            </div>

            {/* Interactive hint callout */}
            <div className="bg-emerald-50/50 border border-emerald-150 border-emerald-200/50 rounded-xl p-4 flex gap-3 text-xs text-slate-650 leading-relaxed font-sans shadow-2xs">
              <span className="text-base">💡</span>
              <p>
                <strong>Interactive Demo:</strong> Try clicking the <strong>&quot;Outstanding Dues&quot;</strong> tab or the <strong>Bell/Phone</strong> action icons in the simulated dashboard mockup to see fee workflows in action!
              </p>
            </div>
          </div>

          {/* Right: Simulated Fee Screen Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-center relative w-full select-none" ref={containerRef}>
            
            {/* Simulation Notification Toast */}
            {toastMessage && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-55 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 max-w-sm w-11/12 animate-fade-in">
                <Send className="h-4 w-4 text-emerald-450 text-emerald-400 flex-shrink-0" />
                <span className="flex-grow text-left leading-normal">{toastMessage}</span>
              </div>
            )}

            {/* Calling Modal simulation overlay */}
            {callingStudent && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-2xl z-50 flex items-center justify-center p-6 animate-fade-in">
                <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl relative">
                  <button 
                    onClick={() => setCallingStudent(null)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center text-white animate-pulse">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-100">Direct Dialer Active</h5>
                    <p className="text-3xs text-slate-400 mt-1 uppercase tracking-wider font-bold">Calling Parent of {callingStudent.name}</p>
                    <p className="text-lg font-black text-slate-100 mt-2">{callingStudent.phone}</p>
                  </div>
                  <div className="bg-slate-850 p-2.5 rounded-lg text-3xs text-slate-400 text-left border border-slate-800">
                    📞 <strong className="text-slate-300">EduTrio VoIP Dialing:</strong> Connecting super admin John Anderson to parent. Call will be logged in ledger automatically.
                  </div>
                  <Button 
                    onClick={() => setCallingStudent(null)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs py-2 rounded-lg"
                  >
                    Hang Up
                  </Button>
                </div>
              </div>
            )}

            {/* Dashboard Mockup wrapper */}
            <div 
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-[#F8FAFC]"
              style={{ height: `${630 * scale}px` }}
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
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-slate-800 text-xl tracking-tight leading-none">Dashboard</h4>
                        <span className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1 text-slate-400 leading-none py-0.5">Fees Admin</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Manage student fee payments and track dues</p>
                    </div>
                    
                    <div className="flex items-center gap-2 border-l border-slate-150 pl-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-650 bg-indigo-650 bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        JA
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xs font-black text-slate-800">John Anderson</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Super Admin</p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard body contents */}
                  <div className="p-5 space-y-4 flex-grow overflow-hidden flex flex-col justify-between">
                    
                    {/* Status Stats Cards Row */}
                    <div className="grid grid-cols-4 gap-3.5">
                      
                      {/* Total Collected */}
                      <div className="border border-slate-200/80 bg-white p-3.5 shadow-xs rounded-2xl flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-3xs text-emerald-600 font-bold uppercase tracking-wider">Total Collected</p>
                          <h5 className="text-2xl font-black text-slate-900 leading-none">₹14,500</h5>
                        </div>
                        <div className="h-8.5 w-8.5 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      {/* Pending Dues */}
                      <div className="border border-slate-200/80 bg-white p-3.5 shadow-xs rounded-2xl flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-3xs text-amber-600 font-bold uppercase tracking-wider">Pending Dues</p>
                          <h5 className="text-2xl font-black text-slate-900 leading-none">₹9,500</h5>
                        </div>
                        <div className="h-8.5 w-8.5 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center animate-pulse">
                          <Clock className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      {/* Overdue Accounts */}
                      <div className="border border-slate-200/80 bg-white p-3.5 shadow-xs rounded-2xl flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-3xs text-rose-600 font-bold uppercase tracking-wider">Overdue Accounts</p>
                          <h5 className="text-2xl font-black text-slate-900 leading-none">1</h5>
                        </div>
                        <div className="h-8.5 w-8.5 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                          <AlertCircle className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      {/* Fully Paid */}
                      <div className="border border-slate-200/80 bg-white p-3.5 shadow-xs rounded-2xl flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-3xs text-indigo-650 text-indigo-600 font-bold uppercase tracking-wider">Fully Paid</p>
                          <h5 className="text-2xl font-black text-slate-900 leading-none">2</h5>
                        </div>
                        <div className="h-8.5 w-8.5 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <span className="font-extrabold text-sm leading-none">₹</span>
                        </div>
                      </div>

                    </div>

                    {/* Search and Filters Bar with tab toggle */}
                    <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-row items-center justify-between gap-3 shadow-2xs">
                      
                      <div className="flex items-center gap-3 flex-grow">
                        {/* Search Input bar */}
                        <div className="relative flex-grow max-w-xs">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Search by name or ID..." 
                            disabled 
                            className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] w-full focus:outline-none"
                          />
                        </div>

                        {/* Dropdowns */}
                        <div className="flex gap-2 text-[10px] text-slate-500 font-semibold">
                          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
                            <span>All Statuses</span>
                            <ChevronDown className="h-2.5 w-2.5" />
                          </div>
                          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
                            <span>All Classes</span>
                            <ChevronDown className="h-2.5 w-2.5" />
                          </div>
                        </div>
                      </div>

                      {/* Outstanding Dues filter switch tab & Bulk action */}
                      <div className="flex items-center gap-2">
                        
                        {/* Tab toggle */}
                        <div className="flex border border-slate-200 rounded-lg p-0.5 bg-slate-50 text-[10px] font-bold">
                          <button
                            onClick={() => setFilterType("All")}
                            className={cn(
                              "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                              filterType === "All" ? "bg-white text-indigo-600 shadow-3xs" : "text-slate-500"
                            )}
                          >
                            All Records (5)
                          </button>
                          <button
                            onClick={() => setFilterType("Outstanding")}
                            className={cn(
                              "px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1",
                              filterType === "Outstanding" ? "bg-white text-indigo-600 shadow-3xs" : "text-slate-500"
                            )}
                          >
                            Outstanding Dues (3)
                            <span className="bg-amber-100 text-amber-800 text-[8px] px-1 rounded-full font-black">3</span>
                          </button>
                        </div>

                        {/* Bulk Dispatch Button */}
                        {filterType === "Outstanding" && (
                          <button 
                            onClick={handleSendBulkReminders}
                            disabled={bulkAlertSent}
                            className={cn(
                              "text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer",
                              bulkAlertSent 
                                ? "bg-slate-100 text-slate-400 border border-slate-200" 
                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                            )}
                          >
                            <Send className="h-2.5 w-2.5" />
                            Send Reminders to All
                          </button>
                        )}

                      </div>

                    </div>

                    {/* Ledger Records Table Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex-grow flex flex-col justify-between shadow-2xs">
                      
                      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                        <div>
                          <h6 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Fee Records ({displayedRecords.length})</h6>
                          <p className="text-[10px] text-slate-400 mt-0.5">Overview of student fee payments and dues</p>
                        </div>
                      </div>

                      {/* Table grid area */}
                      <div className="flex-grow overflow-hidden text-[11px]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-100">
                              <th className="py-2.5 px-4">Student Info</th>
                              <th className="py-2.5 px-3">Class</th>
                              <th className="py-2.5 px-3">Total Amount</th>
                              <th className="py-2.5 px-3">Late Fee</th>
                              <th className="py-2.5 px-3">Paid</th>
                              <th className="py-2.5 px-3">Balance</th>
                              <th className="py-2.5 px-3">Due Date</th>
                              <th className="py-2.5 px-3">Status</th>
                              <th className="py-2.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans font-medium">
                            {displayedRecords.map((record) => (
                              <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                                
                                {/* Info cell */}
                                <td className="py-3 px-4 flex items-center gap-2.5">
                                  <input type="checkbox" disabled className="rounded border-slate-300" />
                                  <div className={cn("h-6.5 w-6.5 rounded-full text-white font-extrabold flex items-center justify-center text-[9px] shadow-3xs", record.avatarColor)}>
                                    {record.name.split(" ").map(n => n[0]).join("")}
                                  </div>
                                  <div className="leading-none text-left">
                                    <p className="font-black text-slate-800 text-[11px]">{record.name}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">{record.id}</p>
                                  </div>
                                </td>

                                {/* Class */}
                                <td className="py-3 px-3">
                                  <span className="bg-slate-100 border border-slate-200 text-slate-650 px-1.5 py-0.5 rounded-md text-[9px] font-bold">
                                    {record.class}
                                  </span>
                                </td>

                                {/* Total Amount */}
                                <td className="py-3 px-3">
                                  <p className="font-black text-slate-800">₹{record.total}</p>
                                  {record.discount && (
                                    <p className="text-[9px] text-emerald-600 font-semibold mt-0.5">-₹{record.discount} discount</p>
                                  )}
                                </td>

                                {/* Late Fee */}
                                <td className="py-3 px-3 text-slate-500">
                                  {record.lateFee > 0 ? (
                                    <span className="text-rose-600 font-bold">+₹{record.lateFee}</span>
                                  ) : (
                                    "-"
                                  )}
                                </td>

                                {/* Paid */}
                                <td className="py-3 px-3 text-emerald-600 font-extrabold">₹{record.paid}</td>
                                
                                {/* Balance */}
                                <td className="py-3 px-3">
                                  <span className={cn(
                                    "font-black",
                                    record.balance > 0 ? "text-rose-600" : "text-slate-500"
                                  )}>
                                    ₹{record.balance}
                                  </span>
                                </td>

                                {/* Due Date */}
                                <td className="py-3 px-3 text-slate-500 font-bold">{record.dueDate}</td>

                                {/* Status */}
                                <td className="py-3 px-3">
                                  <span className={cn(
                                    "text-[9px] font-black px-2 py-0.5 rounded-full border",
                                    record.status === "Paid" 
                                      ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                                      : record.status === "Pending"
                                      ? "bg-amber-50 border-amber-100 text-amber-700"
                                      : "bg-rose-50 border-rose-100 text-rose-700"
                                  )}>
                                    {record.status}
                                  </span>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-4 text-right">
                                  <div className="flex justify-end gap-1.5">
                                    
                                    {/* Bell Alert Trigger */}
                                    <button 
                                      onClick={() => handleSendReminder(record.name, record.phone)}
                                      disabled={record.status === "Paid"}
                                      title={record.status === "Paid" ? "Dues cleared" : "Send alert reminder"}
                                      className={cn(
                                        "h-6 w-6 rounded-md flex items-center justify-center transition-all border",
                                        record.status === "Paid"
                                          ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                                          : "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-100/50 cursor-pointer shadow-3xs"
                                      )}
                                    >
                                      <Bell className="h-3 w-3" />
                                    </button>

                                    {/* Call Trigger button */}
                                    <button 
                                      onClick={() => triggerCallSimulation(record)}
                                      disabled={record.status === "Paid"}
                                      title={record.status === "Paid" ? "No balance" : "Call Parent"}
                                      className={cn(
                                        "h-6 w-6 rounded-md flex items-center justify-center transition-all border",
                                        record.status === "Paid"
                                          ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                                          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100/50 cursor-pointer shadow-3xs"
                                      )}
                                    >
                                      <Phone className="h-3 w-3" />
                                    </button>

                                    {/* Receipt Download button */}
                                    <button 
                                      onClick={() => setToastMessage(`📄 Receipt downloaded for record ${record.id} (${record.name})`)}
                                      title="Download fee receipt"
                                      className="h-6 w-6 rounded-md flex items-center justify-center transition-all bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-100/50 cursor-pointer shadow-3xs"
                                    >
                                      <FileText className="h-3 w-3" />
                                    </button>
                                  </div>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Footer Pagination simulation */}
                      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 flex-shrink-0">
                        <span>Showing {displayedRecords.length} of {displayedRecords.length} records</span>
                        <div className="flex gap-1.5">
                          <button disabled className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed">Prev</button>
                          <button disabled className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed">Next</button>
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
