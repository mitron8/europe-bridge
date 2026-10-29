"use client";

import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export const DHLPricingComparison = () => {
  return (
    <section id="comparison" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="p-6 sm:p-10 space-y-8 bg-[#faf8f3] rounded-3xl border border-[#e5e0d3] shadow-xs">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#b4232f]">Tariff Comparison</div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16161a] font-display">
            Compare Courier Rates to Germany
          </h2>
          <p className="text-sm sm:text-base text-[#5e5b54] font-medium">
            See why Indian applicants dispatch their application files through EuropeBridge rather than paying commercial counter prices or risking postal delays.
          </p>
        </div>

        {/* 3 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
          {/* Card 1: Postal / Speed Post */}
          <div className="p-6 rounded-3xl bg-white border border-[#e5e0d3] shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">Postal Option</span>
                <h3 className="font-display text-xl font-bold text-[#16161a]">Local Speed Post</h3>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-[#16161a]">~₹1,400 - ₹1,800</div>
                <div className="text-xs text-[#5e5b54] font-semibold">Per 500g envelope</div>
              </div>
              <div className="space-y-3 text-xs text-[#5e5b54] pt-2 border-t border-[#e5e0d3] font-medium">
                <div className="flex items-center gap-2 text-[#b4232f]">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span><strong>12–25 working days</strong> (High risk of missing deadlines)</span>
                </div>
                <div className="flex items-center gap-2 text-[#b4232f]">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>No doorstep home pickup</span>
                </div>
                <div className="flex items-center gap-2 text-[#b4232f]">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Unreliable overseas tracking updates</span>
                </div>
                <div className="flex items-center gap-2 text-[#787369]">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>No signed digital proof of delivery</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#e5e0d3] text-[11px] text-[#b4232f] text-center font-bold">
              High risk during intake peak seasons
            </div>
          </div>

          {/* Card 2: EuropeBridge DHL Express (FEATURED) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#16161a] relative space-y-6 flex flex-col justify-between shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#16161a] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
              Recommended Choice
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b4232f]">EuropeBridge Student Rate</span>
                <h3 className="font-display text-2xl font-black text-[#16161a]">DHL Express Priority</h3>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black text-[#b4232f] font-display">₹2,033</div>
                <div className="text-xs text-[#5e5b54] font-bold">Flat all-inclusive per packet</div>
              </div>
              <div className="space-y-3 text-xs text-[#16161a] pt-3 border-t border-[#e5e0d3] font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span><strong>3–4 working days guaranteed delivery</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span>Free doorstep home pickup included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span>Live 10-digit AWB &amp; SMS tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span>Sealed university transcripts protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span>Signed electronic Proof of Delivery (e-POD)</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#booking"
                className="neu-btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Book Now for ₹2,033</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Standard DHL Retail Walk-in */}
          <div className="p-6 rounded-3xl bg-white border border-[#e5e0d3] shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787369]">Retail Counter</span>
                <h3 className="font-display text-xl font-bold text-[#16161a]">DHL Retail Walk-In</h3>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-[#16161a]">₹4,200 - ₹5,500+</div>
                <div className="text-xs text-[#5e5b54] font-semibold">Standard commercial tariff</div>
              </div>
              <div className="space-y-3 text-xs text-[#5e5b54] pt-2 border-t border-[#e5e0d3] font-medium">
                <div className="flex items-center gap-2 text-[#16161a]">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span>3–5 working days delivery</span>
                </div>
                <div className="flex items-center gap-2 text-[#b4232f]">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Must travel &amp; wait at DHL branch</span>
                </div>
                <div className="flex items-center gap-2 text-[#16161a]">
                  <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
                  <span>Standard AWB tracking</span>
                </div>
                <div className="flex items-center gap-2 text-[#b4232f]">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Pay &gt;2x for the same courier air route</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#e5e0d3] text-[11px] text-[#787369] text-center font-bold">
              Standard commercial rate markup
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
