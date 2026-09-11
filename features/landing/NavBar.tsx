"use client";
// features/landing/NavBar.tsx
import { useCallback, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EduTrioLogo } from "@/components/EduTrioLogo";

interface NavBarProps {
  onGetStarted: () => void;
}

const NAV_LINKS = [
  { href: "#ai-builder",   label: "AI Exam Builder" },
  { href: "#attendance",   label: "Attendance"      },
  { href: "#fees",         label: "Fee Management"  },
  { href: "#communication",label: "Communication"   },
  { href: "#portals",      label: "User Portals"    },
  { href: "#pricing",      label: "Pricing"         },
] as const;

export function NavBar({ onGetStarted }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleGetStarted = useCallback(() => {
    setIsMobileMenuOpen(false);
    onGetStarted();
  }, [onGetStarted]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-700 text-white text-[10px] sm:text-xs font-bold py-1.5 px-2 sm:px-4 text-center flex items-center justify-center gap-1 sm:gap-2 shadow-sm overflow-hidden">
        <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider hidden md:inline-block shrink-0">
          Limited Time Offer
        </span>
        <span className="truncate max-w-[240px] sm:max-w-none">
          🎉 <strong className="underline decoration-amber-300 underline-offset-2">1-Month FREE Trial</strong> · ⚡ <strong className="underline decoration-emerald-300 underline-offset-2">Free Migration</strong> <span className="hidden sm:inline">· 📊 <strong className="underline decoration-cyan-300 underline-offset-2">1-Click Reports</strong></span>
        </span>
        <button
          onClick={handleGetStarted}
          className="ml-1 bg-white text-indigo-900 hover:bg-slate-100 font-extrabold text-[9px] sm:text-[11px] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-2xs transition-all cursor-pointer shrink-0"
        >
          Claim →
        </button>
      </div>

      <nav
        className="bg-white/95 backdrop-blur-lg border-b border-slate-200"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="shrink-0 flex items-center">
              <EduTrioLogo size="md" className="w-9 h-9 sm:w-12 sm:h-12" />
            </div>
            
            {/* Desktop Navigation Links (Visible on xl / 1280px+ screens) */}
            <div className="hidden xl:flex items-center gap-5 2xl:gap-8" role="menubar">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  role="menuitem"
                  className="text-xs 2xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={handleGetStarted}
                role="menuitem"
                className="text-xs 2xl:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none whitespace-nowrap"
              >
                Contact Us
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Free Trial Button - Visible on ALL screens (mobile, tablet, desktop) */}
              <Button
                onClick={handleGetStarted}
                className="gradient-indigo text-white shadow-colored-indigo text-[11px] sm:text-xs md:text-sm px-2.5 sm:px-4 py-1 sm:py-2 font-bold shrink-0 rounded-lg sm:rounded-xl"
              >
                <span className="hidden sm:inline">Start 1-Month Free Trial</span>
                <span className="sm:hidden">Free Trial</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" aria-hidden="true" />
              </Button>

              {/* Mobile & Tablet Hamburger Toggle Button (Visible on screens < 1280px / xl) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer shrink-0 border border-slate-200/80 bg-slate-50/50"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-5.5 sm:w-5.5" /> : <Menu className="h-5 w-5 sm:h-5.5 sm:w-5.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer (< 1280px / xl) */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 p-2.5 rounded-xl transition-colors"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={handleGetStarted}
                className="text-left text-sm font-semibold text-indigo-600 hover:bg-indigo-50/60 p-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Contact Us & Support
              </button>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Button
                onClick={handleGetStarted}
                className="w-full gradient-indigo text-white font-bold text-xs py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Claim 1-Month Free Trial
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
