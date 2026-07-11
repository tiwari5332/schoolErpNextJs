// features/landing/FeaturesSection.tsx — Server Component
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { COLOR_CLASSES } from "@/types/landing";
import { FEATURES } from "./constants";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 px-6 bg-gradient-to-br from-slate-50 to-indigo-50"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Comprehensive Features"
          badgeClassName="bg-purple-100 text-purple-700"
          title="Everything You Need in One Platform"
          subtitle="From student management to AI-powered analytics, EduTrio provides all the tools modern educational institutions need to excel"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const colors = COLOR_CLASSES[feature.color];
            return (
              <Card
                key={feature.title}
                className="border-0 shadow-lg glass-card hover-lift"
              >
                <CardContent className="p-6">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                      colors.bg,
                      colors.shadow
                    )}
                  >
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
