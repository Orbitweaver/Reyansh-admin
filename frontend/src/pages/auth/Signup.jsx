import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/shared/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "police",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target ? e.target.value : e });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      sessionStorage.setItem("pending_signup", JSON.stringify(form));
      toast.success("OTP sent to your phone (demo: 123456)");
      navigate("/otp");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Request service access"
      subtitle="Onboarding requires Super Admin verification. We'll send an OTP to confirm."
      footer={
        <>
          Already onboarded?{" "}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline" data-testid="goto-login">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" data-testid="signup-form">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={form.name} onChange={update("name")} required data-testid="signup-name" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" value={form.email} onChange={update("email")} required data-testid="signup-email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={update("phone")} required data-testid="signup-phone" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Service type</Label>
          <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
            <SelectTrigger data-testid="signup-role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="police">Police Station</SelectItem>
              <SelectItem value="ambulance">Ambulance (108)</SelectItem>
              <SelectItem value="fire">Fire Station</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={form.password} onChange={update("password")} required data-testid="signup-password" />
        </div>
        <Button type="submit" disabled={loading} className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800" data-testid="signup-submit">
          {loading ? <Loader2 className="animate-spin" size={16} /> : <>Continue <ArrowRight size={16} className="ml-1.5" /></>}
        </Button>
      </form>
    </AuthShell>
  );
}
