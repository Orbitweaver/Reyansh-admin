import React from "react";
import { cn } from "@/lib/utils";

const SEVERITY_STYLES = {
  critical: "bg-rose-50 text-rose-700 border-rose-100",
  high: "bg-orange-50 text-orange-700 border-orange-100",
  medium: "bg-amber-50 text-amber-700 border-amber-100",
  low: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default function SeverityBadge({ severity = "low", className, withDot = true }) {
  const key = (severity || "low").toLowerCase();
  const cls = SEVERITY_STYLES[key] || SEVERITY_STYLES.low;
  const label = key[0].toUpperCase() + key.slice(1);
  return (
    <span
      data-testid={`severity-badge-${key}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        cls,
        className,
      )}
    >
      {withDot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />}
      {label}
    </span>
  );
}
