import React from "react";
import { Bell, Search, Command } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ROLE_META } from "@/data/sidebars";

export default function TopBar({ role }) {
  const { user } = useAuth();
  const meta = ROLE_META[role];
  return (
    <header
      data-testid={`topbar-${role}`}
      className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-3 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
          style={{
            background: "hsl(var(--role-bg-soft))",
            color: "hsl(var(--role-primary))",
          }}
        >
          {meta?.badge}
        </span>
        <span className="hidden text-sm text-slate-500 md:inline">
          {user?.region} · ID {user?.serviceId}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-400 md:flex">
          <Search size={13} />
          <span>Search incidents, vehicles, IDs</span>
          <span className="ml-2 inline-flex items-center gap-1 rounded border border-slate-200 px-1.5 text-[10px] text-slate-500">
            <Command size={10} /> K
          </span>
        </div>
        <button
          data-testid="notifications-btn"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <Bell size={15} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
