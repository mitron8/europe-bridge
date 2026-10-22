"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const BlockedAccountFAQ = () => {
  const faqs = [
    {
      q: "What is a German blocked account (Sperrkonto)?",
      a: "A German blocked account (Sperrkonto) is a legally required proof of financial resources (Finanzierungsnachweis) under Section 16b of the German Residence Act (AufenthG). It demonstrates to the German Embassy, VFS Global, and German Foreigners' Registration Office (Ausländerbehörde) that you have adequate funds to support your living costs in Germany for one full academic year without relying on state benefits."
    },
    {
      q: "What is the official statutory blocked amount for 2026/2027?",
      a: "The statutory minimum required by the German Federal Foreign Office (Auswärtiges Amt) for university students is €11,904 per year (€992 per month). For Opportunity Card (Chancenkarte) applicants, the monthly baseline is €1,027 per month."
    },
    {
      q: "Can I use the blocked account directly to pay monthly rent or buy groceries?",
      a: "No. The blocked account is a specialized fiduciary escrow account that does not support direct debit, card swipes, or merchant transfers. Once you arrive in Germany and register your city residence (Anmeldung), your blocked account automatically transfers your €992 monthly allowance into your local personal German checking account (Girokonto, such as N26, DKB, or Aion Bank), which comes with a standard debit card for rent and daily expenses."
    },
    {
      q: "What happens to my deposited funds if my visa application is declined?",
      a: "Your money is 100% safe and protected under German banking regulations. In the unfortunate event of a visa rejection or university admission withdrawal, you simply upload the official rejection letter from the German Embassy or VFS. The provider will promptly refund the entire deposited capital back to the originating bank account in India."
    },
    {
      q: "Which provider is best: Expatrio, Coracle, or Fintiba?",
      a: "Expatrio is currently the most popular choice for Indian students due to its Value Package (which waives the €49 setup fee and offers up to €247 cashback with Techniker Krankenkasse health insurance). Coracle is ideal for students who want zero monthly fees (€0/month). Fintiba is backed by traditional German private bank Sutor Bank in Hamburg. EuropeBridge counselors help you choose the best provider based on your specific intake timeline and financial setup."
    },
    {
      q: "What is the €100 buffer amount (Sicherheitspolster) and is it refunded?",
      a: "When transferring money internationally via SWIFT, intermediary correspondent banks frequently deduct processing wire fees ($15-$30). To prevent your transferred balance from falling even €1 short of the mandatory €11,904 threshold (which would prevent the issuance of your Sperrbestätigung), German banks mandate a €100 safety buffer. Any remaining buffer is either disbursed in your final monthly payment or refunded upon closing the account."
    },
    {
      q: "How does the health insurance bundle cashback work?",
      a: "Both Expatrio and Coracle partner with top German statutory public health insurance funds like Techniker Krankenkasse (TK) and Barmer. By bundling your blocked account with free incoming travel insurance and statutory student health insurance, the provider refunds your setup fee and issues up to €247 in welcome bonuses once your health coverage begins in Germany."
    },
    {
      q: "How long does international wire transfer take to reach Germany?",
      a: "Using domestic INR transfer options or optimized student remittance gateways (like Flywire or partner bank wires), funds typically reach Germany within 1 to 3 business days. Once the funds reflect in your German IBAN, your official blocking confirmation (Sperrbestätigung) PDF is issued automatically within 24 hours."
    }
  ];

  return (
    <StudyFAQ 
      badge="Financial Clearances"
      title="Blocked Account FAQs"
      subtitle="Everything you need to know about German Sperrkonto requirements, transfer timelines, and refund protections."
      faqs={faqs}
    />
  );
};

