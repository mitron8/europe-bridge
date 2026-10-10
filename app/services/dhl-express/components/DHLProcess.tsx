"use client";

import React from 'react';
import { FileText, PhoneCall, Truck, CheckCircle2 } from 'lucide-react';

export const DHLProcess = () => {
  const steps = [
    {
      stepNum: "01",
      icon: FileText,
      title: "Place Online Booking",
      desc: "Fill in your home pickup address and recipient German university or uni-assist e.V. addresses in the booking form below. Takes under 2 minutes."
    },
    {
      stepNum: "02",
      icon: PhoneCall,
      title: "Coordinator Callback",
      desc: "A dedicated DHL operations coordinator calls you within 24 hours to verify addresses, confirm the flat ₹2,033 fee via secure online link, and schedule pickup."
    },
    {
      stepNum: "03",
      icon: Truck,
      title: "Doorstep Pickup & KYC",
      desc: "The DHL executive visits your doorstep to collect your sealed envelope and verifies standard Government ID KYC (Aadhaar, Passport, or PAN) in 1 minute."
    },
    {
      stepNum: "04",
      icon: CheckCircle2,
      title: "3–4 Day Tracked Delivery",
      desc: "Your shipment is flown on priority air transit to Germany. Track real-time via 10-digit AWB and receive a signed electronic Proof of Delivery (e-POD)."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">End-to-End Roadmap</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            How It Works: From Booking to University Mailroom
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            A seamless door-to-door courier journey designed to eliminate transit delays and ensure your application arrives safely.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white border-2 border-gray-200 shadow-sm relative flex flex-col justify-between space-y-4 hover:border-germany-red/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-germany-red uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                      Step {s.stepNum}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gray-100 text-germany-black flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4 text-germany-red" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-germany-black text-base leading-snug">{s.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-bold text-gray-400 border-t border-gray-100">
                  {idx === 0 && 'Instant digital confirmation'}
                  {idx === 1 && 'Within 24h Mon–Sat'}
                  {idx === 2 && 'Flexible time slots'}
                  {idx === 3 && 'Signed e-POD receipt'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
