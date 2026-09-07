"use client";

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ClipboardList, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Headphones, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Laptop,
  QrCode,
  FileSearch,
  Building2
} from 'lucide-react';

export const CSPAndVidexSection = () => {
  const features = [
    {
      icon: FileText,
      title: "CSP Portal Registration",
      desc: "Comprehensive onboarding on Germany's official Consular Services Portal (auswaertiges-amt.de). We configure your applicant profile and ensure your Entry Form is error-free."
    },
    {
      icon: ClipboardList,
      title: "VIDEX Form Generation",
      desc: "Accurate National Visa VIDEX form generation with embedded 2D barcodes, multi-page data validation, and swift correction of any CSP preliminary email queries."
    },
    {
      icon: ShieldCheck,
      title: "Document Audit & Formatting",
      desc: "Meticulous verification of APS certificates, blocked account 06 confirmations, travel & statutory health insurance, and academic apostille sets prior to upload."
    },
    {
      icon: Calendar,
      title: "VFS Global Slot Booking",
      desc: "Dedicated tracking and slot booking across all VFS Global German Visa Application Centres (New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, etc.)."
    },
    {
      icon: MessageSquare,
      title: "1:1 Visa Mock Interview",
      desc: "Personalized mock interview sessions with European education experts covering your motivation, study syllabus, university credentials, and financial solvency."
    },
    {
      icon: Headphones,
      title: "Dedicated Advisor Support",
      desc: "Direct guidance via WhatsApp and phone throughout the application lifecycle. Complimentary advice on education loans, outward remittance, and forex cards."
    }
  ];

  return (
    <section id="section-features" className="scroll-mt-36 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section 1: What You Get Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
              <span>Full-Scale Visa Assistance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display leading-tight">
              Everything Included in <span className="text-germany-red">EuropeBridge Visa Support</span>
            </h2>
            <p className="text-base text-gray-700 font-medium leading-relaxed">
              We handle the complex bureaucratic mechanics of the German Federal Foreign Office, ensuring your application is 100% compliant from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="neu-card p-6 bg-white space-y-4 hover:-translate-y-1 transition-all duration-300 shadow-[12px_12px_30px_rgba(210,205,195,0.5)] border border-[#EBE7E0]/60 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-germany-red shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-germany-black font-display">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-germany-red">
                    <span>Verified standard</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: CSP & VIDEX Deep Dive */}
        <div id="section-csp" className="scroll-mt-36 neu-card p-8 md:p-12 bg-white space-y-8 shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#EBE7E0] pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-black uppercase text-germany-red tracking-wider">Digital Visa Portal 2026</span>
              <h3 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
                Understanding the CSP (Consular Services Portal) &amp; VIDEX Flow
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                The German Federal Foreign Office now mandates the digital Consular Services Portal for student visa applicants. Here is exactly how the digital workflow connects with your VFS appointment.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                Fast-Track System
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-germany-black text-white font-display text-sm font-bold flex items-center justify-center">
                  1
                </span>
                <Laptop className="w-5 h-5 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-germany-black">CSP Portal Account</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Create an account on the Consular Services Portal and select <em>"National Visa - Study (with admission)"</em>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-germany-black text-white font-display text-sm font-bold flex items-center justify-center">
                  2
                </span>
                <QrCode className="w-5 h-5 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-germany-black">VIDEX Barcode Form</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Complete the digital VIDEX questionnaire. The system generates an official PDF with machine-readable 2D barcodes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-germany-black text-white font-display text-sm font-bold flex items-center justify-center">
                  3
                </span>
                <FileSearch className="w-5 h-5 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-germany-black">Digital Pre-Audit</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Upload your APS, Blocked Account confirmation, and certificates for remote consular review before stepping into VFS.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EBE7E0]/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-germany-red text-white font-display text-sm font-bold flex items-center justify-center">
                  4
                </span>
                <Building2 className="w-5 h-5 text-germany-red" />
              </div>
              <h4 className="text-sm font-bold text-germany-black">VFS Biometrics</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Once CSP approves your file, you receive authorization to book your VFS slot for fingerprinting and passport handover.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/60 flex items-start gap-3 text-xs text-gray-700">
            <AlertCircle className="w-5 h-5 text-germany-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold text-germany-black block">Common Rejection Trap: Barcode Mismatch</span>
              <p className="text-gray-600 font-medium leading-relaxed">
                If you modify any data on the paper printout without re-generating the VIDEX barcode on CSP, the visa scanner at VFS will reject the application dossier immediately. EuropeBridge advisers verify barcode integrity before every appointment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
