import { ExternalLink, Megaphone, Shield, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, DISCORD_INVITE } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="relative">
      <div className="border-b border-border py-20 sm:py-24">
        <div className="container">
          <div
            className="relative overflow-hidden border border-border p-8 text-center sm:p-14"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-siren-red">
                // Κωδικος 4 · Ετοιμοι για αναπτυξη
              </div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Γινε μελος της ομαδας στο <span className="text-siren-blue">Discord</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Πατα ενα κουμπι. Παρε την προσκληση. Ετοιμασου.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 min-w-[200px] gap-2 bg-siren-blue text-white hover:bg-siren-blue/90"
                  style={{ boxShadow: "var(--shadow-glow-blue)" }}
                >
                  <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                    <Megaphone className="h-5 w-5" />
                    Επικοινωνια
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 min-w-[200px] gap-2 border-siren-red bg-transparent text-siren-red hover:bg-siren-red hover:text-white"
                  style={{ boxShadow: "var(--shadow-glow-red)" }}
                >
                  <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                    <UserPlus className="h-5 w-5" />
                    Apply Now
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Shield className="h-4 w-4 text-siren-blue" />
          {BRAND} · © {new Date().getFullYear()}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Κατασταση: <span className="text-siren-red animate-blink">●</span> ΕΝΕΡΓΟ
        </div>
      </div>
    </footer>
  );
};
