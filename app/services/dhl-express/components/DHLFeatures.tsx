"use client";

import React from 'react';
import { 
  BadgePercent, 
  Clock, 
  Package, 
  MapPin, 
  Search, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const DHLFeatures = () => {
  const features = [
    {
      icon: BadgePercent,
      title: "Subsidized Student Rate (Flat ₹2,033)",
      desc: "Save over 50% compared to standard DHL retail walk-in counter rates (typically ₹4,200+ for Europe). Enjoy corporate group pricing reserved exclusively for university applicants.",
      badge: "Save >50% vs Counter"
    },
    {
      icon: Clock,
      title: "3–4 Working Day Air Transit",
      desc: "Guaranteed priority international air express directly into Frankfurt and Leipzig DHL hubs. Never risk missing hard university or uni-assist application deadlines.",
      badge: "Priority Express Air"
    },
    {
      icon: Package,
      title: "Up to 500g & Sturdy A3/A4 Envelopes",
      desc: "Generous capacity for all your notarized degree certificates, semester grade sheets, CV, motivation letter, and recommendation letters in one protected envelope.",
      badge: "Max 500g Capacity"
    },
    {
      icon: MapPin,
      title: "Free Doorstep Pickup Across India",
      desc: "A DHL operations coordinator calls you within 24 hours to schedule pickup from your home. Remote PIN codes can also drop off at any nearby DHL or BlueDart partner counter.",
      badge: "Pan-India Home Pickup"
    },
    {
      icon: Search,
      title: "Live 10-Digit AWB & Electronic POD",
      desc: "Instant Airway Bill (AWB) generation upon dispatch. Track your shipment at every checkpoint and download an official digital signed Proof of Delivery (e-POD).",
      badge: "Real-Time Tracking"
    },
    {
      icon: ShieldCheck,
      title: "Protected Sealed Transcripts & LORs",
      desc: "Official registrar seals and signed recommendation letter envelopes remain strictly sealed. Security clearance checks are completed in front of you without opening sealed envelopes.",
      badge: "Confidentiality Protected"
    }
  ];

  return (
    <section id="features" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">Included Benefits</div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Why Book Your Courier via EuropeBridge?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Sending applications to Germany shouldn&apos;t cost a fortune or risk missing deadlines with slow postal services.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{feat.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
