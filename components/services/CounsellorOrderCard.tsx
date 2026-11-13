"use client";

import React from 'react';
import {
  Clock,
  CheckCircle2,
  Upload,
  AlertCircle,
  ExternalLink,
  User,
  Zap,
  SlidersHorizontal,
  Timer,
  Calendar,
} from 'lucide-react';
import { CounsellorServiceOrder, TabType, SortOption } from './types';

interface CounsellorOrderCardProps {
  order: CounsellorServiceOrder;
  index: number;
  activeTab: TabType;
  sortOption: SortOption;
  getTimeWaiting: (createdAt: string) => {
    text: string;
    totalHours: number;
    isVeryOld: boolean;
    isOld: boolean;
    createdDateFormatted: string;
  };
  getDeadlineStatus: (targetDeadline: string | null) => {
    isOverdue: boolean;
    isUrgent: boolean;
    isCritical: boolean;
    text: string;
  };
  isOrderUrgent: (order: CounsellorServiceOrder) => boolean;
  isUnattended: (status: string) => boolean;
  handleQuickMarkAttended: (orderId: string) => void;
  updatingOrderId: string | null;
  handleOpenStatusModal: (order: CounsellorServiceOrder) => void;
  setSelectedOrder: (order: CounsellorServiceOrder) => void;
}

export function CounsellorOrderCard({
  order,
  index,
  activeTab,
  sortOption,
  getTimeWaiting,
  getDeadlineStatus,
  isOrderUrgent,
  isUnattended,
  handleQuickMarkAttended,
  updatingOrderId,
  handleOpenStatusModal,
  setSelectedOrder,
}: CounsellorOrderCardProps) {
  const isExpress = order.plan_tier === 'EXPRESS';
  const waiting = getTimeWaiting(order.created_at);
  const dl = getDeadlineStatus(order.target_deadline);
  const urgent = isOrderUrgent(order);
  const orderIsUnattended = isUnattended(order.status);
  const isFirstToServe = activeTab === 'unattended' && sortOption === 'oldest' && index === 0;

  return (
    <div
      key={order.id}
      className={`p-5 rounded-2xl bg-white dark:bg-[#111622] border transition-all space-y-4 shadow-xs ${
        isFirstToServe
          ? 'border-red-500/80 dark:border-red-500/60 ring-2 ring-red-500/20'
          : urgent
          ? 'border-amber-400/80 dark:border-amber-500/40'
          : 'border-[#e5e0d3] dark:border-gray-800'
      }`}
    >
      {/* Top Status & Priority Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e0d3] dark:border-gray-800 pb-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Priority queue tag */}
            {isFirstToServe ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-germany-red text-white flex items-center gap-1.5 shadow-xs">
                <Clock className="w-3 h-3 text-white" />
                <span>Priority #1 • Waiting Longest</span>
              </span>
            ) : orderIsUnattended && sortOption === 'oldest' ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-[#16161a] dark:text-gray-300">
                Queue #{index + 1}
              </span>
            ) : null}

            {/* Service Title */}
            <span className="font-extrabold text-sm text-[#16161a] dark:text-white">
              {order.service_type.replace(/_/g, ' ')}
            </span>

            {/* Tier Badge */}
            {isExpress ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16161a] dark:bg-amber-950/60 text-white dark:text-amber-300 border border-transparent dark:border-amber-800/50 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current text-[#c9a35b]" />
                <span>Express 24h</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ece7dd] dark:bg-[#1A2130] text-[#16161a] dark:text-gray-200 border border-[#dcd7cb] dark:border-gray-700">
                Standard
              </span>
            )}
          </div>

          {/* Student Info & Order Timestamp */}
          <div className="text-xs text-[#5e5b54] dark:text-gray-400 font-medium flex flex-wrap items-center gap-2">
            <span>Order #{order.id.slice(0, 8)}</span>
            <span>•</span>
            <span className="font-bold text-[#16161a] dark:text-white flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#787369]" />
              <span>{order.student_name}</span>
            </span>
            <span>({order.student_email})</span>
            <span>•</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Booked: {waiting.createdDateFormatted}
            </span>
          </div>
        </div>

        {/* Badges and Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Waiting Pill */}
          <span
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border ${
              waiting.isVeryOld
                ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900'
                : waiting.isOld
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900'
                : 'bg-[#faf8f3] dark:bg-[#151B27] text-[#5e5b54] dark:text-gray-300 border-[#e5e0d3] dark:border-gray-800'
            }`}
          >
            <Timer className="w-3 h-3" />
            <span>{waiting.text}</span>
          </span>

          {/* Deadline Pill */}
          <span
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border ${
              dl.isOverdue
                ? 'bg-red-600 text-white border-red-700 animate-pulse'
                : dl.isCritical
                ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 font-black'
                : dl.isUrgent
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                : 'bg-[#faf8f3] dark:bg-[#151B27] text-[#5e5b54] dark:text-gray-300 border-[#e5e0d3] dark:border-gray-800'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>{dl.text}</span>
          </span>

          {/* Status badge */}
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              order.status === 'COMPLETED'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                : order.status === 'IN_PROGRESS' || order.status === 'DRAFT_READY'
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            }`}
          >
            Status: {order.status}
          </span>

          {/* Payment status badge */}
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              order.payment_status === 'PAID'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                : 'bg-amber-50 dark:bg-amber-950/40 text-[#c9a35b] dark:text-[#e0bb6b] border-[#e5e0d3] dark:border-amber-800/50'
            }`}
          >
            {order.payment_status === 'PAID' ? 'Paid & Verified' : 'Payment Pending'}
          </span>
        </div>
      </div>

      {/* Questionnaire / Student Inputs Preview */}
      {order.student_inputs && Object.keys(order.student_inputs).length > 0 && (
        <div className="p-3.5 bg-[#faf8f3] dark:bg-[#151B27] border border-[#e5e0d3] dark:border-gray-800 rounded-xl text-xs space-y-1.5">
          <span className="font-bold text-[#5e5b54] dark:text-gray-400 block">
            Student Questionnaire Inputs:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#16161a] dark:text-gray-200">
            {Object.entries(order.student_inputs).map(([key, val]) => {
              if (typeof val === 'object') return null;
              return (
                <div key={key}>
                  <span className="text-[#6b6760] dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:{' '}
                  </span>
                  <span className="font-bold text-[#16161a] dark:text-white">
                    {String(val)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Deliverables Delivered */}
      {order.deliverables && order.deliverables.length > 0 && (
        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs space-y-1.5">
          <span className="font-bold text-blue-800 dark:text-blue-300 block">
            Delivered Drafts &amp; Files:
          </span>
          <div className="flex flex-wrap gap-2">
            {order.deliverables.map((d, dIdx) => (
              <a
                key={dIdx}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#111622] rounded-lg border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                <span>{d.title || `Draft #${dIdx + 1}`}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Notes & Revisions */}
      {order.counsellor_notes && (
        <div className="p-3 bg-[#ece7dd] dark:bg-amber-950/20 border border-[#dcd7cb] dark:border-amber-800/40 rounded-xl text-xs text-[#16161a] dark:text-amber-200 space-y-1">
          <span className="font-bold block text-[#16161a] dark:text-amber-300">
            Revision History &amp; Notes:
          </span>
          <p className="whitespace-pre-line text-[#16161a] dark:text-gray-200">
            {order.counsellor_notes}
          </p>
        </div>
      )}

      {/* Action Buttons Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-[11px] text-[#5e5b54] dark:text-gray-400 font-medium">
          {orderIsUnattended ? (
            <span className="text-red-600 dark:text-red-400 font-bold inline-flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Action Required: Mark as attended or deliver draft for this student.</span>
            </span>
          ) : (
            <span className="text-blue-600 dark:text-blue-400 font-bold inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-500" />
              <span>Currently in Attended state.</span>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 1-Click "Mark as Attended (In Progress)" */}
          {orderIsUnattended && (
            <button
              onClick={() => handleQuickMarkAttended(order.id)}
              disabled={updatingOrderId === order.id}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>
                {updatingOrderId === order.id ? 'Attending...' : 'Mark as Attended (Start)'}
              </span>
            </button>
          )}

          <button
            onClick={() => handleOpenStatusModal(order)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-white border border-[#dcd7cb] dark:border-gray-700 hover:bg-[#ece7dd] dark:hover:bg-[#1A2130] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#c9a35b]" />
            <span>Update Status</span>
          </button>

          <button
            onClick={() => setSelectedOrder(order)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Deliver Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
}
