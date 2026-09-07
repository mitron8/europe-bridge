"use client";

import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Building2, User, HelpCircle, ArrowRight } from 'lucide-react';

export const PublicVsPrivateSection = () => {
  const [selectedStudentType, setSelectedStudentType] = useState<'under30' | 'over30' | 'language'>('under30');

  return (
    <section id="section-comparison" className="py-16 px-6 lg:px-12 bg-white/60 border-y border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Public vs. Private Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Which System Fits Your <span className="text-germany-red">Profile?</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Germany has strict eligibility rules. Selecting the wrong category can lead to visa complications or irreversible exclusion from statutory coverage.
          </p>
        </div>

        {/* Student Scenario Selector */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100/90 border border-gray-200/80 gap-1.5 shadow-inner">
            <button
              onClick={() => setSelectedStudentType('under30')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                selectedStudentType === 'under30'
                  ? 'bg-white text-germany-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Student Under 30 (Bachelor/Master)</span>
            </button>
            <button
              onClick={() => setSelectedStudentType('over30')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                selectedStudentType === 'over30'
                  ? 'bg-white text-germany-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Student 30+ / PhD Researcher</span>
            </button>
            <button
              onClick={() => setSelectedStudentType('language')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                selectedStudentType === 'language'
                  ? 'bg-white text-germany-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-germany-black'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-germany-red" />
              <span>Language School / Studienkolleg</span>
            </button>
          </div>
        </div>

        {/* Scenario Recommendation Card */}
        <div className="neu-card p-6 bg-white border border-gray-200 shadow-sm max-w-4xl mx-auto space-y-3">
          {selectedStudentType === 'under30' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Recommended: Statutory Public Insurance (TK / Barmer / AOK)</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                As an enrolled university student under 30, you qualify for the legally regulated student rate (~€140–€150/month). You receive unlimited medical treatment with zero upfront payment, free family coverage for non-working dependents, and an electronic M10 notification sent straight to your university.
              </p>
            </div>
          )}

          {selectedStudentType === 'over30' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Recommended: Private Student Insurance (Ottonova / Expat Partners)</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                At age 30, public insurance rates jump to voluntary contributions (~€230–€250+/month). Opting for accredited private student coverage can reduce your monthly costs to ~€90–€160/month while maintaining full consular visa compliance and hospital coverage.
              </p>
            </div>
          )}

          {selectedStudentType === 'language' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5 text-germany-red" />
                <span>Requirement: Preparatory Expat Health Insurance (Mawista / Care Concept / Dr-Walter)</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                Students attending language preparatory courses or Studienkolleg are not yet matriculated in a full degree program and are ineligible for public statutory insurance. You must enroll in private expat insurance for your visa, and switch to public once your university studies officially commence.
              </p>
            </div>
          )}
        </div>

        {/* Detailed Comparison Table */}
        <div className="neu-card p-6 sm:p-8 bg-white border border-gray-200 shadow-lg space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-extrabold text-germany-black">
              Public (GKV) vs. Private (PKV) Head-to-Head
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              Compare key dimensions before making an irreversible enrollment decision.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="py-3 px-4 font-black text-gray-500 uppercase tracking-wider w-1/4">Feature</th>
                  <th className="py-3 px-4 font-black text-emerald-800 uppercase tracking-wider w-3/8 bg-emerald-50/50">
                    Public Statutory (e.g. TK, Barmer)
                  </th>
                  <th className="py-3 px-4 font-black text-gray-700 uppercase tracking-wider w-3/8">
                    Private Health Insurance (e.g. Ottonova)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium text-gray-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-germany-black">Monthly Cost (Under 30)</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20">
                    Subsidized ~€140 to €150/month flat
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    Starts from €80 to €120/month (depends on age &amp; health history)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-germany-black">Billing Process</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20">
                    Direct billing via electronic health card (eGK); zero cash out-of-pocket
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    Pay doctor invoice first, submit receipt to insurer for reimbursement
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-germany-black">Pre-Existing Conditions</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20">
                    100% covered by law. No medical tests or exclusions permitted
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    Requires health questionnaire; pre-existing illnesses may be excluded or increase premium
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-germany-black">University M10 Notification</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20">
                    Direct digital transmission via eXchange (M10 certificate)
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    Requires statutory insurer exemption waiver (Befreiung) before university accepts
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-germany-black">Family / Children</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20">
                    Non-earning spouse and children included at €0 additional charge
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    Requires individual paid monthly contract for each family member
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* The Digital M10 Notification Explainer Box */}
        <div className="neu-card p-6 sm:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 flex-1 text-center md:text-left">
            <h4 className="text-lg font-extrabold text-emerald-950">
              What is the Electronic M10 Insurance Certificate (SM10)?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
              Since 2022, German universities no longer accept paper insurance slips. German statutory insurers send your digital insurance status directly to your university admissions database via the <strong>elektronische Meldeverfahren (eXchange)</strong>. When you apply through EuropeBridge, we trigger this digital M10 transmission within 24 hours of your university selection so your matriculation is never stalled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
