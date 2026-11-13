"use client";

import React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
} from 'lucide-react';

interface AccountSecurityTabProps {
  loadingSecurity: boolean;
  hasPassword: boolean;
  securitySuccess: string | null;
  securityError: string | null;
  securitySaving: boolean;
  showCurrentPass: boolean;
  showNewPass: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onToggleShowCurrentPass: () => void;
  onToggleShowNewPass: () => void;
  onCurrentPasswordChange: (val: string) => void;
  onNewPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export function AccountSecurityTab({
  loadingSecurity,
  hasPassword,
  securitySuccess,
  securityError,
  securitySaving,
  showCurrentPass,
  showNewPass,
  currentPassword,
  newPassword,
  confirmPassword,
  onToggleShowCurrentPass,
  onToggleShowNewPass,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSave,
}: AccountSecurityTabProps) {
  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-2xs">
      <div>
        <h2 className="text-base font-bold text-germany-black dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-germany-red" />
          <span>Password &amp; Authentication</span>
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Secure your account credentials and enable direct email &amp; password authentication.
        </p>
      </div>

      {loadingSecurity ? (
        <div className="p-8 text-center bg-gray-50/60 dark:bg-[#151B27] rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-germany-red" />
          <span>Checking password security status...</span>
        </div>
      ) : (
        <>
          {/* Google Sign-in Banner if no password set */}
          {!hasPassword ? (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>No Current Password Required (Google Login)</span>
              </div>
              <p className="leading-relaxed font-medium">
                You signed in with Google and do not have an existing password. <strong>You do not need to enter a current password.</strong> Simply set a new password below to also enable direct email and password sign-in.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Password protection is active on your account.</span>
              </div>
              <Link
                href="/forgot-password"
                className="text-germany-red hover:underline font-bold text-[11px]"
              >
                Forgot current password? Reset here &rarr;
              </Link>
            </div>
          )}

          {securitySuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{securitySuccess}</span>
            </div>
          )}

          {securityError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-germany-red shrink-0" />
              <span>{securityError}</span>
            </div>
          )}

          <form onSubmit={onSave} className="space-y-4 max-w-xl">
            {/* ONLY show Current Password if a password already exists */}
            {hasPassword && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
                  <span>Current Password</span>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] text-germany-red hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => onCurrentPasswordChange(e.target.value)}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={onToggleShowCurrentPass}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center justify-between">
                <span>{hasPassword ? 'New Password' : 'Set New Password'}</span>
                <span className="text-[10px] text-gray-400 font-medium">Minimum 6 characters</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => onNewPasswordChange(e.target.value)}
                  placeholder="Enter strong new password"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={onToggleShowNewPass}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={securitySaving}
                className="px-6 py-2.5 rounded-xl bg-germany-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-60"
              >
                {securitySaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{hasPassword ? 'Updating Password...' : 'Setting Password...'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{hasPassword ? 'Update Password' : 'Set Account Password'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
