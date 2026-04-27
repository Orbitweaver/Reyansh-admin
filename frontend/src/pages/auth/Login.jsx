import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/shared/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, DEMO_ACCOUNTS, roleHomePath } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome, ${u.name.split(" ")[0]}`);
      navigate(roleHomePath(u.role));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acct) => {
    setEmail(acct.email);
    setPassword(acct.password);
  };

  return (
    <AuthShell
      title="Sign in to Reyansh"
      subtitle="Operate with confidence — multi-service emergency console."
      footer={
        <>
          New service?{" "}
          <Link to="/signup" className="font-semibold text-slate-900 hover:underline" data-testid="goto-signup">
            Request access
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" data-testid="login-form">
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@iiotsafety.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="login-email-input"
            required
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot" className="text-xs font-medium text-slate-500 hover:text-slate-900" data-testid="goto-forgot">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="login-password-input"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-slate-700"
              data-testid="toggle-password"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          data-testid="login-submit-button"
          className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <>Sign in <ArrowRight size={16} className="ml-1.5" /></>}
        </Button>
      </form>

      <div className="mt-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Demo accounts
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.role}
              type="button"
              onClick={() => fillDemo(a)}
              data-testid={`demo-${a.role}`}
              className="group flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-left transition hover:border-slate-200 hover:bg-white"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold capitalize text-slate-900">
                  {a.role.replace("_", " ")}
                </p>
                <p className="truncate font-mono text-[10px] text-slate-500">{a.email}</p>
              </div>
              <ArrowRight size={12} className="text-slate-400 group-hover:text-slate-900" />
            </button>
          ))}
        </div>
      </div>
    </AuthShell>
  );
}
