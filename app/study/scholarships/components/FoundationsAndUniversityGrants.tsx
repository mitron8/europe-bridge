"use client";
import React from 'react';
import Link from 'next/link';
import { Building2, Briefcase, GraduationCap, CheckCircle2, DollarSign, Award, BookOpen, Clock, Lightbulb } from 'lucide-react';

export const FoundationsAndUniversityGrants = () => {
  const foundations = [
    {
      name: 'Studienstiftung des deutschen Volkes',
      focus: 'Academic Excellence (Top 0.5% in Germany)',
      amount: 'Up to €992/mo + €300 book money',
      details: 'Germany’s oldest, largest, and most prestigious scholarship foundation. Nominations come directly from university examination boards or professors.',
      badge: 'Most Prestigious'
    },
    {
      name: 'Heinrich Böll Foundation',
      focus: 'Ecology, Green Transition & Human Rights',
      amount: 'Up to €992/mo + €300 book money',
      details: 'Ideal for international students in STEM, renewable energy, and social sciences with proven civic dedication to environmental sustainability.',
      badge: 'Sustainability'
    },
    {
      name: 'Friedrich Ebert Foundation (FES)',
      focus: 'Social Democracy & Equal Opportunities',
      amount: '€992/mo + statutory health insurance',
      details: 'Focuses on talented international students who actively advocate for worker rights, democratic inclusion, and community welfare.',
      badge: 'Social Justice'
    },
    {
      name: 'Konrad-Adenauer-Stiftung (KAS)',
      focus: 'Leadership, Governance & Public Affairs',
      amount: '€992/mo + extensive Berlin seminars',
      details: 'Supports high-performing students aiming for leadership in public institutions, diplomacy, engineering ethics, and economics.',
      badge: 'Governance'
    },
    {
      name: 'Stiftung der Deutschen Wirtschaft (sdw)',
      focus: 'Entrepreneurship & Business Innovation',
      amount: 'Up to €992/mo + corporate coaching',
      details: 'Founded by German industry leaders. Ideal for students with strong entrepreneurial spirit, startup drive, or technology management focus.',
      badge: 'Business & Startups'
    },
    {
      name: 'Hans Böckler Foundation',
      focus: 'Labor Unions & Worker Co-Determination',
      amount: 'Up to €992/mo + labor network',
      details: 'The foundation of the German Confederation of Trade Unions (DGB). Supports students who actively support labor rights and social justice.',
      badge: 'Labor Rights'
    }
  ];

  return (
    <section id="foundations-and-grants" className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Foundations & Campus Aid</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            The 13 National Foundations & HiWi Assistantships
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            Beyond standard government grants, Germany features 13 major state-funded scholarship foundations and hundreds of paid on-campus academic assistant (HiWi) positions.
          </p>
        </div>

        {/* Foundations Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-black text-germany-black">
                The 13 Gifted Student Foundations (Begabtenförderungswerke)
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                Funded by the Federal Ministry of Education (BMBF). Monthly financial stipends match the national BAföG scale.
              </p>
            </div>
            <span className="text-xs font-bold text-germany-red shrink-0">BAföG Equivalent Rates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundations.map((item, idx) => (
              <div key={idx} className="neu-card p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-white bg-germany-black px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs font-black text-emerald-700">{item.amount.split('+')[0]}</span>
                  </div>
                  <h4 className="text-base font-black text-germany-black leading-snug">{item.name}</h4>
                  <div className="text-xs font-bold text-germany-red">{item.focus}</div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed pt-1">
                    {item.details}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Monthly + Non-Material Aid</span>
                  <Link href="/#cta" className="font-bold text-germany-red hover:underline">
                    Check Fit &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HiWi / Academic Assistantships Section */}
        <div className="neu-card p-6 sm:p-8 border-l-4 border-l-amber-500 bg-gradient-to-br from-[#FDFBF7] to-amber-50/20 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-600" /> On-Campus Research & Teaching
              </span>
              <h3 className="text-2xl font-black text-germany-black">
                HiWi Jobs (Wissenschaftliche Hilfskraft / Student Assistant)
              </h3>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                If you don’t win an upfront grant, a <strong>HiWi position</strong> is the most prestigious and lucrative way to fund your studies. Work directly under a German professor or PhD researcher at your university institute.
              </p>
            </div>

            {/* Quick Numbers Pill */}
            <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-sm shrink-0 text-center space-y-1">
              <div className="text-xs font-extrabold text-gray-500 uppercase">Hourly Pay Rate</div>
              <div className="text-2xl font-black text-germany-black">€13.50 – €18.00 <span className="text-xs font-bold text-gray-400">/ hr</span></div>
              <div className="text-xs font-bold text-emerald-700">Typical Earnings: €400 – €720 / mo</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-germany-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Commute & Flexible Hours</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Work right in your university department lab or computer center. Shifts are arranged directly around your lecture and exam timetable.
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-germany-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Thesis & Professor Access</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                HiWi roles regularly convert into paid Master’s thesis topics with industry partners and strong recommendation letters for PhD funding.
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-gray-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-germany-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Does Not Eat 140-Day Visa Limit</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Under German immigration law (§ 16b AufenthG), academic assistant employment at universities does NOT count against your 140-day work permit!
              </p>
            </div>
          </div>

          {/* How to land a HiWi job */}
          <div className="bg-amber-100/60 p-4 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="font-semibold text-amber-950 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>How to land one:</strong> Attend office hours, achieve a top grade in a seminar, or inspect the institute’s bulletin board (Schwarzes Brett) in your 1st semester.
              </span>
            </div>
            <Link
              href="/#cta"
              className="neu-btn px-3 py-1.5 font-bold text-gray-800 hover:text-germany-black whitespace-nowrap shrink-0"
            >
              Get Guidance &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
