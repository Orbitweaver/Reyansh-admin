import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/shared/AuthShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth";

export default function OTPVerification() {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtp(code);
      toast.success("Verified — pending Super Admin approval. Use demo account to sign in.");
      sessionStorage.removeItem("pending_signup");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Verify your phone"
      subtitle="We sent a 6-digit code. For this demo, enter 123456."
      footer={
        <>
          Wrong number?{" "}
          <Link to="/signup" className="font-semibold text-slate-900 hover:underline" data-testid="goto-signup-back">
            Go back
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-6" data-testid="otp-form">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode} data-testid="otp-input">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          type="submit"
          disabled={loading || code.length !== 6}
          data-testid="otp-submit-button"
          className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <>Verify <ArrowRight size={16} className="ml-1.5" /></>}
        </Button>
        <p className="text-center text-xs text-slate-500">
          Didn't receive it? <button type="button" className="font-semibold text-slate-900 hover:underline">Resend code</button>
        </p>
      </form>
    </AuthShell>
  );
}
