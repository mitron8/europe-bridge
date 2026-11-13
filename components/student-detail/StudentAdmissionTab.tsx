'use client';

import React from 'react';
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  Building2,
  ShieldCheck,
  ExternalLink,
  KeyRound,
  EyeOff,
  Eye,
  CheckCircle2,
  Save,
} from 'lucide-react';

export interface StudentAdmissionTabProps {
  effectiveStudentId: string;
  admissionLoading: boolean;
  admissionError: string | null;
  admissionApplications: any[];
  admissionFormState: Record<string, any>;
  admissionSavingId: string | null;
  admissionSuccessMsg: Record<string, string>;
  admissionRevealedCreds: Record<string, { username: string; password: string }>;
  admissionRevealingId: string | null;
  admissionShowPassword: Record<string, boolean>;
  readOnly?: boolean;
  onRefresh: (stId: string) => void;
  onUpdateForm: (appId: string, field: string, value: string) => void;
  onSaveApp: (appId: string) => void;
  onRevealCreds: (appId: string) => void;
}

export function StudentAdmissionTab({
  effectiveStudentId,
  admissionLoading,
  admissionError,
  admissionApplications,
  admissionFormState,
  admissionSavingId,
  admissionSuccessMsg,
  admissionRevealedCreds,
  admissionRevealingId,
  admissionShowPassword,
  readOnly,
  onRefresh,
  onUpdateForm,
  onSaveApp,
  onRevealCreds,
}: StudentAdmissionTabProps) {
  return (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-white dark:bg-[#151B27] rounded-2xl p-5 border border-gray-200/80 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-germany-red/10 text-germany-red border border-germany-red/20">
                    Counsellor Admission Management
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">
                    AES-256-GCM Vault Protected
                  </span>
                </div>
                <h3 className="text-base font-black text-gray-900 dark:text-white">
                  University Application Portals &amp; Credentials
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Manage official portal URLs, track application IDs and deadlines, and store encrypted student credentials programme by programme.
                </p>
              </div>

              <button
                onClick={() => onRefresh(effectiveStudentId)}
                disabled={admissionLoading}
                className="px-3.5 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${admissionLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Portals</span>
              </button>
            </div>

            {admissionLoading ? (
              <div className="p-12 text-center bg-white dark:bg-[#151B27] rounded-2xl border border-gray-200 dark:border-gray-800">
                <Loader2 className="w-8 h-8 animate-spin text-germany-red mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-500">Loading student locked applications...</p>
              </div>
            ) : admissionError ? (
              <div className="p-6 text-center bg-white dark:bg-[#151B27] rounded-2xl border border-red-200 dark:border-red-900/40">
                <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-red-600">{admissionError}</p>
              </div>
            ) : admissionApplications.length === 0 ? (
              <div className="p-10 text-center bg-white dark:bg-[#151B27] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 space-y-2">
                <Building2 className="w-8 h-8 text-gray-400 mx-auto" />
                <h4 className="text-xs font-black text-gray-800 dark:text-gray-200">
                  No Shortlisted Programmes Found
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Shortlist and lock programmes for this student in the "University Eligibility" tab to manage application portals.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {admissionApplications.map((app) => {
                  const form = admissionFormState[app.id] || {};
                  const isSaving = admissionSavingId === app.id;
                  const success = admissionSuccessMsg[app.id];
                  const creds = admissionRevealedCreds[app.id];
                  const isPwShown = Boolean(admissionShowPassword[app.id]);
                  const isRevealing = admissionRevealingId === app.id;

                  return (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-[#151B27] rounded-2xl p-5 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4"
                    >
                      {/* Programme Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-gray-400">
                              {app.degree || 'Master of Science'} · {app.location || 'Germany'}
                            </span>
                            {app.hasCredentials && (
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Vault Active
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-black text-gray-900 dark:text-white mt-0.5">
                            {app.programmeName}
                          </h4>
                          <div className="text-xs font-bold text-gray-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" />
                            <span>{app.universityName}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Application Status */}
                          {readOnly ? (
                            <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              {form.applicationStatus === 'NOT_STARTED' && 'Not Started'}
                              {form.applicationStatus === 'IN_PROGRESS' && 'In Progress'}
                              {form.applicationStatus === 'SUBMITTED' && 'Submitted'}
                              {form.applicationStatus === 'ACCEPTED' && 'Offer Received'}
                              {form.applicationStatus === 'REJECTED' && 'Unsuccessful'}
                              {form.applicationStatus === 'WAITLISTED' && 'Waitlisted'}
                              {!['NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'WAITLISTED'].includes(form.applicationStatus) && (form.applicationStatus || 'Not Started')}
                            </span>
                          ) : (
                            <select
                              value={form.applicationStatus || 'NOT_STARTED'}
                              disabled={readOnly}
                              onChange={(e) => onUpdateForm(app.id, 'applicationStatus', e.target.value)}
                              className="text-xs font-extrabold px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1A2234] text-gray-800 dark:text-gray-200 cursor-pointer"
                            >
                              <option value="NOT_STARTED">Not Started</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="SUBMITTED">Submitted</option>
                              <option value="ACCEPTED">Offer Received</option>
                              <option value="REJECTED">Unsuccessful</option>
                              <option value="WAITLISTED">Waitlisted</option>
                            </select>
                          )}
                        </div>
                      </div>

                      {/* Editable Details Form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Portal URL */}
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-700 dark:text-gray-300">
                            Official Application Portal URL
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              readOnly={readOnly}
                              placeholder={readOnly ? "No portal URL configured" : "e.g. https://campus.tum.de or uni-assist.de"}
                              value={form.portalUrl || ''}
                              onChange={(e) => onUpdateForm(app.id, 'portalUrl', e.target.value)}
                              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111622] text-gray-900 dark:text-white"
                            />
                            {form.portalUrl && (
                              <a
                                href={form.portalUrl.startsWith('http') ? form.portalUrl : `https://${form.portalUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-xl text-gray-600 dark:text-gray-300"
                                title="Open portal"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Application Reference ID */}
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-700 dark:text-gray-300">
                            Application ID / Reference Number
                          </label>
                          <input
                            type="text"
                            readOnly={readOnly}
                            placeholder={readOnly ? "No application ID provided" : "e.g. TUM-2026-99210 or UA-88219"}
                            value={form.applicationId || ''}
                            onChange={(e) => onUpdateForm(app.id, 'applicationId', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111622] text-gray-900 dark:text-white"
                          />
                        </div>

                        {/* Submission Date */}
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-700 dark:text-gray-300">
                            Submission Date
                          </label>
                          <input
                            type="date"
                            disabled={readOnly}
                            value={form.submissionDate || ''}
                            onChange={(e) => onUpdateForm(app.id, 'submissionDate', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111622] text-gray-900 dark:text-white"
                          />
                        </div>

                        {/* Deadline */}
                        <div className="space-y-1">
                          <label className="font-extrabold text-gray-700 dark:text-gray-300">
                            Application Deadline
                          </label>
                          <input
                            type="date"
                            disabled={readOnly}
                            value={form.deadline || ''}
                            onChange={(e) => onUpdateForm(app.id, 'deadline', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111622] text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Encrypted Credentials Section */}
                      {!readOnly && (
  <div className="p-4 bg-gray-50/70 dark:bg-[#111622] rounded-2xl border border-gray-200/60 dark:border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-black text-xs text-gray-800 dark:text-gray-200">
                            <KeyRound className="w-3.5 h-3.5 text-germany-gold" />
                            <span>Confidential Portal Credentials (Encrypted with AES-256-GCM)</span>
                          </div>

                          {app.hasCredentials && (
                            <button
                              type="button"
                              onClick={() => onRevealCreds(app.id)}
                              disabled={isRevealing}
                              className="text-[11px] font-extrabold text-germany-red hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {isRevealing ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  <span>Decrypting...</span>
                                </>
                              ) : (
                                <>
                                  {isPwShown ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                  <span>{isPwShown ? 'Hide Secret' : 'Reveal Current Vault Password'}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Revealed Credential Display if active */}
                        {creds && isPwShown && (
                          <div className="p-3 bg-white dark:bg-[#151B27] rounded-xl border border-emerald-300 dark:border-emerald-800 text-xs space-y-1">
                            <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                              Current Decrypted Credentials:
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-gray-400 text-[11px]">Username: </span>
                                <span className="font-extrabold text-gray-900 dark:text-white select-all">{creds.username || '(None)'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 text-[11px]">Password: </span>
                                <span className="font-extrabold font-mono text-gray-900 dark:text-white select-all">{creds.password || '(None)'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {!readOnly && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-600 dark:text-gray-400">
                                Set / Update Portal Username or Email
                              </label>
                              <input
                                type="text"
                                placeholder={creds?.username ? creds.username : 'Enter portal username/email'}
                                value={form.portalUsername || ''}
                                onChange={(e) => onUpdateForm(app.id, 'portalUsername', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#151B27] text-gray-900 dark:text-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-bold text-gray-600 dark:text-gray-400">
                                Set / Update Portal Password
                              </label>
                              <input
                                type="text"
                                placeholder={app.hasCredentials ? '•••••••• (Enter new to overwrite)' : 'Enter initial password'}
                                value={form.portalPassword || ''}
                                onChange={(e) => onUpdateForm(app.id, 'portalPassword', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#151B27] text-gray-900 dark:text-white font-mono"
                              />
                            </div>
                          </div>
                        )}
                      </div>
)}

                      {/* Counsellor Instructions & Notes */}
                      <div className="space-y-1 text-xs">
                        <label className="font-extrabold text-gray-700 dark:text-gray-300">
                          Instructions &amp; Guidance for Student
                        </label>
                        <textarea
                          rows={2}
                          readOnly={readOnly}
                          placeholder={readOnly ? "No instructions recorded yet." : "e.g. Please verify your certified high school certificates and sign the declaration before submission."}
                          value={form.counsellorNotes || ''}
                          onChange={(e) => onUpdateForm(app.id, 'counsellorNotes', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111622] text-gray-900 dark:text-white resize-y"
                        />
                      </div>

                      {/* Footer with Save Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div>
                          {success && (
                            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{success}</span>
                            </span>
                          )}
                        </div>

                        {!readOnly && (
                          <button
                            type="button"
                            onClick={() => onSaveApp(app.id)}
                            disabled={isSaving}
                            className="px-4 py-2 bg-germany-red text-white hover:bg-germany-red/90 disabled:opacity-50 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Encrypting &amp; Saving...</span>
                              </>
                            ) : (
                              <>
                                <Save className="w-3.5 h-3.5" />
                                <span>Save Application Information</span>
                              </>
                            )}
                          </button>
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
