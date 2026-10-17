"use client";

import React, { useState } from 'react';
import { 
  Coins, 
  Building2, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Check
} from 'lucide-react';

export const StartingSalariesSection = () => {
  const [degreeLevel, setDegreeLevel] = useState<'masters' | 'bachelors'>('masters');

  const salaryData = [
    {
      field: 'Computer Science & Software Engineering',
      bachelors: '€48,000 – €55,000',
      masters: '€55,000 – €68,000',
      clearsBlueCard: true,
      category: 'Tech'
    },
    {
      field: 'Data Science, AI & Machine Learning',
      bachelors: '€50,000 – €58,000',
      masters: '€58,000 – €75,000',
      clearsBlueCard: true,
      category: 'Tech'
    },
    {
      field: 'Management & Strategy Consulting',
      bachelors: '€45,000 – €55,000',
      masters: '€55,000 – €75,000',
      clearsBlueCard: true,
      category: 'Business'
    },
    {
      field: 'Electrical & Microelectronics Engineering',
      bachelors: '€47,000 – €53,000',
      masters: '€53,000 – €63,000',
      clearsBlueCard: true,
      category: 'Engineering'
    },
    {
      field: 'Mechanical & Mechatronics Engineering',
      bachelors: '€46,000 – €52,000',
      masters: '€52,000 – €62,000',
      clearsBlueCard: true,
      category: 'Engineering'
    },
    {
      field: 'Business, Finance & Supply Chain',
      bachelors: '€40,000 – €48,000',
      masters: '€48,000 – €60,000',
      clearsBlueCard: true,
      category: 'Business'
    },
    {
      field: 'Natural Sciences & BioTech / Pharma',
      bachelors: '€40,000 – €46,000',
      masters: '€46,000 – €55,000',
      clearsBlueCard: true,
      category: 'Science'
    },
    {
      field: 'Civil Engineering & Architecture',
      bachelors: '€38,000 – €44,000',
      masters: '€44,000 – €52,000',
      clearsBlueCard: true,
      category: 'Engineering'
    },
    {
      field: 'Humanities & Social Sciences',
      bachelors: '€32,000 – €40,000',
      masters: '€38,000 – €48,000',
      clearsBlueCard: false,
      category: 'Humanities'
    }
  ];

  const salaryDrivers = [
    {
      title: 'Company Tier & Tarif Agreements',
      desc: 'DAX 40 corporations and union-tariffed employers (IG Metall, IGBCE) pay 15% to 25% higher base pay with 35-hour weeks, holiday bonuses, and 13th-month salaries.',
      icon: Building2,
      impact: '+15% to +25%'
    },
    {
      title: 'German Language Proficiency (B2+)',
      desc: 'While English suffices for coding roles, graduates with B2+ German command access 80% more total job openings and earn 10%–15% more on average.',
      icon: Languages,
      impact: '+10% to +15%'
    },
    {
      title: 'Werkstudent & Thesis Experience',
      desc: 'Students with 1–2 years of working student experience in Germany skip junior-entry trainee bands, locking in €3,000 to €5,000 higher starting salaries.',
      icon: GraduationCap,
      impact: '+€3k to +€5k'
    },
    {
      title: 'Geographic Region & Cost Living',
      desc: 'Munich, Frankfurt, and Stuttgart boast the highest nominal salaries. Leipzig, Dresden, and NRW offer superior purchasing power adjusted for rent.',
      icon: MapPin,
      impact: 'Regional Spread'
    }
  ];

  return (
    <section id="section-salaries" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] shrink-0">
            <Coins className="w-5 h-5 text-[var(--lp-red)]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--lp-red)] mb-1">
              <span>Section 03</span>
              <span>•</span>
              <span>2026 StepStone, Kununu & BA Data</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--lp-ink)] tracking-tight">
              Average Starting Salaries by Discipline
            </h2>
          </div>
        </div>

        {/* Interactive Degree Switcher & Table */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--lp-rule)] pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-[var(--lp-ink)] flex items-center gap-2">
                <Coins className="w-5 h-5 text-[var(--lp-red)]" />
                <span>Typical Gross Annual Starting Compensation</span>
              </h3>
              <p className="text-xs text-[var(--lp-muted)] mt-1">
                Comparing entry-level packages against the €45,934.20 recent-graduate Blue Card threshold
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] self-start sm:self-auto">
              <button
                onClick={() => setDegreeLevel('masters')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  degreeLevel === 'masters'
                    ? 'bg-[var(--lp-ink)] text-white shadow-sm'
                    : 'text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                }`}
              >
                Master’s Degree
              </button>
              <button
                onClick={() => setDegreeLevel('bachelors')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  degreeLevel === 'bachelors'
                    ? 'bg-[var(--lp-ink)] text-white shadow-sm'
                    : 'text-[var(--lp-muted)] hover:text-[var(--lp-ink)]'
                }`}
              >
                Bachelor’s Degree
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--lp-rule)] text-xs font-mono uppercase tracking-wider text-[var(--lp-muted)]">
                  <th className="py-3 px-4">Academic Discipline</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">
                    {degreeLevel === 'masters' ? "Master's Starting Range" : "Bachelor's Starting Range"}
                  </th>
                  <th className="py-3 px-4">2026 Blue Card Feasibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--lp-rule)] text-xs text-[var(--lp-text)]">
                {salaryData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[var(--lp-paper-2)]/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[var(--lp-ink)]">
                      {item.field}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[var(--lp-paper-2)] text-[var(--lp-muted)] text-[10px] font-mono uppercase border border-[var(--lp-rule)]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[var(--lp-red)] font-mono font-bold text-sm">
                      {degreeLevel === 'masters' ? item.masters : item.bachelors}
                    </td>
                    <td className="py-4 px-4">
                      {item.clearsBlueCard ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--lp-gold)]/10 border border-[var(--lp-gold)]/25 text-[var(--lp-gold)] text-[11px] font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          Clears Blue Card Immediately
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] text-[var(--lp-muted)] text-[11px] font-semibold">
                          Standard Work Permit or Mid-Tier
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-[var(--lp-paper)] border border-[var(--lp-rule)] text-xs text-[var(--lp-text)] leading-relaxed">
            <strong className="text-[var(--lp-ink)]">Key Insight:</strong> Virtually every STEM, Business, and Consulting Master&apos;s role in Germany starts at <strong className="text-[var(--lp-ink)]">€52,000–€75,000</strong>, easily clearing the <strong className="text-[var(--lp-red)]">€45,934.20</strong> reduced threshold. This means international Master&apos;s graduates qualify for EU Blue Card status on day one.
          </div>
        </div>

        {/* 4 Core Salary Drivers */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {salaryDrivers.map((driver, idx) => {
            const Icon = driver.icon;
            return (
              <div key={idx} className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-2xl p-6 space-y-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[var(--lp-paper-2)] border border-[var(--lp-rule)] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[var(--lp-red)]" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--lp-paper-2)] text-[var(--lp-ink)] border border-[var(--lp-rule)]">
                    {driver.impact}
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[var(--lp-ink)]">{driver.title}</h4>
                <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{driver.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
