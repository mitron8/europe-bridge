"use client";

import React from 'react';
import { 
  Briefcase, 
  FileText, 
  Building2, 
  Award, 
  ShieldCheck,
  Send
} from 'lucide-react';

export const CareerPlaybookSection = () => {
  const pipelines = [
    {
      title: 'Werkstudent (Working Student)',
      desc: 'The #1 pipeline for international students. Work up to 20 hours/week during semester time and 40 hours during breaks. Over 65% convert into full-time permanent contracts upon finishing exams.',
      badge: 'Gold Standard',
      icon: Briefcase
    },
    {
      title: 'Master’s Thesis in Industry',
      desc: 'Conduct your final Masterarbeit directly with a company (Unternehmensarbeit). You spend 6 months solving a real industrial R&D challenge with a dedicated mentor who often hires you immediately.',
      badge: 'Direct Audition',
      icon: Award
    },
    {
      title: 'Voluntary & Mandatory Internships',
      desc: '3 to 6-month Praktikum stints offer invaluable German corporate exposure, hands-on tool experience, and generate official Arbeitszeugnisse (graded work certificates).',
      badge: 'Foot in the Door',
      icon: Building2
    }
  ];

  const standards = [
    {
      item: 'Tabellarischer Lebenslauf',
      subtitle: 'Chronological German CV',
      desc: 'Include a clean professional headshot (Bewerbungsfoto), exact dates, clear technical proficiencies, and standardized CEFR language levels (A1 to C2). Maximum 2 pages.'
    },
    {
      item: 'Anschreiben (Cover Letter)',
      subtitle: '1-Page Precision Pitch',
      desc: 'German recruiters expect a structured, formal cover letter addressing the hiring manager, quoting the Job ID, and explaining why your specific degree modules solve their immediate pain point.'
    },
    {
      item: 'Arbeitszeugnisse & Noten',
      subtitle: 'Official Work Certificates',
      desc: 'Always request an official Arbeitszeugnis after completing any Werkstudent role or internship. German hiring managers read the nuanced coded phrasing in these references.'
    }
  ];

  const portals = [
    { name: 'Stepstone.de', tag: 'Top for Engineering & Corporate' },
    { name: 'LinkedIn Germany', tag: 'Essential for Tech, Startups & Global MNCs' },
    { name: 'XING.com', tag: 'Strongest for Traditional German Mittelstand' },
    { name: 'Indeed Germany', tag: 'Broadest Volume of Roles Nationwide' },
    { name: 'University Career Fairs', tag: 'IKOM Munich, Connecticum, bonding fairs' },
  ];

  return (
    <section id="section-playbook" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] shrink-0">
            <Briefcase className="w-5 h-5 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-red)] mb-1">
              <span>Section 04</span>
              <span>•</span>
              <span>German Job Market Strategy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
              The German Hiring Playbook: Landing Your First Role
            </h2>
          </div>
        </div>

        {/* 3 Golden Pipelines */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-[var(--lp-ink)] flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--lp-red)]" />
                <span>The 3 High-Conversion Hiring Pipelines</span>
              </h3>
              <p className="text-xs text-[var(--lp-muted)] mt-1">
                German hiring moves slowly through traditional open portals—these direct pathways cut the line
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pipelines.map((pipe, idx) => {
              const Icon = pipe.icon;
              return (
                <div key={idx} className="p-5 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--lp-red)]" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-[var(--lp-gold)]/10 text-[var(--lp-gold)] border border-[var(--lp-gold)]/25">
                      {pipe.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[var(--lp-ink)]">{pipe.title}</h4>
                  <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{pipe.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* German Application Standards & Portals Grid */}
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Application Standards */}
          <div className="lg:col-span-7 bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
              <h3 className="text-lg font-serif font-bold text-[var(--lp-ink)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--lp-red)]" />
                <span>German Application Etiquette (Bewerbung)</span>
              </h3>
              <span className="text-xs font-mono text-[var(--lp-muted)]">Strict Standards</span>
            </div>

            <div className="space-y-4">
              {standards.map((std, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[var(--lp-ink)]">{std.item}</h4>
                    <span className="text-[11px] font-mono font-semibold text-[var(--lp-red)]">{std.subtitle}</span>
                  </div>
                  <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{std.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] text-xs text-[var(--lp-text)] leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--lp-ink)]">German Employment Perks:</strong> By law, full-time workers enjoy a minimum of 20 to 30 days paid annual leave (Urlaub), strict 38–40 hour work weeks, statutory health insurance, and protected paid sick leave.
              </span>
            </div>
          </div>

          {/* Right: Channels & Portals */}
          <div className="lg:col-span-5 bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
              <h3 className="text-lg font-serif font-bold text-[var(--lp-ink)] flex items-center gap-2">
                <Send className="w-5 h-5 text-[var(--lp-red)]" />
                <span>Top Job Search Portals</span>
              </h3>
              <span className="text-xs font-mono text-[var(--lp-gold)]">Active Daily</span>
            </div>

            <div className="space-y-3">
              {portals.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] hover:border-[var(--lp-red)]/50 transition-colors flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--lp-ink)]">{p.name}</h4>
                    <span className="text-[11px] text-[var(--lp-muted)]">{p.tag}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[var(--lp-red)] shrink-0 font-mono">→</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] text-xs text-[var(--lp-text)] space-y-1">
              <span className="font-semibold text-[var(--lp-ink)] block">Probezeit (Probation Period):</span>
              <span className="text-[11px] text-[var(--lp-muted)] leading-relaxed block">
                Virtually every German employment contract includes a standard 6-month probation period (Probezeit) during which either party can terminate with 2 weeks notice. Once completed, German dismissal protections (Kündigungsschutz) rank among the strongest globally.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
