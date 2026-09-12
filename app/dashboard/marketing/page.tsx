"use client";

import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function MarketingOverviewPage() {
  return (
    <>
      {/* Header Card */}
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-gold/20 text-germany-black rounded-full font-extrabold text-[11px]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Marketing Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-germany-black">
              Marketing Dashboard
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 max-w-xl">
              Dedicated operations workspace for Marketing team members.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="neu-btn-primary py-3 px-5 text-xs font-extrabold flex items-center gap-2 cursor-pointer">
              <span>Start Task</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neu-card p-5 bg-white space-y-2">
          <span className="text-xs font-bold text-gray-400">Active Campaigns</span>
          <div className="text-2xl font-display text-germany-black">NA</div>
          <p className="text-[11px] font-bold text-gray-500">No data available</p>
        </div>
        <div className="neu-card p-5 bg-white space-y-2">
          <span className="text-xs font-bold text-gray-400">Total Leads Generated</span>
          <div className="text-2xl font-display text-germany-black">NA</div>
          <p className="text-[11px] font-bold text-gray-500">No data available</p>
        </div>
        <div className="neu-card p-5 bg-white space-y-2">
          <span className="text-xs font-bold text-gray-400">Conversion Rate</span>
          <div className="text-2xl font-display text-gray-400">—</div>
          <p className="text-[11px] font-bold text-gray-500">No data available</p>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="neu-card p-8 bg-white border border-[#EBE7E0] space-y-4">
        <h3 className="font-display text-lg text-germany-black">Recent Marketing Activity</h3>
        <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
          No recent activity to display.
        </div>
      </div>
    </>
  );
}
