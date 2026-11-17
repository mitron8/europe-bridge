"use client";

import React, { useState } from 'react';
import { PieChart } from 'lucide-react';

interface ConsultationStatusDonutProps {
  totalMeetings?: number;
  recentMeetings?: Array<{ status: string }>;
}

export function AdminConsultationStatusDonut({
  totalMeetings,
  recentMeetings,
}: ConsultationStatusDonutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Compute status counts dynamically from real meeting logs if available
  let awaiting = 0;
  let cancelled = 0;
  let completed = 0;

  if (recentMeetings !== undefined) {
    recentMeetings.forEach((m) => {
      const s = (m.status || '').toUpperCase();
      if (s === 'CANCELLED') {
        cancelled++;
      } else if (s === 'COMPLETED') {
        completed++;
      } else {
        awaiting++;
      }
    });
  } else {
    // Fallback baseline only if recentMeetings prop is completely omitted
    awaiting = 2;
    cancelled = 2;
    completed = 1;
  }

  const computedTotal = awaiting + cancelled + completed;
  const displayTotal = totalMeetings !== undefined ? totalMeetings : computedTotal;

  const segments = [
    {
      id: 'awaiting',
      label: 'Awaiting Completion',
      count: awaiting,
      percentage: computedTotal > 0 ? Math.round((awaiting / computedTotal) * 100) : 0,
      color: '#8B5CF6',
      hoverColor: '#7C3AED',
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      count: cancelled,
      percentage: computedTotal > 0 ? Math.round((cancelled / computedTotal) * 100) : 0,
      color: '#EF2D48',
      hoverColor: '#DC2626',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: completed,
      percentage: computedTotal > 0 ? Math.round((completed / computedTotal) * 100) : 0,
      color: '#F59E0B',
      hoverColor: '#D97706',
    },
  ];

  // SVG Donut calculation
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-[#E2E8F0] dark:border-gray-800/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-4 h-4 text-[#64748B] dark:text-gray-400" />
        <h3 className="font-display font-bold text-base text-[#0F172A] dark:text-white">
          Consultation Status
        </h3>
      </div>

      {/* Donut Chart & Legend layout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
        {/* Modern Donut Graphic */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90 select-none"
          >
            {/* Background Track Ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              className="dark:stroke-gray-800"
            />

            {/* Colored Segment Arcs */}
            {segments.map((seg, idx) => {
              const strokeLength = (seg.percentage / 100) * circumference;
              // A small 2px gap between arcs
              const strokeDasharray = `${Math.max(0, strokeLength - 3)} ${circumference}`;
              const strokeDashoffset = -cumulativeOffset;
              cumulativeOffset += strokeLength;

              const isHovered = hoveredIndex === idx;

              return (
                <circle
                  key={seg.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={isHovered ? seg.hoverColor : seg.color}
                  strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-none">
              {displayTotal}
            </span>
            <span className="text-[10px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-wider mt-1">
              Total
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 w-full space-y-3">
          {segments.map((seg, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={seg.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer ${
                  isHovered
                    ? 'bg-gray-50 dark:bg-white/5'
                    : 'hover:bg-gray-50/50 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-gray-200">
                    {seg.label}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">
                    {seg.count}
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B] dark:text-gray-400 w-8 text-right">
                    {seg.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
