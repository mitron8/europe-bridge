"use client";

import React from 'react';

export function EmptyCalendarIllustration({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Decorative subtle dashed rays / sparkles around the calendar */}
      <path d="M40 38L32 30" stroke="#E5A9AF" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M120 38L128 30" stroke="#E5A9AF" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M26 68L18 68" stroke="#E5A9AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M142 68L134 68" stroke="#E5A9AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 18L44 10" stroke="#E5A9AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M118 18L116 10" stroke="#E5A9AF" strokeWidth="2" strokeLinecap="round" />

      {/* Soft ground shadow */}
      <ellipse cx="80" cy="126" rx="52" ry="7" fill="#E8DCDA" fillOpacity="0.6" />

      {/* Desk calendar easel back stand */}
      <path d="M42 120L72 50L88 50L118 120" stroke="#B8A7A5" strokeWidth="3" strokeLinejoin="round" fill="#EADFDC" />

      {/* Main calendar block / pages */}
      {/* Back page thickness shadow */}
      <rect x="36" y="42" width="88" height="78" rx="10" fill="#EADCDA" />

      {/* Front page */}
      <rect x="34" y="38" width="88" height="78" rx="10" fill="#FFFFFF" stroke="#DFD3D0" strokeWidth="1.5" />

      {/* Top Header Bar of the Calendar (Wine Red) */}
      <path
        d="M34 48C34 42.4772 38.4772 38 44 38H112C117.523 38 122 42.4772 122 48V56H34V48Z"
        fill="#5A0F1B"
      />

      {/* Top wire spiral binding loops (4 loops) */}
      {/* Loop 1 */}
      <path d="M48 32V44" stroke="#33080F" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="48" cy="44" r="2.5" fill="#33080F" />
      {/* Loop 2 */}
      <path d="M68 32V44" stroke="#33080F" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="68" cy="44" r="2.5" fill="#33080F" />
      {/* Loop 3 */}
      <path d="M88 32V44" stroke="#33080F" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="88" cy="44" r="2.5" fill="#33080F" />
      {/* Loop 4 */}
      <path d="M108 32V44" stroke="#33080F" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="108" cy="44" r="2.5" fill="#33080F" />

      {/* Calendar date grid placeholder dots / pills */}
      <g opacity="0.85">
        {/* Row 1 */}
        <circle cx="50" cy="70" r="3.5" fill="#F4D3D7" />
        <circle cx="68" cy="70" r="3.5" fill="#F4D3D7" />
        <circle cx="86" cy="70" r="3.5" fill="#F4D3D7" />
        <circle cx="104" cy="70" r="3.5" fill="#F4D3D7" />

        {/* Row 2 */}
        <circle cx="50" cy="84" r="3.5" fill="#F4D3D7" />
        <circle cx="68" cy="84" r="3.5" fill="#B91C1C" />
        <circle cx="86" cy="84" r="3.5" fill="#F4D3D7" />
        <circle cx="104" cy="84" r="3.5" fill="#F4D3D7" />

        {/* Row 3 */}
        <circle cx="50" cy="98" r="3.5" fill="#F4D3D7" />
        <circle cx="68" cy="98" r="3.5" fill="#F4D3D7" />
        <circle cx="86" cy="98" r="3.5" fill="#F4D3D7" />
        <circle cx="104" cy="98" r="3.5" fill="#F4D3D7" />
      </g>

      {/* Selected day active highlight pill on day 8 */}
      <rect x="63" y="79" width="10" height="10" rx="3" fill="#B91C1C" fillOpacity="0.2" />
    </svg>
  );
}

