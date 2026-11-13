"use client";

import React from 'react';
import Link from 'next/link';
import {
  Clock,
  Loader2,
  AlertCircle,
  Building2,
  ArrowRight,
  ExternalLink,
  Info,
  KeyRound,
  ShieldCheck,
  Check,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ApplicationItem, APP_STATUS_STYLES } from './types';

interface StudentAdmissionApplicationsTabProps {
  isLocked: boolean;
  appsLoading: boolean;
  appsError: string;
  applications: ApplicationItem[];
  revealingId: string | null;
  revealedCreds: Record<string, { username: string; password: string }>;
  showPassword: Record<string, boolean>;
  setShowPassword: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  copiedField: string | null;
  copyToClipboard: (text: string, fieldId: string) => void;
  handleRevealCredentials: (appId: string) => void;
}

export function StudentAdmissionApplicationsTab({
  isLocked,
  appsLoading,
  appsError,
  applications,
  revealingId,
  revealedCreds,
  showPassword,
  setShowPassword,
  copiedField,
  copyToClipboard,
  handleRevealCredentials,
}: StudentAdmissionApplicationsTabProps) {
  return (
    <div className="space-y-6">
      {/* Status Alert if Shortlist is not locked */}
      {!isLocked && (
        <div className="p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-3xl flex items-start gap-3.5 text-xs text-amber-900 dark:text-amber-300">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-black text-sm text-amber-900 dark:text-amber-200">
              Shortlist Finalization in Progress
            </h4>
            <p className="mt-1 font-medium leading-relaxed">
              Your university shortlist is currently being reviewed by your assigned Germany education counsellor. Once your counsellor finalizes and locks the shortlist, official application tracking and university portal credentials will be actively updated here.
            </p>
          </div>
        </div>
      )}

      {/* Applications Cards Grid */}
      {appsLoading ? (
        <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-gray-200 dark:border-gray-800">
          <Loader2 className="w-8 h-8 animate-spin text-germany-red mx-auto mb-3" />
          <p className="text-xs font-bold text-gray-500">Loading university application portals...</p>
        </div>
      ) : appsError ? (
        <div className="p-8 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-red-200 dark:border-red-900/40">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-xs font-bold text-red-600">{appsError}</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 space-y-3">
          <Building2 className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
          <h3 className="text-sm font-black text-gray-900 dark:text-white">
            No Locked Applications Yet
          </h3>
          <p className="text-xs font-medium text-gray-500 max-w-sm mx-auto">
            Applications are populated directly from your locked university shortlist. Visit the shortlist page to review your recommendations with your counsellor.
          </p>
          <Link
            href="/dashboard/student/shortlist"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-germany-red text-white text-xs font-extrabold rounded-xl hover:bg-germany-red/90 shadow-sm"
          >
            <span>View Shortlist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {applications.map((app) => {
            const statusInfo = APP_STATUS_STYLES[app.applicationStatus] || APP_STATUS_STYLES.NOT_STARTED;
            const isRevealing = revealingId === app.id;
            const creds = revealedCreds[app.id];
            const isPasswordShown = Boolean(showPassword[app.id]);

            return (
              <div
                key={app.id}
                className="bg-white dark:bg-[#151B27] rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all flex flex-col justify-between space-y-5"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                      {app.degree || 'Master of Science'} · {app.location || 'Germany'}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusInfo.style}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                      {app.programmeName}
                    </h3>
                    <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>{app.universityName}</span>
                    </div>
                  </div>

                  {/* Application Metadata Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 bg-gray-50 dark:bg-[#1A2234] rounded-xl border border-gray-100 dark:border-gray-800">
                      <div className="text-gray-400 text-[10px] font-bold">Application ID / Ref</div>
                      <div className="font-extrabold text-gray-800 dark:text-gray-200 truncate">
                        {app.applicationId || 'Not assigned yet'}
                      </div>
                    </div>

                    <div className="p-2.5 bg-gray-50 dark:bg-[#1A2234] rounded-xl border border-gray-100 dark:border-gray-800">
                      <div className="text-gray-400 text-[10px] font-bold">Deadline</div>
                      <div className="font-extrabold text-gray-800 dark:text-gray-200">
                        {app.deadline || 'July 15, 2026'}
                      </div>
                    </div>
                  </div>

                  {/* Portal Link */}
                  {app.portalUrl && (
                    <div className="flex items-center justify-between p-2.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300">
                      <span className="truncate pr-2">{app.portalUrl}</span>
                      <a
                        href={app.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-md shrink-0 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                      </a>
                    </div>
                  )}

                  {/* Counsellor Notes */}
                  {app.counsellorNotes && (
                    <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 rounded-xl text-xs text-amber-900 dark:text-amber-300">
                      <div className="font-extrabold flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-400 mb-1">
                        <Info className="w-3.5 h-3.5" />
                        <span>Counsellor Instructions</span>
                      </div>
                      <p className="font-medium whitespace-pre-wrap">{app.counsellorNotes}</p>
                    </div>
                  )}
                </div>

                {/* Portal Credentials Section (Encrypted at Rest with AES-256-GCM) */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-gray-400 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-germany-gold" />
                      <span>Portal Credentials</span>
                    </span>
                    {app.hasCredentials ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Encrypted Vault
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400">
                        Awaiting counsellor setup
                      </span>
                    )}
                  </div>

                  {app.hasCredentials ? (
                    <div className="space-y-2">
                      {creds ? (
                        <div className="p-3.5 bg-gray-50 dark:bg-[#1A2234] rounded-2xl border border-gray-200/70 dark:border-gray-800 space-y-2.5">
                          {/* Username */}
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <div className="text-[10px] font-bold text-gray-400">Portal Username / Email</div>
                              <div className="font-extrabold text-gray-900 dark:text-white select-all">
                                {creds.username}
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(creds.username, `user-${app.id}`)}
                              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500 cursor-pointer"
                              title="Copy username"
                            >
                              {copiedField === `user-${app.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {/* Password */}
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/50 dark:border-gray-800">
                            <div>
                              <div className="text-[10px] font-bold text-gray-400">Portal Password</div>
                              <div className="font-extrabold text-gray-900 dark:text-white font-mono select-all">
                                {isPasswordShown ? creds.password : '••••••••••••'}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setShowPassword((prev) => ({ ...prev, [app.id]: !prev[app.id] }))}
                                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500 cursor-pointer"
                                title={isPasswordShown ? 'Hide Password' : 'Show Password'}
                              >
                                {isPasswordShown ? (
                                  <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => copyToClipboard(creds.password, `pass-${app.id}`)}
                                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500 cursor-pointer"
                                title="Copy password"
                              >
                                {copiedField === `pass-${app.id}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRevealCredentials(app.id)}
                          disabled={isRevealing}
                          className="w-full py-2.5 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isRevealing ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-germany-red" />
                              <span>Authorizing &amp; Decrypting...</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 text-gray-500" />
                              <span>Reveal Credentials</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-[#1A2234] rounded-xl text-center text-xs text-gray-400 font-medium">
                      Portal credentials have not been configured by your counsellor yet.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
