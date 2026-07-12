// components/shared/SectionHeader.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  badgeClassName?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  badgeClassName,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <Badge className={cn("px-4 py-2 mb-4", badgeClassName)}>{badge}</Badge>
      <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
