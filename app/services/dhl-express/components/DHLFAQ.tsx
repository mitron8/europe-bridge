"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const DHLFAQ = () => {
  const faqs = [
    {
      q: "I have placed the booking order online, what happens next?",
      a: "A dedicated DHL operations coordinator will call you back within 24 hours (Mon–Sat) to verify your pickup address, recipient details, and preferred pickup window. If you submit after 5 PM or on Sunday, you will receive the callback on the following business morning. Once confirmed, your pickup is dispatched and your AWB is generated."
    },
    {
      q: "How long does it take for the packet to reach the German university?",
      a: "Standard delivery time is 3 to 4 working days from the moment the packet is picked up from your home. Your shipment travels via DHL's priority international air express network directly to Frankfurt/Leipzig hubs and out to university mailrooms."
    },
    {
      q: "How should I prepare my document envelope?",
      a: "Keep the following in mind:\n1. Use a sturdy A4 or A3 envelope.\n2. Ensure the total packet weight does not exceed 500 grams (ample for 30–45 pages of certificates, transcripts, and forms).\n3. Clearly write both 'FROM' (your address) and 'TO' (University Name, Department, Postal Code & City, Germany) in bold permanent marker.\n4. Only paper documents are permitted."
    },
    {
      q: "Will sealed university transcripts or recommendation letters be opened during security checks?",
      a: "No! Official university-sealed transcripts and confidential LOR envelopes must NOT be opened. The DHL pickup executive will conduct a physical and visual security check of the outer envelope and apply a 'SECURITY CHECKED' tamper-evident label in your presence. Official sealed transcripts remain completely intact."
    },
    {
      q: "Can my friend and I send applications to the same university in a single envelope?",
      a: "Yes, you can combine applications to the exact same university address if:\n1. Your target university's admissions regulations allow joint postal dossiers.\n2. The total weight remains under 500g.\n3. Each applicant's materials are clearly separated into individual labeled inner folders inside the master envelope."
    },
    {
      q: "When and how do I pay the ₹2,033 fee?",
      a: "Payment is made via secure online payment (UPI, Netbanking, or Debit/Credit Card) directly with DHL during the callback verification. The exact payment link is shared by the DHL representative once pickup is scheduled."
    },
    {
      q: "What if DHL says my PIN code or location is remote?",
      a: "If your area is classified as remote or out-of-delivery area, you have two convenient options: you can either drop off the sealed envelope at your nearest DHL or BlueDart partner service center (the coordinator will provide the exact nearest center address), or opt for remote pickup which may incur a standard DHL remote area surcharge."
    },
    {
      q: "What KYC document do I need to produce during doorstep pickup?",
      a: "Under Indian courier & aviation security guidelines, please keep a self-attested photocopy of any ONE of the following ready for the courier agent:\n• Aadhaar Card\n• Passport (photo & address page)\n• PAN Card\n• Voter ID\n• Driver's License"
    },
    {
      q: "How do I track my shipment and get delivery proof?",
      a: "Upon pickup, you will receive your 10-digit Airway Bill (AWB) number via SMS and email. You can enter this number directly on dhl.com to view milestone updates in real time. Once delivered, you can download the electronic signed Proof of Delivery (e-POD) confirming who at the university received the parcel."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="DHL Express FAQs"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about international university courier booking, sealed transcript handling, KYC rules, and tracking."
      faqs={faqs}
    />
  );
};
