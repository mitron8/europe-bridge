"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const APSFailureHandling = () => {
  return (
    <section id="section-failure" className="py-12 px-6 lg:px-12 scroll-mt-24 bg-gradient-to-b from-transparent via-red-50/20 to-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold shrink-0 shadow-sm">
              <AlertTriangle className="w-6 h-6 text-germany-red" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Section #5</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">What If You Fail the APS Interview?</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Failing the APS verification interview is disappointing, but you are permitted to reapply after fulfilling official guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Reapplication Policy & Rules */}
        <div className="neu-card p-6 sm:p-8 space-y-6 border-l-4 border-l-germany-red">
          <h3 className="font-extrabold text-germany-black text-lg">Official Reapplication Rules</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1.5">
              <RefreshCw className="w-5 h-5 text-germany-red" />
              <h4 className="text-xs font-black uppercase text-germany-black">Cooling Waiting Period</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                APS India specifies a mandatory waiting period detailed in your rejection notice before submitting a new application.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1.5">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h4 className="text-xs font-black uppercase text-germany-black">Fee Repayment</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Reapplication requires submitting a fresh fee payment of INR 18,000 for the new evaluation cycle.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="text-xs font-black uppercase text-germany-black">Re-examination Prep</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Thoroughly review the specific subject areas where you struggled during the initial interview attempt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
