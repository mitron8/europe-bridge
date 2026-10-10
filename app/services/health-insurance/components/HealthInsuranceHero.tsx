"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2, Clock, Landmark, Building2, Send } from 'lucide-react';

export const HealthInsuranceHero = () => {
  return (
    <section className="pt-2 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-germany-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#our-process" className="hover:text-germany-red transition-colors">Services</Link>
          <span>/</span>
          <span className="text-germany-black font-extrabold">German Health Insurance Setup</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Mandatory Visa &amp; Enrollment Requirement</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Official M10 Electronic Notification</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-germany-black leading-tight tracking-tight font-display flex-1">
                German Health Insurance <br className="hidden sm:inline" />
                <span className="text-germany-red">Setup &amp; University M10</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Every international student and worker in Germany is legally required to have health insurance. We help you understand, compare, and set up the right coverage—public (TK, Barmer, AOK) or private (Ottonova, Mawista)—and automatically transmit your mandatory electronic <strong className="text-germany-black font-extrabold">M10 certificate</strong> straight to your university.
            </p>

            {/* Micro Value Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3 bg-white/90 rounded-2xl border border-gray-200 text-center shadow-sm">
                <div className="text-base sm:text-lg font-black text-germany-black">€0 Fee</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase">EuropeBridge Service</div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-gray-200 text-center shadow-sm">
                <div className="text-base sm:text-lg font-black text-germany-red">M10 Digital</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase">Direct to University</div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-gray-200 text-center shadow-sm">
                <div className="text-base sm:text-lg font-black text-emerald-700">Free Travel</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase">Incoming Insurance</div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-gray-200 text-center shadow-sm">
                <div className="text-base sm:text-lg font-black text-germany-gold">&lt; 24 Hours</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase">Certificate Delivery</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="#booking" 
                className="neu-btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
              >
                <span>Apply for Health Insurance</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href="#decider" 
                className="neu-btn px-6 py-4 text-base font-extrabold text-germany-black hover:text-germany-red bg-white border border-gray-200 w-full sm:w-auto text-center"
              >
                <span>Check Public vs. Private</span>
              </a>

              <a 
                href="#providers" 
                className="text-xs font-bold text-gray-600 hover:text-germany-red underline underline-offset-4 py-2 sm:py-0"
              >
                Compare Providers
              </a>
            </div>
          </div>

          {/* Quick Facts Card Widget */}
          <div className="lg:col-span-5">
            <motion.div 
              className="neu-card p-6 sm:p-8 space-y-6 border border-amber-100 relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-bold shadow-inner">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-germany-black text-lg">German Healthcare Highlights</h3>
                  <p className="text-xs text-gray-500 font-medium">Statutory Guidelines for Students 2026/2027</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Student Public Rate (&lt;30)</span>
                  <span className="text-xl font-black text-germany-black">~€140–€150 <span className="text-xs font-normal text-gray-500">/mo</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs font-extrabold text-gray-600 uppercase">Co-Pay at Clinics</span>
                  <span className="text-xl font-black text-emerald-700">€0 <span className="text-xs font-normal text-gray-500">(Direct Billing)</span></span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-200">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-700" /> Free Incoming Travel Insurance
                  </span>
                  <span className="text-sm font-black text-emerald-800">Up to 180 Days</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200">
                  <span className="text-xs font-extrabold text-blue-800 uppercase flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-blue-700" /> University Matriculation
                  </span>
                  <span className="text-sm font-black text-blue-800">M10 e-Sent</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-600 font-medium leading-relaxed flex items-center gap-2 border-t border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Doctor visits, prescriptions, emergency hospital care, and dental checkups covered 100%.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
