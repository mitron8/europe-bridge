"use client";
import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Building2, User, HelpCircle, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

export const HealthInsuranceDecider = () => {
  const [profile, setProfile] = useState<'under30' | 'over30' | 'language'>('under30');

  const profileData = {
    under30: {
      type: "Statutory Public Insurance (GKV)",
      providerNames: "Techniker Krankenkasse (TK), Barmer, AOK",
      monthlyEur: "~€140 – €150",
      monthlyInr: "~₹12,900 – ₹13,800",
      status: "Legally Required & Best Choice",
      statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      coverageHighlights: [
        "100% cashless doctor visits & outpatient specialist treatments",
        "Full hospital inpatient stays & emergency ambulance care",
        "Routine dental checkups & annual professional cleaning subsidy",
        "Free family insurance: Non-working spouse & children covered at €0 extra",
        "Electronic M10 notification sent straight to German university for enrollment"
      ],
      caution: "Public insurance is legally mandated for regular degree students under 30. Opting out to private is permanent for the rest of your studies in Germany."
    },
    over30: {
      type: "Accredited Private Insurance (PKV) or Voluntary Public",
      providerNames: "Ottonova, Feather, or TK Voluntary",
      monthlyEur: "~€95 – €160 (Private) vs ~€240+ (Public)",
      monthlyInr: "~₹8,800 – ₹14,800 vs ~₹22,000+",
      status: "Cost-Saving Choice for Mature Students",
      statusBadge: "bg-amber-100 text-amber-900 border-amber-200",
      coverageHighlights: [
        "Private premiums are age-based, avoiding the steep €240+/mo public rate",
        "Fast-track specialist appointments & private hospital ward options",
        "100% English mobile app with direct digital bill reimbursement",
        "Meets all German embassy visa and residence permit (§ 16b/16a) guidelines",
        "Includes repatriation and global worldwide travel cover"
      ],
      caution: "If choosing private, you must obtain an official public insurance exemption certificate (Befreiungsbescheinigung) for university registration."
    },
    language: {
      type: "Private Expat Preparatory Health Insurance",
      providerNames: "Mawista, Care Concept, Dr-Walter ProVisit",
      monthlyEur: "~€35 – €75",
      monthlyInr: "~₹3,200 – ₹6,900",
      status: "Mandatory for Pre-Degree Studies",
      statusBadge: "bg-purple-100 text-purple-900 border-purple-200",
      coverageHighlights: [
        "Budget-friendly plans tailored specifically for preparatory students",
        "Satisfies German embassy requirements for language visa issuance",
        "Covers acute illnesses, pain relief, dental emergencies, and hospital care",
        "Flexible monthly duration with immediate cancellation upon degree start",
        "Smooth transition to statutory public insurance once university starts"
      ],
      caution: "Students in preparatory courses or Studienkolleg are not legally eligible for public statutory insurance until official degree enrollment."
    }
  };

  const current = profileData[profile];

  return (
    <section id="decider" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8 bg-gradient-to-br from-white via-red-50/20 to-white border border-red-100">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Interactive Eligibility Decider</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Public vs. Private: Which Fits Your Status?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Germany has strict regulations governing healthcare access. Select your status to see your official eligibility and costs.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100/90 border border-gray-200/80 gap-1.5 shadow-inner max-w-full overflow-x-auto">
            <button
              onClick={() => setProfile('under30')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                profile === 'under30'
                  ? 'bg-white text-germany-black shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Student Under 30 (Bachelor/Master)</span>
            </button>

            <button
              onClick={() => setProfile('over30')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                profile === 'over30'
                  ? 'bg-white text-germany-black shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Student Over 30 / PhD</span>
            </button>

            <button
              onClick={() => setProfile('language')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                profile === 'language'
                  ? 'bg-white text-germany-black shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-germany-red" />
              <span>Language School / Studienkolleg</span>
            </button>
          </div>
        </div>

        {/* Details Card */}
        <motion.div
          key={profile}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-md space-y-6 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${current.statusBadge}`}>
                {current.status}
              </span>
              <h3 className="text-2xl font-black text-germany-black mt-2 font-display">{current.type}</h3>
              <p className="text-xs font-bold text-gray-500 mt-0.5">Recommended Providers: {current.providerNames}</p>
            </div>

            <div className="text-left sm:text-right bg-red-50/50 p-3 sm:p-0 rounded-2xl sm:bg-transparent">
              <div className="text-xs font-bold text-gray-500 uppercase">Estimated Monthly Premium</div>
              <div className="text-2xl sm:text-3xl font-black text-germany-black font-display">{current.monthlyEur} <span className="text-xs font-normal text-gray-500">/mo</span></div>
              <div className="text-xs font-extrabold text-germany-red">{current.monthlyInr}</div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-gray-600 tracking-wider block">Coverage Inclusions:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.coverageHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Caution Advisory Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{current.caution}</span>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full compliance with German Consular Visa Section guidelines.</span>
            </div>

            <a
              href="#booking"
              className="neu-btn-primary w-full sm:w-auto px-6 py-3 text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Get Free Setup &amp; M10 Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
