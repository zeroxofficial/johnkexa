import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "./Announcements";

export const Officers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["officers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("officers")
        .select("*, divisions(name, color)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="officers" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="04 / Roster"
          title="Active Officers"
          description="Personnel currently on duty."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading && (
            <div className="col-span-full font-mono text-sm text-muted-foreground">▸ Loading personnel...</div>
          )}
          {!isLoading && data?.length === 0 && (
            <div className="col-span-full border border-dashed border-border p-8 text-center font-mono text-sm text-muted-foreground">
              No officers added yet.
            </div>
          )}
          {data?.map((o) => {
            const div = o.divisions as { name?: string; color?: string } | null;
            const color = div?.color ?? "#1e3a8a";
            return (
              <div
                key={o.id}
                className="group relative flex flex-col items-center border border-border bg-card p-4 text-center transition-colors hover:border-foreground/30"
                style={{ background: "var(--gradient-card)" }}
              >
                <div
                  className="relative h-20 w-20 overflow-hidden border"
                  style={{ borderColor: color }}
                >
                  {o.avatar_url ? (
                    <img
                      src={o.avatar_url}
                      alt={`Officer ${o.name}`}
                      className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 ring-1 ring-inset"
                    style={{ boxShadow: `inset 0 0 12px ${color}55` }}
                  />
                </div>
                <div className="mt-3 font-display text-base leading-tight">{o.name}</div>
                {o.badge_number && (
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Badge #{o.badge_number}
                  </div>
                )}
                {div?.name && (
                  <div
                    className="mt-2 inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                    style={{ borderColor: color, color }}
                  >
                    {div.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
