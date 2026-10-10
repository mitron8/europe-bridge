"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const DmatEligibilityChecker = () => {
  const [degreeType, setDegreeType] = useState('3-year-bsc');
  const [targetDegree, setTargetDegree] = useState('masters-tech');

  const checkStatus = () => {
    if (degreeType === '4-year-btech') {
      return {
        required: false,
        status: "Usually Exempted",
        color: "green",
        title: "Standard APS Verification Applies (dMAT Not Required)",
        desc: "Graduates of 4-year engineering/technology degrees (B.Tech, B.E., 4-year BS) from UGC/AICTE-recognized universities generally follow the standard APS document-verification pathway without needing the dMAT exam for consecutive technical Master's programs."
      };
    } else if (degreeType === '3-year-bsc' || degreeType === '3-year-bca' || degreeType === '3-year-bcom') {
      return {
        required: true,
        status: "Mandatory / Highly Recommended",
        color: "red",
        title: "dMAT is Required for Direct Master's APS Verification",
        desc: "Under the updated APS India regulations starting with 2026/2027 intakes, students with 3-year Indian Bachelor's degrees (B.Sc, BCA, B.Com, BBA) targeting German universities must sit for the dMAT (General Academic Module) to validate academic readiness and bridge European credit equivalents."
      };
    } else {
      return {
        required: true,
        status: "Verification Required",
        color: "amber",
        title: "Check Specific University Prerequisite",
        desc: "Depending on your specific university ranking on Anabin (H+ status) and your target German master's faculty regulations, a dMAT or TestAS score may be mandatory. We recommend booking a free verification review."
      };
    }
  };

  const status = checkStatus();

  return (
    <section id="eligibility-check" className="py-8 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 border-2 border-amber-200/90 bg-gradient-to-b from-white to-amber-50/30 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Interactive Verification Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Do You Even Need the dMAT?
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Run this quick check before spending money. If the dMAT doesn&apos;t apply to your degree background, we will tell you plainly.
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs shrink-0 text-center">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider block">Official Exam Code</span>
            <div className="text-lg font-black text-germany-black">g.a.s.t. dMAT</div>
            <span className="text-[10px] font-bold text-gray-400">Administered via TestDaF</span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-germany-red" />
              Your Completed / Current Undergraduate Degree
            </label>
            <select
              value={degreeType}
              onChange={(e) => setDegreeType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
            >
              <option value="4-year-btech">4-Year B.Tech / B.E. / BS (Engineering / Technology)</option>
              <option value="3-year-bsc">3-Year B.Sc (Computer Science / IT / Physical Sciences)</option>
              <option value="3-year-bca">3-Year BCA (Computer Applications)</option>
              <option value="3-year-bcom">3-Year B.Com / BBA (Commerce / Business)</option>
              <option value="other-degree">Other 3-Year or Integrated Master&apos;s Degree</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-germany-red" />
              Intended Degree in Germany
            </label>
            <select
              value={targetDegree}
              onChange={(e) => setTargetDegree(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
            >
              <option value="masters-tech">Master of Science (M.Sc) / M.Eng (Public University)</option>
              <option value="masters-mgmt">Master in Management (M.Sc / MBA)</option>
              <option value="bachelors-direct">Bachelor&apos;s Degree (Undergraduate Transfer)</option>
            </select>
          </div>
        </div>

        {/* Verdict Box */}
        <motion.div 
          key={degreeType}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border-2 ${
            status.color === 'red' 
              ? 'bg-red-50/80 border-red-300' 
              : status.color === 'green' 
              ? 'bg-green-50/80 border-green-300' 
              : 'bg-amber-50/80 border-amber-300'
          } space-y-4`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
            <div className="flex items-center gap-2">
              {status.color === 'red' ? (
                <AlertCircle className="w-5 h-5 text-germany-red shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
              )}
              <h3 className="font-extrabold text-germany-black text-lg">{status.title}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              status.color === 'red' ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'
            }`}>
              {status.status}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
            {status.desc}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            {status.required ? (
              <a 
                href="#pricing"
                className="neu-btn-primary px-6 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md w-full sm:w-auto"
              >
                <span>Fast-Track My Registration (₹1,999)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <a 
                href="/services/university-shortlisting"
                className="neu-btn px-6 py-3 text-xs sm:text-sm font-extrabold text-germany-black bg-white border border-gray-200 hover:text-germany-red w-full sm:w-auto text-center"
              >
                <span>Explore University Shortlisting Instead</span>
              </a>
            )}

            <span className="text-xs text-gray-500 font-bold">
              Unsure about your university&apos;s specific criteria? Talk to an advisor.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
