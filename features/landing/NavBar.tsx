"use client";
// features/landing/NavBar.tsx
import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EduTrioLogo } from "@/components/EduTrioLogo";

interface NavBarProps {
  onGetStarted: () => void;
}

const NAV_LINKS = [
  { href: "#features",     label: "Features"      },
  { href: "#pricing",      label: "Pricing"       },
  { href: "#testimonials", label: "Testimonials"  },
  { href: "#contact",      label: "Contact"       },
] as const;

export function NavBar({ onGetStarted }: NavBarProps) {
  const handleGetStarted = useCallback(() => onGetStarted(), [onGetStarted]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <EduTrioLogo size="md" />
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                role="menuitem"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <Button
            onClick={handleGetStarted}
            className="gradient-indigo text-white shadow-colored-indigo"
          >
            Get Started
            <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
