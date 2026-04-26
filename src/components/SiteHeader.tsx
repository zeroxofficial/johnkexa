import { Link, useLocation } from "react-router-dom";
import { Shield, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BRAND } from "@/lib/constants";

export const SiteHeader = () => {
  const { user, isAdmin } = useAuth();
  const loc = useLocation();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <Shield className="h-6 w-6 text-siren-blue transition-colors group-hover:text-siren-red" />
          <span className="font-display text-lg font-bold tracking-widest sm:text-xl">
            {BRAND}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest md:flex">
          {[
            ["#dispatch", "Αποστολη"],
            ["#about", "Σχετικα"],
            ["#divisions", "Τμηματα"],
            ["#officers", "Αξιωματικοι"],
            ["#rules", "Κανονες"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={loc.pathname === "/" ? href : `/${href}`}
              className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button asChild variant="outline" size="sm" className="hidden border-siren-blue/40 text-siren-blue hover:bg-siren-blue/10 hover:text-siren-blue sm:inline-flex">
              <Link to="/admin">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Διαχειριστης
              </Link>
            </Button>
          )}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => supabase.auth.signOut()}
            >
              <LogOut className="mr-1.5 h-4 w-4" />
              Αποσυνδεση
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">
                <LogIn className="mr-1.5 h-4 w-4" />
                Συνδεση
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
