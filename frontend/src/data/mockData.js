// Centralised mock data for the IIoT Smart Vehicle Safety Platform.
// Frontend-only, illustrative datasets used across all dashboards.

const SEVERITIES = ["critical", "high", "medium", "low"];
const STATUSES = ["pending", "acknowledged", "dispatched", "on_route", "on_scene", "completed"];

export const incidents = [
  {
    id: "INC-2041",
    vehicle: "MH-12-AX-7821",
    driver: "Rohit Sharma",
    severity: "critical",
    status: "dispatched",
    type: "Collision",
    location: "Western Express Hwy, Andheri",
    coords: [19.1197, 72.8468],
    timestamp: "2026-02-12T09:14:00Z",
    description: "Front-end collision detected — airbag deployed, G-force 6.2g",
    paramedic: "L. Joshi",
    eta: "6 min",
    services: { police: "on_route", ambulance: "on_route", fire: "pending", hospital: "acknowledged" },
  },
  {
    id: "INC-2040",
    vehicle: "MH-04-CD-1140",
    driver: "Sneha Patel",
    severity: "high",
    status: "on_scene",
    type: "Rollover",
    location: "Sion-Panvel Hwy, KM 23",
    coords: [19.0411, 73.0297],
    timestamp: "2026-02-12T08:42:00Z",
    description: "Tilt sensor flagged 78°, driver panic button pressed",
    paramedic: "K. Iyer",
    eta: "On scene",
    services: { police: "on_scene", ambulance: "on_scene", fire: "dispatched", hospital: "on_route" },
  },
  {
    id: "INC-2039",
    vehicle: "MH-02-BT-9921",
    driver: "Arjun Desai",
    severity: "medium",
    status: "acknowledged",
    type: "Hard Braking",
    location: "BKC Service Rd, Bandra",
    coords: [19.0625, 72.8645],
    timestamp: "2026-02-12T08:11:00Z",
    description: "Sudden deceleration 0.9g, no impact detected",
    paramedic: "—",
    eta: "—",
    services: { police: "acknowledged", ambulance: "pending", fire: "pending", hospital: "pending" },
  },
  {
    id: "INC-2038",
    vehicle: "MH-01-FG-4412",
    driver: "Meera Nair",
    severity: "low",
    status: "completed",
    type: "Speeding Alert",
    location: "Marine Drive, Mumbai",
    coords: [18.9438, 72.8231],
    timestamp: "2026-02-12T07:50:00Z",
    description: "Speeding flagged 92 km/h in 60 zone",
    paramedic: "—",
    eta: "—",
    services: { police: "completed", ambulance: "—", fire: "—", hospital: "—" },
  },
  {
    id: "INC-2037",
    vehicle: "MH-43-PQ-3318",
    driver: "Karan Singh",
    severity: "critical",
    status: "on_route",
    type: "Fire Detected",
    location: "Eastern Freeway, Chembur",
    coords: [19.0567, 72.8975],
    timestamp: "2026-02-12T07:32:00Z",
    description: "Engine bay temperature spike 248°C",
    paramedic: "—",
    eta: "4 min",
    services: { police: "dispatched", ambulance: "dispatched", fire: "on_route", hospital: "acknowledged" },
  },
  {
    id: "INC-2036",
    vehicle: "MH-12-WS-6210",
    driver: "Anika Bose",
    severity: "high",
    status: "completed",
    type: "Collision",
    location: "JVLR Junction, Powai",
    coords: [19.1197, 72.9051],
    timestamp: "2026-02-12T06:54:00Z",
    description: "Side-impact, secondary vehicle present",
    paramedic: "M. Khan",
    eta: "—",
    services: { police: "completed", ambulance: "completed", fire: "—", hospital: "completed" },
  },
];

export const vehicles = [
  { id: "VH-1024", plate: "MH-12-AX-7821", model: "Tata Nexon EV", owner: "Rohit Sharma", device: "IOT-A21F", status: "active", health: 96, lastTrip: "2026-02-12 09:00", coords: [19.1197, 72.8468] },
  { id: "VH-1025", plate: "MH-04-CD-1140", model: "Hyundai Creta", owner: "Sneha Patel", device: "IOT-A22B", status: "active", health: 88, lastTrip: "2026-02-12 08:30", coords: [19.0411, 73.0297] },
  { id: "VH-1026", plate: "MH-02-BT-9921", model: "Mahindra XUV700", owner: "Arjun Desai", device: "IOT-A22C", status: "idle", health: 92, lastTrip: "2026-02-12 08:00", coords: [19.0625, 72.8645] },
  { id: "VH-1027", plate: "MH-01-FG-4412", model: "Maruti Baleno", owner: "Meera Nair", device: "IOT-A22D", status: "active", health: 79, lastTrip: "2026-02-12 07:45", coords: [18.9438, 72.8231] },
  { id: "VH-1028", plate: "MH-43-PQ-3318", model: "Toyota Innova", owner: "Karan Singh", device: "IOT-A22E", status: "alert", health: 41, lastTrip: "2026-02-12 07:20", coords: [19.0567, 72.8975] },
  { id: "VH-1029", plate: "MH-12-WS-6210", model: "Kia Seltos", owner: "Anika Bose", device: "IOT-A22F", status: "offline", health: 0, lastTrip: "2026-02-12 06:50", coords: [19.1197, 72.9051] },
  { id: "VH-1030", plate: "MH-14-RT-7740", model: "Honda City", owner: "Vikram Joshi", device: "IOT-A230", status: "active", health: 84, lastTrip: "2026-02-12 09:10", coords: [19.0760, 72.8777] },
];

export const users = [
  { id: "USR-501", name: "Rohit Sharma", phone: "+91 98201 11122", bloodGroup: "B+", emergency: "+91 98203 22211", drivingScore: 78, role: "Driver" },
  { id: "USR-502", name: "Sneha Patel", phone: "+91 98202 22233", bloodGroup: "O-", emergency: "+91 98201 33344", drivingScore: 85, role: "Driver" },
  { id: "USR-503", name: "Arjun Desai", phone: "+91 98203 33344", bloodGroup: "A+", emergency: "+91 98204 44455", drivingScore: 91, role: "Driver" },
  { id: "USR-504", name: "Meera Nair", phone: "+91 98204 44455", bloodGroup: "AB+", emergency: "+91 98205 55566", drivingScore: 64, role: "Driver" },
  { id: "USR-505", name: "Karan Singh", phone: "+91 98205 55566", bloodGroup: "B-", emergency: "+91 98206 66677", drivingScore: 52, role: "Driver" },
  { id: "USR-506", name: "Anika Bose", phone: "+91 98206 66677", bloodGroup: "O+", emergency: "+91 98207 77788", drivingScore: 88, role: "Driver" },
  { id: "USR-507", name: "Vikram Joshi", phone: "+91 98207 77788", bloodGroup: "A-", emergency: "+91 98208 88899", drivingScore: 73, role: "Driver" },
];

export const devices = [
  { id: "IOT-A21F", model: "SafetyHub v3.2", firmware: "3.2.4", battery: 94, signal: 4, status: "online", vehicle: "MH-12-AX-7821", lastPing: "12s ago" },
  { id: "IOT-A22B", model: "SafetyHub v3.2", firmware: "3.2.4", battery: 87, signal: 4, status: "online", vehicle: "MH-04-CD-1140", lastPing: "9s ago" },
  { id: "IOT-A22C", model: "SafetyHub v3.1", firmware: "3.1.9", battery: 71, signal: 3, status: "online", vehicle: "MH-02-BT-9921", lastPing: "21s ago" },
  { id: "IOT-A22D", model: "SafetyHub v3.2", firmware: "3.2.3", battery: 56, signal: 3, status: "online", vehicle: "MH-01-FG-4412", lastPing: "44s ago" },
  { id: "IOT-A22E", model: "SafetyHub v3.0", firmware: "3.0.7", battery: 12, signal: 2, status: "warning", vehicle: "MH-43-PQ-3318", lastPing: "1m ago" },
  { id: "IOT-A22F", model: "SafetyHub v3.2", firmware: "3.2.4", battery: 0, signal: 0, status: "offline", vehicle: "MH-12-WS-6210", lastPing: "2h ago" },
];

export const trips = [
  { id: "TRP-9081", vehicle: "MH-12-AX-7821", from: "Andheri", to: "BKC", distance: "11.2 km", duration: "28m", score: 88, harshEvents: 1, when: "Today, 09:00" },
  { id: "TRP-9080", vehicle: "MH-04-CD-1140", from: "Vashi", to: "Sion", distance: "18.5 km", duration: "41m", score: 74, harshEvents: 3, when: "Today, 08:30" },
  { id: "TRP-9079", vehicle: "MH-02-BT-9921", from: "Bandra", to: "Worli", distance: "9.1 km", duration: "22m", score: 92, harshEvents: 0, when: "Today, 08:00" },
  { id: "TRP-9078", vehicle: "MH-01-FG-4412", from: "Colaba", to: "Marine Dr", distance: "4.8 km", duration: "12m", score: 67, harshEvents: 2, when: "Today, 07:45" },
  { id: "TRP-9077", vehicle: "MH-43-PQ-3318", from: "Powai", to: "Chembur", distance: "14.6 km", duration: "36m", score: 58, harshEvents: 4, when: "Today, 07:20" },
];

export const services = {
  police: [
    { id: "PD-MUM-014", name: "Bandra West Station", region: "Mumbai - West", contact: "+91 22 2640 0001", units: 8, status: "active" },
    { id: "PD-MUM-022", name: "Andheri East Station", region: "Mumbai - East", contact: "+91 22 2680 0014", units: 12, status: "active" },
    { id: "PD-MUM-031", name: "Powai Station", region: "Mumbai - Central", contact: "+91 22 2570 0015", units: 6, status: "active" },
  ],
  hospital: [
    { id: "HSP-MUM-031", name: "Lilavati Trauma Center", region: "Mumbai - Bandra", contact: "+91 22 2675 1000", icu: 4, general: 22, status: "active" },
    { id: "HSP-MUM-018", name: "Hiranandani Hospital", region: "Mumbai - Powai", contact: "+91 22 2576 3300", icu: 7, general: 18, status: "active" },
    { id: "HSP-MUM-009", name: "Kokilaben Dhirubhai", region: "Mumbai - Andheri", contact: "+91 22 4269 6969", icu: 12, general: 41, status: "active" },
  ],
  fire: [
    { id: "FS-MUM-009", name: "Borivali Fire Brigade", region: "Mumbai - North", contact: "+91 22 2890 1010", trucks: 5, status: "active" },
    { id: "FS-MUM-012", name: "Byculla Fire Station", region: "Mumbai - South", contact: "+91 22 2300 1010", trucks: 4, status: "active" },
  ],
  ambulance: [
    { id: "AMB-MUM-027", name: "108 Unit · Andheri", region: "Mumbai - Andheri", contact: "108", crews: 3, status: "active" },
    { id: "AMB-MUM-014", name: "108 Unit · Bandra", region: "Mumbai - Bandra", contact: "108", crews: 4, status: "active" },
  ],
};

export const alerts = [
  { id: "ALT-7732", title: "Critical airbag deployment", vehicle: "MH-12-AX-7821", severity: "critical", time: "2m ago", category: "incident" },
  { id: "ALT-7731", title: "Device IOT-A22E low battery", vehicle: "MH-43-PQ-3318", severity: "high", time: "14m ago", category: "device" },
  { id: "ALT-7730", title: "Driver fatigue detected", vehicle: "MH-04-CD-1140", severity: "medium", time: "31m ago", category: "behavior" },
  { id: "ALT-7729", title: "Geofence breach", vehicle: "MH-02-BT-9921", severity: "low", time: "1h ago", category: "policy" },
  { id: "ALT-7728", title: "Hard cornering event", vehicle: "MH-01-FG-4412", severity: "medium", time: "2h ago", category: "behavior" },
];

export const securityLogs = [
  { id: "LOG-9001", actor: "admin@iiotsafety.io", action: "Override case INC-2040", ip: "10.12.4.21", time: "Today, 09:11" },
  { id: "LOG-9000", actor: "police@iiotsafety.io", action: "Login success", ip: "49.207.55.12", time: "Today, 09:04" },
  { id: "LOG-8999", actor: "ambulance@iiotsafety.io", action: "Accept alert ALT-7732", ip: "49.207.55.18", time: "Today, 09:02" },
  { id: "LOG-8998", actor: "fire@iiotsafety.io", action: "Login success", ip: "49.207.55.21", time: "Today, 08:55" },
  { id: "LOG-8997", actor: "hospital@iiotsafety.io", action: "Accept patient INC-2040", ip: "49.207.55.30", time: "Today, 08:43" },
  { id: "LOG-8996", actor: "admin@iiotsafety.io", action: "Onboard service HSP-MUM-009", ip: "10.12.4.21", time: "Yesterday, 22:11" },
];

export const roles = [
  { id: "ROL-01", name: "Super Admin", scope: "Global", users: 2, permissions: ["view", "edit", "assign", "override", "create"] },
  { id: "ROL-02", name: "Admin", scope: "Region", users: 5, permissions: ["view", "edit", "assign"] },
  { id: "ROL-03", name: "Manager", scope: "Service", users: 12, permissions: ["view", "assign"] },
  { id: "ROL-04", name: "Service User", scope: "Service", users: 84, permissions: ["view"] },
];

// Patient queue for hospitals
export const patients = [
  { id: "PAT-3301", name: "Rohit Sharma", incident: "INC-2041", severity: "critical", eta: "6 min", vitals: "BP 90/60 · HR 122", needs: "Trauma + Surgery", status: "incoming" },
  { id: "PAT-3300", name: "Sneha Patel", incident: "INC-2040", severity: "high", eta: "On site", vitals: "BP 110/72 · HR 98", needs: "Orthopaedic", status: "incoming" },
  { id: "PAT-3299", name: "Karan Singh", incident: "INC-2037", severity: "critical", eta: "12 min", vitals: "BP 80/50 · HR 130", needs: "Burn unit", status: "incoming" },
  { id: "PAT-3298", name: "Anika Bose", incident: "INC-2036", severity: "low", eta: "Discharged", vitals: "Stable", needs: "Observation", status: "completed" },
];

export const beds = {
  icu: { total: 12, occupied: 8, available: 4 },
  general: { total: 60, occupied: 38, available: 22 },
  emergency: { total: 8, occupied: 5, available: 3 },
};

// Analytics
export const analytics = {
  responseTimeTrend: [
    { day: "Mon", police: 8.2, ambulance: 9.4, fire: 11.1 },
    { day: "Tue", police: 7.8, ambulance: 9.0, fire: 10.6 },
    { day: "Wed", police: 9.1, ambulance: 10.2, fire: 12.0 },
    { day: "Thu", police: 7.5, ambulance: 8.6, fire: 10.4 },
    { day: "Fri", police: 8.0, ambulance: 9.1, fire: 11.0 },
    { day: "Sat", police: 9.4, ambulance: 10.5, fire: 12.5 },
    { day: "Sun", police: 8.7, ambulance: 9.8, fire: 11.7 },
  ],
  accidentTrend: [
    { month: "Sep", count: 124 },
    { month: "Oct", count: 138 },
    { month: "Nov", count: 121 },
    { month: "Dec", count: 156 },
    { month: "Jan", count: 142 },
    { month: "Feb", count: 98 },
  ],
  severitySplit: [
    { name: "Critical", value: 14 },
    { name: "High", value: 28 },
    { name: "Medium", value: 41 },
    { name: "Low", value: 17 },
  ],
  drivingScore: [
    { score: "90-100", drivers: 18 },
    { score: "75-89", drivers: 42 },
    { score: "50-74", drivers: 31 },
    { score: "<50", drivers: 9 },
  ],
};

export { SEVERITIES, STATUSES };
