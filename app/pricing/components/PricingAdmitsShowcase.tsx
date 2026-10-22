"use client";
import React from 'react';
import { Award, GraduationCap, Building2, Quote, Star, CheckCircle2 } from 'lucide-react';

interface AdmitItem {
  name: string;
  undergrad: string;
  admittedUni: string;
  program: string;
  germanGrade: string;
  packageUsed: string;
  quote: string;
}

const RECENT_ADMITS: AdmitItem[] = [
  {
    name: "Aditya S.",
    undergrad: "B.Tech Computer Science (8.4 CGPA, VTU)",
    admittedUni: "Technical University of Munich (TUM)",
    program: "M.Sc. Data Engineering and Analytics",
    germanGrade: "German 1.7",
    packageUsed: "Standard Package",
    quote: "My counsellor mapped my mathematics and algorithms credits to TUM's ECTS matrix down to the exact lecture hour. I received my direct admission offer without an assessment test!"
  },
  {
    name: "Rohan M.",
    undergrad: "B.E. Mechanical Engineering (7.6 CGPA, Pune)",
    admittedUni: "RWTH Aachen University",
    program: "M.Sc. Robotic Systems Engineering",
    germanGrade: "German 2.1",
    packageUsed: "Premium Package (Guarantee)",
    quote: "With 7.6 CGPA, three other consultancies told me RWTH was impossible. EuropeBridge crafted two stellar faculty LORs and a course-matched SOP that highlighted my formula student project."
  },
  {
    name: "Sneha K.",
    undergrad: "B.Tech Electrical & Electronics (8.8 CGPA, Anna Uni)",
    admittedUni: "Karlsruhe Institute of Technology (KIT)",
    program: "M.Sc. Electrical Engineering & IT",
    germanGrade: "German 1.4",
    packageUsed: "Standard Package",
    quote: "The APS certificate guidance and CSP visa portal audit saved me weeks of embassy back-and-forth. Got my national visa stamped in 18 calendar days!"
  },
  {
    name: "Vikram P.",
    undergrad: "B.Tech Information Technology (8.0 CGPA, Mumbai)",
    admittedUni: "TU Berlin",
    program: "M.Sc. Computer Science (Informatik)",
    germanGrade: "German 1.9",
    packageUsed: "Standard Package",
    quote: "Direct admission at TU Berlin for Winter 2026. The EuropeBridge team helped with Uni-Assist VPD, dMAT exam registration, and the full accommodation search."
  }
];

export const PricingAdmitsShowcase: React.FC = () => {
  return (
    <section className="bg-[#f4f1ea] py-16 sm:py-24 border-y border-[#e5e0d3]">
      <div className="lp-container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#244b7a] bg-[#244b7a]/10 px-3.5 py-1 rounded-full border border-[#244b7a]/20 inline-block">
            Verified Admission Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#16161a]">
            Recent Admits from EuropeBridge Students
          </h2>
          <p className="text-xs sm:text-sm text-[#5e5b54]">
            Over 100+ public German university acceptance letters secured for the upcoming semester.
          </p>
        </div>

        {/* Admits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RECENT_ADMITS.map((admit, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e5e0d3] shadow-2xs hover:shadow-sm transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#16161a]">
                    {admit.admittedUni}
                  </h3>
                  <p className="text-xs font-bold text-[#9e2a2b] mt-0.5">
                    {admit.program}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#f4f1ea] border border-[#dcd7cb] text-[#4a4740] shrink-0">
                  {admit.packageUsed}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#787369] font-medium py-2 border-y border-[#ece7dd]">
                <span>Student: <strong className="text-[#16161a]">{admit.name}</strong></span>
                <span>·</span>
                <span>{admit.undergrad}</span>
                <span>·</span>
                <span className="text-[#2e7d46] font-bold">{admit.germanGrade}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#4a4740] leading-relaxed italic relative">
                &ldquo;{admit.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
