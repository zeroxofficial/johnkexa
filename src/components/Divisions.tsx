import { useQuery } from "@tanstack/react-query";
import { Badge as BadgeIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "./Announcements";

export const Divisions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("divisions")
        .select("*, officers(count)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="divisions" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="03 / Αλυσιδα Διοικησης"
          title="Βαθμοι & Τμηματα"
          description="Δομημενες μοναδες. Σαφης αλυσιδα διοικησης. Καθορισμενοι ρολοι."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <div className="col-span-full font-mono text-sm text-muted-foreground">▸ Φορτωση μητρωου...</div>
          )}
          {data?.map((d, i) => {
            const count = (d.officers as unknown as { count: number }[])?.[0]?.count ?? 0;
            return (
              <div
                key={d.id}
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
                  {d.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
                  )}
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-muted-foreground">Αξιωματικοι · </span>
                    <span className="text-foreground">{count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
