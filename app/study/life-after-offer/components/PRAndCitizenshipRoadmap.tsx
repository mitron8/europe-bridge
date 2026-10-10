"use client";

import React from 'react';
import { 
  Award, 
  Globe2, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const PRAndCitizenshipRoadmap = () => {
  const prRoutes = [
    {
      route: 'EU Blue Card + B1 German',
      duration: '21 Months',
      badge: 'Fastest Route',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      requirements: '21 months of Blue Card employment, 21 months of pension contributions, Goethe/telc B1 German certificate, clean record.'
    },
    {
      route: 'EU Blue Card + A1 German',
      duration: '27 Months',
      badge: 'Basic German',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      requirements: '27 months of Blue Card employment, 27 months of pension contributions, elementary A1 German language proof.'
    },
    {
      route: 'German Uni Graduate (§18c AufenthG)',
      duration: '24 Months',
      badge: 'Graduate Special',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      requirements: 'Graduated from a German university, held a qualified work permit (§18b) for 24 months, 24 months pension contributions, B1 German.'
    },
    {
      route: 'Standard Skilled Worker (§18a/b)',
      duration: '36 Months',
      badge: 'General Route',
      badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
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
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-[52px] items-center justify-center rounded-2xl bg-white border border-[#EBE7E0] shadow-sm shrink-0">
            <Award className="w-7 h-7 text-germany-red" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-germany-red mb-1">
              <span>Section 05</span>
              <span>•</span>
              <span>Niederlassungserlaubnis &amp; StAG Reform</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-germany-black font-display">
              Path to Permanent Residence &amp; German Citizenship
            </h2>
          </div>
        </div>

        {/* PR Pathways Table */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE7E0] pb-4">
            <div>
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-germany-red" />
                <span>Permanent Residence (Niederlassungserlaubnis) Comparison</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Permanent residency provides an indefinite, unrestricted right to live and work in Germany
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prRoutes.map((r, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                  <span className="text-sm font-black text-germany-red flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {r.duration}
                  </span>
                </div>
                <h4 className="text-sm font-black text-germany-black">{r.route}</h4>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{r.requirements}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Student-to-Passport Roadmap */}
        <div className="neu-card p-6 lg:p-8 bg-white space-y-6">
          <div className="flex items-center justify-between border-b border-[#EBE7E0] pb-3">
            <div>
              <h3 className="text-lg font-black text-germany-black font-display flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-germany-red" />
                <span>The Complete 5-Year Roadmap: Student to German Passport</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                From landing at Frankfurt Airport to holding one of the most powerful passports in the world
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapMilestones.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0] space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-germany-black text-white text-xs font-black tracking-wider">
                    {m.period}
                  </span>
                  <span className="text-xs font-black text-germany-red font-display">Step 0{idx + 1}</span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-germany-black">{m.title}</h4>
                  <span className="text-[11px] text-gray-500 font-bold block mt-0.5">{m.status}</span>
                </div>

                <ul className="space-y-1.5 pt-1 text-xs text-gray-700 font-medium">
                  {m.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug text-[11px]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Dual Citizenship Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-emerald-900 block text-sm">
                Historic Dual Citizenship Law (2024+ German Nationality Act Reform)
              </span>
              <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                Germany officially allows <strong>multiple citizenship</strong> for all applicants. You no longer have to surrender your home passport to acquire German citizenship. Furthermore, student visa years legally count towards the 5-year naturalization timeline!
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
