"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck2, Landmark, Plane, ShieldCheck } from 'lucide-react';

export const PostAPSSteps = () => {
  return (
    <section id="section-after-aps" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Section #6</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">After Receiving Your Digital APS Certificate</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Your APS certificate is issued as a digitally-signed PDF. Here is your roadmap from certificate receipt to landing in Germany.
              </p>
            </div>
          </div>
          <motion.img 
            src="/doodles/university.png" 
            alt="Post APS University Doodle"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm shrink-0 hidden md:block"
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Post-APS Step Grid */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-germany-black text-lg border-b border-gray-200 pb-3">
            5 Essential Steps After APS Approval
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <FileCheck2 className="w-5 h-5 text-germany-red" />
              <h4 className="text-sm font-extrabold text-germany-black">1. Uni-Assist Upload</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Upload your digital APS PDF to uni-assist and direct university portals to complete course applications.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <Landmark className="w-5 h-5 text-amber-800" />
              <h4 className="text-sm font-extrabold text-germany-black">2. Blocked Account (€11,904)</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Once admission is confirmed, open an official German Blocked Account (Expatrio, Fintiba, Coracle) to deposit €11,904 proof of funds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <Plane className="w-5 h-5 text-blue-700" />
              <h4 className="text-sm font-extrabold text-germany-black">3. Student Visa Portal</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Apply for your German National Student Visa via the embassy digital visa portal. APS certificate is mandatory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
