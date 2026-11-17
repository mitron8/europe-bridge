"use client";

import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';

interface ActivityPoint {
  date: string;
  registrations: number;
  consultations: number;
}

const DATA_BY_RANGE: Record<string, ActivityPoint[]> = {
  'Last 7 Days': [
    { date: 'Nov 11', registrations: 4, consultations: 2 },
    { date: 'Nov 12', registrations: 5, consultations: 3 },
    { date: 'Nov 13', registrations: 6, consultations: 4 },
    { date: 'Nov 14', registrations: 5, consultations: 3 },
    { date: 'Nov 15', registrations: 7, consultations: 4 },
    { date: 'Nov 16', registrations: 8, consultations: 5 },
    { date: 'Nov 17', registrations: 9, consultations: 6 },
  ],
  'Last 30 Days': [
    { date: 'Nov 10', registrations: 3, consultations: 1 },
    { date: 'Nov 11', registrations: 4, consultations: 2 },
    { date: 'Nov 12', registrations: 5, consultations: 3 },
    { date: 'Nov 13', registrations: 6, consultations: 4 },
    { date: 'Nov 14', registrations: 5, consultations: 3 },
    { date: 'Nov 15', registrations: 7, consultations: 4 },
    { date: 'Nov 16', registrations: 8, consultations: 5 },
    { date: 'Nov 17', registrations: 9, consultations: 6 },
  ],
  'Last 90 Days': [
    { date: 'Aug 25', registrations: 1, consultations: 0 },
    { date: 'Sep 10', registrations: 2, consultations: 1 },
    { date: 'Sep 25', registrations: 3, consultations: 1 },
    { date: 'Oct 10', registrations: 4, consultations: 2 },
    { date: 'Oct 25', registrations: 5, consultations: 3 },
    { date: 'Nov 05', registrations: 7, consultations: 4 },
    { date: 'Nov 12', registrations: 8, consultations: 5 },
    { date: 'Nov 17', registrations: 9, consultations: 6 },
  ],
  'All Time': [
    { date: 'Q1', registrations: 1, consultations: 0 },
    { date: 'Q2', registrations: 3, consultations: 1 },
    { date: 'Jul', registrations: 4, consultations: 2 },
    { date: 'Aug', registrations: 5, consultations: 2 },
    { date: 'Sep', registrations: 6, consultations: 3 },
    { date: 'Oct', registrations: 8, consultations: 4 },
    { date: 'Nov', registrations: 10, consultations: 5 },
  ],
};

interface AdminPlatformActivityChartProps {
  range?: string;
}

export function AdminPlatformActivityChart({ range = 'Last 30 Days' }: AdminPlatformActivityChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = DATA_BY_RANGE[range] || DATA_BY_RANGE['Last 30 Days'];
  const maxVal = 10;
  const width = 560;
  const height = 180;
  const padLeft = 32;
  const padRight = 20;
  const padTop = 15;
  const padBottom = 25;

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const getX = (idx: number) => padLeft + (idx / (data.length - 1)) * chartWidth;
  const getY = (val: number) => padTop + chartHeight - (val / maxVal) * chartHeight;

  // Generate smooth cubic bezier SVG path
  const makeSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const regPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.registrations) }));
  const conPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.consultations) }));

  const regLinePath = makeSmoothPath(regPoints);
  const conLinePath = makeSmoothPath(conPoints);

  const regAreaPath = `${regLinePath} L ${regPoints[regPoints.length - 1].x} ${padTop + chartHeight} L ${regPoints[0].x} ${padTop + chartHeight} Z`;
  const conAreaPath = `${conLinePath} L ${conPoints[conPoints.length - 1].x} ${padTop + chartHeight} L ${conPoints[0].x} ${padTop + chartHeight} Z`;

  const yTicks = [0, 2, 4, 6, 8, 10];

  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-[#E2E8F0] dark:border-gray-800/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#64748B] dark:text-gray-400" />
            <h3 className="font-display font-bold text-base text-[#0F172A] dark:text-white">
              Platform Activity
            </h3>
          </div>
          <p className="text-xs text-[#64748B] dark:text-gray-400 font-medium mt-0.5">
            Student registrations &amp; consultations &bull; <span className="text-[#EF2D48] font-bold">{range}</span>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF2D48]" />
            <span className="text-[#0F172A] dark:text-gray-200">Registrations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-[#0F172A] dark:text-gray-200">Consultations</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Registrations Red Area Gradient */}
            <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF2D48" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#EF2D48" stopOpacity="0.0" />
            </linearGradient>

            {/* Consultations Purple Area Gradient */}
            <linearGradient id="conGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines and Y Labels */}
          {yTicks.map((tick) => {
            const yPos = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={yPos}
                  x2={width - padRight}
                  y2={yPos}
                  stroke="#E2E8F0"
                  strokeDasharray="3 3"
                  className="dark:stroke-gray-800"
                />
                <text
                  x={padLeft - 8}
                  y={yPos + 3}
                  textAnchor="end"
                  className="text-[10px] fill-[#94A3B8] font-bold"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          <path d={regAreaPath} fill="url(#regGradient)" />
          <path d={conAreaPath} fill="url(#conGradient)" />

          {/* Line Strokes */}
          <path
            d={regLinePath}
            fill="none"
            stroke="#EF2D48"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={conLinePath}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Points on lines */}
          {data.map((d, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g key={i}>
                {/* Registrations Point */}
                <circle
                  cx={regPoints[i].x}
                  cy={regPoints[i].y}
                  r={isHovered ? 5 : 3.5}
                  fill="#FFFFFF"
                  stroke="#EF2D48"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* Consultations Point */}
                <circle
                  cx={conPoints[i].x}
                  cy={conPoints[i].y}
                  r={isHovered ? 5 : 3.5}
                  fill="#FFFFFF"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* X-axis date labels */}
                <text
                  x={getX(i)}
                  y={height - 6}
                  textAnchor="middle"
                  className={`text-[10px] font-bold ${
                    isHovered
                      ? 'fill-[#EF2D48]'
                      : 'fill-[#94A3B8] dark:fill-gray-500'
                  }`}
                >
                  {d.date}
                </text>

                {/* Invisible hover hotspot */}
                <rect
                  x={getX(i) - 15}
                  y={padTop}
                  width="30"
                  height={chartHeight + padBottom}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip upon Hover */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 pointer-events-none z-20 px-3 py-1.5 bg-[#0F172A] text-white rounded-xl shadow-lg border border-gray-700 text-xs font-bold transition-all -translate-x-1/2"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
            }}
          >
            <div className="text-[10px] text-gray-400 mb-0.5">{data[hoveredIdx].date}</div>
            <div className="flex items-center gap-3">
              <span className="text-[#EF2D48]">
                Reg: {data[hoveredIdx].registrations}
              </span>
              <span className="text-[#8B5CF6]">
                Cons: {data[hoveredIdx].consultations}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
