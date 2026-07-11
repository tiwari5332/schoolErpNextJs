// features/landing/BenefitsSection.tsx — Server Component (no interactivity)
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BENEFITS } from "./constants";

export function BenefitsSection() {
  return (
    <section className="py-20 px-6 bg-white" aria-labelledby="benefits-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Why Choose EduTrio"
          badgeClassName="bg-indigo-100 text-indigo-700"
          title="Measurable Impact on Your Institution"
          subtitle="Join thousands of schools that have transformed their operations with EduTrio"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => (
            <Card key={benefit.title} className="border-0 shadow-lg glass-card hover-lift">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl gradient-indigo flex items-center justify-center shadow-colored-indigo mb-4">
                  <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-medium text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
