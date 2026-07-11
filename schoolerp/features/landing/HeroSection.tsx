"use client";
// features/landing/HeroSection.tsx
import { useCallback } from "react";
import { ArrowRight, Video, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { STATS } from "./constants";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const handleScrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      className="pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <Badge className="bg-white/80 backdrop-blur-sm border-indigo-200 text-indigo-700 px-4 py-2">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
              Transforming Education Through Technology
            </Badge>
            <div>
              <h1
                id="hero-heading"
                className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6"
              >
                The Complete School Management Platform
              </h1>
              <p className="text-slate-600 leading-relaxed mb-8">
                EduTrio empowers schools with AI-powered analytics, seamless
                communication, comprehensive student management, and intelligent
                automation. Everything you need to run a modern educational
                institution in one powerful platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 hover:bg-white"
                onClick={handleScrollToDemo}
              >
                Watch Demo
                <Video className="h-5 w-5 ml-2" aria-hidden="true" />
              </Button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon
                    className="h-6 w-6 text-indigo-600 mx-auto mb-2"
                    aria-hidden="true"
                  />
                  <div className="font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Demo preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse-slow" />
            <Card className="relative border-0 shadow-2xl glass-card">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <GraduationCap
                      className="h-20 w-20 mx-auto mb-4 animate-float"
                      aria-hidden="true"
                    />
                    <p className="font-medium">Interactive Demo</p>
                    <p className="text-sm opacity-90">
                      Click &quot;Watch Demo&quot; to see it in action
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
