"use client";
import React from 'react';
import { Banknote, Wallet, FileCheck, Clock, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoanFeatures = () => {
  const features = [
    {
      icon: Banknote,
      title: "Up to 100% Total Financing",
      desc: "Finances 100% of your education costs with loan amounts extending above ₹20 Lakhs—covering tuition fees, living expenses, blocked account deposits (€11,904/yr), and books."
    },
    {
      icon: Wallet,
      title: "Covers Living Expenses & Blocked Account",
      desc: "The loan directly funds your mandatory German blocked account deposit and monthly living expenses, ensuring you meet all financial proof requirements effortlessly."
    },
    {
      icon: FileCheck,
      title: "Pre-Admission Conditional Sanction",
      desc: "Apply and receive a conditional loan sanction letter BEFORE getting your official university admission. Gives you total confidence to apply to top-tier universities."
    },
    {
      icon: Clock,
      title: "Fast 7 to 10-Day Turnaround",
      desc: "In-principle loan sanction within 7 to 10 working days upon application submission. Final disbursement completes in ~7 days after post-sanction document verification."
    },
    {
      icon: Building2,
      title: "Doorstep Document Collection",
      desc: "Dedicated representatives visit your home to collect physical documents—even if students and co-applicant parents reside in different Indian cities or towns."
    },
    {
      icon: ShieldCheck,
      title: "Preferred for German Student Visa",
      desc: "Sanction letters from recognized NBFC lenders (like Credila) are widely preferred by German embassies and VFS global application centers over basic solvency letters."
    }
  ];

  return (
    <section id="features" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28 space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)]">Key Advantages</span>
        <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--lp-text)] font-semibold tracking-tight">
          What You Get With <em className="lp-script text-[var(--lp-red)]">EuropeBridge Loan Support</em>
        </h2>
        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-relaxed">
          Hassle-free student loan approval tailored for German university admissions and visa processing.
        </p>
      </div>

      {/* 6 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div 
              key={idx}
              className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-[0_4px_24px_rgba(22,22,26,0.03)] hover:shadow-[0_8px_30px_rgba(22,22,26,0.06)] hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-red)] flex items-center justify-center font-bold border border-[#e2ddd3]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">{feat.title}</h3>
                <p className="text-xs sm:text-[13px] text-[var(--lp-muted)] leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e5e0d3] flex items-center gap-1.5 text-[11px] font-semibold text-[var(--lp-gold)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-gold)]" />
                <span>Embassy &amp; Visa Recognized</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
