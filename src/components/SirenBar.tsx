import { Radio } from "lucide-react";

const TICKER = [
  "DISPATCH ONLINE",
  "ALL UNITS — REPORT IN",
  "RECRUITMENT ACTIVE",
  "JOIN DISCORD FOR LIVE OPS",
  "STATUS: CODE 4",
];

export const SirenBar = () => {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="h-1.5 w-full animate-siren" aria-hidden />
      <div className="flex items-center gap-3 border-b border-border bg-background/95 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur sm:text-xs">
        <span className="flex items-center gap-1.5 text-siren-red">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-strobe rounded-full bg-siren-red" />
          </span>
          LIVE
        </span>
        <span className="flex items-center gap-1.5 text-siren-blue">
          <Radio className="h-3 w-3" />
          DISPATCH
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="text-foreground/70">
                ▸ {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
