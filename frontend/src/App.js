import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, roleHomePath } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import OTPVerification from "@/pages/auth/OTPVerification";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import DashboardLayout from "@/components/shared/DashboardLayout";

// Super Admin
import AdminDashboard from "@/pages/superadmin/Dashboard";
import LiveMonitoring from "@/pages/superadmin/LiveMonitoring";
import UsersPage from "@/pages/superadmin/UsersPage";
import VehiclesPage from "@/pages/superadmin/VehiclesPage";
import DevicesPage from "@/pages/superadmin/DevicesPage";
import TripsPage from "@/pages/superadmin/TripsPage";
import IncidentsPage from "@/pages/superadmin/IncidentsPage";
import ServicesManagement from "@/pages/superadmin/ServicesManagement";
import AlertsPage from "@/pages/superadmin/AlertsPage";
import AnalyticsPage from "@/pages/superadmin/AnalyticsPage";
import RolesPage from "@/pages/superadmin/RolesPage";
import SettingsPage from "@/pages/superadmin/SettingsPage";
import SecurityLogsPage from "@/pages/superadmin/SecurityLogsPage";

// Police
import PoliceNewAlerts from "@/pages/police/NewAlerts";
import PoliceActiveCases from "@/pages/police/ActiveCases";
import PoliceCompletedCases from "@/pages/police/CompletedCases";
import PoliceReports from "@/pages/police/Reports";

// Ambulance
import AmbulanceIncoming from "@/pages/ambulance/IncomingAlerts";
import AmbulanceActive from "@/pages/ambulance/ActiveTrips";
import AmbulanceCompleted from "@/pages/ambulance/CompletedTrips";

// Fire
import FireAlerts from "@/pages/fire/NewAlerts";
import FireActive from "@/pages/fire/ActiveIncidents";
import FireReports from "@/pages/fire/Reports";

// Hospital
import HospitalIncoming from "@/pages/hospital/IncomingPatients";
import HospitalBeds from "@/pages/hospital/BedManagement";
import HospitalActive from "@/pages/hospital/ActiveCases";

function RootRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? roleHomePath(user.role) : "/login"} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      {/* Super Admin */}
      <Route path="/admin" element={<DashboardLayout role="super_admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="live" element={<LiveMonitoring />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="devices" element={<DevicesPage />} />
        <Route path="trips" element={<TripsPage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="security" element={<SecurityLogsPage />} />
      </Route>

      {/* Police */}
      <Route path="/police" element={<DashboardLayout role="police" />}>
        <Route index element={<PoliceNewAlerts />} />
        <Route path="active" element={<PoliceActiveCases />} />
        <Route path="completed" element={<PoliceCompletedCases />} />
        <Route path="reports" element={<PoliceReports />} />
      </Route>

      {/* Ambulance */}
      <Route path="/ambulance" element={<DashboardLayout role="ambulance" />}>
        <Route index element={<AmbulanceIncoming />} />
        <Route path="active" element={<AmbulanceActive />} />
        <Route path="completed" element={<AmbulanceCompleted />} />
      </Route>

      {/* Fire */}
      <Route path="/fire" element={<DashboardLayout role="fire" />}>
        <Route index element={<FireAlerts />} />
        <Route path="active" element={<FireActive />} />
        <Route path="reports" element={<FireReports />} />
      </Route>

      {/* Hospital */}
      <Route path="/hospital" element={<DashboardLayout role="hospital" />}>
        <Route index element={<HospitalIncoming />} />
        <Route path="beds" element={<HospitalBeds />} />
        <Route path="active" element={<HospitalActive />} />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    document.title = "SafeRoute IIoT · Multi-Service Console";
  }, []);
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
