"use client";
import React from 'react';
import { Check, X, Sparkles, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface PricingComparisonTableProps {
  onSelectPlan: (planName: string, price: string) => void;
}

interface TableRow {
  feature: string;
  basic: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
  bachelors: string | boolean;
  highlight?: boolean;
}

interface TableCategory {
  category: string;
  rows: TableRow[];
}

const COMPARISON_DATA: TableCategory[] = [
  {
    category: "Overview & Structure",
    rows: [
      {
        feature: "Number of University Applications",
        basic: "Up to 3",
        standard: "Up to 10",
        premium: "Unlimited",
        bachelors: "Up to 5",
        highlight: true
      },
      {
        feature: "Application Validity",
        basic: "1 Intake",
        standard: "1 Intake",
        premium: "2 Consecutive Intakes",
        bachelors: "1 Intake"
      },
      {
        feature: "Admission Guarantee* Policy",
        basic: false,
        standard: false,
        premium: "Included (₹40,000 refund)*",
        bachelors: false,
        highlight: true
      },
      {
        feature: "Counsellor Support Model",
        basic: "General Advisory Desk",
        standard: "Dedicated 1-on-1 Counsellor",
        premium: "Senior Alumni Lead Team",
        bachelors: "Undergraduate Specialist"
      },
      {
        feature: "Student Dashboard & Application Tracker",
        basic: true,
        standard: true,
        premium: true,
        bachelors: true
      }
    ]
  },
  {
    category: "Application Documents Suite",
    rows: [
      {
        feature: "Course-Specific SOP Writing",
        basic: "1 Standard SOP",
        standard: "1 Highly Tailored SOP",
        premium: "Multiple Department SOPs",
        bachelors: "1 Undergrad Tailored SOP"
      },
      {
        feature: "Letters of Recommendation (LORs)",
        basic: "2 LORs",
        standard: "2 Academic / Work LORs",
        premium: "3+ Custom LORs",
        bachelors: "2 School / Principal LORs"
      },
      {
        feature: "Europass Tabellarischer CV",
        basic: true,
        standard: true,
        premium: "Included (ATS Optimized)",
        bachelors: true
      },
      {
        feature: "Custom University Essays & Motivation Prompts",
        basic: false,
        standard: true,
        premium: true,
        bachelors: true
      },
      {
        feature: "Document Turnaround & Revisions",
        basic: "5-7 Days (2 Revisions)",
        standard: "3-5 Days (Unlimited)",
        premium: "48-72h Expedited (Unlimited)",
        bachelors: "3-5 Days (Unlimited)"
      }
    ]
  },
  {
    category: "University Workflow & Filing",
    rows: [
      {
        feature: "University Profile Evaluation & Shortlisting",
        basic: "Standard Matching",
        standard: "1:1 Strategic Shortlisting",
        premium: "TU9 Strategic Shortlisting",
        bachelors: "Studienkolleg & Uni Matching"
      },
      {
        feature: "APS Certificate Guidance & Document Audit",
        basic: false,
        standard: "Complete Guidance",
        premium: "Full Audit & Fast-Track",
        bachelors: false
      },
      {
        feature: "dMAT Registration & Sample Test Prep",
        basic: true,
        standard: true,
        premium: true,
        bachelors: "Aufnahmeprüfung Prep"
      },
      {
        feature: "ECTS Prerequisite Credit Mapping",
        basic: false,
        standard: true,
        premium: true,
        bachelors: "HZB / VPD Verification"
      },
      {
        feature: "Uni-Assist & Direct Portal Applications",
        basic: "Up to 3 Portals",
        standard: "Up to 10 Portals",
        premium: "Unlimited Portals",
        bachelors: "Up to 5 Portals"
      }
    ]
  },
  {
    category: "Visa, Funds & Post-Admission Support",
    rows: [
      {
        feature: "Blocked Account (Sperrkonto) Assistance",
        basic: true,
        standard: true,
        premium: "Priority Concierge",
        bachelors: true
      },
      {
        feature: "Statutory Health Insurance (TK / Barmer)",
        basic: true,
        standard: true,
        premium: true,
        bachelors: true
      },
      {
        feature: "Education Loan Guidance & Sanction Letter",
        basic: true,
        standard: true,
        premium: "Dedicated Loan Officer",
        bachelors: true
      },
      {
        feature: "Consular Services Portal (CSP) Support",
        basic: "Checklist",
        standard: "Digital Review",
        premium: "Complete Filing & VIDEX",
        bachelors: "Checklist & Review"
      },
      {
        feature: "VFS Biometrics Slot Concierge",
        basic: false,
        standard: "Slot Alerts",
        premium: "Dedicated Slot Concierge",
        bachelors: "Slot Alerts"
      },
      {
        feature: "Mock Visa Interview Coaching",
        basic: false,
        standard: "1 Live Mock Session",
        premium: "2 In-Depth Live Sessions",
        bachelors: "1 Live Mock Session"
      }
    ]
  }
];

export const PricingComparisonTable: React.FC<PricingComparisonTableProps> = ({ onSelectPlan }) => {
  const renderCellContent = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-4 h-4 text-[#2e7d46] mx-auto" />
      ) : (
        <X className="w-4 h-4 text-[#a49f94] mx-auto opacity-50" />
      );
    }
    return <span className="font-semibold text-xs text-[#2b2b31]">{value}</span>;
  };

  return (
    <section id="comparison-matrix" className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9e2a2b] bg-[#9e2a2b]/10 px-3.5 py-1 rounded-full border border-[#9e2a2b]/20 inline-block">
          Feature Comparison Matrix
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#16161a]">
          What Each Package Includes, Feature by Feature
        </h2>
        <p className="text-xs sm:text-sm text-[#5e5b54]">
          Compare our 4 admission plans side-by-side to find the ideal match for your academic goals and budget.
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="relative overflow-x-auto rounded-3xl border border-[#e5e0d3] bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#e5e0d3] bg-[#fbf9f4]">
              <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#787369] w-[30%]">
                Plan Feature
              </th>
              
              {/* Basic */}
              <th className="p-4 sm:p-5 text-center w-[17.5%] border-l border-[#e5e0d3]">
                <p className="text-sm font-serif font-bold text-[#16161a]">Basic</p>
                <p className="text-base font-bold text-[#16161a] mt-0.5">₹29,999</p>
                <button
                  type="button"
                  onClick={() => onSelectPlan('Basic Package', '₹29,999')}
                  className="mt-2 text-[11px] font-bold text-[#16161a] underline hover:text-[#9e2a2b] cursor-pointer"
                >
                  Enroll →
                </button>
              </th>

              {/* Standard */}
              <th className="p-4 sm:p-5 text-center w-[18.5%] border-l-2 border-r-2 border-[#9e2a2b] bg-[#fffcfb] relative">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9e2a2b] mb-1">
                  Most Popular
                </div>
                <p className="text-sm font-serif font-bold text-[#16161a]">Standard</p>
                <p className="text-base font-bold text-[#9e2a2b] mt-0.5">₹49,999</p>
                <button
                  type="button"
                  onClick={() => onSelectPlan('Standard Package', '₹49,999')}
                  className="mt-2 text-[11px] font-bold text-white bg-[#9e2a2b] px-3 py-1 rounded-full cursor-pointer hover:bg-[#852324] inline-block shadow-2xs"
                >
                  Enroll →
                </button>
              </th>

              {/* Premium */}
              <th className="p-4 sm:p-5 text-center w-[17.5%] border-l border-[#e5e0d3] bg-[#16161a] text-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] mb-1 flex items-center justify-center gap-1">
                  <Award className="w-3 h-3 text-[#d4af37]" /> Guarantee
                </div>
                <p className="text-sm font-serif font-bold text-white">Premium</p>
                <p className="text-base font-bold text-[#d4af37] mt-0.5">₹1,19,999</p>
                <button
                  type="button"
                  onClick={() => onSelectPlan('Premium Package', '₹1,19,999')}
                  className="mt-2 text-[11px] font-bold text-[#16161a] bg-[#d4af37] px-3 py-1 rounded-full cursor-pointer hover:bg-[#e0bc46] inline-block shadow-2xs"
                >
                  Enroll →
                </button>
              </th>

              {/* Bachelor's */}
              <th className="p-4 sm:p-5 text-center w-[16.5%] border-l border-[#e5e0d3]">
                <p className="text-sm font-serif font-bold text-[#16161a]">Bachelor&apos;s</p>
                <p className="text-base font-bold text-[#16161a] mt-0.5">₹29,999</p>
                <button
                  type="button"
                  onClick={() => onSelectPlan('Bachelor\'s Package', '₹29,999')}
                  className="mt-2 text-[11px] font-bold text-[#16161a] underline hover:text-[#9e2a2b] cursor-pointer"
                >
                  Enroll →
                </button>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#ece7dd]">
            {COMPARISON_DATA.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {/* Category Header Row */}
                <tr className="bg-[#f4f1ea] border-y border-[#ded8cb]">
                  <td colSpan={5} className="py-2.5 px-4 sm:px-5 text-xs font-bold uppercase tracking-wider text-[#7c4a3c]">
                    {group.category}
                  </td>
                </tr>

                {/* Rows */}
                {group.rows.map((row, rowIdx) => (
                  <tr 
                    key={rowIdx} 
                    className={`hover:bg-[#faf8f3] transition-colors ${row.highlight ? 'bg-[#fcfaf5]' : ''}`}
                  >
                    <td className="p-3.5 sm:p-4 text-xs sm:text-[13px] font-medium text-[#16161a]">
                      {row.feature}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center border-l border-[#ece7dd]">
                      {renderCellContent(row.basic)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center border-l border-r border-[#ded8cb] bg-[#fffcfb]/60">
                      {renderCellContent(row.standard)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center border-l border-[#ece7dd]">
                      {renderCellContent(row.premium)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center border-l border-[#ece7dd]">
                      {renderCellContent(row.bachelors)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note about third-party costs */}
      <div className="mt-6 rounded-2xl bg-[#faf8f3] border border-[#e5e0d3] p-4 sm:p-5 text-xs text-[#5e5b54] leading-relaxed">
        <strong>Important Note on External Third-Party Fees:</strong> Packages cover EuropeBridge&apos;s professional counselling, documentation, and filing services. Official third-party fees are paid directly to German authorities and exam boards by the candidate (e.g. APS verification ₹18,000, Uni-Assist processing €75 first uni / €30 per additional, IELTS exam fee, and embassy visa fee €75).
      </div>
    </section>
  );
};
