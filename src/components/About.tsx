import { Crosshair, Eye, Shield } from "lucide-react";
import { SectionHeading } from "./Announcements";

export const About = () => {
  return (
    <section id="about" className="relative border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="02 / Mission Brief"
          title="About the Department"
          description="Who we are, what we stand for, and how we operate."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Serve",
              body: "We protect our community with integrity, vigilance, and accountability — every shift, every call.",
            },
            {
              icon: Crosshair,
              title: "Coordinate",
              body: "Tactical ops, structured ranks, real-time dispatch. We move as one squad with one objective.",
            },
            {
              icon: Eye,
              title: "Watch",
              body: "24/7 presence on Discord. From cadets to the chief — eyes are always on the channel.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden border border-border bg-card p-6"
              style={{ background: "var(--gradient-card)" }}
            >
              <Icon className="h-8 w-8 text-siren-blue transition-colors group-hover:text-siren-red" />
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              <div className="absolute -right-4 -top-4 font-mono text-7xl font-black text-foreground/[0.03]">
                0{title.length % 9}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
