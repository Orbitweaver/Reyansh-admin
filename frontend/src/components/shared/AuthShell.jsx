import React from "react";
import { ShieldCheck } from "lucide-react";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F9FAFB]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-rose-100/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-50/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <ShieldCheck size={18} strokeWidth={1.75} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-slate-900">SafeRoute IIoT</p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
              Smart Vehicle Safety & Emergency Response
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] sm:p-9">
              <div className="mb-6 space-y-1">
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
              </div>
              {children}
            </div>
            {footer && <div className="mt-5 text-center text-sm text-slate-500">{footer}</div>}
          </div>
        </div>

        <div className="text-center text-[11px] font-medium uppercase tracking-widest text-slate-400">
          © 2026 SafeRoute IIoT · Operations
        </div>
      </div>
    </div>
  );
}
