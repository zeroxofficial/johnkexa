import { SectionHeading } from "./Announcements";

const RULES = [
  "Respect every member — zero tolerance for harassment, slurs, or discrimination.",
  "Follow the chain of command. Officers obey their direct rank superior.",
  "No spam, no NSFW content, no advertising in any channel.",
  "Stay in character during active operations. OOC chatter goes in #lounge.",
  "Keep voice channels clear during dispatch — radio discipline at all times.",
  "Report rule violations to a moderator. Do not engage offenders directly.",
];

const REQUIREMENTS = [
  "Minimum age 14+ with mature voice & conduct.",
  "Working microphone for dispatch and ops.",
  "Active at least 3 days per week.",
  "Read and accept the rules above before applying.",
];

export const Rules = () => {
  return (
    <section id="rules" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="05 / Standing Orders"
          title="Rules & Requirements"
          description="Read carefully. Enforced strictly."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="border border-border bg-card p-6" style={{ background: "var(--gradient-card)" }}>
            <h3 className="font-display text-xl tracking-widest text-siren-red">Server Rules</h3>
            <ol className="mt-4 space-y-3">
              {RULES.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-mono text-xs font-bold text-siren-red">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-foreground/80">{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-border bg-card p-6" style={{ background: "var(--gradient-card)" }}>
            <h3 className="font-display text-xl tracking-widest text-siren-blue">Application Requirements</h3>
            <ol className="mt-4 space-y-3">
              {REQUIREMENTS.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-mono text-xs font-bold text-siren-blue">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-foreground/80">{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
