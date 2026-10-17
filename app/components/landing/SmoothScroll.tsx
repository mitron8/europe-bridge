"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    __lpLenis?: Lenis;
  }
}

/** Smoothly scroll to an in-page section, using Lenis when it is running. */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^.*#/, "");
  const el = id ? document.getElementById(id) : null;
  if (!el && id !== "top") return false;
  const lenis = window.__lpLenis;
  if (lenis) {
    document.documentElement.style.overflow = "";
    lenis.start();
    lenis.scrollTo(el ?? 0, { offset: -72, duration: 1.4, force: true });
  } else {
    (el ?? document.body).scrollIntoView({ behavior: "smooth" });
  }
  return true;
}

/**
 * Landing-page only:
 *  - Lenis smooth scrolling, synced with GSAP ScrollTrigger
 *  - in-page anchor links (/#section) routed through Lenis
 *  - scroll-triggered reveals for [data-reveal] and [data-reveal-lines]
 * Everything is torn down on unmount so other pages keep native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });
      window.__lpLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Route in-page anchors through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!(href.startsWith("#") || href.startsWith("/#"))) return;
      if (scrollToHash(href)) {
        e.preventDefault();
        history.replaceState(null, "", href.startsWith("/") ? href : "/" + href);
      }
    };
    document.addEventListener("click", onClick);

    // Honour a hash on first load (e.g. arriving at /#faq from another page)
    if (window.location.hash) {
      const h = window.location.hash;
      setTimeout(() => scrollToHash(h), 350);
    }

    // (section stacking order lives in landing.css so pinning cannot reset it)

    // Scroll-triggered reveals
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Overlap / stacking: [data-stack] sections hold still and recede while the next section slides over
      gsap.utils.toArray<HTMLElement>("[data-stack]").forEach((el) => {
        const inner =
          (el.querySelector("[data-stack-inner]") as HTMLElement | null) ||
          (el.firstElementChild as HTMLElement | null) ||
          el;
        const isTall = el.offsetHeight > window.innerHeight;
        const start = () => (isTall ? "bottom bottom" : "top top");
        const end = () => "+=" + Math.min(el.offsetHeight, window.innerHeight * 0.85);
        ScrollTrigger.create({ trigger: el, start, end, pin: true, pinSpacing: false, invalidateOnRefresh: true });
        gsap.fromTo(
          inner,
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.45,
            transformOrigin: "50% 35%",
            ease: "none",
            scrollTrigger: { trigger: el, start, end, scrub: true, invalidateOnRefresh: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || "0");
        gsap.fromTo(
          el,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: Math.min(delay, 0.2),
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }
        );
      });

      // gentle parallax: [data-parallax="<px>"] drifts against the scroll
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "40");
        gsap.fromTo(
          el,
          { y: -amt },
          {
            y: amt,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>(".lp-line-mask > span");
        gsap.fromTo(
          lines,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      if (window.__lpLenis === lenis) delete window.__lpLenis;
    };
  }, []);

  return null;
}
