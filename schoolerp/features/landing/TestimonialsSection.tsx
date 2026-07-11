// features/landing/TestimonialsSection.tsx — Server Component
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TESTIMONIALS } from "./constants";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Testimonials"
          badgeClassName="bg-cyan-100 text-cyan-700"
          title="Trusted by Educational Leaders"
          subtitle="See what school administrators and educators are saying about EduTrio"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="border-0 shadow-lg glass-card hover-lift">
              <CardContent className="p-6 space-y-4">
                {/* Star Rating */}
                <div
                  aria-label={`Rated ${t.rating} out of 5 stars`}
                  className="flex gap-1"
                >
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div
                    className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl"
                    aria-hidden="true"
                  >
                    {t.image}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-600">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
