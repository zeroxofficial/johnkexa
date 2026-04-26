import { SectionHeading } from "./Announcements";

const RULES = [
  "Σεβασμος σε καθε μελος — μηδενικη ανοχη για παρενοχληση, υβριστικους χαρακτηρισμους η διακρισεις.",
  "Ακολουθηστε την αλυσιδα διοικησης. Οι αξιωματικοι υπακουν στον αμεσο ανωτερο τους.",
  "Απαγορευεται spam, περιεχομενο NSFW και διαφημιση σε οποιοδηποτε καναλι.",
  "Μεινετε εντος χαρακτηρα κατα τη διαρκεια ενεργων επιχειρησεων. Η εκτος παιχνιδιου συνομιλια γινεται στο #lounge.",
  "Κρατατε τα φωνητικα καναλια καθαρα κατα την αποστολη — πειθαρχια ραδιοφωνου ανα πασα στιγμη.",
  "Αναφερετε παραβιασεις κανονων σε εναν συντονιστη. Μην αντιμετωπιζετε απευθειας τους παραβατες.",
];

const REQUIREMENTS = [
  "Ελαχιστη ηλικια 16+ με ωριμη φωνη και συμπεριφορα.",
  "Λειτουργικο μικροφωνο για αποστολη και επιχειρησεις.",
  "Ενεργος τουλαχιστον 3 ημερες την εβδομαδα.",
  "Διαβαστε και αποδεχτειτε τους παραπανω κανονες πριν υποβαλετε αιτηση.",
];

export const Rules = () => {
  return (
    <section id="rules" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="05 / Μονιμες Εντολες"
          title="Κανονες & Απαιτησεις"
          description="Διαβαστε προσεκτικα. Εφαρμοζονται αυστηρα."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="border border-border bg-card p-6" style={{ background: "var(--gradient-card)" }}>
            <h3 className="font-display text-xl tracking-widest text-siren-red">Κανονες Server</h3>
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
            <h3 className="font-display text-xl tracking-widest text-siren-blue">Απαιτησεις Αιτησης</h3>
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
