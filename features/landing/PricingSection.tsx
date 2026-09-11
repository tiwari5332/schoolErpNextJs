"use client";
// features/landing/PricingSection.tsx
// Isolated "use client" — only this section re-renders on billing toggle
import { useState, useCallback } from "react";
import { ArrowRight, Star, Target, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeatureItem } from "@/components/shared/FeatureItem";
import { COLOR_CLASSES } from "@/types/landing";
import { PRICING_PLANS } from "./constants";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  onGetStarted: () => void;
}

type BillingPeriod = "monthly" | "yearly";

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const handleGetStarted = useCallback(() => onGetStarted(), [onGetStarted]);

  return (
    <section id="pricing" className="py-10 sm:py-16 md:py-20 px-3 sm:px-6 bg-white border-b border-slate-200/50" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Flexible Pricing"
          badgeClassName="bg-emerald-100 text-emerald-700"
          title="Choose the Perfect Plan for Your School"
          subtitle="Transparent pricing with no hidden fees. All plans include free onboarding and training"
          className="mb-8 sm:mb-12"
        />

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div
            className="inline-flex items-center gap-1 bg-slate-100 rounded-full p-1 text-xs sm:text-sm"
            role="group"
            aria-label="Billing period"
          >
            {(["monthly", "yearly"] as BillingPeriod[]).map((period) => (
              <button
                key={period}
                role="radio"
                aria-checked={billing === period}
                onClick={() => setBilling(period)}
                className={cn(
                  "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-200 capitalize cursor-pointer",
                  billing === period
                    ? "bg-white shadow-md text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-800"
                )}
              >
                {period}
                {period === "yearly" && (
                  <Badge className="ml-1.5 sm:ml-2 bg-emerald-100 text-emerald-700 text-[11px] sm:text-xs">
                    Save 17%
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRICING_PLANS.map((plan) => {
            const colors = COLOR_CLASSES[plan.color];
            return (
              <Card
                key={plan.name}
                className={cn(
                  "border-0 shadow-lg hover-lift relative glass-card",
                  plan.popular && "ring-2 ring-emerald-500 scale-105"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-emerald text-white shadow-colored-emerald px-4 py-1">
                      <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div
                    className={cn(
                      "h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                      colors.bg,
                      colors.shadow
                    )}
                  >
                    <Target className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-bold text-slate-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                  <div className="space-y-2">
                    {plan.price !== null ? (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-extrabold text-slate-900">
                            ₹{billing === "monthly" ? plan.price.monthly.toLocaleString('en-IN') : plan.price.yearly.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm text-slate-600 font-medium">
                            /{billing === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        {billing === "yearly" && (
                          <p className="text-xs text-emerald-600 font-bold">
                            Save ₹{(plan.price.monthly * 12 - plan.price.yearly).toLocaleString('en-IN')}/year
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="font-bold text-slate-900">Custom Pricing</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3" aria-label={`${plan.name} features`}>
                    {plan.features.map((f) => (
                      <FeatureItem
                        key={f.name}
                        label={f.name}
                        included={f.included}
                        checkColor={colors.check}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className={cn("w-full", colors.button)}
                  >
                    {plan.price !== null ? "Start Free Trial" : "Contact Sales"}
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Onboarding & Migration Guarantee Callout */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-indigo-50/60 to-purple-50/60 border border-indigo-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-left shadow-sm">
          <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0 border border-slate-100">
            <Sparkles className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-base">Free Data Migration & Full Onboarding Support</h4>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Dread the transition? Don&apos;t be. Our dedicated onboarding team handles 100% of your data migration from legacy software or spreadsheets into EduTrio within 48 hours, free of charge.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-4 font-medium">
            All plans include: • Free onboarding • Data migration • Training sessions • Email support
          </p>
          <p className="text-xs text-slate-500">
            Need a custom plan?{" "}
            <button
              onClick={handleGetStarted}
              className="text-indigo-600 hover:text-indigo-700 font-bold underline-offset-2 hover:underline cursor-pointer"
            >
              Contact our sales team
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
