import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useAuth, roleHomePath } from "@/lib/auth";
import { ROLE_META } from "@/data/sidebars";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={roleHomePath(user.role)} replace />;

  const meta = ROLE_META[role];
  return (
    <div className={`${meta.className} flex min-h-screen bg-[#F9FAFB]`}>
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar role={role} />
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
