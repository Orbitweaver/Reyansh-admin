import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { ROLE_META, SIDEBAR_NAV } from "@/data/sidebars";

export default function Sidebar({ role }) {
  const meta = ROLE_META[role];
  const items = SIDEBAR_NAV[role] || [];
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      data-testid={`sidebar-${role}`}
      className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm"
          style={{ background: "hsl(var(--role-primary))" }}
        >
          <ShieldCheck size={18} strokeWidth={1.75} />
        </div>
        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold text-slate-900">Reyansh Technologies</p>
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
            {meta?.title || "Console"}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--role-bg-soft))] text-[hsl(var(--role-primary))]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )
            }
          >
            <item.icon size={17} strokeWidth={1.75} />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className="border-t border-slate-100 p-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-sm font-semibold"
              style={{ background: "hsl(var(--role-primary))" }}
            >
              {(user?.name || "U").split(" ").map((s) => s[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
              <p className="truncate text-[11px] text-slate-500">{user?.serviceId}</p>
            </div>
            <button
              onClick={handleLogout}
              data-testid="logout-button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-rose-600"
              title="Sign out"
            >
              <LogOut size={15} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
