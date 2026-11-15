"use client";

import React from 'react';
import { CounsellorServiceOrder } from './types';

interface UpdateOrderStatusModalProps {
  order: CounsellorServiceOrder | null;
  onClose: () => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedPaymentStatus: string;
  setSelectedPaymentStatus: (val: string) => void;
  statusUpdateNotes: string;
  setStatusUpdateNotes: (val: string) => void;
  isUpdatingStatus: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function UpdateOrderStatusModal({
  order,
  onClose,
  selectedStatus,
  setSelectedStatus,
  selectedPaymentStatus,
  setSelectedPaymentStatus,
  statusUpdateNotes,
  setStatusUpdateNotes,
  isUpdatingStatus,
  onSubmit,
}: UpdateOrderStatusModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="p-6 bg-white dark:bg-[#111622] rounded-3xl border border-[#e5e0d3] dark:border-gray-800 max-w-lg w-full space-y-5 shadow-2xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#16161a] dark:text-white font-display">
            Update Service Order Status
          </h3>
          <p className="text-xs text-[#5e5b54] dark:text-gray-400">
            Student: <strong className="text-[#16161a] dark:text-white">{order.student_name}</strong> •{' '}
            {order.service_type}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
              Service Delivery Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-bold text-[#16161a] dark:text-white focus:outline-hidden focus:ring-1 focus:ring-germany-red cursor-pointer whitespace-normal break-words"
            >
              <optgroup label="Unattended / In Queue">
                <option value="BOOKED">BOOKED (Order Received / In Queue)</option>
                <option value="ASSIGNED">ASSIGNED (Assigned to Counselor)</option>
                <option value="REVISION_REQUESTED">REVISION_REQUESTED (Revision in Queue)</option>
              </optgroup>
              <optgroup label="Attended">
                <option value="IN_PROGRESS">IN_PROGRESS (Drafting in Progress)</option>
                <option value="DRAFT_READY">DRAFT_READY (Draft Delivered to Student)</option>
              </optgroup>
              <optgroup label="Finalized">
                <option value="COMPLETED">COMPLETED (Order Completed & Finalized)</option>
                <option value="CANCELLED">CANCELLED (Order Cancelled)</option>
              </optgroup>
            </select>
            <p className="text-[11px] text-[#5e5b54] dark:text-gray-400 mt-1">
              Choosing IN_PROGRESS or DRAFT_READY will move this order to the <strong>Attended</strong> tab.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
              Payment Status
            </label>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-gray-50/80 dark:bg-[#0A0D14]">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                (order.payment_status || 'UNPAID') === 'PAID'
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : (order.payment_status || 'UNPAID') === 'WAIVED'
                  ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                  : 'bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
              }`}>
                {order.payment_status || 'UNPAID'}
              </span>
              <span className="text-[11px] text-[#5e5b54] dark:text-gray-400 font-medium">
                • Verified by Finance &amp; Admin
              </span>
            </div>
            <p className="text-[11px] text-[#5e5b54] dark:text-gray-400 mt-1">
              Only platform administrators can modify payment verification records.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-[#16161a] dark:text-white block mb-1">
              Counselor Notes / Internal Remarks
            </label>
            <textarea
              rows={3}
              value={statusUpdateNotes}
              onChange={(e) => setStatusUpdateNotes(e.target.value)}
              placeholder="e.g. Student contacted via WhatsApp. Discussion scheduled for Friday."
              className="w-full p-3 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#5e5b54] dark:text-gray-400 hover:text-[#16161a] dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingStatus}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isUpdatingStatus ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
