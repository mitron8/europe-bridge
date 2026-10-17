"use client";

import React from 'react';
import Link from 'next/link';
import { GitPullRequest, Clock, Check, AlertTriangle, FileText, Send } from 'lucide-react';

export const ScholarshipApplicationRoadmap = () => {
  const roadmapSteps = [
    {
      phase: 'Phase 01: 12–18 Months Before Intake',
      title: 'Profile Audit & Grade Conversion',
      icon: Clock,
      tag: 'Foundation',
      tasks: [
        'Convert your undergraduate GPA to the German 1.0–4.0 scale (Bavarian Formula)',
        'Check German language (Goethe / TestDaF) or English (IELTS / TOEFL) score thresholds',
        'Identify target German university courses (Master’s curriculum & research groups)',
        'Collect certificates of extracurriculars, volunteering, or social initiatives'
      ]
    },
    {
      phase: 'Phase 02: 9–12 Months Before Intake',
      title: 'Scholarship Mapping & Early Deadlines',
      icon: GitPullRequest,
      tag: 'Critical Window',
      tasks: [
        'Track early DAAD portal deadlines (many close between July and October for the following year)',
        'Verify whether target scholarship requires pre-admission or handles admission internally',
        'Request 2 academic recommendation letters (LOR) from former professors',
        'Ensure APS certificate verification is underway (crucial for India/China/Vietnam)'
      ]
    },
    {
      phase: 'Phase 03: 6–9 Months Before Intake',
      title: 'Tailored SOP & Foundation Alignment',
      icon: FileText,
      tag: 'Document Crafting',
      tasks: [
        'Write a distinctive Statement of Motivation customized to the scholarship foundation’s ethos',
        'Draft a 2–3 page research proposal if applying for research-oriented or PhD tracks',
        'Format your CV strictly according to the German Tabellarischer Lebenslauf standard',
        'Have your documents reviewed by an experienced German study counselor'
      ]
    },
    {
      phase: 'Phase 04: 3–6 Months Before Intake',
      title: 'Submission & University Coordination',
      icon: Send,
      tag: 'Application Push',
      tasks: [
        'Submit official scholarship dossiers via Uni-Assist or directly to university portals',
        'Prepare for scholarship panel interviews (often conducted in English or German via video)',
        'Track Deutschlandstipendium calls opened by your enrolled university department',
        'Keep backup financial preparations ready (Blocked Account arrangement)'
      ]
    }
  ];

  const mistakes = [
    {
      title: 'Missing the 1-Year Early Deadline',
      desc: 'Most students realize too late that prestigious DAAD scholarships close nearly a full year before classes begin. Waiting for admission before starting scholarship prep is a critical error.'
    },
    {
      title: 'Submitting a Generic SOP',
      desc: 'Sending the same motivation letter to DAAD, Heinrich Böll, and your university will lead to rejection. Each foundation evaluates distinct ideological and societal goals.'
    },
    {
      title: 'Overlooking Deutschlandstipendium',
      desc: 'Many students falsely assume they must have a 1.0 GPA. In reality, Deutschlandstipendium awards consider volunteering, family background, and department ranking.'
    },
    {
      title: 'Vague Letters of Recommendation',
      desc: 'Generic LORs stating "the student was punctual" carry no weight. LORs must detail concrete academic coursework, projects, and analytical rigor.'
    }
  ];

  return (
    <section id="application-roadmap" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Application Strategy
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Application Timeline &amp; <em className="italic text-[var(--lp-red)] font-serif">Strategy Roadmap</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          German scholarships reward planning. Follow this structured roadmap to submit competitive dossiers ahead of time.
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {roadmapSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-[#faf8f3] rounded-2xl p-6 sm:p-7 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">
                    {step.phase}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#eae5db] text-[var(--lp-text)] border border-[#e5e0d3]">
                    {step.tag}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-normal text-[var(--lp-ink)] flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                  <span>{step.title}</span>
                </h3>

                <div className="space-y-2 pt-1">
                  {step.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2 text-xs text-[var(--lp-text)]">
                      <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                      <span className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e0d3] flex items-center justify-between text-xs text-[var(--lp-muted)]">
                <span>Phase {idx + 1} of 4</span>
                <Link href="/tools/admission-chance" className="font-semibold text-[var(--lp-red)] hover:underline">
                  Evaluate Profile &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mistakes to Avoid Callout Box */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[var(--lp-ink)]">
              Common Mistakes in Scholarship Applications
            </h3>
            <p className="text-xs text-[var(--lp-muted)]">
              Avoid these frequent oversights when preparing your funding documentation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mistakes.map((item, idx) => (
            <div key={idx} className="bg-[#eae5db]/50 p-4 rounded-xl border border-[#e5e0d3] space-y-1.5">
              <div className="font-serif text-sm font-normal text-[var(--lp-ink)]">{item.title}</div>
              <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
