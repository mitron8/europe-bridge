"use client";
import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, HeartPulse, Award, Globe, Stethoscope, ArrowRight } from 'lucide-react';

export const HealthInsuranceProviders = () => {
  const providers = [
    {
      name: "TK (Techniker Krankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "Most Popular for Students",
      badgeColor: "bg-[#16161a] text-white border-[#16161a]",
      description: "Ranked Germany's #1 statutory health fund by Focus-Money. Comprehensive English mobile app, 24/7 doctor telephone service, and direct electronic university M10 reporting.",
      perks: [
        "100% English customer support & digital appointment booking",
        "Free dental checkups & professional tooth cleaning subsidy",
        "Up to €160 annual fitness & vaccination cash rewards",
        "Instant electronic M10 notification sent directly to your university"
      ],
      partnerLink: "#booking"
    },
    {
      name: "Barmer",
      type: "Public Statutory (GKV)",
      badge: "Excellent Nationwide Care",
      badgeColor: "bg-[#ece7dd] text-[#16161a] border-[#dcd7cb]",
      description: "One of Germany's oldest and most respected health funds with nationwide service points in nearly every university city and strong digital health integrations.",
      perks: [
        "Specialized English support desk for international student arrivals",
        "Comprehensive preventative dental coverage & travel vaccine subsidies",
        "Complimentary 720° wellness & mental health apps",
        "Rapid M10 digital university transmission within 24 hours"
      ],
      partnerLink: "#booking"
    },
    {
      name: "AOK (Allgemeine Ortskrankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "On-Campus Helpdesks",
      badgeColor: "bg-[#ece7dd] text-[#16161a] border-[#dcd7cb]",
      description: "Deep ties with German university student services (Studentenwerk), often operating physical advice centers directly on university campuses for immediate walk-in care.",
      perks: [
        "Physical helpdesks located near or on major German campuses",
        "Free preventative screenings, gym rewards, and health courses",
        "Legally fixed statutory student contribution rate",
        "Free family insurance for non-working spouse and children"
      ],
      partnerLink: "#booking"
    },
    {
      name: "Ottonova & Private Expat Partners",
      type: "Accredited Private (PKV)",
      badge: "Best for 30+ & Preparatory",
      badgeColor: "bg-white text-[#16161a] border-[#e5e0d3]",
      description: "100% digital private health insurance tailored for students over 30, PhD scholars, and preparatory language course attendees (Mawista / Care Concept).",
      perks: [
        "Affordable premiums starting from €35 to €140/month depending on age",
        "English digital concierge with instant paperless bill reimbursement",
        "Fully approved by German Consular Visa Section & Ausländerbehörde",
        "Seamless upgrade path to public statutory once university degree starts"
      ],
      partnerLink: "#booking"
    }
  ];

  return (
    <section id="providers" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="p-6 sm:p-10 space-y-8 bg-[#faf8f3] rounded-3xl border border-[#e5e0d3] shadow-xs">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ece7dd] text-[#16161a] border border-[#dcd7cb] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Certified German Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16161a] font-display">
            Supported Insurers &amp; Providers
          </h2>
          <p className="text-sm sm:text-base text-[#5e5b54] font-medium">
            EuropeBridge provides unbiased assistance across all official German Krankenkassen. We help you choose the provider with the best local coverage for your campus.
          </p>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-2">
          {providers.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e5e0d3] hover:border-[#16161a] hover:shadow-xs transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#16161a]">
                      {p.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#5e5b54] mt-0.5">{p.type}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
                  {p.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#e5e0d3]">
                  <span className="text-[11px] font-bold uppercase text-[#5e5b54] tracking-wider">Key Benefits:</span>
                  {p.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-[#16161a]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16161a] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={p.partnerLink}
                className="w-full py-3 rounded-xl bg-[#ece7dd] hover:bg-[#16161a] hover:text-white text-[#16161a] border border-[#dcd7cb] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Enroll in {p.name.split(' ')[0]} (Free Setup)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
