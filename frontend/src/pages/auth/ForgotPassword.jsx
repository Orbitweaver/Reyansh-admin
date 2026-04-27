import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/shared/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(`Reset link sent to ${email}`);
      setLoading(false);
      navigate("/login");
    }, 700);
  };

  return (
    <AuthShell
      title="Recover your account"
      subtitle="Enter your work email — we'll send a secure reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline" data-testid="goto-login-back">
            Back to sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" data-testid="forgot-form">
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="forgot-email" />
        </div>
        <Button type="submit" disabled={loading} className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800" data-testid="forgot-submit-button">
          {loading ? <Loader2 className="animate-spin" size={16} /> : <>Send reset link <ArrowRight size={16} className="ml-1.5" /></>}
        </Button>
      </form>
    </AuthShell>
  );
}
