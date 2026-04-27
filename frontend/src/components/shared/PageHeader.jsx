import React from "react";
import { cn } from "@/lib/utils";

export default function PageHeader({ title, subtitle, actions, className }) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-center md:justify-between", className)}>
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
