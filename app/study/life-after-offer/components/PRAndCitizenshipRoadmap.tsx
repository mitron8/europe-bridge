"use client";

import React from 'react';
import { 
  Award, 
  Globe2, 
  Clock, 
  ShieldCheck, 
  Check
} from 'lucide-react';

export const PRAndCitizenshipRoadmap = () => {
  const prRoutes = [
    {
      route: 'EU Blue Card + B1 German',
      duration: '21 Months',
      badge: 'Fastest Route',
      requirements: '21 months of Blue Card employment, 21 months of pension contributions, Goethe/telc B1 German certificate, clean record.'
    },
    {
      route: 'EU Blue Card + A1 German',
      duration: '27 Months',
      badge: 'Basic German',
      requirements: '27 months of Blue Card employment, 27 months of pension contributions, elementary A1 German language proof.'
    },
    {
      route: 'German Uni Graduate (§18c AufenthG)',
      duration: '24 Months',
      badge: 'Graduate Special',
      requirements: 'Graduated from a German university, held a qualified work permit (§18b) for 24 months, 24 months pension contributions, B1 German.'
    },
    {
      route: 'Standard Skilled Worker (§18a/b)',
      duration: '36 Months',
      badge: 'General Route',
      requirements: '36 months under regular skilled worker status under the modernized immigration act, B1 German, secure livelihood.'
    }
  ];

  const roadmapMilestones = [
    {
      period: 'Years 1 – 2',
      title: 'Master’s Degree in Germany',
      status: 'Student Residence Permit (§16b)',
      points: [
        'Complete 120 ECTS coursework & exams',
        'Work as Werkstudent (up to 20h/week)',
        'Reach B1/B2 German level via university language center',
        'Complete Master’s thesis with corporate partner'
      ]
    },
    {
      period: 'Year 2 – 2.5',
      title: 'Job Offer & EU Blue Card',
      status: 'EU Blue Card (§18g)',
      points: [
        'Secure qualifying job (≥ €45,934.20/yr gross)',
        'Foreigners’ office issues EU Blue Card eAT',
        'Begin mandatory pension contributions (Rentenversicherung)',
        'Spouse receives unconditional right to work'
      ]
    },
    {
      period: 'Year 3.5 – 4',
      title: 'Permanent Residence (Niederlassung)',
      status: 'Unlimited Settlement Permit (§18c)',
      points: [
        'Apply after 21 months on Blue Card with B1 German',
        'Permanent right to live, work, and freelance in Germany',
        'No longer dependent on employer sponsorship or minimum salary',
        'Complete independence in the German economy'
      ]
    },
    {
      period: 'Year 5',
      title: 'German Citizenship & EU Passport',
      status: 'German Citizen (Einbürgerung)',
      points: [
        'Eligible after 5 years total legal residence (study time counts)',
        'Pass 33-question Einbürgerungstest (Living in Germany)',
        'Hold B1 German certificate & economic self-sufficiency',
        'Dual citizenship permitted without surrendering birth passport'
      ]
    }
  ];

  return (
    <section id="section-pr-citizenship" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] shrink-0">
            <Award className="w-5 h-5 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-red)] mb-1">
              <span>Section 05</span>
              <span>•</span>
              <span>Niederlassungserlaubnis & StAG Reform</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
              Path to Permanent Residence & German Citizenship
            </h2>
          </div>
        </div>

        {/* PR Pathways Table */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--lp-rule)] pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-[var(--lp-ink)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--lp-red)]" />
                <span>Permanent Residence (Niederlassungserlaubnis) Comparison</span>
              </h3>
              <p className="text-xs text-[var(--lp-muted)] mt-1">
                Permanent residency provides an indefinite, unrestricted right to live and work in Germany
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prRoutes.map((r, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border border-[var(--lp-rule)] bg-[var(--lp-paper-2)] text-[var(--lp-ink)]">
                    {r.badge}
                  </span>
                  <span className="text-sm font-mono font-bold text-[var(--lp-red)] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {r.duration}
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[var(--lp-ink)]">{r.route}</h4>
                <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{r.requirements}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Student-to-Passport Roadmap */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--lp-rule)] pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-[var(--lp-ink)] flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[var(--lp-red)]" />
                <span>The Complete 5-Year Roadmap: Student to German Passport</span>
              </h3>
              <p className="text-xs text-[var(--lp-muted)] mt-1">
                From landing at Frankfurt Airport to holding one of the most powerful passports in the world
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapMilestones.map((m, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] space-y-3 relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[var(--lp-ink)] text-white text-[11px] font-mono font-semibold tracking-wider">
                    {m.period}
                  </span>
                  <span className="text-xs font-serif font-bold text-[var(--lp-red)]">Step 0{idx + 1}</span>
                </div>

                <div>
                  <h4 className="text-sm font-serif font-bold text-[var(--lp-ink)]">{m.title}</h4>
                  <span className="text-[11px] text-[var(--lp-muted)] font-mono block mt-0.5">{m.status}</span>
                </div>

                <ul className="space-y-1.5 pt-1 text-xs text-[var(--lp-muted)]">
                  {m.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
                      <span className="leading-snug text-[11px] text-[var(--lp-text)]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Dual Citizenship Banner */}
          <div className="p-4 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] text-xs text-[var(--lp-text)] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--lp-gold)] shrink-0 mt-0.5" />
            <div>
              <span className="font-serif font-bold text-[var(--lp-ink)] block text-sm">
                Historic Dual Citizenship Law (2024+ German Nationality Act Reform)
              </span>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed mt-1">
                Germany officially allows <strong className="text-[var(--lp-ink)]">multiple citizenship</strong> for all applicants. You no longer have to surrender your home passport to acquire German citizenship. Furthermore, student visa years legally count towards the 5-year naturalization timeline.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
