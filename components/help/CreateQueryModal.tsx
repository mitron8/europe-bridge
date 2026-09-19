"use client";

import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { ClaySelect } from '@/components/ClaySelect';
import { useHelpStore, QueryCategory, QueryPriority } from '@/store/useHelpStore';

interface CreateQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'student' | 'counsellor';
  initialSubject?: string;
  initialDetail?: string;
  onSuccess?: () => void;
}

const CATEGORIES: QueryCategory[] = [
  'Admissions',
  'APS Certificate',
  'Visa & Blocked Account',
  'University Shortlist',
  'Documents & Translation',
  'Technical Issue',
  'General Inquiry',
];

export default function CreateQueryModal({
  isOpen,
  onClose,
  userRole,
  initialSubject = '',
  initialDetail = '',
  onSuccess,
}: CreateQueryModalProps) {
  const createStudentQuery = useHelpStore((s) => s.createStudentQuery);
  const createCounsellorQuery = useHelpStore((s) => s.createCounsellorQuery);

  const [title, setTitle] = useState(initialSubject);
  const [description, setDescription] = useState(initialDetail);
  const [category, setCategory] = useState<QueryCategory>('Admissions');
  const [priority, setPriority] = useState<QueryPriority>('medium');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (userRole === 'student') {
        createStudentQuery({
          title,
          description: attachedFile ? `${description}\n\n[Attachment: ${attachedFile}]` : description,
          category,
          priority,
        });
      } else {
        createCounsellorQuery({
          title,
          description: attachedFile ? `${description}\n\n[Attachment: ${attachedFile}]` : description,
          category,
          priority,
        });
      }

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 700);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* German Tricolor Top Accent */}
        <div className="w-full h-[3px] flex shrink-0">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        {/* Header */}
        <div className="p-5 border-b border-gray-200/80 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-base font-display font-bold text-germany-black">
              {userRole === 'student' ? 'Drop Query to Counsellor' : 'Ask Query to Admin'}
            </h2>
            <p className="text-[11px] text-gray-500 font-medium">
              {userRole === 'student'
                ? 'Your assigned advisor Priya Mehra will review and guide you.'
                : 'Direct inquiry to Operations & Management.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-germany-black">Query Submitted Successfully</h3>
            <p className="text-xs text-gray-500 font-medium">Your ticket has been logged and assigned.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Category</label>
                <ClaySelect
                  value={category}
                  onChange={(val) => setCategory(val as QueryCategory)}
                  options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Priority</label>
                <ClaySelect
                  value={priority}
                  onChange={(val) => setPriority(val as QueryPriority)}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'urgent', label: 'Urgent' },
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Subject</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. APS Certificate discrepancy, or Uni-Assist deadline"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-germany-black font-medium focus:outline-none focus:border-germany-red"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Details</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what guidance or assistance you need..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-germany-black font-medium focus:outline-none focus:border-germany-red resize-none"
              />
            </div>

            {/* Attachment */}
            <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px]">
              <span className="text-gray-500 font-medium flex items-center gap-1.5 truncate">
                <Paperclip className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                {attachedFile ? (
                  <span className="text-germany-black font-bold truncate">{attachedFile}</span>
                ) : (
                  'Optional document attachment'
                )}
              </span>

              {attachedFile ? (
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  className="text-germany-red hover:underline font-bold cursor-pointer shrink-0"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAttachedFile('document_sample.pdf')}
                  className="text-germany-red hover:underline font-bold cursor-pointer shrink-0"
                >
                  + Add File
                </button>
              )}
            </div>

            {/* Actions */}
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
                disabled={isSubmitting || !title.trim() || !description.trim()}
                className="bg-germany-red hover:bg-[#D62839] disabled:bg-gray-200 text-white font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Query'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
