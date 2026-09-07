"use client";

import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, HeartPulse, Award, Globe, Stethoscope } from 'lucide-react';

export const InsuranceProviders = () => {
  const providers = [
    {
      name: "TK (Techniker Krankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "Most Popular for Students",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description: "Ranked Germany's best health insurer by Focus-Money. Comprehensive English mobile app, 24/7 doctor chat, and modern digital onboarding.",
      perks: [
        "100% English-speaking support & consultations",
        "Free dental checkups & professional cleaning subsidy",
        "Up to €160 annual fitness & vaccination cash bonus",
        "Direct M10 electronic university notification"
      ]
    },
    {
      name: "Barmer",
      type: "Public Statutory (GKV)",
      badge: "Excellent Nationwide Care",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      description: "One of Germany's established healthcare pillars with nationwide customer service points in almost every major university town.",
      perks: [
        "Extensive multilingual support for international arrivals",
        "Specialized dental coverage & travel vaccine subsidies",
        "Complimentary 720° wellness & mental health apps",
        "Fast digital university registration transfer"
      ]
    },
    {
      name: "AOK (Allgemeine Ortskrankenkasse)",
      type: "Public Statutory (GKV)",
      badge: "Regional University Campuses",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
      description: "Deep ties with German university student services (Studentenwerk) with dedicated on-campus offices for immediate assistance.",
      perks: [
        "Physical helpdesks near major German universities",
        "Free preventative screenings & gym rewards",
        "Statutory student flat rate guarantee",
        "Family insurance at zero extra charge"
      ]
    },
    {
      name: "Ottonova & Expat Private Partners",
      type: "Accredited Private (PKV)",
      badge: "Best for 30+ & Preparatory",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      description: "100% digital private health insurance tailored for students over 30, PhD scholars, and preparatory language course attendees.",
      perks: [
        "Cost-effective plans starting from €85 to €140/month",
        "Fast concierge service with English chat & reimbursement",
        "Meets all German consular visa requirements",
        "Seamless transition support once enrolled in Master's"
      ]
    }
  ];

  return (
    <section id="section-providers" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Certified Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Supported Insurers &amp; <span className="text-germany-red">Partners</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            EuropeBridge provides unbiased assistance across all official German Krankenkassen. We help you choose the provider with the best local coverage for your campus.
          </p>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {providers.map((p, idx) => (
            <div 
              key={idx}
              className="neu-card p-6 bg-white border border-gray-200/90 hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-germany-black group-hover:text-germany-red transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">{p.type}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border shrink-0 ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                  {p.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <p className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Included Perks:</p>
                  <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                    {p.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Visa Compliant
                </span>
                <span className="text-germany-red font-black">€0 Advisory Cost</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
