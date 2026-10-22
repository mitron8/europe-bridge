"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const LoanFAQ = () => {
  const faqs = [
    {
      q: "Why should I get a loan sanction before university admission?",
      a: "Getting a pre-admission conditional sanction letter eliminates last-minute financial stress. You know your exact loan eligibility in advance, allowing you to apply to top German universities with total financial confidence. Additionally, sanction letters are widely preferred by German embassies over basic solvency letters."
    },
    {
      q: "Can I avail the education loan for both tuition fees and living expenses?",
      a: "Yes! Education loans for Germany cover up to 100% of your total cost of education—including tuition fees, mandatory blocked account deposits (€11,904/yr), living expenses, books, and flight travel tickets."
    },
    {
      q: "Do I need to be admitted to a university before applying for a loan?",
      a: "No. You can apply for an education loan before receiving your formal admission letter. If approved, you receive a conditional loan sanction letter, which helps you plan your finances early."
    },
    {
      q: "How much loan amount can I get for studying in Germany?",
      a: "Lenders finance up to 100% of your education costs, including unsecured and secured loans extending over ₹20 Lakhs to ₹60 Lakhs depending on your academic background, target program, and co-applicant profile."
    },
    {
      q: "What is the processing timeframe for loan sanction and disbursement?",
      a: "The in-principle sanction letter is typically issued within 7 to 10 working days after submitting a complete application. Final loan disbursement completes within 7 days after post-sanction document verification."
    },
    {
      q: "What documents are required for the education loan application?",
      a: "Completed application form, passport photos, photo ID & address proof, academic marksheets & degree certificates, entrance test scores (GRE/IELTS if applicable), university admission letter (or draft), bank statements, and co-applicant income proof (ITR / salary slips)."
    },
    {
      q: "What factors are evaluated during loan approval?",
      a: "Approval is evaluated based on: 1) Student's academic history, 2) Recognized German university & course type, 3) Co-borrower credit profile & income proof, 4) Collateral assets (if applicable)."
    },
    {
      q: "Does prior work experience help in loan approval?",
      a: "Yes! Relevant professional work experience strengthens your academic profile, increases your credit score rating, and often qualifies you for preferential interest rates."
    }
  ];

  return (
    <StudyFAQ
      id="loan-faq"
      badge="Education Loan FAQs"
      title="Frequently Asked Questions about Education Loans"
      subtitle="Key answers on loan sanctions, living expense coverage, interest rates, and eligibility."
      faqs={faqs}
    />
  );
};
