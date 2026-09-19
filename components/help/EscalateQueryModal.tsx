"use client";

import React, { useState } from 'react';
import { 
  X, 
  ArrowUpRight, 
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { useHelpStore, SupportQuery } from '@/store/useHelpStore';

interface EscalateQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: SupportQuery;
  counsellorName?: string;
  onSuccess?: () => void;
}

const ESCALATION_REASONS = [
  'APS Certificate & Name Mismatch clearance',
  'University eligibility waiver / special partnership case',
  'Urgent Embassy Visa slot escalation',
  'Fee waiver or blocked account funding exception',
  'Technical portal bug / profile verification hold',
  'Official Institutional verification letter needed from Admin',
  'Other Administrative Intervention Required'
];

export default function EscalateQueryModal({
  isOpen,
  onClose,
  query,
  counsellorName = 'Priya Mehra (Counsellor)',
  onSuccess,
}: EscalateQueryModalProps) {
  const escalateToAdmin = useHelpStore((s) => s.escalateToAdmin);

  const [selectedReason, setSelectedReason] = useState(ESCALATION_REASONS[0]);
  const [adminNotes, setAdminNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleEscalate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      escalateToAdmin(
        query.id,
        counsellorName,
        selectedReason,
        adminNotes.trim() || undefined
      );

      setIsSubmitting(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 700);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* German Tricolor Top Accent */}
        <div className="w-full h-[3px] flex shrink-0">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="p-5 border-b border-gray-200/80 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-base font-display font-bold text-germany-black">
              Escalate to Admin
            </h2>
            <p className="text-[11px] text-gray-500 font-medium">
              {query.id} · {query.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDone ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-germany-red mx-auto" />
            <h3 className="text-sm font-bold text-germany-black">Successfully Escalated</h3>
            <p className="text-xs text-gray-500 font-medium">Operations desk has received this issue.</p>
          </div>
        ) : (
          <form onSubmit={handleEscalate} className="p-5 space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Reason</label>
              <ClaySelect
                value={selectedReason}
                onChange={(val) => setSelectedReason(val)}
                options={ESCALATION_REASONS.map((r) => ({ value: r, label: r }))}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Handover Notes for Admin</label>
              <textarea
                required
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Explain what administrative intervention is required..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-germany-black font-medium focus:outline-none focus:border-germany-red resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-gray-500 hover:text-germany-black font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !adminNotes.trim()}
                className="bg-germany-red hover:bg-[#D62839] disabled:bg-gray-200 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Escalating...' : 'Confirm Escalation'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
