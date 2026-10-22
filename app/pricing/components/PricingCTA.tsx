"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, Star } from 'lucide-react';

interface PricingCTAProps {
  onOpenConsultation: () => void;
}

export const PricingCTA: React.FC<PricingCTAProps> = ({ onOpenConsultation }) => {
  return (
    <section className="lp-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="rounded-3xl border border-[#ded8cb] bg-[#16161a] text-white p-8 sm:p-14 relative overflow-hidden text-center shadow-xl">
        {/* Glow */}
        <div 
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full bg-[#9e2a2b]/30 blur-[100px]"
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#d4af37] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Winter 2026 Admissions Open</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.12]">
            Ready to Study Tuition-Free <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#d4af37]">in Germany with EuropeBridge?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#c4c4cf] leading-relaxed max-w-2xl mx-auto">
            Join thousands of successful Indian students studying at TUM, RWTH Aachen, TU Berlin, Stuttgart, and top German universities. Choose a package today or book a complimentary evaluation session.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#packages"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#9e2a2b] text-white text-sm font-bold hover:bg-[#852324] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Admission Packages</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>Book Free 1:1 Consultation</span>
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9a9aa8]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2e7d46]" /> 100% Contract Backed
            </span>
            <span>·</span>
            <span>Zero Third-Party University Commissions</span>
            <span>·</span>
            <span>Dedicated Counselors in Germany &amp; India</span>
          </div>
        </div>
      </div>
    </section>
  );
};
