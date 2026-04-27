import {
  LayoutDashboard,
  Radar,
  Users,
  Car,
  Cpu,
  Route,
  Siren,
  Building2,
  Bell,
  BarChart3,
  ShieldCheck,
  Settings as SettingsIcon,
  ScrollText,
  ClipboardList,
  ListChecks,
  CheckCircle2,
  FileText,
  Ambulance,
  Flame,
  HeartPulse,
  BedDouble,
  UserCheck,
} from "lucide-react";

export const ROLE_META = {
  super_admin: {
    label: "Super Admin",
    title: "Master Control",
    badge: "Master",
    base: "/admin",
    className: "role-super-admin",
  },
  police: {
    label: "Police",
    title: "Police Command",
    badge: "Police",
    base: "/police",
    className: "role-police",
  },
  ambulance: {
    label: "Ambulance · 108",
    title: "108 Dispatch",
    badge: "108",
    base: "/ambulance",
    className: "role-ambulance",
  },
  fire: {
    label: "Fire Brigade",
    title: "Fire Command",
    badge: "Fire",
    base: "/fire",
    className: "role-fire",
  },
  hospital: {
    label: "Hospital",
    title: "Trauma & ER",
    badge: "Hospital",
    base: "/hospital",
    className: "role-hospital",
  },
};

export const SIDEBAR_NAV = {
  super_admin: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/live", label: "Live Monitoring", icon: Radar },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/vehicles", label: "Vehicles", icon: Car },
    { to: "/admin/devices", label: "IoT Devices", icon: Cpu },
    { to: "/admin/trips", label: "Trips", icon: Route },
    { to: "/admin/incidents", label: "Incidents", icon: Siren },
    { to: "/admin/services", label: "Emergency Services", icon: Building2 },
    { to: "/admin/alerts", label: "Alerts", icon: Bell },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/admin/roles", label: "Roles & Permissions", icon: ShieldCheck },
    { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
    { to: "/admin/security", label: "Security Logs", icon: ScrollText },
  ],
  police: [
    { to: "/police", label: "New Alerts", icon: Bell, end: true },
    { to: "/police/active", label: "Active Cases", icon: ListChecks },
    { to: "/police/completed", label: "Completed Cases", icon: CheckCircle2 },
    { to: "/police/reports", label: "Reports", icon: FileText },
  ],
  ambulance: [
    { to: "/ambulance", label: "Incoming Alerts", icon: Bell, end: true },
    { to: "/ambulance/active", label: "Active Trips", icon: Ambulance },
    { to: "/ambulance/completed", label: "Completed Trips", icon: CheckCircle2 },
  ],
  fire: [
    { to: "/fire", label: "New Alerts", icon: Bell, end: true },
    { to: "/fire/active", label: "Active Incidents", icon: Flame },
    { to: "/fire/reports", label: "Reports", icon: FileText },
  ],
  hospital: [
    { to: "/hospital", label: "Incoming Patients", icon: HeartPulse, end: true },
    { to: "/hospital/beds", label: "Bed Management", icon: BedDouble },
    { to: "/hospital/active", label: "Active Cases", icon: UserCheck },
  ],
};

export const ROLE_KPI_TITLES = {
  super_admin: "All-system overview",
  police: "Patrol command",
  ambulance: "Dispatch desk",
  fire: "Brigade ops",
  hospital: "Trauma & ER",
};
