"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Translate a card by the pointer position (CSS vars --mx/--my, -1..1) times its depth. */
const depth = (d: number, rot: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--mx, 0) * ${d}px), calc(var(--my, 0) * ${d}px), 0) rotate(${rot}deg)`,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // pointer parallax for the card stack
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      m.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      m.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const loop = () => {
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;
      el.style.setProperty("--mx", m.x.toFixed(4));
      el.style.setProperty("--my", m.y.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // intro
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-line > span", { y: 40, opacity: 0, duration: 1.5, stagger: 0.1 }, 0.1)
        .from(".hero-fade", { y: 16, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.6)
        .from(".hero-card", { y: 90, opacity: 0, scale: 0.94, duration: 1.8 }, 0.25);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      data-stack
      className="relative isolate flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-[var(--lp-paper)] text-[var(--lp-text)]"
    >
      <div data-stack-inner className="flex h-full flex-col bg-[var(--lp-paper)]">
        {/* warm light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-[5%] h-[90vh] w-[70vw] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(231,211,168,0.55), rgba(244,241,234,0))" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[30%] left-[30%] h-[70vh] w-[50vw] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(230,57,70,0.10), rgba(244,241,234,0))" }}
        />

        <div className="h-[72px] shrink-0" />

        <div className="lp-container relative grid min-h-0 flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* copy */}
          <div className="relative z-10 max-w-[620px]">
            <div className="hero-fade mb-7 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Germany admissions consultancy
            </div>
            <h1
              className="lp-serif leading-[1.04] tracking-[-0.03em]"
              style={{ fontSize: "clamp(3rem, min(6.6vw, 12vh), 7.6rem)" }}
            >
              <span className="hero-line lp-line-mask">
                <span>Study in</span>
              </span>
              <span className="hero-line lp-line-mask">
                <span>Germany,</span>
              </span>
              <span className="hero-line lp-line-mask">
                <span>
                  <em className="lp-script text-[var(--lp-red)]">with certainty.</em>
                </span>
              </span>
            </h1>
            <p className="hero-fade mt-7 max-w-[440px] text-[16px] leading-[1.65] text-[var(--lp-muted)]">
              TU9 admissions, APS, blocked account and visa — guided end-to-end by alumni of Germany&apos;s top
              universities.
            </p>
            <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
              <Link href="/tools/admission-chance" className="lp-btn lp-btn--dark">
                Check admission chances <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#cta" className="lp-btn lp-btn--ghost">
                Book a consultation
              </Link>
            </div>
            <div className="hero-fade mt-10 flex items-center gap-4 [@media(max-height:700px)]:hidden">
              <div className="flex -space-x-2.5">
                {["A", "P", "R", "+"].map((c, i) => (
                  <span
                    key={c}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--lp-paper)] text-[12px] font-semibold ${
                      i === 3 ? "bg-[var(--lp-red)] text-white" : "bg-[var(--lp-ink)] text-white"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="text-[13px] leading-snug text-[var(--lp-muted)]">
                Students admitted to <span className="font-medium text-[var(--lp-text)]">TUM, RWTH &amp; HU Berlin</span>
              </div>
            </div>
          </div>

          {/* card composition — photographed */}
          <div className="relative hidden h-full min-h-0 items-center justify-center lg:flex">
            <div className="hero-card relative w-[118%] max-w-[820px] shrink-0 mix-blend-multiply [@media(max-height:720px)]:w-[100%]">
              <div style={depth(18, 0)}>
                <div className="animate-[lp-float_7s_ease-in-out_infinite] motion-reduce:animate-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero/hero-cards.webp"
                    alt="EuropeBridge boarding pass from New Delhi to Berlin, a letter of admission, an approved student visa and a funded blocked account"
                    width={1024}
                    height={712}
                    fetchPriority="high"
                    className="h-auto w-full select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div className="lp-container relative shrink-0 pb-6">
          <div className="hero-fade flex items-center justify-between border-t border-[var(--lp-rule-strong)] pt-4 text-[12px] text-[var(--lp-muted)]">
            <div className="hidden gap-8 sm:flex">
              <span>
                <b className="font-semibold text-[var(--lp-text)]">€0</b> public tuition
              </span>
              <span>
                <b className="font-semibold text-[var(--lp-text)]">99.2%</b> visa approval
              </span>
              <span>
                <b className="font-semibold text-[var(--lp-text)]">18-month</b> job seeker visa
              </span>
            </div>
            <Link href="/#our-process" className="flex items-center gap-2 uppercase tracking-[0.18em] hover:text-[var(--lp-text)]">
              Scroll
              <span className="relative block h-px w-10 overflow-hidden bg-[var(--lp-rule-strong)]">
                <span className="absolute inset-y-0 left-0 w-1/2 animate-[lp-scrollx_1.8s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-[var(--lp-ink)] motion-reduce:animate-none" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
