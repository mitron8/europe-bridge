"use client";

import React from 'react';
import { Building2, Award, BookOpen, Clock, Lightbulb, Check } from 'lucide-react';
import Link from 'next/link';

export const FoundationsAndUniversityGrants = () => {
  const foundations = [
    {
      name: 'Studienstiftung des deutschen Volkes',
      focus: 'Academic Excellence (Top 0.5% in Germany)',
      amount: 'Up to €992/mo + €300 book allowance',
      details: 'Germany’s oldest and most prestigious scholarship foundation. Nominations come directly from university examination boards or supervising professors.',
      badge: 'Academic Distinction'
    },
    {
      name: 'Heinrich Böll Foundation',
      focus: 'Ecology, Green Transition & Human Rights',
      amount: 'Up to €992/mo + €300 book allowance',
      details: 'Ideal for international students in STEM, renewable energy, and social sciences with proven civic dedication to environmental sustainability.',
      badge: 'Sustainability'
    },
    {
      name: 'Friedrich Ebert Foundation (FES)',
      focus: 'Social Democracy & Equal Opportunities',
      amount: '€992/mo + statutory health insurance',
      details: 'Focuses on talented international students who actively advocate for community welfare, democratic inclusion, and student representation.',
      badge: 'Social Impact'
    },
    {
      name: 'Konrad-Adenauer-Stiftung (KAS)',
      focus: 'Leadership, Governance & Public Policy',
      amount: '€992/mo + exclusive Berlin seminars',
      details: 'Supports high-performing students aiming for leadership in public institutions, diplomacy, engineering ethics, and international economics.',
      badge: 'Governance'
    },
    {
      name: 'Stiftung der Deutschen Wirtschaft (sdw)',
      focus: 'Entrepreneurship & Industrial Innovation',
      amount: 'Up to €992/mo + corporate coaching',
      details: 'Founded by German industry federations. Tailored for students with strong entrepreneurial initiative, startup drive, or tech management ambitions.',
      badge: 'Industry & Startups'
    },
    {
      name: 'Hans Böckler Foundation',
      focus: 'Labor Co-Determination & Worker Rights',
      amount: 'Up to €992/mo + research network',
      details: 'The research foundation of the German trade union confederation (DGB). Supports students committed to social justice and labor protection.',
      badge: 'Labor Rights'
    }
  ];

  return (
    <section id="foundations-and-grants" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Foundations &amp; Campus Aid
        </span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          The 13 National Foundations &amp; <em className="lp-script text-[var(--lp-red)]">HiWi Assistantships</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Beyond DAAD and federal grants, Germany features 13 major state-funded foundations and paid on-campus university assistant roles.
        </p>
      </div>

      {/* Foundations Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e0d3] pb-3">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-ink)]">
              The 13 Gifted Student Foundations (Begabtenförderungswerke)
            </h3>
            <p className="text-xs text-[var(--lp-muted)]">
              Funded by the Federal Ministry of Education (BMBF). Financial stipends match national BAföG statutory scales.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--lp-gold)] shrink-0">BAföG Scale Rates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {foundations.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#faf8f3] rounded-2xl p-5 sm:p-6 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eae5db] text-[var(--lp-text)] border border-[#e5e0d3]">
                    {item.badge}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[var(--lp-red)]">
                    {item.amount.split('+')[0]}
                  </span>
                </div>
                <h4 className="font-serif text-base font-normal text-[var(--lp-ink)] leading-snug">{item.name}</h4>
                <div className="text-xs font-semibold text-[var(--lp-gold)]">{item.focus}</div>
                <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                  {item.details}
                </p>
              </div>
              <div className="pt-3 border-t border-[#e5e0d3] flex items-center justify-between text-xs text-[var(--lp-muted)]">
                <span>Monthly Stipend + Seminar Network</span>
                <span className="font-mono text-[10px]">Tax-Free</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
