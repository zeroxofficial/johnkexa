import { Crosshair, Eye, Shield } from "lucide-react";
import { SectionHeading } from "./Announcements";

export const About = () => {
  return (
    <section id="about" className="relative border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="02 / Εντολη Αποστολης"
          title="Σχετικα με το Τμημα"
          description="Ποιοι ειμαστε, τι υποστηριζουμε και πως λειτουργουμε."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Υπηρετουμε",
              body: "Προστατευουμε την κοινοτητα μας με ακεραιοτητα, επαγρυπνηση και υπευθυνοτητα — καθε βαρδια, καθε κληση.",
            },
            {
              icon: Crosshair,
              title: "Συντονιζομαστε",
              body: "Τακτικες επιχειρησεις, δομημενες βαθμιδες, αποστολη σε πραγματικο χρονο. Κινουμαστε ως μια ομαδα με εναν στοχο.",
            },
            {
              icon: Eye,
              title: "Παρακολουθουμε",
              body: "Παρουσια 24/7 στο Discord. Απο δοκιμους εως τον αρχηγο — τα ματια ειναι παντα στο καναλι.",
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
