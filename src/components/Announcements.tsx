import { useQuery } from "@tanstack/react-query";
import { AlertOctagon, AlertTriangle, Info, ScrollText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const severityMap = {
  info: { icon: Info, label: "INFO", className: "border-siren-blue/40 text-siren-blue" },
  alert: { icon: AlertTriangle, label: "ALERT", className: "border-amber-500/50 text-amber-400" },
  critical: { icon: AlertOctagon, label: "CRITICAL", className: "border-siren-red text-siren-red animate-strobe" },
} as const;

export const Announcements = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["announcements", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="dispatch" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="01 / Dispatch"
          title="Dispatch Board"
          description="Active bulletins from command. Updated as situations evolve."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {isLoading && (
            <div className="col-span-full font-mono text-sm text-muted-foreground">
              ▸ Loading dispatch feed...
            </div>
          )}
          {!isLoading && data?.length === 0 && (
            <div className="col-span-full border border-dashed border-border bg-card/40 p-8 text-center font-mono text-sm text-muted-foreground">
              No active dispatches at this time.
            </div>
          )}
          {data?.map((a) => {
            const sev = severityMap[a.severity as keyof typeof severityMap] ?? severityMap.info;
            const Icon = sev.icon;
            return (
              <article
                key={a.id}
                className="group relative overflow-hidden border border-border bg-card p-6 transition-colors hover:border-siren-blue/40"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest">
                  <span className={`inline-flex items-center gap-1.5 border px-2 py-1 ${sev.className}`}>
                    <Icon className="h-3 w-3" />
                    {sev.label}
                  </span>
                  <span className="text-muted-foreground">
                    {format(new Date(a.created_at), "yyyy.MM.dd · HH:mm")}
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-tight">
                  {a.title}
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm text-foreground/80">
                  {a.body}
                </p>
                <ScrollText className="absolute right-4 top-4 h-24 w-24 text-foreground/[0.03] transition-transform group-hover:rotate-6" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: { eyebrow: string; title: string; description?: string }) => (
  <div className="max-w-2xl">
    <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-siren-red">
      // {eyebrow}
    </div>
    <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
    {description && (
      <p className="mt-3 text-base text-muted-foreground">{description}</p>
    )}
  </div>
);
