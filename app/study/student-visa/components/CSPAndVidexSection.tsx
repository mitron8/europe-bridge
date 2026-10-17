"use client";

import React from 'react';
import { 
  FileText, 
  ClipboardList, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Headphones, 
  Check, 
  AlertCircle,
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
      desc: "Full onboarding on Germany's official Consular Services Portal (auswaertiges-amt.de). We configure your applicant profile and ensure your digital Entry Form is error-free."
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
    <section id="section-csp" className="scroll-mt-32 py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" data-reveal>
      {/* Section 1: What You Get Grid */}
      <div className="space-y-8">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--lp-red)]">
            Full-Scale Visa Assistance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-ink)] font-normal tracking-tight">
            Everything Included in <em className="italic text-[var(--lp-red)] font-serif">EuropeBridge Support</em>
          </h2>
          <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
            We handle the bureaucratic mechanics of the German Federal Foreign Office, ensuring your application is 100% compliant from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-3 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-ink)]">
                    <Icon className="w-5 h-5 text-[var(--lp-red)]" />
                  </div>
                  <h3 className="font-serif text-base font-normal text-[var(--lp-ink)]">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#e5e0d3] flex items-center gap-1.5 text-xs font-mono text-[var(--lp-gold)]">
                  <span>Verified Standard</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: CSP & VIDEX Deep Dive */}
      <div className="bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[10px] font-mono uppercase text-[var(--lp-red)] tracking-wider">Digital Visa Portal 2026</span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)]">
              Understanding the CSP (Consular Services Portal) &amp; VIDEX Flow
            </h3>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              The German Federal Foreign Office now mandates the digital Consular Services Portal for student visa applicants.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#eae5db] text-[var(--lp-text)] text-[11px] font-mono uppercase tracking-wider self-start lg:self-auto border border-[#e5e0d3]">
            Digital Fast-Track
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-[var(--lp-ink)] text-white font-mono text-xs flex items-center justify-center">
                1
              </span>
              <Laptop className="w-4 h-4 text-[var(--lp-muted)]" />
            </div>
            <h4 className="font-serif text-sm font-normal text-[var(--lp-ink)]">CSP Portal Account</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Create an account on the Consular Services Portal and select <em>&ldquo;National Visa - Study (with admission)&rdquo;</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-[var(--lp-ink)] text-white font-mono text-xs flex items-center justify-center">
                2
              </span>
              <QrCode className="w-4 h-4 text-[var(--lp-muted)]" />
            </div>
            <h4 className="font-serif text-sm font-normal text-[var(--lp-ink)]">VIDEX Barcode Form</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Complete the digital VIDEX questionnaire. The system generates an official PDF with machine-readable 2D barcodes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-[var(--lp-ink)] text-white font-mono text-xs flex items-center justify-center">
                3
              </span>
              <FileSearch className="w-4 h-4 text-[var(--lp-muted)]" />
            </div>
            <h4 className="font-serif text-sm font-normal text-[var(--lp-ink)]">Digital Pre-Audit</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Upload your APS, Blocked Account confirmation, and certificates for remote consular review before stepping into VFS.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-[var(--lp-red)] text-white font-mono text-xs flex items-center justify-center">
                4
              </span>
              <Building2 className="w-4 h-4 text-[var(--lp-red)]" />
            </div>
            <h4 className="font-serif text-sm font-normal text-[var(--lp-ink)]">VFS Biometrics</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Once CSP approves your file, you receive authorization to book your VFS slot for fingerprinting and passport handover.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] flex items-start gap-3 text-xs text-[var(--lp-muted)]">
          <AlertCircle className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[var(--lp-text)]">Barcode Mismatch Caveat:</strong> If you modify any personal or course details after generating the PDF without re-submitting on CSP, the 2D scanner at VFS will reject the application immediately. EuropeBridge advisers verify barcode integrity prior to appointment day.
          </p>
        </div>
      </div>
    </section>
  );
};
