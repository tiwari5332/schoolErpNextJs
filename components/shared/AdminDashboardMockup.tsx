"use client";

import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  DollarSign, 
  Search, 
  Bell, 
  Calendar,
  ChevronDown,
  FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminDashboardMockup() {
  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col font-sans text-left select-none">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h4 className="font-black text-slate-800 text-xl tracking-tight leading-none">Dashboard</h4>
          <p className="text-xs text-slate-500 mt-1">Welcome back, manage your institution efficiently with EduTrio</p>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              disabled 
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none w-40"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span>Academic Year 2024-25</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </div>

          <div className="relative h-9 w-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">3</span>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
              JA
            </div>
            <div className="text-left leading-none">
              <p className="text-xs font-black text-slate-800">John Anderson</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-grow overflow-hidden">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          
          {/* Total Students */}
          <div className="border border-slate-200 bg-white p-5 shadow-sm rounded-2xl flex flex-row justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Total Students</p>
              <h5 className="text-3xl font-black text-slate-900 leading-none mt-1">9</h5>
              <p className="text-xs text-emerald-655 text-emerald-600 font-semibold flex items-center gap-1 pt-0.5">
                <span>↗ +2.4%</span>
                <span className="text-slate-455 text-slate-450 font-normal">from last month</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>

          {/* Total Teachers */}
          <div className="border border-slate-200 bg-white p-5 shadow-sm rounded-2xl flex flex-row justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Total Teachers</p>
              <h5 className="text-3xl font-black text-slate-900 leading-none mt-1">5</h5>
              <p className="text-xs text-emerald-655 text-emerald-600 font-semibold flex items-center gap-1 pt-0.5">
                <span>↗ +4.2%</span>
                <span className="text-slate-455 text-slate-450 font-normal">from last month</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
          </div>

          {/* Admin Users */}
          <div className="border border-slate-200 bg-white p-5 shadow-sm rounded-2xl flex flex-row justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Admin Users</p>
              <h5 className="text-3xl font-black text-slate-900 leading-none mt-1">5</h5>
              <p className="text-xs text-slate-450 font-semibold pt-1">Active administrators</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="border border-slate-200 bg-white p-5 shadow-sm rounded-2xl flex flex-row justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">Monthly Revenue</p>
              <h5 className="text-3xl font-black text-slate-900 leading-none mt-1">₹1,45,000</h5>
              <p className="text-xs text-emerald-655 text-emerald-600 font-semibold flex items-center gap-1 pt-0.5">
                <span>↗ +8.1%</span>
                <span className="text-slate-455 text-slate-450 font-normal">from last month</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-5 items-stretch">
          
          {/* Enrollment Trend Bar Chart */}
          <div className="col-span-8 border border-slate-200 bg-white p-5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start pb-4">
              <div>
                <h6 className="font-bold text-slate-800 text-sm">Student Enrollment Trend</h6>
                <p className="text-xs text-slate-400 mt-0.5">Monthly enrollment over the past 6 months</p>
              </div>
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs px-2.5 py-1 rounded-full">+2.4% growth</span>
            </div>

            {/* Custom high-fidelity CSS Bar Chart */}
            <div className="relative pt-6 flex-grow flex items-end justify-between min-h-[220px] pb-6 px-4">
              
              {/* Horizontal grid guide lines */}
              <div className="absolute inset-x-0 bottom-6 border-b border-slate-100" />
              <div className="absolute inset-x-0 bottom-[75px] border-b border-slate-100" />
              <div className="absolute inset-x-0 bottom-[125px] border-b border-slate-100" />
              <div className="absolute inset-x-0 bottom-[175px] border-b border-slate-100" />
              <div className="absolute inset-x-0 bottom-[225px] border-b border-slate-100" />
              
              {/* Y Axis Guide numbers */}
              <div className="absolute left-0 -top-1 text-slate-400 text-2xs flex flex-col justify-between h-[225px] select-none text-right font-bold w-6 pr-2">
                <span>600</span>
                <span>450</span>
                <span>300</span>
                <span>150</span>
                <span>0</span>
              </div>

              {/* Tooltip Hover Mockup on Jun */}
              <div className="absolute right-[11%] bottom-[150px] bg-white border border-slate-200 shadow-xl rounded-xl p-2.5 z-10 text-xs font-sans font-bold ring-1 ring-black/5 animate-fade-in">
                <p className="text-slate-850 border-b border-slate-100 pb-1 text-slate-500">Jun</p>
                <p className="text-indigo-600 pt-1">students : 492</p>
              </div>

              {/* Month Columns container */}
              <div className="flex-grow flex justify-around items-end h-[220px] ml-8 z-2">
                {[
                  { month: "Jan", val: "h-[145px]" },
                  { month: "Feb", val: "h-[146px]" },
                  { month: "Mar", val: "h-[147px]" },
                  { month: "Apr", val: "h-[148px]" },
                  { month: "May", val: "h-[149px]" },
                  { month: "Jun", val: "h-[160px]", active: true }
                ].map(({ month, val, active }) => (
                  <div key={month} className="flex flex-col items-center gap-3 group w-[10%]">
                    <div 
                      className={cn(
                        "w-full rounded-t-md transition-all duration-300 relative shadow-sm", 
                        val,
                        active ? "bg-indigo-600" : "bg-indigo-500/80 hover:bg-indigo-500"
                      )} 
                    />
                    <span className="text-slate-500 text-xs font-bold">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Students by Grade Pie Chart */}
          <div className="col-span-4 border border-slate-200 bg-white p-5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="pb-2">
              <h6 className="font-bold text-slate-800 text-sm">Students by Grade</h6>
              <p className="text-xs text-slate-400 mt-0.5">Current distribution</p>
            </div>

            {/* Custom Pie Chart SVG */}
            <div className="flex justify-center items-center py-4 flex-grow">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
                {/* Total perimeter is ~100. Let's draw slices using stroke-dasharray */}
                {/* Gray placeholder bg */}
                <circle cx="16" cy="16" r="14" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                
                {/* Slice Grade 9 (Green) - Value 75 (approx 50% = stroke 44 offset 0) */}
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  fill="transparent" 
                  stroke="#10B981" 
                  strokeWidth="4" 
                  strokeDasharray="44 88" 
                  strokeDashoffset="0" 
                />

                {/* Slice Grade 8 (Orange) - Value 65 (approx 43% = stroke 38 offset -44) */}
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  fill="transparent" 
                  stroke="#F59E0B" 
                  strokeWidth="4" 
                  strokeDasharray="38 88" 
                  strokeDashoffset="-44" 
                />

                {/* Slices for Grade 10 / Grade 5 / Grade 4 (Blue/Red/Purple) - (approx 7% = stroke 6 offset -82) */}
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  fill="transparent" 
                  stroke="#3B82F6" 
                  strokeWidth="4" 
                  strokeDasharray="6 88" 
                  strokeDashoffset="-82" 
                />
              </svg>
            </div>

            {/* Grade List Legend */}
            <div className="space-y-1.5 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-650">
              {[
                { grade: "Grade 10", count: 6, color: "bg-blue-500" },
                { grade: "Grade 9", count: 75, color: "bg-emerald-500" },
                { grade: "Grade 8", count: 65, color: "bg-amber-500" },
                { grade: "Grade 7", count: 22, color: "bg-orange-400" },
                { grade: "Grade 6", count: 18, color: "bg-indigo-400" },
                { grade: "Grade 5", count: 1, color: "bg-rose-500" },
                { grade: "Grade 4", count: 1, color: "bg-purple-500" },
                { grade: "Grade 3", count: 1, color: "bg-teal-500" },
                { grade: "Grade 2", count: 1, color: "bg-orange-500" },
                { grade: "Grade 1", count: 1, color: "bg-cyan-500" }
              ].map(({ grade, count, color }) => (
                <div key={grade} className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
                    <span>{grade}</span>
                  </div>
                  <span className="text-slate-800 font-extrabold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
