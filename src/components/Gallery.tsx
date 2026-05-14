import { useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "./Announcements";

const IMAGES = [
  { src: "/2026-03-27_211752.png", caption: "Επιχειρηση 27.03.2026" },
  { src: "/2026-04-04_152339.png", caption: "Επιχειρηση 04.04.2026" },
  { src: "/2026-04-05_163825.png", caption: "Επιχειρηση 05.04.2026" },
  { src: "/eidikes_dynameis.png", caption: "Ειδικες Δυναμεις" },
  { src: "/ekpaideuso.png", caption: "Εκπαιδευση" },
  { src: "/image-1.png", caption: "Επιχειρηση" },
  { src: "/police army.png", caption: "Police Army" },
  { src: "/peripolia.jpg", caption: "Δυναμικο" },
  { src: "/ready.png", caption: "Περιπολια" },
  { src: "/2026-4-29.png", caption: "2026-4-29" },
  { src: "/A20.png", caption: "Ο.Π.Κ.Ε" },
  { src: "/DINAMI.png", caption: "Περιπολια" },
  { src: "/DIAS.png", caption: "ΔΙΑΣ" },

  
];

export const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="border-b border-border py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="06 / Αρχειο"
          title="Γκαλερι Επιχειρησεων"
          description="Στιγμιοτυπα απο ενεργες αποστολες και εκπαιδευσεις."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="group relative cursor-pointer overflow-hidden border border-border bg-card"
              style={{ background: "var(--gradient-card)" }}
              onClick={() => setSelected(img.src)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="h-48 w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-4 top-4 text-white hover:text-siren-red"
            onClick={() => setSelected(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selected}
            alt="Gallery"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
