"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Euro, Globe2, Layers, Lightbulb, MapPin, TrendingUp, CheckCircle2 } from 'lucide-react';

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
    <section id="overview" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 scroll-mt-28">
      {/* Section Header */}
      <div data-reveal className="space-y-3 max-w-3xl">
        <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
          Strategic Overview
        </div>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
          The 4 Pillars of a German <em className="lp-script text-[var(--lp-red)]">Master&apos;s Degree</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Germany has become the premier global destination for international postgraduate engineering and STEM degrees outside the Anglophone sphere.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div 
              key={pillar.title} 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] border border-[#e2ddd3] flex items-center justify-center text-[var(--lp-red)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ece7dd] border border-[#e2ddd3] text-[10.5px] font-semibold text-[var(--lp-text)] uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="lp-serif text-xl font-semibold text-[var(--lp-text)]">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--lp-rule)] flex items-start gap-2.5 text-xs font-medium text-[var(--lp-text)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span>{pillar.highlight}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ECTS Credit Structure Breakdown */}
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--lp-rule)] pb-4">
          <div>
            <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
              Understanding the 120 ECTS Degree Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] mt-1">
              German Master&apos;s degrees adhere strictly to the European Credit Transfer and Accumulation System (ECTS).
            </p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#ece7dd] border border-[#e2ddd3] text-[var(--lp-text)] text-xs font-semibold shrink-0 w-fit">
            1 ECTS = ~30 Academic Hours
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ectsBreakdown.map((item) => (
            <motion.div 
              key={item.semester} 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--lp-red)] uppercase tracking-wider">{item.semester}</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#e2ddd3] text-[var(--lp-text)]">
                  {item.credits}
                </span>
              </div>
              <h4 className="lp-serif text-sm font-semibold text-[var(--lp-text)]">{item.label}</h4>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flagship Research Hubs & TU9 Showcase */}
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)]">
        <div className="space-y-1.5 border-b border-[var(--lp-rule)] pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-[var(--lp-gold)] tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Prestige &amp; Innovation</span>
          </div>
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)]">
            Top Public Technical Universities (TU9 Network)
          </h3>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)]">
            The TU9 alliance represents Germany&apos;s 9 most prominent technical universities, celebrated for scientific citations, patent generation, and industrial partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topInstitutions.map((uni) => (
            <motion.div 
              key={uni.name} 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2.5 shadow-xs hover:border-[var(--lp-red)]/30 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-semibold text-[var(--lp-red)] uppercase tracking-wider">{uni.type}</span>
                <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[#ece7dd] text-[var(--lp-text)]">{uni.rank}</span>
              </div>
              <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)] leading-snug">{uni.name}</h4>
              <div className="flex items-center gap-1.5 text-xs text-[var(--lp-muted)] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[var(--lp-faint)] shrink-0" />
                <span>{uni.city}</span>
              </div>
              <div className="text-xs text-[var(--lp-muted)] pt-2 border-t border-[#e2ddd3]/60">
                <strong className="text-[var(--lp-text)]">Focus:</strong> {uni.focus}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
