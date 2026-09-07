"use client";

import React from 'react';
import { ShieldCheck, Scale, HeartHandshake, CreditCard, Users, Building, CheckCircle2 } from 'lucide-react';

export const InsuranceFeatures = () => {
  const features = [
    {
      icon: ShieldCheck,
      badge: "Legal Obligation",
      title: "Mandatory Requirement",
      description:
        "Health insurance is legally required for everyone living in Germany. You must show proof of coverage for both your student visa application and official university matriculation.",
      details: "No visa or university enrollment is granted without valid German coverage."
    },
    {
      icon: Scale,
      badge: "Dual System",
      title: "Two Distinct Systems",
      description:
        "Germany offers public (statutory / GKV) and private (PKV) health insurance. Eligibility, long-term costs, and benefits vary significantly based on your age and academic status.",
      details: "Public coverage is standardized; private coverage is contract-tailored."
    },
    {
      icon: HeartHandshake,
      badge: "Full Protection",
      title: "Comprehensive Coverage",
      description:
        "German health insurance provides world-class medical care covering general practitioner visits, hospital inpatient care, basic dental, and prescription medicines.",
      details: "Direct electronic billing via your German health insurance smart card."
    },
    {
      icon: CreditCard,
      badge: "Subsidized Rates",
      title: "Student Cost Structure",
      description:
        "Students under 30 benefit from a subsidized flat rate (~€140 to €150/month in 2026). Employed graduates pay roughly 14.6% + Zusatzbeitrag split equally with their employer.",
      details: "Zero payments are deducted until your semester officially commences."
    },
    {
      icon: Users,
      badge: "Dependents",
      title: "Family & Dependent Coverage",
      description:
        "Under the statutory public system, non-working spouses and dependent children can frequently be insured at zero additional monthly premium under family insurance (Familienversicherung).",
      details: "Private insurance requires individual standalone policies per family member."
    },
    {
      icon: Building,
      badge: "Top Insurers",
      title: "Multiple Certified Providers",
      description:
        "Choose between premier public Krankenkassen (TK, Barmer, AOK, DAK) and accredited private expat insurers (Ottonova, Allianz, Mawista, Dr-Walter) through one platform.",
      details: "Unbiased advice ensuring your provider matches your exact university town."
    }
  ];

  return (
    <section id="section-features" className="py-16 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Essential German Healthcare</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get with <span className="text-germany-red">EuropeBridge Setup</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Navigating the German healthcare system (Gesetzliche vs. Private Krankenversicherung) made seamless with zero advisory fees and immediate electronic university notification.
          </p>
        </div>

        {/* 6 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="neu-card p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 border border-gray-200/80 bg-white/90 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-germany-red group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-germany-black group-hover:text-germany-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] font-semibold text-gray-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.details}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
