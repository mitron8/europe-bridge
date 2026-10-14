"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, GraduationCap, Minus, Navigation, Plus, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const steps = [
  {
    phase: "Start",
    place: "Mitte",
    title: "Create your account",
    desc: "Sign up in under two minutes and unlock every free tool, checklist and calculator on the platform.",
    points: ["Free profile and personal dashboard", "Admission-chance and grade tools", "A document checklist built for your case"],
  },
  {
    phase: "Evaluate",
    place: "Prenzlauer Berg",
    title: "Upload your documents",
    desc: "Share your transcripts, test scores and CV. Our AI evaluates your profile the moment they land.",
    points: ["German grade via the Bavarian formula", "ECTS and prerequisite audit", "A first university shortlist"],
  },
  {
    phase: "Plan",
    place: "Kreuzberg",
    title: "Talk to your guide",
    desc: "Get matched with a TU9 alumni mentor who builds your admission strategy with you, not for you.",
    points: ["One-on-one strategy session", "Programme and intake planning", "Direction for your SOP and LORs"],
  },
  {
    phase: "Commit",
    place: "Tiergarten",
    title: "Choose your plan",
    desc: "Pick the level of support that fits — focused single services or a fully done-with-you package.",
    points: ["Transparent, flat fees", "Services you can pick individually", "Done-with-you packages from ₹29,999"],
  },
  {
    phase: "Arrive",
    place: "Campus · Charlottenburg",
    title: "Journey to Germany",
    desc: "We handle applications, APS, blocked account and visa — and stay with you after you land.",
    points: ["Uni-Assist and direct applications", "APS, blocked account and insurance", "Visa appointment and arrival support"],
  },
];

/* ------------------------------------------------------------------ */
/*  Map geometry (2400 × 1600 units)                                   */
/* ------------------------------------------------------------------ */

const MAP_W = 2400;
const MAP_H = 1600;

const checkpoints: [number, number][] = [
  [1560, 720],
  [1820, 380],
  [1780, 1150],
  [1100, 980],
  [520, 760],
];

const legs = [
  "M1560 720 L1600 640 Q1620 600 1660 580 L1760 520 Q1800 500 1808 460 L1820 380",
  "M1820 380 L1900 420 Q1940 440 1940 490 L1930 760 Q1928 800 1900 830 L1800 960 Q1780 990 1781 1030 L1780 1150",
  "M1780 1150 L1600 1120 Q1560 1112 1520 1090 L1300 1000 Q1260 985 1220 984 L1100 980",
  "M1100 980 L960 940 Q920 928 890 900 L760 820 Q730 800 690 795 L520 760",
];

// camera per checkpoint: [cx, cy, zoom]
const cams: [number, number, number][] = [
  [1560, 700, 2.3],
  [1800, 430, 2.2],
  [1760, 1080, 2.2],
  [1120, 940, 2.2],
  [600, 780, 2.0],
];

const majorRoads = [
  { id: "r17", d: "M150 800 L1560 712", name: "Straße des 17. Juni" },
  { id: "rkma", d: "M1600 640 L2400 560", name: "Karl-Marx-Allee" },
  { id: "rfri", d: "M1490 120 L1560 1540", name: "Friedrichstraße" },
  { id: "rkud", d: "M120 990 L900 862", name: "Kurfürstendamm" },
  { id: "rsud", d: "M0 1260 C700 1150 1500 1300 2400 1210", name: "Gneisenaustraße" },
  { id: "rnord", d: "M900 120 C1200 260 1500 300 2400 230", name: "Bernauer Straße" },
  { id: "rost", d: "M1940 120 L1930 1560", name: "Warschauer Straße" },
];

/* ------------------------------------------------------------------ */

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

export default function MapRoadmap() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const legRefs = useRef<(SVGPathElement | null)[]>([]);
  const head = useRef<SVGGElement>(null);
  const pinRefs = useRef<(SVGGElement | null)[]>([]);
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const s = svg.current;
    const p = panel.current;
    if (!s || !p) return;

    const lens = legRefs.current.map((l) => (l ? l.getTotalLength() : 1));
    legRefs.current.forEach((l, i) => {
      if (!l) return;
      l.style.strokeDasharray = `${lens[i]} ${lens[i]}`;
      l.style.strokeDashoffset = `${lens[i]}`;
    });

    const render = (prog: number) => {
      progressRef.current = prog;
      const sNorm = Math.min(0.99999, Math.max(0, prog)) * (checkpoints.length - 1);
      const seg = Math.floor(sNorm);
      const t = sNorm - seg;
      // dwell at each checkpoint, travel in the middle of the segment
      const te = smooth(Math.min(1, Math.max(0, (t - 0.18) / 0.64)));

      // camera fly-to with a little zoom-out while travelling
      const a = cams[seg];
      const b = cams[Math.min(seg + 1, cams.length - 1)];
      const cx = a[0] + (b[0] - a[0]) * te;
      const cy = a[1] + (b[1] - a[1]) * te;
      const z = (a[2] + (b[2] - a[2]) * te) * (1 - 0.28 * Math.sin(te * Math.PI));
      const aspect = p.clientWidth / Math.max(1, p.clientHeight);
      const vw = MAP_W / z;
      const vh = vw / aspect;
      s.setAttribute("viewBox", `${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}`);

      // keep markers a constant on-screen size
      const k = vw / 1050;
      pinRefs.current.forEach((pin, i) => {
        if (!pin) return;
        const [x, y] = checkpoints[i];
        pin.setAttribute("transform", `translate(${x} ${y}) scale(${k})`);
      });

      // draw the route
      legRefs.current.forEach((l, i) => {
        if (!l) return;
        const f = i < seg ? 1 : i === seg ? te : 0;
        l.style.strokeDashoffset = `${lens[i] * (1 - f)}`;
      });

      // moving "you are here" dot
      const legEl = legRefs.current[Math.min(seg, legs.length - 1)];
      if (legEl && head.current) {
        const f = seg >= legs.length ? 1 : te;
        const pt = legEl.getPointAtLength(lens[Math.min(seg, legs.length - 1)] * f);
        head.current.setAttribute("transform", `translate(${pt.x} ${pt.y}) scale(${k})`);
      }

      if (fill.current) fill.current.style.transform = `scaleY(${prog})`;

      const idx = Math.min(checkpoints.length - 1, seg + (te > 0.5 ? 1 : 0));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };

    render(0);
    const proxy = { p: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p),
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 4.2,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    const ro = new ResizeObserver(() => render(progressRef.current));
    ro.observe(p);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  const jumpTo = (i: number) => {
    const st = ScrollTrigger.getAll().find((t) => t.trigger === section.current && t.pin);
    if (!st) return;
    const target = st.start + ((st.end - st.start) * i) / (checkpoints.length - 1);
    const lenis = window.__lpLenis;
    if (lenis) lenis.scrollTo(target + 2, { duration: 1.6 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const step = steps[active];

  return (
    <section id="our-process" ref={section} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[var(--lp-paper)]">
      <div className="lp-container flex h-full flex-col gap-5 pb-6 pt-[88px] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16 lg:pb-10 lg:pt-[92px] xl:gap-24">
        {/* ---------------- Info (left) ---------------- */}
        <div className="order-2 flex min-h-0 flex-col justify-center lg:order-1">
          <div className="lp-eyebrow mb-4 hidden lg:inline-flex">The journey</div>
          <h2 className="lp-serif hidden text-[clamp(2rem,3vw,3rem)] leading-[1.02] tracking-[-0.02em] lg:block">
            Five stages. <em className="lp-script text-[var(--lp-red)]">One route.</em>
          </h2>

          {/* step tabs */}
          <div className="mt-2 lg:mt-8">
            <div className="grid grid-cols-5 gap-2">
              {steps.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => jumpTo(i)}
                  className="group text-left"
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                >
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-[var(--lp-rule-strong)]">
                    <span
                      className={`absolute inset-0 origin-left rounded-full bg-[var(--lp-red)] transition-transform duration-700 ${i <= active ? "scale-x-100" : "scale-x-0"
                        }`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                    />
                  </span>
                  <span
                    className={`mt-2.5 block text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${i === active ? "text-[var(--lp-text)]" : "text-[var(--lp-faint)] group-hover:text-[var(--lp-muted)]"
                      }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                    <span className="hidden xl:inline"> · {s.phase}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* step content — fixed footprint so nothing below can be overlapped */}
          <div className="relative mt-5 min-h-[230px] lg:mt-9 lg:min-h-[330px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4">
                  <span className="lp-serif text-[44px] leading-none text-[var(--lp-red)] lg:text-[60px]">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-[var(--lp-rule-strong)]" />
                  <span className="text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-[var(--lp-muted)]">
                    {step.phase}
                    <br />
                    {step.place}
                  </span>
                </div>
                <h3 className="lp-serif mt-4 text-[28px] leading-[1.08] lg:mt-5 lg:text-[38px]">{step.title}</h3>
                <p className="mt-3 max-w-[440px] text-[14.5px] leading-[1.65] text-[var(--lp-muted)] lg:text-[15.5px]">
                  {step.desc}
                </p>
                <ul className="mt-5 hidden space-y-2 sm:block [@media(max-height:700px)]:!hidden">
                  {step.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[14px]">
                      <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--lp-red)]" strokeWidth={2.5} />
                      {pt}
                    </li>
                  ))}
                </ul>
                {active === steps.length - 1 && (
                  <Link href="/signup" className="lp-btn lp-btn--dark mt-6">
                    Start your journey <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------------- Map (right) ---------------- */}
        <div className="order-1 h-[40%] shrink-0 lg:order-2 lg:h-[min(66vh,580px)]">
          <div
            ref={panel}
            className="relative h-full overflow-hidden rounded-[28px] border border-[var(--lp-rule)] bg-[#f1efea] shadow-[0_40px_90px_-50px_rgba(13,13,15,0.45)]"
          >
            <svg ref={svg} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
              <defs>
                <pattern id="lp-blocks" width="86" height="86" patternUnits="userSpaceOnUse">
                  <rect width="86" height="86" fill="#ebe8e1" />
                  <rect x="9" y="9" width="70" height="70" rx="5" fill="#e7e3db" />
                  <path d="M0 4.5 H86 M4.5 0 V86" stroke="#ffffff" strokeWidth="9" />
                </pattern>
                <pattern id="lp-blocks-b" width="70" height="104" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
                  <rect width="70" height="104" fill="#ebe8e1" />
                  <rect x="8" y="8" width="58" height="90" rx="5" fill="#e6e2da" />
                  <path d="M0 4 H70 M4 0 V104" stroke="#ffffff" strokeWidth="8" />
                </pattern>
                <pattern id="lp-blocks-c" width="96" height="76" patternUnits="userSpaceOnUse" patternTransform="rotate(9)">
                  <rect width="96" height="76" fill="#ebe8e1" />
                  <rect x="9" y="9" width="82" height="62" rx="5" fill="#e7e3db" />
                  <path d="M0 4.5 H96 M4.5 0 V76" stroke="#ffffff" strokeWidth="9" />
                </pattern>
                <filter id="lp-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0d0d0f" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* land + street grids */}
              <rect x="-400" y="-400" width={MAP_W + 800} height={MAP_H + 800} fill="#f1efea" />
              <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="url(#lp-blocks)" />
              <path d="M1380 0 H2400 V900 L1700 980 L1380 640 Z" fill="url(#lp-blocks-b)" />
              <path d="M0 0 H1000 L900 640 L0 760 Z" fill="url(#lp-blocks-c)" />
              <path d="M1500 1000 L2400 900 V1600 H1400 Z" fill="url(#lp-blocks-c)" />

              {/* parks */}
              <g fill="#dbe6cf">
                <rect x="810" y="680" width="560" height="200" rx="70" />
                <circle cx="1990" cy="250" r="96" />
                <rect x="1330" y="1310" width="440" height="230" rx="90" />
                <rect x="360" y="590" width="220" height="130" rx="40" />
                <ellipse cx="300" cy="1300" rx="220" ry="150" />
              </g>
              <g fill="#cfdcc3" opacity="0.7">
                <circle cx="980" cy="760" r="34" />
                <circle cx="1160" cy="820" r="26" />
                <circle cx="1450" cy="1420" r="40" />
              </g>

              {/* water */}
              <g fill="none" stroke="#cddde6" strokeLinecap="round">
                <path
                  id="lp-river"
                  d="M-100 1000 C300 900 520 1030 760 940 S1150 820 1350 860 S1700 700 1950 640 S2250 520 2500 470"
                  strokeWidth="66"
                />
                <path id="lp-canal" d="M560 1070 C1000 1090 1400 1185 1900 1245 S2300 1260 2500 1240" strokeWidth="20" />
              </g>
              <ellipse cx="170" cy="300" rx="230" ry="150" fill="#cddde6" />
              <ellipse cx="2260" cy="1440" rx="160" ry="90" fill="#cddde6" />

              {/* major roads: casing then fill */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {majorRoads.map((r) => (
                  <path key={r.id + "c"} d={r.d} stroke="#dcd7cc" strokeWidth="30" />
                ))}
                {legs.map((d, i) => (
                  <path key={"lc" + i} d={d} stroke="#dcd7cc" strokeWidth="26" />
                ))}
                {majorRoads.map((r) => (
                  <path key={r.id} id={r.id} d={r.d} stroke="#ffffff" strokeWidth="24" />
                ))}
                {legs.map((d, i) => (
                  <path key={"lf" + i} d={d} stroke="#ffffff" strokeWidth="20" />
                ))}
                {/* motorway */}
                <path d="M-100 470 C600 300 1400 200 2500 330" stroke="#ecd394" strokeWidth="36" />
                <path d="M-100 470 C600 300 1400 200 2500 330" stroke="#f8e7b7" strokeWidth="28" />
              </g>

              {/* labels */}
              <g fontFamily="var(--lp-sans)" fill="#8f897e" style={{ letterSpacing: "0.16em" }} fontWeight={600}>
                <text x="1330" y="560" fontSize="24">MITTE</text>
                <text x="1980" y="390" fontSize="22">PRENZLAUER BERG</text>
                <text x="1900" y="1060" fontSize="22">KREUZBERG</text>
                <text x="250" y="560" fontSize="22">CHARLOTTENBURG</text>
                <text x="2050" y="1370" fontSize="20">NEUKÖLLN</text>
                <text x="900" y="1210" fontSize="20">SCHÖNEBERG</text>
                <text x="980" y="800" fontSize="20" fill="#7f9a72">TIERGARTEN</text>
              </g>
              <g fontFamily="var(--lp-sans)" fontSize="15" fill="#9c968b" fontWeight={500}>
                {majorRoads.slice(0, 4).map((r) => (
                  <text key={r.id + "t"} dy="5">
                    <textPath href={`#${r.id}`} startOffset="38%">
                      {r.name}
                    </textPath>
                  </text>
                ))}
              </g>
              <text fontFamily="var(--lp-serif)" fontStyle="italic" fontSize="30" fill="#8aa6b6" dy="10">
                <textPath href="#lp-river" startOffset="22%">
                  Spree
                </textPath>
              </text>
              <text fontFamily="var(--lp-serif)" fontStyle="italic" fontSize="22" fill="#8aa6b6" dy="7">
                <textPath href="#lp-canal" startOffset="45%">
                  Landwehrkanal
                </textPath>
              </text>

              {/* route */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {legs.map((d, i) => (
                  <path key={"rg" + i} d={d} stroke="#e63946" strokeOpacity="0.16" strokeWidth="12" strokeDasharray="2 20" />
                ))}
                {legs.map((d, i) => (
                  <g key={"rt" + i}>
                    <path
                      ref={(el) => {
                        legRefs.current[i] = el;
                      }}
                      d={d}
                      stroke="#b4232f"
                      strokeWidth="15"
                    />
                  </g>
                ))}
              </g>
              {/* route inner highlight follows the same dash as the main stroke */}

              {/* pins */}
              {checkpoints.map(([x, y], i) => {
                const done = i < active;
                const isActive = i === active;
                const last = i === checkpoints.length - 1;
                return (
                  <g
                    key={i}
                    ref={(el) => {
                      pinRefs.current[i] = el;
                    }}
                    transform={`translate(${x} ${y})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => jumpTo(i)}
                  >
                    {isActive && (
                      <circle r="34" fill="#e63946" opacity="0.18">
                        <animate attributeName="r" values="18;46;18" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.28;0;0.28" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <g filter="url(#lp-pin-shadow)" transform={isActive ? "scale(1.18)" : undefined}>
                      <path
                        d="M0 0 C-6 -14 -24 -24 -24 -44 A24 24 0 1 1 24 -44 C24 -24 6 -14 0 0 Z"
                        fill={isActive ? "#e63946" : done ? "#16161a" : "#ffffff"}
                        stroke={isActive || done ? "none" : "#cfc9be"}
                        strokeWidth="2"
                      />
                      {last ? (
                        <g transform="translate(-11 -55)" color={isActive || done ? "#ffffff" : "#16161a"}>
                          <GraduationCap width={22} height={22} strokeWidth={2.2} />
                        </g>
                      ) : (
                        <text
                          y="-37"
                          textAnchor="middle"
                          fontFamily="var(--lp-sans)"
                          fontSize="19"
                          fontWeight={700}
                          fill={isActive || done ? "#ffffff" : "#16161a"}
                        >
                          {i + 1}
                        </text>
                      )}
                    </g>
                    {/* label chip */}
                    <g transform="translate(34 -60)" opacity={isActive ? 1 : 0.85}>
                      <rect
                        width={steps[i].place.length * 9.6 + 28}
                        height="34"
                        rx="17"
                        fill="#ffffff"
                        stroke="#e2ddd3"
                        filter={isActive ? "url(#lp-pin-shadow)" : undefined}
                      />
                      <text x="14" y="22.5" fontFamily="var(--lp-sans)" fontSize="15" fontWeight={600} fill="#16161a">
                        {steps[i].place}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* moving location dot */}
              <g ref={head}>
                <circle r="30" fill="#e63946" opacity="0.14" />
                <circle r="13" fill="#ffffff" filter="url(#lp-pin-shadow)" />
                <circle r="8.5" fill="#e63946" />
              </g>
            </svg>

            {/* Map chrome */}
            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 rounded-full border border-[#e2ddd3] bg-white/95 py-2.5 pl-4 pr-5 text-[13px] shadow-[0_8px_24px_-12px_rgba(13,13,15,0.35)] backdrop-blur">
                <Search className="h-4 w-4 text-[var(--lp-muted)]" />
                <span className="font-medium text-[var(--lp-text)]">TU Berlin, Charlottenburg</span>
                <span className="hidden h-4 w-px bg-[#e2ddd3] sm:block" />
                <span className="hidden items-center gap-1.5 text-[var(--lp-red)] sm:flex">
                  <Navigation className="h-3.5 w-3.5" /> Route
                </span>
              </div>
              <div className="hidden flex-col overflow-hidden rounded-xl border border-[#e2ddd3] bg-white/95 shadow-[0_8px_24px_-12px_rgba(13,13,15,0.35)] sm:flex">
                <span className="flex h-9 w-9 items-center justify-center border-b border-[#e2ddd3] text-[var(--lp-muted)]">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center text-[var(--lp-muted)]">
                  <Minus className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
              <div className="rounded-2xl border border-[#e2ddd3] bg-white/95 px-4 py-3 shadow-[0_8px_24px_-12px_rgba(13,13,15,0.35)] backdrop-blur">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-muted)]">
                  Stop {active + 1} of {steps.length}
                </div>
                <div className="mt-0.5 text-[14px] font-medium text-[var(--lp-text)]">{step.title}</div>
              </div>
              <div className="hidden items-center gap-2 text-[11px] font-medium text-[var(--lp-muted)] sm:flex">
                <span className="block h-[5px] w-16 border-x-2 border-b-2 border-[#8f897e]" />
                500 m
              </div>
            </div>
          </div>
        </div>

        {/* mobile heading */}
        <div className="order-first -mb-2 flex items-end justify-between lg:hidden">
          <h2 className="lp-serif text-[30px] leading-none">
            Five stages. <em className="lp-script text-[var(--lp-red)]">One route.</em>
          </h2>
        </div>
      </div>
    </section>
  );
}
