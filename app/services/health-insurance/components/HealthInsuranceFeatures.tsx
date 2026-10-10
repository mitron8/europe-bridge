"use client";
import React from 'react';
import { ShieldCheck, Scale, Heart, CreditCard, Users, Landmark, CheckCircle2 } from 'lucide-react';

export const HealthInsuranceFeatures = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Mandatory Visa Requirement",
      desc: "German law mandates that every international student must possess comprehensive health insurance to obtain a student visa and residence permit."
    },
    {
      icon: Scale,
      title: "Two Complementary Systems",
      desc: "Germany offers statutory public insurance (GKV) and accredited private insurance (PKV). We help you navigate eligibility rules so you never make an irreversible mistake."
    },
    {
      icon: Heart,
      title: "Comprehensive Medical Care",
      desc: "Covers 100% of general physician visits, specialist consults, prescription medicines, emergency inpatient hospital stays, and routine dental exams."
    },
    {
      icon: CreditCard,
      title: "Regulated Student Rate",
      desc: "Public insurance offers an equitable, government-regulated flat rate for students under 30 (~€140–€150/month), avoiding costly commercial insurance premiums."
    },
    {
      icon: Users,
      title: "Free Family Coverage (Public)",
      desc: "Bringing dependents? Under statutory public insurance, your non-working spouse and children are co-insured under your policy for €0 additional premium."
    },
    {
      icon: Landmark,
      title: "Electronic M10 Transmission",
      desc: "Universities no longer accept paper insurance slips. Our partner insurers automatically transmit your digital M10 confirmation directly to your university registrar."
    }
  ];

  return (
    <section id="features" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Included Benefits</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge Health Insurance Setup
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Everything you need for seamless university enrollment, visa approval, and complete healthcare peace of mind in Germany.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Embassy &amp; University Approved</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
