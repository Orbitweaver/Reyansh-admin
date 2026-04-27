import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description, icon: Icon = Inbox, action }) {
  return (
    <div
      data-testid="empty-state"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
        <Icon size={26} strokeWidth={1.5} />
      </div>
      <div className="space-y-1">
        <h4 className="font-display text-base font-semibold text-slate-900">{title}</h4>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
