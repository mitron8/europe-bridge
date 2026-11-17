"use client";

import React from 'react';
import { Users, GraduationCap, CreditCard, Calendar, Loader2 } from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  activeCounsellors: number;
  activeSubscriptions: number;
  totalMeetings: number;
}

interface AdminStatCardsProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

export function AdminStatCards({ stats, isLoading = false }: AdminStatCardsProps) {
  const cards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents ?? 10,
      trend: '+25%',
      isPositive: true,
      subtitle: 'Active student accounts',
      icon: Users,
      iconColor: 'text-[#EF2D48]',
      iconBg: 'bg-[#FDE2E4] dark:bg-[#34161E]',
    },
    {
      title: 'Active Counsellors',
      value: stats?.activeCounsellors ?? 2,
      trend: '0%',
      isNeutral: true,
      subtitle: 'Advising & supervising',
      icon: GraduationCap,
      iconColor: 'text-[#8B5CF6]',
      iconBg: 'bg-[#EDE9FE] dark:bg-[#2E1065]/40',
    },
    {
      title: 'Paid Subscriptions',
      value: stats?.activeSubscriptions ?? 8,
      trend: '+60%',
      isPositive: true,
      subtitle: 'Enrolled tier memberships',
      icon: CreditCard,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-[#EFF6FF] dark:bg-[#1E3A8A]/40',
    },
    {
      title: 'Platform Consultations',
      value: stats?.totalMeetings ?? 5,
      trend: '+25%',
      isPositive: true,
      subtitle: 'Strategy sessions logged',
      icon: Calendar,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7] dark:bg-[#78350F]/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {cards.map((c, i) => {
        const IconComponent = c.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-[#111622] rounded-xl sm:rounded-2xl border border-[#E2E8F0] dark:border-gray-800/80 p-4 shadow-2xs transition-all hover:shadow-xs group flex flex-col justify-between"
          >
            {/* Top row: Icon, Title, and Trend badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl ${c.iconBg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                >
                  <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${c.iconColor}`} />
                </div>
                <span className="text-xs font-bold text-[#64748B] dark:text-gray-400 truncate">
                  {c.title}
                </span>
              </div>
              <div className="shrink-0">
                {c.isNeutral ? (
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-bold text-[#64748B] dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
                    <span>—</span>
                    <span>{c.trend}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] dark:bg-[#064E3B]/30 px-1.5 py-0.5 rounded-full">
                    <span>↑</span>
                    <span>{c.trend}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Value Counter & Subtitle */}
            <div className="mt-1">
              <div className="text-2xl sm:text-[26px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                ) : (
                  c.value
                )}
              </div>
              <p className="text-[11px] font-medium text-[#64748B] dark:text-gray-400 mt-0.5 truncate">
                {c.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
