"use client";

import React from "react";
import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "./testimonialsData";

const AVATAR_TONES = ["#16161a", "#e63946", "#b4232f", "#6b6760", "#c9a35b", "#2f3a4a"];

function tone(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TONES[h % AVATAR_TONES.length];
}

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function StoryCard({ t }: { t: Testimonial }) {
  const meta = [t.programme, t.intake].filter(Boolean).join(" · ");
  return (
    <figure className="group/card flex h-full flex-col justify-between rounded-[24px] border border-[var(--lp-rule)] bg-[var(--lp-card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--lp-rule-strong)] hover:shadow-[0_24px_50px_-25px_rgba(13,13,15,0.25)] sm:p-7">
      <div>
        <div className="flex items-center justify-between">
          {t.rating ? (
            <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < (t.rating ?? 0) ? "fill-[var(--lp-gold)] text-[var(--lp-gold)]" : "text-[var(--lp-rule-strong)]"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          <span aria-hidden className="lp-serif text-[38px] leading-[0.5] text-[var(--lp-red)] opacity-70">
            &rdquo;
          </span>
        </div>
        <blockquote className="mt-4 text-[14.5px] leading-[1.65] text-[var(--lp-text)]">
          {t.text}
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--lp-rule)] pt-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white shadow-sm"
          style={{ background: tone(t.name) }}
        >
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold text-[var(--lp-text)]">{t.name}</span>
          <span className="block truncate text-[12px] text-[var(--lp-muted)]">
            {t.university}
            {meta && <span className="text-[var(--lp-faint)]"> · {meta}</span>}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const total = testimonials.length;

  return (
    <section id="testimonials" className="lp-sheet relative overflow-hidden bg-[var(--lp-paper)] py-24 sm:py-28">
      <div className="lp-container">
        {/* Header row */}
        <div data-parallax="24" className="max-w-[720px]">
          <div data-reveal className="lp-eyebrow mb-4">
            Student stories
          </div>
          <h2 data-reveal className="lp-h2">
            In their <em className="lp-script text-[var(--lp-red)]">own words.</em>
          </h2>
          <p data-reveal className="lp-lead mt-4 max-w-[540px]">
            {total} verified students share how they went from initial application to their dream German campus.
          </p>
        </div>
      </div>

      {/* Auto Marquee Track */}
      <div
        className="lp-marquee relative mt-12 overflow-hidden py-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div
          className="lp-marquee-track flex gap-5"
          style={{
            animationDuration: "44s",
          }}
        >
          {/* Double the list to create a seamless infinite loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[320px] shrink-0 sm:w-[380px] md:w-[400px]"
              aria-hidden={i >= testimonials.length || undefined}
            >
              <StoryCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

