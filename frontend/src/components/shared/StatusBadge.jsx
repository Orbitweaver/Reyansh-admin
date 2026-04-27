import React from "react";
import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  active: "bg-blue-50 text-blue-700 border-blue-100",
  online: "bg-emerald-50 text-emerald-700 border-emerald-100",
  offline: "bg-slate-100 text-slate-600 border-slate-200",
  inactive: "bg-slate-100 text-slate-600 border-slate-200",
  pending: "bg-slate-100 text-slate-600 border-slate-200",
  acknowledged: "bg-indigo-50 text-indigo-700 border-indigo-100",
  dispatched: "bg-violet-50 text-violet-700 border-violet-100",
  on_route: "bg-amber-50 text-amber-700 border-amber-100",
  on_scene: "bg-orange-50 text-orange-700 border-orange-100",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  alert: "bg-rose-50 text-rose-700 border-rose-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  idle: "bg-slate-50 text-slate-600 border-slate-200",
  incoming: "bg-blue-50 text-blue-700 border-blue-100",
};

const LABEL = {
  on_route: "On the way",
  on_scene: "On scene",
};

export default function StatusBadge({ status = "pending", className }) {
  const key = (status || "pending").toLowerCase();
  const cls = STATUS_STYLES[key] || "bg-slate-100 text-slate-600 border-slate-200";
  const label = LABEL[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <span
      data-testid={`status-badge-${key}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        cls,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}
