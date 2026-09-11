"use client";

import {
  Mail,
  ShieldCheck,
  Lock,
  ArrowRight,
  Phone,
  Sparkles,
  Users,
  MessageCircle,
} from "lucide-react";
import { EduTrioLogo } from "@/components/EduTrioLogo";

interface FooterProps {
  onScheduleDemo: () => void;
}

export function Footer({ onScheduleDemo }: FooterProps) {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 border-t border-slate-800 font-sans text-left relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-14">
          
          {/* Column 1: Brand Info & Compliance Badges (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-5">
            <div className="flex items-center gap-3">
              <EduTrioLogo size="md" />
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                EduTrio <span className="text-xs sm:text-sm font-bold text-indigo-300 bg-indigo-950/80 px-2 sm:px-2.5 py-0.5 rounded-full border border-indigo-700">ERP</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed max-w-md">
              Transforming school administration with digital intelligence. Manage classrooms, attendance, fees, exams, and parent communications on a single, secure, cloud platform.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 p-2 sm:p-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>FERPA & COPPA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 p-2 sm:p-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold">
                <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-1 sm:pt-2 flex items-center gap-3">
              <span className="text-xs sm:text-sm text-slate-200 font-semibold">Follow Us:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/917398647812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-emerald-950/60 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-800/60 flex items-center justify-center transition-all cursor-pointer"
                  title="WhatsApp Support"
                >
                  <MessageCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-slate-800 text-white hover:bg-indigo-600 border border-slate-700/60 flex items-center justify-center transition-all cursor-pointer"
                  title="LinkedIn"
                >
                  <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-slate-800 text-white hover:bg-indigo-600 border border-slate-700/60 flex items-center justify-center transition-all cursor-pointer"
                  title="Twitter / X"
                >
                  <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-slate-800 text-white hover:bg-indigo-600 border border-slate-700/60 flex items-center justify-center transition-all cursor-pointer"
                  title="Facebook"
                >
                  <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Features */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" />
              <span>Platform Features</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#ai-builder" className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-400">›</span> AI Exam Builder
                </a>
              </li>
              <li>
                <a href="#attendance" className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-400">›</span> Biometric Attendance
                </a>
              </li>
              <li>
                <a href="#fees" className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-400">›</span> Fee Recovery & UPI
                </a>
              </li>
              <li>
                <a href="#communication" className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-400">›</span> Communication Hub
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-400">›</span> Analytics & Reports
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-white hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-400">›</span> Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: User Portals */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" />
              <span>User Portals</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#portals" className="text-white hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span className="text-purple-400">›</span> Administrator Portal
                </a>
              </li>
              <li>
                <a href="#portals" className="text-white hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span className="text-purple-400">›</span> Educator Workstation
                </a>
              </li>
              <li>
                <a href="#portals" className="text-white hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span className="text-purple-400">›</span> Parent App & Portal
                </a>
              </li>
              <li>
                <a href="#portals" className="text-white hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span className="text-purple-400">›</span> Student Learning Hub
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-white hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span className="text-purple-400">›</span> Multi-Branch Control
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white hover:text-purple-300 transition-colors flex items-center gap-1.5">
                  <span className="text-purple-400">›</span> Onboarding Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Inquiries */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" />
              <span>Contact & Support</span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2 text-white">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href="tel:+917398647812" className="hover:text-indigo-300 transition-colors font-medium">
                  +91 7398647812
                </a>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href="mailto:contact@edutrio.com" className="hover:text-indigo-300 transition-colors">
                  contact@edutrio.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white">
                <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/917398647812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors font-semibold text-emerald-400"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="pt-1.5 sm:pt-2">
                <button
                  onClick={onScheduleDemo}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm cursor-pointer group"
                >
                  <span>Book Institution Demo</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-center md:text-left">
          <p className="text-white">
            &copy; {new Date().getFullYear()} EduTrio School ERP. All rights reserved. Built for modern educational institutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white font-medium text-xs sm:text-sm">
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Security Overview
            </a>
            <a href="#" className="hover:text-indigo-300 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
