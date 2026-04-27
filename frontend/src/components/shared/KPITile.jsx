import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function KPITile({ icon: Icon, label, value, trend, accent = "slate", testId }) {
  const accentMap = {
    slate: "bg-slate-50 text-slate-700",
    blue: "bg-blue-50 text-blue-700",
    rose: "bg-rose-50 text-rose-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    indigo: "bg-indigo-50 text-indigo-700",
    role: "bg-[hsl(var(--role-bg-soft))] text-[hsl(var(--role-primary))]",
  };
  const trendUp = trend && trend.direction === "up";
  return (
    <div
      data-testid={testId}
      className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
    >
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <p className="font-display text-3xl font-bold tabular-nums text-slate-900">{value}</p>
        {trend && (
          <p
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              trendUp ? "text-emerald-600" : "text-rose-600",
            )}
          >
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}
            <span className="text-slate-400">vs last week</span>
          </p>
        )}
      </div>
      {Icon && (
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            accentMap[accent] || accentMap.slate,
          )}
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
      )}
    </div>
  );
}
