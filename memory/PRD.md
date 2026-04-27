# SafeRoute IIoT — Smart Vehicle Safety & Emergency Response Platform

## Original Problem Statement
Build a frontend-only, light-mode multi-dashboard SaaS for an IIoT-based vehicle safety and emergency response system. Includes a Super Admin master console plus separate dashboards for Police, Ambulance (108), Fire Stations, and Hospitals. Each dashboard must feel independent (own sidebar/identity) while sharing one design system. Mock data only.

## Architecture
- **Stack**: React 19 + Tailwind + shadcn/ui + Recharts + Leaflet (OpenStreetMap)
- **Auth**: Mock localStorage session, 5 seeded role accounts, role-based redirects
- **Routing**: React Router v7, 5 role bases (`/admin`, `/police`, `/ambulance`, `/fire`, `/hospital`)
- **Theming**: Per-role CSS variables (`role-super-admin`, `role-police`, …) drive sidebar/button accents

## User Personas
1. **Super Admin** — National master controller, onboards services, overrides cases
2. **Police Officer** — Receives crash alerts, dispatches units, closes cases
3. **108 Paramedic** — Picks patients, navigates to hospital
4. **Fire Captain** — Receives fire flags, dispatches brigade
5. **Hospital Doctor** — Accepts incoming patients, manages beds, assigns care

## Implemented (2026-02-12)
- **Auth flows**: Login (with 5 demo quick-fill), Signup (with role select), OTP (6-digit), Forgot Password
- **Super Admin (13 pages)**: Dashboard, Live Monitoring, Users, Vehicles, IoT Devices, Trips, Incidents (with View dialog + service breakdown), Emergency Services Management (tabs + Onboard dialog), Alerts, Analytics (4 charts), Roles & Permissions, Settings, Security Logs
- **Police (4 pages)**: New Alerts (Accept/Reject), Active Cases (map + stage buttons), Completed Cases, Reports
- **Ambulance (3 pages)**: Incoming Alerts (Accept/Reject), Active Trips (map + Start/Pick/Reach), Completed Trips
- **Fire (3 pages)**: New Alerts (Accept), Active Incidents (map + Dispatch/On the way/Controlled/Close), Reports
- **Hospital (3 pages)**: Incoming Patients (Accept/Redirect/Reject), Bed Management (ICU/General/Emergency + ward map), Active Cases (Assign dialog with doctor picker)
- **Shared**: Sidebar, TopBar, KPI tiles, Severity/Status badges, Leaflet MapView, EmptyState, SectionCard
- **Design system**: Manrope (display) + Figtree (body), per-role accent colors, soft shadows, 8–12px radius, role-aware sidebar/buttons

## Verified
- Frontend testing agent: **100% success** across all 5 roles + auth flows
- Cross-role guards working (police → /admin redirects to /police)
- Leaflet maps render on Dashboard, Live Monitoring, Police/Ambulance/Fire active pages
- Toast notifications via sonner

## Backlog (P1/P2)
- P1: Wire to real backend (FastAPI + MongoDB) — incidents/users/devices CRUD, JWT auth
- P1: WebSocket-based live updates instead of static mock
- P2: Real-time SOS push notifications + browser push API
- P2: Multi-language i18n (Hindi, Marathi)
- P2: Mobile-responsive sidebar (hamburger drawer)
- P2: Export PDF for case reports
- P2: Geofencing rules editor for Super Admin

## Demo Credentials
See `/app/memory/test_credentials.md`.
