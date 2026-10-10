"use client";

import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Calendar, 
  Clock, 
  Award, 
  ShieldCheck,
  Send,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

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
    { name: 'Stepstone.de', tag: 'Top for Engineering & Corporate', link: 'https://stepstone.de' },
    { name: 'LinkedIn Germany', tag: 'Essential for Tech, Startups & Global MNCs', link: 'https://linkedin.com' },
    { name: 'XING.com', tag: 'Strongest for Traditional German Mittelstand', link: 'https://xing.com' },
    { name: 'Indeed Germany', tag: 'Broadest Volume of Roles Nationwide', link: 'https://de.indeed.com' },
    { name: 'University Career Fairs', tag: 'IKOM Munich, Connecticum, bonding fairs', link: '#' },
  ];

  return (
    <section id="section-playbook" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <Briefcase className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 04</span>
              <span>•</span>
              <span>German Job Market Strategy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              The German Hiring Playbook: Landing Your First Role
            </h2>
          </div>
        </div>

        {/* 3 Golden Pipelines */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
            <div>
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-germany-red" />
                <span>The 3 High-Conversion Hiring Pipelines</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                German hiring moves slowly through traditional open portals—these direct pathways cut the line
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pipelines.map((pipe, idx) => {
              const Icon = pipe.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EBE7E0] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-germany-red" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-red-100 text-germany-red">
                      {pipe.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-germany-black font-display">{pipe.title}</h4>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{pipe.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* German Application Standards & Portals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Application Standards */}
          <div className="lg:col-span-7 neu-card p-6 lg:p-8 bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-germany-red" />
                <span>German Application Etiquette (Bewerbung)</span>
              </h3>
              <span className="text-xs font-bold text-gray-400">Strict Standards</span>
            </div>

            <div className="space-y-4">
              {standards.map((std, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-germany-black">{std.item}</h4>
                    <span className="text-[11px] font-bold text-germany-red">{std.subtitle}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{std.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>German Employment Perks:</strong> By law, full-time workers enjoy a minimum of 20 to 30 days paid annual leave (Urlaub), strict 38–40 hour work weeks, statutory health insurance, and protected paid sick leave.
              </span>
            </div>
          </div>

          {/* Right: Channels & Portals */}
          <div className="lg:col-span-5 neu-card p-6 lg:p-8 bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <Send className="w-5 h-5 text-germany-red" />
                <span>Top Job Search Portals</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600">Active Daily</span>
            </div>

            <div className="space-y-3">
              {portals.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] hover:border-germany-red/40 transition-colors flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-black text-germany-black">{p.name}</h4>
                    <span className="text-[11px] text-gray-500 font-semibold">{p.tag}</span>
                  </div>
                  <span className="text-[11px] font-black text-germany-red shrink-0">→</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium space-y-1">
              <span className="font-black block">Probezeit (Probation Period):</span>
              <span className="text-[11px] leading-relaxed block">
                Virtually every German employment contract includes a standard 6-month probation period (Probezeit) during which either party can terminate with 2 weeks notice. Once completed, German dismissal protections (Kündigungsschutz) rank among the strongest globally.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
