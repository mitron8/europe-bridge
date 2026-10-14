"use client";

import React from "react";

const universities = [
  { name: "Technical University of Munich", logo: "/universities/tum.svg" },
  { name: "RWTH Aachen University", logo: "/universities/rwth.svg" },
  { name: "Karlsruhe Institute of Technology", logo: "/universities/kit.svg" },
  { name: "TU Berlin", logo: "/universities/tu-berlin.svg" },
  { name: "LMU Munich", logo: "/universities/lmu.svg" },
  { name: "Heidelberg University", logo: "/universities/heidelberg.svg" },
  { name: "University of Stuttgart", logo: "/universities/stuttgart.svg" },
  { name: "TU Darmstadt", logo: "/universities/darmstadt.svg" },
  { name: "Humboldt University of Berlin", logo: "/universities/humboldt.svg" },
];

export default function UniversityStrip() {
  return (
    <section aria-label="Universities" className="lp-sheet relative border-b border-[var(--lp-rule)] bg-[var(--lp-paper)] py-14 sm:py-16">
      <div data-parallax="18" className="lp-container mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div data-reveal className="lp-eyebrow">Where our students study</div>
        <p data-reveal className="max-w-md text-[14px] leading-relaxed text-[var(--lp-muted)] sm:text-right">
          Direct admissions and mentorship across Germany&apos;s leading public universities.
        </p>
      </div>

      <div className="lp-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--lp-paper)] to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--lp-paper)] to-transparent sm:w-48" />
        <div className="lp-marquee-track items-center">
          {[...universities, ...universities].map((u, i) => (
            <div key={i} title={u.name} className="flex h-16 shrink-0 items-center px-8 sm:px-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={u.logo}
                alt={u.name}
                loading="lazy"
                className="h-9 w-auto max-w-[150px] object-contain opacity-55 mix-blend-multiply grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:h-11"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
