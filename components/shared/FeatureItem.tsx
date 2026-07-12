// components/shared/FeatureItem.tsx
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  label: string;
  included: boolean;
  checkColor?: string;
}

export function FeatureItem({
  label,
  included,
  checkColor = "text-emerald-600",
}: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      {included ? (
        <CheckCircle
          className={cn("h-5 w-5 flex-shrink-0 mt-0.5", checkColor)}
          aria-hidden="true"
        />
      ) : (
        <X
          className="h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
      )}
      <span
        className={cn(
          "text-sm",
          included ? "text-slate-700" : "text-slate-400"
        )}
      >
        {label}
      </span>
    </div>
  );
}
