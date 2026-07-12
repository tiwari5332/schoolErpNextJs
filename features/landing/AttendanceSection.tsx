"use client";
// features/landing/AttendanceSection.tsx
import { useCallback } from "react";
import { ArrowRight, Clock, Bell, BarChart3, Smartphone, Zap, CheckCircle, Badge as LucideBadge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

interface AttendanceSectionProps {
  onGetStarted: () => void;
}

const ATTENDANCE_ITEMS = [
  { icon: Clock,       title: "Save 15+ Minutes Daily",        body: "Mark entire class attendance in under 30 seconds with one-tap controls"          },
  { icon: Bell,        title: "Instant Parent Notifications",   body: "Parents receive real-time SMS/email alerts when students are marked absent"       },
  { icon: BarChart3,   title: "Automated Analytics & Reports",  body: "Track patterns, identify at-risk students, and generate reports instantly"        },
  { icon: Smartphone,  title: "Works on Any Device",            body: "Desktop, tablet, or smartphone—mark attendance from anywhere"                    },
] as const;

export function AttendanceSection({ onGetStarted }: AttendanceSectionProps) {
  const handleGetStarted = useCallback(() => onGetStarted(), [onGetStarted]);

  return (
    <section
      className="py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600"
      aria-labelledby="attendance-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="text-white space-y-6">
            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white px-4 py-2">
              <Zap className="h-3 w-3 mr-1" aria-hidden="true" />
              Revolutionary Feature
            </Badge>
            <h2 id="attendance-heading" className="font-bold text-white">
              Replace Manual Attendance with Digital Intelligence
            </h2>
            <p className="text-indigo-100 leading-relaxed">
              Say goodbye to paper registers and manual tracking. Our digital attendance system
              lets teachers mark attendance in seconds, automatically notifies parents, and
              provides real-time analytics—all from any device.
            </p>
            <div className="space-y-4">
              {ATTENDANCE_ITEMS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{title}</h4>
                    <p className="text-sm text-indigo-100">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl"
            >
              Try Digital Attendance
              <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
            </Button>
          </div>

          {/* Image */}
          <div>
            <Card className="border-0 shadow-2xl overflow-hidden glass-card">
              <CardContent className="p-2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1766867257943-0665537fb2dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGFraW5nJTIwYXR0ZW5kYW5jZSUyMGNsYXNzcm9vbSUyMGRpZ2l0YWwlMjB0YWJsZXR8ZW58MXx8fHwxNzcyMzczNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Teacher using digital attendance system on a tablet in classroom"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">
                          Class 10-A Attendance
                        </span>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          <CheckCircle className="h-3 w-3 mr-1" aria-hidden="true" />
                          95% Today
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {[
                          { count: 28, label: "Present", colors: "bg-emerald-100 text-emerald-700 text-emerald-600" },
                          { count:  2, label: "Absent",  colors: "bg-rose-100 text-rose-700 text-rose-600"         },
                          { count:  0, label: "Late",    colors: "bg-amber-100 text-amber-700 text-amber-600"       },
                        ].map(({ count, label, colors }) => {
                          const [bg, bold, sub] = colors.split(" ");
                          return (
                            <div key={label} className={`flex-1 ${bg} rounded-lg p-2 text-center`}>
                              <div className={`font-bold ${bold}`}>{count}</div>
                              <div className={`text-xs ${sub}`}>{label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
