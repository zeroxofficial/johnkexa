import { Badge as BadgeIcon } from "lucide-react";
import { SectionHeading } from "./Announcements";

const DIVISIONS = [
  { name: "Ο.Δ.Υ.Σ", description: "Ομαδα Διαχειρισης Υποθεσεων Ασφαλειας", color: "#1e3a8a" },
  { name: "Ο.Δ.Α.Κ", description: "Ομαδα Διαχειρισης Ακραιων Καταστασεων", color: "#dc2626" },
  { name: "Ο.Ε.Σ", description: "Ομαδα Ειδικων Στοιχειων", color: "#16a34a" },
  { name: "Δ.Α.Π.Ο", description: "Διευθυνση Αντιμετωπισης Παραβατικης Οδηγησης", color: "#9333ea" },
  { name: "Ε.Μ.Α.Κ", description: "Ειδικη Μοναδα Αντιμετωπισης Καταστροφων", color: "#ea580c" },
  { name: "Τ.Ε.Ε", description: "Τμημα Ειδικων Επιχειρησεων", color: "#0891b2" },
  { name: "Ο.Ο.Ε", description: "Ομαδα Οργανωσης Επιχειρησεων", color: "#ca8a04" },
  { name: "Κεντρο", description: "Κεντρικη Διοικηση & Συντονισμος", color: "#475569" },
];

export const Divisions = () => {
  return (
    <section id="divisions" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="03 / Αλυσιδα Διοικησης"
          title="Βαθμοι & Τμηματα"
          description="Δομημενες μοναδες. Σαφης αλυσιδα διοικησης. Καθορισμενοι ρολοι."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIVISIONS.map((d, i) => (
            <div
              key={d.name}
              className="group relative flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-foreground/30"
              style={{ background: "var(--gradient-card)" }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center border"
                style={{
                  borderColor: d.color,
                  background: `${d.color}1a`,
                  boxShadow: `0 0 12px ${d.color}55`,
                }}
              >
                <BadgeIcon className="h-6 w-6" style={{ color: d.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg leading-tight">{d.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
