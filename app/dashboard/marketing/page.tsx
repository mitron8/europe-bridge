"use client";

import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function MarketingOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] p-6 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mt-1">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-germany-gold/20 text-germany-black rounded-full font-bold text-[11px] border border-germany-gold/30">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Marketing Portal</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-germany-black">
              Marketing Dashboard
            </h1>
            <p className="text-xs md:text-sm font-medium text-gray-500 max-w-xl">
              Dedicated operations workspace for Marketing team members.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="bg-germany-red hover:bg-[#D62839] text-white py-2.5 px-4 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
              <span>Start Task</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <span className="text-xs font-bold text-gray-400">Active Campaigns</span>
          <div className="text-2xl font-display font-bold text-germany-black">NA</div>
          <p className="text-[11px] font-medium text-gray-500">No data available</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <span className="text-xs font-bold text-gray-400">Total Leads Generated</span>
          <div className="text-2xl font-display font-bold text-germany-black">NA</div>
          <p className="text-[11px] font-medium text-gray-500">No data available</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 space-y-2">
          <span className="text-xs font-bold text-gray-400">Conversion Rate</span>
          <div className="text-2xl font-display font-bold text-gray-400">—</div>
          <p className="text-[11px] font-medium text-gray-500">No data available</p>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-4">
        <h3 className="font-display font-bold text-base text-germany-black">Recent Marketing Activity</h3>
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs font-medium">
          No recent activity to display.
        </div>
      </div>
    </div>
  );
}
