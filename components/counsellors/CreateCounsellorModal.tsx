"use client";

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export function CreateCounsellorModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleCreateCounsellor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/counsellors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.message;
        if (Array.isArray(data.message)) {
          errorMsg = data.message.join(', ');
        }
        throw new Error(errorMsg || 'Failed to create counsellor');
      }

      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      onSuccess();
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
      <div className="bg-[#FDFBF7] dark:bg-[#111622] neu-card w-full max-w-md p-6 relative border border-transparent dark:border-gray-800 animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-[#EBE7E0] dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-display font-extrabold text-germany-black dark:text-white mb-6">
          Create Counsellor
        </h2>

        {submitError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleCreateCounsellor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
                First Name
              </label>
              <input
                required
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
                placeholder="John"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
                Last Name
              </label>
              <input
                required
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
              Email
            </label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">
              Password
            </label>
            <input
              required
              minLength={6}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-white dark:bg-[#0A0D14]"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Counsellor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
