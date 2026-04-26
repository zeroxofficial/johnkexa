import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/lib/constants";

const Auth = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(isAdmin ? "/admin" : "/", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Logging you in...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Authenticated.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dispatch
        </Link>

        <div className="border border-border bg-card p-8" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-panel)" }}>
          <div className="flex items-center gap-2.5">
            <Shield className="h-7 w-7 text-siren-blue" />
            <span className="font-display text-lg tracking-widest">{BRAND}</span>
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-siren-red">
            // Restricted access · Admin terminal
          </div>

          <div className="mt-6 flex border border-border">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  mode === m
                    ? "bg-siren-blue text-white"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Officer Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-siren-blue text-white hover:bg-siren-blue/90"
              style={{ boxShadow: "var(--shadow-glow-blue)" }}
            >
              {submitting ? "Processing..." : mode === "login" ? "Authenticate" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted-foreground">
            ▸ The first account registered automatically gets admin clearance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
