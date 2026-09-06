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
    <section id="features" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Key Advantages</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What You Get With EuropeBridge Education Loan Support
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Hassle-free student loan approval tailored for German university admissions and visa processing.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Embassy &amp; Visa Recognized</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
