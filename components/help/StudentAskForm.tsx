"use client";

import React from 'react';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';

export const CATEGORIES = [
  'Admissions',
  'APS Certificate',
  'Visa & Blocked Account',
  'University Shortlist',
  'Documents & Translation',
  'Technical Issue',
  'General Inquiry',
];

interface StudentAskFormProps {
  submitSuccess: boolean;
  formError: string | null;
  category: string;
  setCategory: (val: string) => void;
  priority: string;
  setPriority: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function StudentAskForm({
  submitSuccess,
  formError,
  category,
  setCategory,
  priority,
  setPriority,
  subject,
  setSubject,
  message,
  setMessage,
  isSubmitting,
  onSubmit,
}: StudentAskFormProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/90 dark:border-gray-800 shadow-xs overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0E121A]">
        <h2 className="text-lg font-bold text-germany-black">
          Send a Query to Your Counsellor
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-0.5">
          Your inquiry will be assigned to your dedicated advisor with a secure tracking ticket.
        </p>
      </div>

      {submitSuccess ? (
        <div className="p-10 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-germany-black">Your question has been sent!</h3>
          <p className="text-sm text-gray-500 font-medium">Opening your conversation thread...</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="p-5 sm:p-7 space-y-5">
          {formError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-germany-black dark:text-gray-200 mb-1.5">
                Category
              </label>
              <ClaySelect
                value={category}
                onChange={(val) => setCategory(val)}
                options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-germany-black dark:text-gray-200 mb-1.5">
                Priority
              </label>
              <ClaySelect
                value={priority}
                onChange={(val) => setPriority(val)}
                options={[
                  { value: 'low', label: 'Normal' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'urgent', label: 'Urgent' },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-germany-black dark:text-gray-200 mb-1.5">
              Subject / Topic
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. APS Certificate marksheet name mismatch"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-germany-black dark:text-white font-medium focus:bg-white dark:focus:bg-[#0E121A] focus:outline-none focus:border-germany-red transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-germany-black dark:text-gray-200 mb-1.5">
              Message / Details
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question or difficulty in detail..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-germany-black dark:text-white font-medium focus:bg-white dark:focus:bg-[#0E121A] focus:outline-none focus:border-germany-red transition-all resize-y"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !subject.trim() || !message.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-germany-red hover:bg-[#D62839] disabled:bg-gray-300 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Send to Counsellor'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
