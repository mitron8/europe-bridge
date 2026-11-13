"use client";

import React from 'react';
import { AlertCircle, Check, CheckCircle2, Loader2, Mail, Phone, User } from 'lucide-react';

interface AccountProfileTabProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileSuccess: string | null;
  profileError: string | null;
  profileSaving: boolean;
  onFirstNameChange: (val: string) => void;
  onLastNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export function AccountProfileTab({
  firstName,
  lastName,
  email,
  phone,
  profileSuccess,
  profileError,
  profileSaving,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onSave,
}: AccountProfileTabProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-2xs">
      <div>
        <h2 className="text-base font-bold text-germany-black dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-germany-red" />
          <span>Personal &amp; Contact Details</span>
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Updates made here automatically synchronize across your profile, counsellor review documents, and student records.
        </p>
      </div>

      {profileSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{profileSuccess}</span>
        </div>
      )}

      {profileError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-germany-red shrink-0" />
          <span>{profileError}</span>
        </div>
      )}

      <form onSubmit={onSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              placeholder="e.g. Rahul"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              placeholder="e.g. Sharma"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-gray-400 font-medium">Used for login</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="student@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors"
              />
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
              Changing your email address immediately updates your EuroBridge authentication credential.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
              <span>Phone Number</span>
              <span className="text-[10px] text-gray-400 font-medium">Synced with profile</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors"
              />
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
              Your assigned advisor contacts you on this number for application &amp; visa coordination.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={profileSaving}
            className="px-6 py-2.5 rounded-xl bg-germany-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-60"
          >
            {profileSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Profile Details</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
