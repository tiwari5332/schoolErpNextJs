"use client";
// features/landing/PricingSection.tsx
// Isolated "use client" — only this section re-renders on billing toggle
import { useState, useCallback } from "react";
import { ArrowRight, Star, Target } from "lucide-react";
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
    <section id="pricing" className="py-20 px-6 bg-white" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Flexible Pricing"
          badgeClassName="bg-emerald-100 text-emerald-700"
          title="Choose the Perfect Plan for Your School"
          subtitle="Transparent pricing with no hidden fees. All plans include free onboarding and training"
          className="mb-12"
        />

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex items-center gap-1 bg-slate-100 rounded-full p-1"
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
                  "px-6 py-2 rounded-full text-sm transition-all duration-200 capitalize",
                  billing === period
                    ? "bg-white shadow-md text-slate-900 font-medium"
                    : "text-slate-600 hover:text-slate-800"
                )}
              >
                {period}
                {period === "yearly" && (
                  <Badge className="ml-2 bg-emerald-100 text-emerald-700 text-xs">
                    Save 17%
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="font-bold text-slate-900">
                            ${billing === "monthly" ? plan.price.monthly : plan.price.yearly}
                          </span>
                          <span className="text-sm text-slate-600">
                            /{billing === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        {billing === "yearly" && (
                          <p className="text-xs text-emerald-600">
                            Save ${plan.price.monthly * 12 - plan.price.yearly}/year
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

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-4">
            All plans include: • Free onboarding • Data migration • Training sessions • Email support
          </p>
          <p className="text-xs text-slate-500">
            Need a custom plan?{" "}
            <button
              onClick={handleGetStarted}
              className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline"
            >
              Contact our sales team
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
