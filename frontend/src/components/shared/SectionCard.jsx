import React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionCard — base container with consistent styling for dashboard widgets.
 */
export function SectionCard({ title, subtitle, action, className, children, padded = true }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            {title && <h3 className="font-display text-[15px] font-bold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </div>
  );
}

export default SectionCard;
