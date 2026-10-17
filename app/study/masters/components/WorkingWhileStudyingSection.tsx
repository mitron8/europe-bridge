"use client";

import React from 'react';
import { Briefcase, Check, ShieldCheck, Zap } from 'lucide-react';

export const WorkingWhileStudyingSection = () => {
  const workStreams = [
    {
      title: "Werkstudent (Working Student)",
      badge: "Highest Paying & Career Focused",
      hourlyPay: "€16 – €24 / hour",
      monthlyGross: "€1,200 – €1,900 / month",
      desc: "Direct employment at tech, automotive, and engineering leaders (SAP, Siemens, BMW, Bosch). You work in your field of study as a junior engineer, data analyst, or developer.",
      perks: [
        "Up to 20 hours/week during semester, 40 hours/week during breaks",
        "Exempt from healthcare, unemployment & nursing care social deductions",
        "Over 65% of Werkstudent positions transition directly into full-time roles upon graduation"
      ]
    },
    {
      title: "HiWi (Research / Teaching Assistant)",
      badge: "Academic & On-Campus",
      hourlyPay: "€14.50 – €18.00 / hour",
      monthlyGross: "€580 – €950 / month",
      desc: "Employed directly by your university institute (Lehrstuhl) to assist professors with laboratory experiments, coding evaluation scripts, or tutorial sessions.",
      perks: [
        "Does NOT count towards your 140-day statutory off-campus visa limit (§16b AufenthG)",
        "Zero commute time — work directly within your academic department",
        "Direct connection with supervising professors for thesis topics and PhD openings"
      ]
    },
    {
      title: "Minijob (Commercial / Campus)",
      badge: "Tax-Free Basic Income",
      hourlyPay: "€13.90 – €16.00 / hour",
      monthlyGross: "Up to €538 / month",
      desc: "Flexible part-time work in student cafes, retail, library administration, university event coordination, and logistics.",
      perks: [
        "100% tax-free income under the statutory €538 Minijob threshold",
        "Requires zero previous German corporate work history",
        "Ideal for first-semester students transitioning into life in Germany"
      ]
    }
  ];

  return (
    <section id="work" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-reveal>
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
          Earn While You Learn
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
          Part-Time Work &amp; <em className="italic text-[var(--lp-red)] font-serif">Werkstudent Jobs</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Germany grants international students generous legal work rights. Most master&apos;s students comfortably self-finance their day-to-day living costs.
        </p>
      </div>

      {/* 140-Day Rule Highlight Banner */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#e5e0d3] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--lp-gold)] bg-[var(--lp-gold)]/10 px-3 py-1 rounded-full border border-[var(--lp-gold)]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Modernized German Immigration Act</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)]">
              The 140 Full Days / 280 Half Days Statutory Rule
            </h3>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed max-w-2xl">
              Non-EU international master&apos;s students holding a student visa (§16b AufenthG) are legally authorized to work up to <strong className="text-[var(--lp-text)]">140 full days</strong> or <strong className="text-[var(--lp-text)]">280 half days</strong> per calendar year without requiring any separate permit from the foreign immigration authority (Ausländerbehörde).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <div className="p-4 bg-[#eae5db]/60 rounded-xl border border-[#e5e0d3] text-center">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Min. Wage</span>
              <span className="font-serif text-2xl font-normal text-[var(--lp-red)]">€13.90</span>
              <span className="block text-[10px] text-[var(--lp-muted)]">Per hour statutory</span>
            </div>
            <div className="p-4 bg-[#eae5db]/60 rounded-xl border border-[#e5e0d3] text-center">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Werkstudent Cap</span>
              <span className="font-serif text-2xl font-normal text-[var(--lp-ink)]">20 Hrs</span>
              <span className="block text-[10px] text-[var(--lp-muted)]">Per week during term</span>
            </div>
          </div>
        </div>

        {/* 3 Work Stream Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {workStreams.map((stream) => (
            <div
              key={stream.title}
              className="p-5 sm:p-6 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#faf8f3] border border-[#e5e0d3] text-[var(--lp-text)] inline-block">
                  {stream.badge}
                </span>

                <h4 className="font-serif text-base sm:text-lg font-normal text-[var(--lp-ink)]">{stream.title}</h4>

                <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#e5e0d3] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--lp-muted)]">Typical Hourly:</span>
                    <span className="font-mono font-semibold text-[var(--lp-red)]">{stream.hourlyPay}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--lp-muted)]">Monthly Gross:</span>
                    <span className="font-mono font-semibold text-[var(--lp-ink)]">{stream.monthlyGross}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{stream.desc}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#e5e0d3] text-xs">
                {stream.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[var(--lp-text)]">
                    <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug text-[var(--lp-muted)]">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="p-4 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] text-xs text-[var(--lp-text)] flex items-start gap-3">
          <Zap className="w-4 h-4 text-[var(--lp-gold)] shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs leading-relaxed text-[var(--lp-muted)]">
            <strong className="text-[var(--lp-text)]">Career Fast-Track:</strong> In Germany, Werkstudent roles serve as primary talent pipelines. Over 65% of German engineering and IT graduates receive direct permanent offers from their working-student employers before graduation.
          </p>
        </div>
      </div>
    </section>
  );
};
