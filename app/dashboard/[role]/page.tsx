import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { notFound } from 'next/navigation';
import { Briefcase, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const VALID_ROLES = [
  'financial',
  'marketing',
  'application-specialist',
  'visa-specialist',
  'support',
  'content'
];

export default async function DashboardPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  
  if (!VALID_ROLES.includes(role)) {
    notFound();
  }

  // Format role for display
  const roleName = role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex h-screen w-full neu-bg overflow-hidden relative">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-80 w-96 h-96 bg-germany-red/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-germany-gold/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      <Sidebar role={role} />
      
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-auto relative z-10 custom-scrollbar space-y-6">
        <div className="max-w-7xl mx-auto space-y-6">
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
                  <span>Specialist Portal</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-germany-black">
                  {roleName} Dashboard
                </h1>
                <p className="text-xs md:text-sm font-bold text-gray-500 max-w-xl">
                  Dedicated operations workspace for {roleName} team members.
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
              <span className="text-xs font-bold text-gray-400">Assigned Tasks</span>
              <div className="text-2xl font-display text-germany-black">12 Active</div>
              <p className="text-[11px] font-bold text-emerald-600">3 due today</p>
            </div>
            <div className="neu-card p-5 bg-white space-y-2">
              <span className="text-xs font-bold text-gray-400">Completed This Week</span>
              <div className="text-2xl font-display text-germany-black">48</div>
              <p className="text-[11px] font-bold text-gray-500">100% on schedule</p>
            </div>
            <div className="neu-card p-5 bg-white space-y-2">
              <span className="text-xs font-bold text-gray-400">Team SLA</span>
              <div className="text-2xl font-display text-emerald-600">99.2%</div>
              <p className="text-[11px] font-bold text-gray-500">Fast response rate</p>
            </div>
          </div>

          {/* Workspace Area */}
          <div className="neu-card p-8 bg-white border border-[#EBE7E0] space-y-4">
            <h3 className="font-display text-lg text-germany-black">{roleName} Operations Queue</h3>
            <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
              Tasks and workflow pipeline for {roleName} will populate here.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
