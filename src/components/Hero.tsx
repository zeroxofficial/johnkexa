import { ExternalLink, Megaphone, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE, BRAND } from "@/lib/constants";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden />

      <div className="container relative z-10 flex flex-col items-center py-20 text-center sm:py-28 lg:py-36">
        <div className="mb-6 inline-flex items-center gap-2 border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-strobe rounded-full bg-siren-red" />
          Case File · 0xJK-2026
        </div>

        <h1 className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="text-foreground">{BRAND.split("–")[0]}</span>
          <span className="mx-2 text-siren-red">–</span>
          <span className="bg-gradient-to-r from-siren-blue to-siren-red bg-clip-text text-transparent">
            POLICE
          </span>
        </h1>

        <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
          // Tactical Operations · Dispatch Board · Recruitment Active
        </p>

        <p className="mt-4 max-w-xl text-base text-foreground/80 sm:text-lg">
          Serve. Dispatch. Protect. Join the squad coordinating live ops every day on Discord.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 min-w-[200px] gap-2 bg-siren-blue text-white hover:bg-siren-blue/90"
            style={{ boxShadow: "var(--shadow-glow-blue)" }}
          >
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Megaphone className="h-5 w-5" />
              Contact Us
              <ExternalLink className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group h-12 min-w-[200px] gap-2 border-siren-red bg-transparent text-siren-red hover:bg-siren-red hover:text-white"
            style={{ boxShadow: "var(--shadow-glow-red)" }}
          >
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <UserPlus className="h-5 w-5" />
              Apply Now
              <ExternalLink className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>

        <div className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:gap-6 sm:text-xs">
          <div>
            <div className="text-2xl font-bold text-foreground sm:text-3xl">24/7</div>
            <div className="mt-1">On-call</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground sm:text-3xl">5</div>
            <div className="mt-1">Divisions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-siren-red sm:text-3xl animate-blink">●</div>
            <div className="mt-1">Recruiting</div>
          </div>
        </div>
      </div>
    </section>
  );
};
