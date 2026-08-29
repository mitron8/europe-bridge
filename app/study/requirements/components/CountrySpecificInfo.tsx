"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, ShieldCheck, CheckCircle2, FileSearch, Flag } from 'lucide-react';

export const CountrySpecificInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState<'india' | 'china' | 'southasia' | 'eu'>('india');

  return (
    <section id="section-country" className="py-12 px-6 lg:px-12 scroll-mt-24 bg-gradient-to-b from-transparent via-red-50/20 to-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold shrink-0 shadow-sm">
              <Globe2 className="w-6 h-6 text-germany-red" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Requirement #6</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">Special Requirements by Country</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Depending on your country of origin, specific verification certificates (like APS) or attestation processes apply.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/visa approved.png" 
            alt="Visa Approved Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Country Selector Pills */}
        <div className="flex flex-wrap gap-2 justify-start">
          <button
            onClick={() => setSelectedCountry('india')}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all border flex items-center gap-2 ${
              selectedCountry === 'india'
                ? 'bg-germany-black text-white border-germany-black shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-amber-500" />
            <span>India (APS Mandatory)</span>
          </button>

          <button
            onClick={() => setSelectedCountry('china')}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all border flex items-center gap-2 ${
              selectedCountry === 'china'
                ? 'bg-germany-black text-white border-germany-black shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-red-500" />
            <span>China (APS China)</span>
          </button>

          <button
            onClick={() => setSelectedCountry('southasia')}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all border flex items-center gap-2 ${
              selectedCountry === 'southasia'
                ? 'bg-germany-black text-white border-germany-black shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Pakistan, Bangladesh &amp; Nepal</span>
          </button>

          <button
            onClick={() => setSelectedCountry('eu')}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all border flex items-center gap-2 ${
              selectedCountry === 'eu'
                ? 'bg-germany-black text-white border-germany-black shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-blue-500" />
            <span>EU / EEA Applicants</span>
          </button>
        </div>

        {/* Country Content Card */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          {selectedCountry === 'india' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-extrabold text-germany-black text-lg flex items-center gap-2">
                  <span>Requirements for Indian Applicants</span>
                </h3>
                <span className="text-xs font-black text-germany-red bg-red-100 px-3 py-1 rounded-full border border-red-200">
                  APS Certificate Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <ShieldCheck className="w-5 h-5 text-amber-800" />
                  <h4 className="text-xs font-black uppercase text-germany-black">1. APS Certificate</h4>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    Mandatory since Nov 2022. Verify academic authenticity via APS India office in New Delhi before university/visa application. Takes 2–3 months.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <FileSearch className="w-5 h-5 text-blue-800" />
                  <h4 className="text-xs font-black uppercase text-germany-black">2. 3-Year vs 4-Year Degrees</h4>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    4-year B.Tech / B.E. degrees are 100% recognized. Most 3-year B.Sc / B.Com / B.A. degrees are recognized if from NAAC 'A' grade universities with 180 ECTS equivalence.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                  <h4 className="text-xs font-black uppercase text-germany-black">3. MEA Apostille</h4>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    Degree certificates and mark sheets must be apostilled by the Ministry of External Affairs (MEA India) prior to student visa stamping.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedCountry === 'china' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-extrabold text-germany-black text-lg">Requirements for Chinese Applicants</h3>
                <span className="text-xs font-black text-germany-red bg-red-100 px-3 py-1 rounded-full border border-red-200">
                  APS China (Beijing)
                </span>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-germany-red mt-0.5 shrink-0" />
                  <span><strong>APS Certificate:</strong> Verification is processed through the APS office in Beijing and requires written tests / interviews for certain programs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-germany-red mt-0.5 shrink-0" />
                  <span><strong>Gaokao Direct Admission:</strong> Since 2020, Chinese high school graduates with strong Gaokao scores can enter German Bachelor's programs directly without Studienkolleg.</span>
                </li>
              </ul>
            </div>
          )}

          {selectedCountry === 'southasia' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-extrabold text-germany-black text-lg">Requirements for Pakistan, Bangladesh &amp; Nepal</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>No APS Requirement:</strong> Applicants do not require an APS certificate, but university equivalence (Anabin status) is checked rigorously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Attestation:</strong> HEC attestation (Pakistan) or UGC equivalence certificate (Bangladesh) is mandatory before embassy submission.</span>
                </li>
              </ul>
            </div>
          )}

          {selectedCountry === 'eu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-extrabold text-germany-black text-lg">Requirements for EU / EEA Citizens</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span><strong>Direct Recognition:</strong> EU degrees are automatically recognized under the Bologna Process (ECTS credit transfer).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span><strong>No Visa / No Blocked Account:</strong> EU students do not need a visa, APS certificate, or blocked account.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
