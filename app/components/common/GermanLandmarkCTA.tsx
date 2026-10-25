"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface GermanLandmarkCTAProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonIcon?: React.ReactNode;
  trustPoints?: string[];
  id?: string;
}

export const GermanLandmarkCTA: React.FC<GermanLandmarkCTAProps> = ({
  badge = "EuropeBridge Premium Guidance",
  title,
  highlightText,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  secondaryButtonIcon,
  trustPoints = [
    "Zero AI Boilerplate",
    "German Alumni Review",
    "100% Plagiarism Guaranteed"
  ],
  id = "cta"
}) => {
  const isPrimaryAnchor = primaryButtonHref.startsWith('#');
  const isSecondaryAnchor = secondaryButtonHref?.startsWith('#');

  return (
    <section id={id} className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto my-4">
      <div className="lp-grain relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] px-6 py-12 text-center text-white shadow-[0_24px_60px_-20px_rgba(13,13,15,0.4)] sm:px-12 sm:py-14 lg:px-16">
        {/* Landmark skyline outline background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden opacity-[0.25] select-none"
          style={{
            filter: "invert(1) hue-rotate(180deg) brightness(1.25) contrast(1.15)",
            mixBlendMode: "screen",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/landing/german-landmarks-outline.jpg"
            alt=""
            className="h-[220px] sm:h-[300px] w-full max-w-[1280px] object-cover object-bottom"
            loading="lazy"
          />
        </div>

        {/* Warm ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] opacity-35 blur-[90px]"
          style={{ background: "radial-gradient(circle at 50% 100%, rgba(230,57,70,0.25), rgba(201,163,91,0.2), transparent 75%)" }}
        />

        {/* Content container */}
        <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-gold-soft)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)] shadow-[0_0_8px_var(--lp-red)]" />
              {badge}
            </div>
          )}

          <h2 className="lp-serif mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.14] tracking-[-0.02em] text-white">
            {title}{" "}
            {highlightText && (
              <em className="lp-script text-[var(--lp-gold-soft)]">{highlightText}</em>
            )}
          </h2>

          <p className="mt-4 max-w-[540px] text-[15px] sm:text-[16px] leading-[1.65] text-white/75">
            {description}
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            {isPrimaryAnchor ? (
              <a 
                href={primaryButtonHref} 
                className="lp-btn lp-btn--red w-full justify-center shadow-[0_12px_28px_-8px_rgba(230,57,70,0.5)] sm:w-auto cursor-pointer"
              >
                {primaryButtonText} <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link 
                href={primaryButtonHref} 
                className="lp-btn lp-btn--red w-full justify-center shadow-[0_12px_28px_-8px_rgba(230,57,70,0.5)] sm:w-auto cursor-pointer"
              >
                {primaryButtonText} <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {secondaryButtonText && secondaryButtonHref && (
              isSecondaryAnchor ? (
                <a 
                  href={secondaryButtonHref}
                  className="lp-btn lp-btn--dark w-full justify-center sm:w-auto border border-white/20 hover:border-white/40 cursor-pointer flex items-center gap-2"
                >
                  {secondaryButtonIcon}
                  <span>{secondaryButtonText}</span>
                </a>
              ) : (
                <Link 
                  href={secondaryButtonHref}
                  className="lp-btn lp-btn--dark w-full justify-center sm:w-auto border border-white/20 hover:border-white/40 cursor-pointer flex items-center gap-2"
                >
                  {secondaryButtonIcon}
                  <span>{secondaryButtonText}</span>
                </Link>
              )
            )}
          </div>

          {trustPoints && trustPoints.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/60">
              {trustPoints.map((tp, idx) => (
                <span key={idx}>✓ {tp}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
