"use client";
import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, HeartPulse, Award, Globe, Stethoscope, ArrowRight } from 'lucide-react';

export const HealthInsuranceProviders = () => {
  const providers = [
    {
      name: "TK (Techniker Krankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "Most Popular for Students",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
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
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
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
      badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
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
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
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
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Certified German Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Supported Insurers &amp; Providers
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            EuropeBridge provides unbiased assistance across all official German Krankenkassen. We help you choose the provider with the best local coverage for your campus.
          </p>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-2">
          {providers.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-gray-200 hover:border-germany-red/50 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-germany-black">
                      {p.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">{p.type}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {p.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">Key Benefits:</span>
                  {p.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={p.partnerLink}
                className="w-full py-3 rounded-xl bg-gray-100 hover:bg-germany-black hover:text-white text-gray-800 text-xs font-extrabold flex items-center justify-center gap-2 transition-all"
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
