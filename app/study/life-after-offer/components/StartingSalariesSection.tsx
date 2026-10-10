"use client";

import React, { useState } from 'react';
import { 
  Coins, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Award,
  Layers
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
      clearsBlueCard: true, // Master's upper half clears
      category: 'Engineering'
    },
    {
      field: 'Humanities & Social Sciences',
      bachelors: '€32,000 – €40,000',
      masters: '€38,000 – €48,000',
      clearsBlueCard: false, // Some may need regular permit or reach upper bound
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
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <Coins className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 03</span>
              <span>•</span>
              <span>2026 StepStone, Kununu &amp; BA Data</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              Average Starting Salaries by Discipline
            </h2>
          </div>
        </div>

        {/* Interactive Degree Switcher & Table */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7E0] pb-4">
            <div>
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <Coins className="w-5 h-5 text-germany-red" />
                <span>Typical Gross Annual Starting Compensation</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Comparing entry-level packages against the €45,934.20 recent-graduate Blue Card threshold
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="flex items-center p-1 rounded-2xl bg-gray-100 border border-gray-200 self-start sm:self-auto">
              <button
                onClick={() => setDegreeLevel('masters')}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  degreeLevel === 'masters'
                    ? 'bg-germany-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-germany-black'
                }`}
              >
                Master’s Degree
              </button>
              <button
                onClick={() => setDegreeLevel('bachelors')}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  degreeLevel === 'bachelors'
                    ? 'bg-germany-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-germany-black'
                }`}
              >
                Bachelor’s Degree
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#EBE7E0] text-xs font-black uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4">Academic Discipline</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">
                    {degreeLevel === 'masters' ? "Master's Starting Range" : "Bachelor's Starting Range"}
                  </th>
                  <th className="py-3 px-4">2026 Blue Card Feasibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7E0] text-xs font-bold text-gray-700">
                {salaryData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4 font-black text-germany-black">
                      {item.field}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-black uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-germany-red font-black text-sm">
                      {degreeLevel === 'masters' ? item.masters : item.bachelors}
                    </td>
                    <td className="py-4 px-4">
                      {item.clearsBlueCard ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Clears Blue Card Immediately
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold">
                          Standard Work Permit or Mid-Tier
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 font-medium">
            <strong>Key Insight:</strong> Notice how virtually every STEM, Business, and Consulting Master&apos;s role in Germany starts at <strong>€52,000–€75,000</strong>, easily clearing the <strong>€45,934.20</strong> reduced threshold. This means international Master&apos;s graduates qualify for EU Blue Card status on day one!
          </div>
        </div>

        {/* 4 Core Salary Drivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {salaryDrivers.map((driver, idx) => {
            const Icon = driver.icon;
            return (
              <div key={idx} className="neu-card p-6 bg-white space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-germany-red" />
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {driver.impact}
                  </span>
                </div>
                <h4 className="text-sm font-black text-germany-black font-display">{driver.title}</h4>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{driver.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
