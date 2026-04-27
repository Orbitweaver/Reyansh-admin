import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "iiot_safety_session";

export const DEMO_ACCOUNTS = [
  {
    email: "admin@iiotsafety.io",
    password: "admin123",
    role: "super_admin",
    name: "Aarav Mehta",
    title: "Master Controller",
    serviceId: "ADM-001",
    region: "National",
  },
  {
    email: "police@iiotsafety.io",
    password: "police123",
    role: "police",
    name: "Inspector R. Kumar",
    title: "Bandra West Station",
    serviceId: "PD-MUM-014",
    region: "Mumbai - West",
  },
  {
    email: "ambulance@iiotsafety.io",
    password: "amb123",
    role: "ambulance",
    name: "Paramedic L. Joshi",
    title: "108 Unit · Andheri",
    serviceId: "AMB-MUM-027",
    region: "Mumbai - Andheri",
  },
  {
    email: "fire@iiotsafety.io",
    password: "fire123",
    role: "fire",
    name: "Captain S. Patil",
    title: "Borivali Fire Brigade",
    serviceId: "FS-MUM-009",
    region: "Mumbai - North",
  },
  {
    email: "hospital@iiotsafety.io",
    password: "hosp123",
    role: "hospital",
    name: "Dr. Priya Verma",
    title: "Lilavati Trauma Center",
    serviceId: "HSP-MUM-031",
    region: "Mumbai - Bandra",
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = async (email, password) => {
    const acct = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
    );
    if (!acct) throw new Error("Invalid credentials. Try the demo accounts shown below.");
    const { password: _pw, ...safe } = acct;
    setUser(safe);
    return safe;
  };

  const signup = async (payload) => {
    // Mock — auto-confirm + send to OTP
    return { ...payload, otpRequired: true };
  };

  const verifyOtp = async (code) => {
    if (code !== "123456") throw new Error("Invalid OTP. Use 123456 for demo.");
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function roleHomePath(role) {
  switch (role) {
    case "super_admin":
      return "/admin";
    case "police":
      return "/police";
    case "ambulance":
      return "/ambulance";
    case "fire":
      return "/fire";
    case "hospital":
      return "/hospital";
    default:
      return "/login";
  }
}
