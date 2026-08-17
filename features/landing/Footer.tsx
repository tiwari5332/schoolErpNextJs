"use client";

import { Mail, ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { EduTrioLogo } from "@/components/EduTrioLogo";

interface FooterProps {
  onScheduleDemo: () => void;
}

export function Footer({ onScheduleDemo }: FooterProps) {
  return (
    <footer id="contact" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 px-6 border-t border-white/10 font-sans text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & compliance summary */}
          <div className="space-y-4">
            <EduTrioLogo size="md" className="brightness-0 invert" />
            <p className="text-sm text-indigo-100 leading-relaxed max-w-sm">
              Transforming school administration with digital intelligence. Manage classrooms, fees, exams, and parent communications on a single, secure platform.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-indigo-200 font-semibold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-350 text-emerald-450" />
                FERPA & COPPA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-350 text-emerald-450" />
                End-to-End SSL Security
              </span>
            </div>
          </div>

          {/* Column 2: Platform Nav Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Platform Features</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <li>
                <a href="#ai-builder" className="text-indigo-100 hover:text-white transition-colors">
                  AI Exam Builder
                </a>
              </li>
              <li>
                <a href="#attendance" className="text-indigo-100 hover:text-white transition-colors">
                  Attendance Tracking
                </a>
              </li>
              <li>
                <a href="#fees" className="text-indigo-100 hover:text-white transition-colors">
                  Fee Management
                </a>
              </li>
              <li>
                <a href="#portals" className="text-indigo-100 hover:text-white transition-colors">
                  User Portals
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-indigo-100 hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Demo CTA */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact & Inquiries</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-white flex-shrink-0" />
                <a href="mailto:contact@edutrio.com" className="text-indigo-100 hover:text-white transition-colors">
                  contact@edutrio.com
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onScheduleDemo}
                  className="inline-flex items-center gap-2 text-white hover:text-indigo-100 font-bold transition-all text-sm cursor-pointer group"
                >
                  Schedule Personal Walkthrough
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-indigo-200">
            &copy; {new Date().getFullYear()} EduTrio. All rights reserved.
          </p>
          <div className="flex gap-6 text-indigo-250 text-indigo-200 font-semibold uppercase tracking-wider text-[10px]">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
