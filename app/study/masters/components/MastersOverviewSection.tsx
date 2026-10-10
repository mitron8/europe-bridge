"use client";

import React from 'react';
import { Award, CheckCircle, Euro, Globe2, Layers, Lightbulb, MapPin, TrendingUp } from 'lucide-react';

export const MastersOverviewSection = () => {
  const pillars = [
    {
      icon: Euro,
      title: "0€ Tuition at Public Universities",
      badge: "Financial Freedom",
      desc: "Higher education is funded by federal taxpayers as a public good. Except for Baden-Württemberg (€1,500/semester for non-EU students), public universities charge zero tuition. You only pay a nominal semester contribution (€150–€350) which includes regional transit.",
      highlight: "Save $60,000–$120,000 compared to US/UK master's degrees."
    },
    {
      icon: Globe2,
      title: "400+ English-Taught Degrees",
      badge: "No German Required for Study",
      desc: "Top institutions offer fully accredited International Master's programs taught completely in English. Core disciplines include Computer Science, Artificial Intelligence, Robotics, Automotive Engineering, Renewable Energy, and Management.",
      highlight: "Over 70% of engineering & CS postgraduates in Germany study in English."
    },
    {
      icon: Layers,
      title: "European Industrial Powerhouse",
      badge: "Direct Industry Tie-ups",
      desc: "Germany is Europe's largest economy and the world's 3rd largest exporter. Universities maintain direct partnerships with Siemens, BMW, Mercedes-Benz, SAP, Bosch, BASF, and Infineon, enabling mandatory paid industrial internships and thesis sponsorships.",
      highlight: "Direct access to Werkstudent (working student) contracts paying €16–€24/hr."
    },
    {
      icon: Award,
      title: "Streamlined Path to EU Blue Card & PR",
      badge: "Immigration Advantage",
      desc: "Graduates automatically receive an 18-month Job Seeker Visa (§20 AufenthG). Upon securing a qualifying job, you transition directly to an EU Blue Card. German permanent residency (Niederlassungserlaubnis) is achievable in just 21 months with B1 German.",
      highlight: "Accelerated 5-year naturalization path for German university alumni."
    }
  ];

  const ectsBreakdown = [
    { semester: "Semester 1", credits: "30 ECTS", label: "Core Theoretical Foundations", desc: "Advanced mathematical modeling, domain-specific core subjects, and specialized lab work." },
    { semester: "Semester 2", credits: "30 ECTS", label: "Electives & Seminar Projects", desc: "Interdisciplinary electives, research seminars, and group software/hardware engineering projects." },
    { semester: "Semester 3", credits: "30 ECTS", label: "Specialization / Industrial Internship", desc: "Advanced niche modules, academic exchange, or full-time 6-month corporate internship." },
    { semester: "Semester 4", credits: "30 ECTS", label: "Master's Thesis & Colloquium", desc: "6-month individual scientific research thesis, frequently sponsored in collaboration with industry partners." },
  ];

  const topInstitutions = [
    { name: "Technical University of Munich (TUM)", city: "Munich, Bavaria", type: "TU9 / Excellence University", focus: "CS, Robotics, Mechanical, Management", rank: "#28 Globally (QS 2026)" },
    { name: "RWTH Aachen University", city: "Aachen, North Rhine-Westphalia", type: "TU9 / Excellence University", focus: "Automotive, Mechanical, Metallurgy, AI", rank: "#99 Globally (QS 2026)" },
    { name: "Technical University of Berlin (TU Berlin)", city: "Berlin", type: "TU9 Alliance", focus: "Data Engineering, Computer Science, Energy", rank: "#147 Globally (QS 2026)" },
    { name: "Karlsruhe Institute of Technology (KIT)", city: "Karlsruhe, Baden-Württemberg", type: "TU9 / Excellence University", focus: "Electrical, Physics, Informatics, Mobility", rank: "#102 Globally (QS 2026)" },
    { name: "TU Dresden", city: "Dresden, Saxony (Silicon Saxony)", focus: "Microelectronics, Nanotech, CS", type: "TU9 / Excellence University", rank: "#234 Globally (QS 2026)" },
    { name: "University of Stuttgart", city: "Stuttgart, Baden-Württemberg", type: "TU9 Alliance", focus: "Automotive, Aerospace, Computational Mechanics", rank: "#300 Globally (QS 2026)" }
  ];

  return (
    <section id="overview" className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="space-y-2.5 sm:space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-red-100/80 text-germany-red text-[11px] sm:text-xs font-black uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Why Germany?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-germany-black">
          The 4 Pillars of a German <span className="text-germany-red">Master&apos;s Degree</span>
        </h2>
        <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
          Germany has become the top destination worldwide for international postgraduate studies outside the Anglophone sphere. Here is what makes the system distinct.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div 
              key={pillar.title} 
              className="neu-card p-4 sm:p-7 bg-white flex flex-col justify-between space-y-3.5 sm:space-y-4 hover:shadow-[14px_14px_32px_rgba(210,205,195,0.7)] transition-all"
            >
              <div className="space-y-2.5 sm:space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-50 border border-red-200/80 flex items-center justify-center text-germany-red">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FAF8F5] border border-[#EBE7E0] text-[10px] sm:text-[11px] font-extrabold text-germany-black">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-germany-black">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EBE7E0] flex items-start sm:items-center gap-2 text-[11px] sm:text-xs font-extrabold text-emerald-700 bg-emerald-50/50 p-2 sm:p-2.5 rounded-xl border border-emerald-200/60">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                <span>{pillar.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ECTS Credit Structure Breakdown */}
      <div className="neu-card p-4 sm:p-8 bg-white space-y-4 sm:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4 border-b border-[#EBE7E0] pb-3 sm:pb-4">
          <div>
            <h3 className="font-display text-lg sm:text-2xl font-black text-germany-black">
              Understanding the 120 ECTS Degree Architecture
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5 sm:mt-1">
              German Master&apos;s degrees adhere strictly to the European Credit Transfer and Accumulation System (ECTS).
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-extrabold shrink-0 w-fit">
            1 ECTS = ~30 Academic Hours
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {ectsBreakdown.map((item, idx) => (
            <div key={item.semester} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-1.5 sm:space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-germany-red">{item.semester}</span>
                <span className="text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-white border border-gray-200 text-germany-black">
                  {item.credits}
                </span>
              </div>
              <h4 className="font-display text-sm font-bold text-germany-black">{item.label}</h4>
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Research Hubs & TU9 Showcase */}
      <div className="neu-card p-4 sm:p-8 bg-white space-y-4 sm:space-y-6">
        <div className="space-y-1 border-b border-[#EBE7E0] pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase text-germany-gold tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Prestige &amp; Innovation</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-black text-germany-black">
            Top Public Technical Universities (TU9 Network)
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            The TU9 alliance represents Germany&apos;s 9 most prominent technical universities, celebrated for scientific citations, patent generation, and industrial recruitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topInstitutions.map((uni) => (
            <div key={uni.name} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE7E0] space-y-2.5 hover:border-germany-red/40 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">{uni.type}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700">{uni.rank}</span>
              </div>
              <h4 className="font-display text-sm font-bold text-germany-black leading-snug">{uni.name}</h4>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{uni.city}</span>
              </div>
              <div className="text-[11px] font-medium text-gray-600 pt-1 border-t border-gray-200/70">
                <strong>Key Strengths:</strong> {uni.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
