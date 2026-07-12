"use client";
// features/landing/ShowcaseSection.tsx
import { useCallback } from "react";
import { ArrowRight, Brain, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { FeatureItem } from "@/components/shared/FeatureItem";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { COLOR_CLASSES } from "@/types/landing";
import { PORTAL_SHOWCASES } from "./constants";
import { cn } from "@/lib/utils";

interface ShowcaseSectionProps {
  onGetStarted: () => void;
}

export function ShowcaseSection({ onGetStarted }: ShowcaseSectionProps) {
  const handleGetStarted = useCallback(() => onGetStarted(), [onGetStarted]);

  return (
    <section
      className="py-20 px-6 bg-gradient-to-br from-slate-50 to-indigo-50"
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="See It In Action"
          badgeClassName="bg-purple-100 text-purple-700"
          title="Powerful Portals for Every User"
          subtitle="Experience intuitive interfaces designed specifically for administrators, teachers, students, and parents"
        />

        <div className="space-y-16">
          {PORTAL_SHOWCASES.map((portal) => {
            const colors = COLOR_CLASSES[portal.ctaColor];
            const BadgeIconComp = portal.badgeIcon;

            const imageCard = (
              <Card className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                <CardContent className="p-2">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={portal.imageSrc}
                      alt={portal.imageAlt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </CardContent>
              </Card>
            );

            const content = (
              <div className="space-y-6">
                <Badge className={cn("px-3 py-1", COLOR_CLASSES[portal.badgeColor].badge)}>
                  <BadgeIconComp className="h-3 w-3 mr-1" aria-hidden="true" />
                  {portal.badge}
                </Badge>
                <h3 className="font-bold text-slate-900">{portal.title}</h3>
                <p className="text-slate-600 leading-relaxed">{portal.description}</p>
                <ul className="space-y-3" aria-label={`${portal.badge} features`}>
                  {portal.items.map((item) => (
                    <li key={item}>
                      <FeatureItem
                        label={item}
                        included={true}
                        checkColor={colors.check}
                      />
                    </li>
                  ))}
                </ul>
                <Button className={colors.button} onClick={handleGetStarted}>
                  {portal.ctaLabel}
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            );

            return (
              <div
                key={portal.badge}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {portal.imageFirst ? (
                  <>
                    <div className="order-2 lg:order-1">{imageCard}</div>
                    <div className="order-1 lg:order-2">{content}</div>
                  </>
                ) : (
                  <>
                    {content}
                    {imageCard}
                  </>
                )}
              </div>
            );
          })}

          {/* Mobile & AI Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: Smartphone,
                badge: "Mobile First",
                badgeColor: "text-purple-700",
                imageSrc: "https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBzbWFydHBob25lJTIwaGFuZHxlbnwxfHx8fDE3NzIyNzE4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
                imageAlt: "Person using EduTrio mobile app on a smartphone",
                title: "Native Mobile Applications",
                body: "Full-featured mobile apps for iOS and Android with offline capabilities, push notifications, and touch-optimized interfaces.",
                cta: "Explore Mobile Apps",
              },
              {
                icon: Brain,
                badge: "AI-Powered",
                badgeColor: "text-purple-700",
                imageSrc: "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwZ3JhcGhzJTIwc2NyZWVufGVufDF8fHx8MTc3MjM3Mjc5NHww&ixlib=rb-4.1.0&q=80&w=1080",
                imageAlt: "Data analytics dashboard with charts and graphs on a screen",
                title: "Advanced AI Analytics",
                body: "Machine learning algorithms provide predictive insights, performance forecasting, and automated recommendations for better decision-making.",
                cta: "Explore AI Analytics",
              },
            ].map(({ icon: Icon, badge, badgeColor, imageSrc, imageAlt, title, body, cta }) => (
              <Card key={title} className="border-0 shadow-2xl overflow-hidden glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6">
                    <ImageWithFallback
                      src={imageSrc}
                      alt={imageAlt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className={cn("bg-white/90 backdrop-blur-sm px-3 py-1", badgeColor)}>
                        <Icon className="h-3 w-3 mr-1" aria-hidden="true" />
                        {badge}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{body}</p>
                  <Button variant="outline" className="w-full" onClick={handleGetStarted}>
                    {cta}
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
