// types/landing.ts — shared TypeScript interfaces for the landing page
import type { LucideIcon } from "lucide-react";

export type AccentColor =
  | "indigo"
  | "purple"
  | "cyan"
  | "emerald"
  | "amber"
  | "rose";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: AccentColor;
}

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface PricingFeatureItem {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  /** null for Enterprise (custom pricing) */
  price: { monthly: number; yearly: number } | null;
  description: string;
  color: AccentColor;
  popular: boolean;
  features: PricingFeatureItem[];
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image: string;
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PortalShowcase {
  badge: string;
  badgeColor: AccentColor;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  ctaColor: AccentColor;
  imageSrc: string;
  imageAlt: string;
  imageFirst: boolean;
}

/** Static color-class map — keeps Tailwind classes as literal strings so the purge scanner finds them. */
export const COLOR_CLASSES: Record<
  AccentColor,
  { bg: string; shadow: string; badge: string; check: string; button: string }
> = {
  indigo: {
    bg: "gradient-indigo",
    shadow: "shadow-colored-indigo",
    badge: "bg-indigo-100 text-indigo-700",
    check: "text-indigo-600",
    button: "gradient-indigo text-white shadow-colored-indigo",
  },
  purple: {
    bg: "gradient-purple",
    shadow: "shadow-colored-purple",
    badge: "bg-purple-100 text-purple-700",
    check: "text-purple-600",
    button: "gradient-purple text-white shadow-colored-purple",
  },
  cyan: {
    bg: "gradient-cyan",
    shadow: "shadow-colored-cyan",
    badge: "bg-cyan-100 text-cyan-700",
    check: "text-cyan-600",
    button: "gradient-cyan text-white shadow-colored-cyan",
  },
  emerald: {
    bg: "gradient-emerald",
    shadow: "shadow-colored-emerald",
    badge: "bg-emerald-100 text-emerald-700",
    check: "text-emerald-600",
    button: "gradient-emerald text-white shadow-colored-emerald",
  },
  amber: {
    bg: "gradient-amber",
    shadow: "shadow-colored-amber",
    badge: "bg-amber-100 text-amber-700",
    check: "text-amber-600",
    button: "gradient-amber text-white shadow-colored-amber",
  },
  rose: {
    bg: "gradient-rose",
    shadow: "shadow-colored-rose",
    badge: "bg-rose-100 text-rose-700",
    check: "text-rose-600",
    button: "gradient-rose text-white shadow-colored-rose",
  },
};
