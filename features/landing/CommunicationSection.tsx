"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Radio,
  Megaphone, 
  Calendar, 
  Bell, 
  Plus, 
  Search, 
  Eye, 
  X, 
  Check, 
  CheckCircle2, 
  Send, 
  Clock, 
  Users, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Video, 
  MapPin, 
  Sparkles, 
  ChevronDown,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Initial Mock Broadcast Data matching user screenshot
const INITIAL_BROADCASTS = [
  {
    id: "BC-101",
    title: "Annual Sports Day Postponed",
    body: "Due to unforeseen maintenance on the main field, the Annual Sports Day has been postponed to next Friday.",
    target: "All",
    channels: ["Email", "App Push"],
    date: "3/10/2024, 2:30:00 PM",
    displayDate: "3/10/2024",
    status: "Sent",
    stats: { delivered: "99.4%", opened: "88.2%", totalRecipients: 1420 }
  },
  {
    id: "BC-102",
    title: "URGENT: School Closure Due to Snow",
    body: "Dear Parents/Guardians, due to severe weather conditions, the school will remain closed tomorrow. Please stay safe.",
    target: "Parents",
    channels: ["SMS", "Email", "App Push"],
    date: "1/16/2024, 12:00:00 AM",
    displayDate: "1/16/2024",
    status: "Sent",
    stats: { delivered: "100%", opened: "96.5%", totalRecipients: 890 }
  }
];

// Initial Mock Events Data matching user screenshot
const INITIAL_EVENTS = [
  {
    id: "EV-01",
    title: "Grade 10 Parent-Teacher Meeting",
    month: "APR",
    day: "20",
    time: "14:00 - 17:00",
    target: "Parents",
    category: "PTM",
    location: "Main Auditorium",
    isVirtual: false
  },
  {
    id: "EV-02",
    title: "Monthly Staff Alignment",
    month: "APR",
    day: "18",
    time: "15:30 - 16:30",
    target: "Teachers",
    category: "Staff Meeting",
    link: "https://meet.google.com/abc-defg-hij",
    isVirtual: true
  }
];

// Templates for Broadcast Composer
const BROADCAST_TEMPLATES = [
  {
    name: "Emergency School Closure",
    title: "URGENT: Emergency School Closure",
    target: "Parents",
    channels: ["SMS", "Email", "App Push"],
    body: "Dear Parents/Guardians, please be advised that the school will remain closed today due to extreme weather conditions. Online classes will resume shortly."
  },
  {
    name: "Parent-Teacher Meeting Notice",
    title: "Upcoming Parent-Teacher Meeting (PTM)",
    target: "Parents",
    channels: ["Email", "App Push"],
    body: "Dear Parents, we invite you to attend the upcoming Term 2 Parent-Teacher Meeting to discuss your ward's academic progress and performance."
  },
  {
    name: "Sports Day Announcement",
    title: "Annual School Sports Day Invitation",
    target: "All",
    channels: ["Email", "App Push"],
    body: "We are excited to announce our Annual Sports Day! Students and parents are warmly invited to participate and cheer for our young athletes."
  },
  {
    name: "Fee Payment Reminder",
    title: "Notice: Quarterly Fee Payment Due",
    target: "Parents",
    channels: ["SMS", "Email"],
    body: "This is a friendly reminder that the quarterly tuition fee payment is due next Monday. Kindly complete the payment via the EduTrio Parent App."
  }
];

export function CommunicationSection() {
  const [broadcasts, setBroadcasts] = useState(INITIAL_BROADCASTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudienceFilter, setSelectedAudienceFilter] = useState("All Audiences");
  const [selectedChannelFilter, setSelectedChannelFilter] = useState("All Channels");

  // Modals state
  const [isNewBroadcastOpen, setIsNewBroadcastOpen] = useState(false);
  const [isScheduleEventOpen, setIsScheduleEventOpen] = useState(false);
  const [selectedBroadcastDetails, setSelectedBroadcastDetails] = useState<typeof INITIAL_BROADCASTS[0] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Broadcast Form state
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("Select Audience");
  const [selectedChannels, setSelectedChannels] = useState<{ [key: string]: boolean }>({
    Email: true,
    SMS: false,
    Push: true
  });

  // New Event Form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("PTM");
  const [eventTarget, setEventTarget] = useState("Parents");
  const [eventDate, setEventDate] = useState("2026-04-25");
  const [eventTime, setEventTime] = useState("10:00 - 12:00");
  const [eventLocation, setEventLocation] = useState("School Auditorium");

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

  // Auto-clear toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Load Template into form
  const handleSelectTemplate = (templateName: string) => {
    const tmpl = BROADCAST_TEMPLATES.find(t => t.name === templateName);
    if (tmpl) {
      setBroadcastTitle(tmpl.title);
      setBroadcastBody(tmpl.body);
      setBroadcastTarget(tmpl.target);
      setSelectedChannels({
        Email: tmpl.channels.includes("Email"),
        SMS: tmpl.channels.includes("SMS"),
        Push: tmpl.channels.includes("App Push") || tmpl.channels.includes("Push")
      });
    }
  };

  // Submit New Broadcast
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody || broadcastTarget === "Select Audience") {
      setToastMessage("⚠️ Please complete required fields (Target Audience, Title, and Message Body)");
      return;
    }

    const activeChannels: string[] = [];
    if (selectedChannels.Email) activeChannels.push("Email");
    if (selectedChannels.SMS) activeChannels.push("SMS");
    if (selectedChannels.Push) activeChannels.push("App Push");

    if (activeChannels.length === 0) {
      setToastMessage("⚠️ Please select at least one delivery channel (Email, SMS, or App Push)");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`;

    const newBroadcast = {
      id: `BC-${Math.floor(100 + Math.random() * 900)}`,
      title: broadcastTitle,
      body: broadcastBody,
      target: broadcastTarget,
      channels: activeChannels,
      date: formattedDate,
      displayDate: now.toLocaleDateString(),
      status: "Sent",
      stats: { delivered: "100%", opened: "92.1%", totalRecipients: 650 }
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setIsNewBroadcastOpen(false);
    setBroadcastTitle("");
    setBroadcastBody("");
    setBroadcastTarget("Select Audience");
    setToastMessage(`🚀 Broadcast "${newBroadcast.title}" dispatched via ${activeChannels.join(", ")}!`);
  };

  // Submit New Event
  const handleScheduleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;

    const dateObj = new Date(eventDate);
    const monthStr = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const dayStr = dateObj.getDate().toString();

    const newEv = {
      id: `EV-0${events.length + 1}`,
      title: eventTitle,
      month: monthStr,
      day: dayStr,
      time: eventTime,
      target: eventTarget,
      category: eventCategory,
      location: eventLocation,
      isVirtual: eventLocation.includes("http") || eventLocation.includes("meet")
    };

    setEvents([newEv, ...events]);
    setIsScheduleEventOpen(false);
    setEventTitle("");
    setToastMessage(`🗓️ Event "${newEv.title}" scheduled for ${monthStr} ${dayStr}!`);
  };

  // Filtered Broadcasts
  const filteredBroadcasts = broadcasts.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = selectedAudienceFilter === "All Audiences" || b.target.toLowerCase() === selectedAudienceFilter.toLowerCase() || (selectedAudienceFilter === "All" && b.target === "All");
    const matchesChannel = selectedChannelFilter === "All Channels" || b.channels.some(c => c.toLowerCase().includes(selectedChannelFilter.toLowerCase()));
    return matchesSearch && matchesAudience && matchesChannel;
  });

  return (
    <section id="communication" className="py-10 sm:py-16 md:py-24 px-3 sm:px-6 bg-slate-50/60 border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Column: Copywriting & Feature Selling (Left side on desktop) */}
          <div className="lg:col-span-5 lg:order-1 space-y-6 sm:space-y-8 text-left">
            <Badge className="bg-indigo-100/80 text-indigo-700 border-indigo-200 px-3 sm:px-4 py-1.5 sm:py-2 font-bold shadow-xs text-xs">
              <Radio className="h-3.5 w-3.5 mr-1.5 animate-pulse text-indigo-600" />
              Communication Hub & Multi-Channel Broadcasts
            </Badge>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Reach Every Parent & Staff Member in Seconds
              </h2>
              <p className="text-slate-600 leading-relaxed font-normal text-xs sm:text-sm">
                Eliminate printed circulars and WhatsApp group chaos. EduTrio’s centralized Communication Hub lets you dispatch emergency alerts, event invitations, and official announcements across Email, SMS, and Mobile App Push instantly.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-4 font-sans">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">3-in-1 Omni-Channel Broadcasts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Send broadcasts via Email, SMS Text, and Mobile App Push notifications with a single click.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Targeted Audience Filtering</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Segment announcements to Parents, Teachers, Students, or specific grade levels effortlessly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Interactive Event Scheduling</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Schedule Parent-Teacher Meetings (PTM), staff alignments, and school holidays with automated calendar reminders.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Pre-Built Quick Templates</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Draft urgent school closure, exam schedule, or fee alert broadcasts in under 10 seconds with smart templates.</p>
                </div>
              </div>
            </div>

            {/* Interactive hint callout */}
            <div className="bg-indigo-50/70 border border-indigo-200/60 rounded-xl p-3 sm:p-4 flex gap-3 text-xs text-slate-700 leading-relaxed font-sans shadow-2xs">
              <span className="text-base">💡</span>
              <p>
                <strong>Try the Live Demo:</strong> Click the <strong>&quot;+ New Broadcast&quot;</strong> or <strong>&quot;+ Schedule Event&quot;</strong> buttons in the simulated dashboard mockup to compose and send real-time alerts!
              </p>
            </div>
          </div>

          {/* Right Column: Simulated Dashboard Mockup matching User Screenshots (Right side on desktop) */}
          <div className="lg:col-span-7 lg:order-2 flex flex-col justify-center relative w-full select-none" ref={containerRef}>
            
            {/* Notification Toast */}
            {toastMessage && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-55 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 max-w-md w-11/12 animate-fade-in">
                <Sparkles className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span className="flex-grow text-left leading-normal">{toastMessage}</span>
              </div>
            )}

            {/* Modal 1: New Broadcast Modal (Fixed Viewport) */}
            {isNewBroadcastOpen && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-left font-sans my-auto">
                  
                  {/* Modal Header */}
                  <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-100 flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                        <Megaphone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">New Broadcast</h3>
                        <p className="text-xs text-slate-500">Send an announcement to students, parents, or teachers.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsNewBroadcastOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Modal Form */}
                  <form onSubmit={handleSendBroadcast} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Quick Template Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Quick Template (Optional)</label>
                        <select 
                          onChange={(e) => handleSelectTemplate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                        >
                          <option value="">Load a template...</option>
                          {BROADCAST_TEMPLATES.map(t => (
                            <option key={t.name} value={t.name}>{t.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Target Audience Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Target Audience *</label>
                        <select 
                          value={broadcastTarget}
                          onChange={(e) => setBroadcastTarget(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="Select Audience">Select Audience</option>
                          <option value="All">All (Students, Parents, Staff)</option>
                          <option value="Parents">Parents Only</option>
                          <option value="Teachers">Teachers & Staff</option>
                          <option value="Students">Students Only</option>
                        </select>
                      </div>
                    </div>

                    {/* Delivery Channels Multi-select */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Delivery Channels *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { key: "Email", label: "Email", icon: Mail },
                          { key: "SMS", label: "SMS Text", icon: MessageSquare },
                          { key: "Push", label: "App Push", icon: Smartphone }
                        ].map(({ key, label, icon: Icon }) => {
                          const isChecked = selectedChannels[key];
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setSelectedChannels(prev => ({ ...prev, [key]: !prev[key] }))}
                              className={cn(
                                "flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                                isChecked 
                                  ? "bg-indigo-50/60 border-indigo-600 text-indigo-900 shadow-2xs" 
                                  : "bg-slate-50 border-slate-200 text-slate-600"
                              )}
                            >
                              <div className={cn("w-4 h-4 rounded flex items-center justify-center border", isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white")}>
                                {isChecked && <Check className="h-3 w-3" />}
                              </div>
                              <Icon className="h-3.5 w-3.5 text-indigo-600" />
                              <span>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subject / Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Subject / Title *</label>
                      <input 
                        type="text"
                        value={broadcastTitle}
                        onChange={(e) => setBroadcastTitle(e.target.value)}
                        placeholder="e.g. Important Announcement"
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700">Message Body *</label>
                        <span className="text-[10px] text-slate-400 font-semibold">{broadcastBody.length} characters</span>
                      </div>
                      <textarea 
                        rows={3}
                        value={broadcastBody}
                        onChange={(e) => setBroadcastBody(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setIsNewBroadcastOpen(false)}
                        className="text-xs font-semibold py-2 px-4 border-slate-200 text-slate-600"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-5 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <Megaphone className="h-3.5 w-3.5" />
                        Send Broadcast
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 2: Schedule Event Modal (Fixed Viewport) */}
            {isScheduleEventOpen && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-left font-sans my-auto">
                  <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      <h3 className="text-base font-bold text-slate-900">Schedule School Event</h3>
                    </div>
                    <button onClick={() => setIsScheduleEventOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <form onSubmit={handleScheduleEvent} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Event Title *</label>
                      <input 
                        type="text" 
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="e.g. Science Fair Exhibition"
                        className="w-full border border-slate-200 rounded-xl p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Category</label>
                        <select 
                          value={eventCategory}
                          onChange={(e) => setEventCategory(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-2 text-xs cursor-pointer"
                        >
                          <option value="PTM">PTM</option>
                          <option value="Staff Meeting">Staff Meeting</option>
                          <option value="Sports">Sports Event</option>
                          <option value="Exhibition">Exhibition</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Target</label>
                        <select 
                          value={eventTarget}
                          onChange={(e) => setEventTarget(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-2 text-xs cursor-pointer"
                        >
                          <option value="Parents">Parents</option>
                          <option value="Teachers">Teachers</option>
                          <option value="Students">Students</option>
                          <option value="All">All</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Date</label>
                        <input 
                          type="date" 
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-2 text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Time</label>
                        <input 
                          type="text" 
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Location / Google Meet Link</label>
                      <input 
                        type="text" 
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2 text-xs"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsScheduleEventOpen(false)} className="text-xs">Cancel</Button>
                      <Button type="submit" className="bg-indigo-600 text-white text-xs font-bold px-4">Schedule</Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 3: Broadcast Details Modal (Fixed Viewport) */}
            {selectedBroadcastDetails && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-left font-sans space-y-4 my-auto">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Sent</span>
                      <h4 className="font-bold text-base text-slate-900 mt-1">{selectedBroadcastDetails.title}</h4>
                      <p className="text-[11px] text-slate-400">{selectedBroadcastDetails.date}</p>
                    </div>
                    <button onClick={() => setSelectedBroadcastDetails(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    {selectedBroadcastDetails.body}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-sans border-y border-slate-100 py-3">
                    <div className="bg-indigo-50/50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Recipients</p>
                      <p className="font-black text-indigo-600 text-sm">{selectedBroadcastDetails.stats.totalRecipients}</p>
                    </div>
                    <div className="bg-emerald-50/50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Delivered</p>
                      <p className="font-black text-emerald-600 text-sm">{selectedBroadcastDetails.stats.delivered}</p>
                    </div>
                    <div className="bg-purple-50/50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Open Rate</p>
                      <p className="font-black text-purple-600 text-sm">{selectedBroadcastDetails.stats.opened}</p>
                    </div>
                  </div>

                  <Button onClick={() => setSelectedBroadcastDetails(null)} className="w-full bg-slate-900 text-white text-xs font-semibold">
                    Close Details
                  </Button>
                </div>
              </div>
            )}

            {/* Main Dashboard Mockup Card */}
            <div 
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-[#F8FAFC]"
              style={{ height: `${Math.max(260, 650 * scale)}px` }}
            >
              <div 
                className="absolute top-0 left-0 w-[960px] h-[650px] origin-top-left"
                style={{ transform: `scale(${scale})` }}
              >
                <div className="w-full h-full flex flex-col font-sans">
                  
                  {/* Top Bar Header (Matching Screenshots) */}
                  <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        E
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-lg tracking-tight leading-none">Dashboard</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Welcome back, manage your institution efficiently with EduTrio</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Search className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                      <div className="flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-200 text-emerald-700 rounded-lg px-2.5 py-1 text-[11px] font-bold">
                        <Calendar className="h-3 w-3" />
                        <span>Academic Year 2024-25</span>
                        <ChevronDown className="h-3 w-3" />
                      </div>
                      <div className="relative p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer text-slate-500">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                        <div className="text-right leading-none">
                          <p className="text-xs font-bold text-slate-800">Aohn Anderson</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">Super Admin</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                          AA
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Area */}
                  <div className="p-5 space-y-4 flex-grow overflow-y-auto bg-[#F8FAFC]">
                    
                    {/* Communication Hub Title & Quick Action Bar */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600 font-bold text-sm">((o))</span>
                          <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">Communication Hub</h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Broadcast announcements and schedule school-wide events.</p>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Button 
                          onClick={() => setIsScheduleEventOpen(true)}
                          variant="outline" 
                          className="bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-1.5 px-3 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          Schedule Event
                        </Button>
                        <Button 
                          onClick={() => setIsNewBroadcastOpen(true)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <Megaphone className="h-3.5 w-3.5" />
                          New Broadcast
                        </Button>
                      </div>
                    </div>

                    {/* Stat Cards Row (Screenshot 1) */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Stat 1: Total Broadcasts */}
                      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Megaphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Broadcasts</p>
                          <h4 className="text-2xl font-black text-slate-900 leading-tight">{broadcasts.length}</h4>
                        </div>
                      </div>

                      {/* Stat 2: Upcoming Events */}
                      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upcoming Events</p>
                          <h4 className="text-2xl font-black text-slate-900 leading-tight">{events.length}</h4>
                        </div>
                      </div>

                      {/* Stat 3: Active Alerts */}
                      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Alerts</p>
                          <h4 className="text-2xl font-black text-slate-900 leading-tight">0</h4>
                        </div>
                      </div>
                    </div>

                    {/* Split Grid: Recent Broadcasts (Left) & Upcoming Events (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      
                      {/* Left: Recent Broadcasts */}
                      <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                          <Megaphone className="h-4 w-4 text-indigo-600" />
                          <h5 className="font-bold text-slate-800 text-sm">Recent Broadcasts</h5>
                        </div>

                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                          {broadcasts.slice(0, 2).map((bc) => (
                            <div key={bc.id} className="border border-slate-200/80 rounded-xl p-3.5 hover:bg-slate-50/50 transition-colors space-y-2">
                              <div className="flex justify-between items-start">
                                <h6 className="font-bold text-slate-900 text-xs">{bc.title}</h6>
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                  ✓ {bc.status}
                                </span>
                              </div>
                              
                              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                                {bc.body}
                              </p>

                              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100">
                                <div className="flex items-center gap-3">
                                  <span>👥 Target: <strong className="text-slate-700">{bc.target}</strong></span>
                                  <span>Channels: <strong className="text-slate-700">{bc.channels.join(", ")}</strong></span>
                                </div>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {bc.date}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Upcoming Events & Meetings */}
                      <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <h5 className="font-bold text-slate-800 text-sm">Upcoming Events & Meetings</h5>
                        </div>

                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                          {events.map((ev) => (
                            <div key={ev.id} className="border border-slate-200/80 rounded-xl p-3 flex gap-3 items-center hover:bg-slate-50/50 transition-colors">
                              {/* Date Box */}
                              <div className="bg-sky-50 text-sky-700 border border-sky-100 rounded-xl p-2 text-center flex-shrink-0 min-w-[50px]">
                                <p className="text-[9px] font-extrabold uppercase tracking-wider">{ev.month}</p>
                                <p className="text-lg font-black leading-none mt-0.5">{ev.day}</p>
                              </div>

                              {/* Event Details */}
                              <div className="flex-grow space-y-1">
                                <div className="flex justify-between items-start">
                                  <h6 className="font-bold text-slate-900 text-xs leading-tight">{ev.title}</h6>
                                  <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded border border-slate-200">
                                    {ev.category}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {ev.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {ev.target}
                                  </span>
                                </div>

                                {ev.location && (
                                  <span className="inline-flex items-center gap-1 text-[9px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200 font-medium">
                                    <MapPin className="h-2.5 w-2.5 text-indigo-500" />
                                    {ev.location}
                                  </span>
                                )}

                                {ev.link && (
                                  <a href={ev.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[9px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 font-semibold hover:underline">
                                    <Video className="h-2.5 w-2.5 text-indigo-600" />
                                    {ev.link}
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Table: All Broadcasts (Screenshot 3) */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">All Broadcasts ({filteredBroadcasts.length})</h5>
                          <p className="text-[10px] text-slate-400">Complete list of sent announcements and communications</p>
                        </div>

                        {/* Search & Filters */}
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                            <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search broadcasts..."
                              className="pl-7 pr-3 py-1 rounded-lg border border-slate-200 text-[10px] bg-slate-50 w-36 focus:outline-none focus:bg-white"
                            />
                          </div>

                          <select 
                            value={selectedAudienceFilter}
                            onChange={(e) => setSelectedAudienceFilter(e.target.value)}
                            className="text-[10px] border border-slate-200 rounded-lg p-1 bg-slate-50 text-slate-600 font-semibold cursor-pointer"
                          >
                            <option value="All Audiences">All Audiences</option>
                            <option value="All">All</option>
                            <option value="Parents">Parents</option>
                            <option value="Teachers">Teachers</option>
                            <option value="Students">Students</option>
                          </select>

                          <select 
                            value={selectedChannelFilter}
                            onChange={(e) => setSelectedChannelFilter(e.target.value)}
                            className="text-[10px] border border-slate-200 rounded-lg p-1 bg-slate-50 text-slate-600 font-semibold cursor-pointer"
                          >
                            <option value="All Channels">All Channels</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS Text</option>
                            <option value="Push">App Push</option>
                          </select>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px]">
                          <thead>
                            <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                              <th className="py-2 px-3">Title</th>
                              <th className="py-2 px-3">Target</th>
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {filteredBroadcasts.map((bc) => (
                              <tr key={bc.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="py-2.5 px-3 font-bold text-slate-800">
                                  {bc.title}
                                  <span className="ml-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    {bc.status}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-slate-600 font-semibold">👥 {bc.target}</td>
                                <td className="py-2.5 px-3 text-slate-500 font-medium">🕒 {bc.displayDate}</td>
                                <td className="py-2.5 px-3 text-right">
                                  <button 
                                    onClick={() => setSelectedBroadcastDetails(bc)}
                                    className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                                    title="View Delivery Details"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
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
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
