'use client';

import React from 'react';
import {
  Loader2,
  User,
  Compass,
  FileCheck2,
  Plane,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import {
  APS_DOCUMENT_CATALOGUE,
  ADMISSION_DOCUMENT_CATALOGUE,
  VISA_DOCUMENT_CATALOGUE,
  GENERAL_DOCUMENT_CATALOGUE,
  CatalogueDocument,
} from '@/lib/documentCatalogue';

interface StudentDocument {
  id?: string;
  name?: string;
  category?: string;
  status?: string;
  documentType?: string;
}

function findMatchingDoc(catItem: CatalogueDocument, docs: StudentDocument[]): StudentDocument | undefined {
  const matches = docs.filter((d) => {
    if (d.documentType === catItem.type) return true;
    if (catItem.matchedDocumentTypes && catItem.matchedDocumentTypes.includes(d.documentType || '')) {
      return true;
    }
    return false;
  });
  if (matches.length === 0) return undefined;
  const verifiedMatch = matches.find((m) => m.status === 'verified');
  if (verifiedMatch) return verifiedMatch;
  const pendingMatch = matches.find((m) => m.status === 'pending');
  if (pendingMatch) return pendingMatch;
  return matches[0];
}

export interface StudentOverviewTabProps {
  summaryLoading: boolean;
  summaryError: string | null;
  summaryData: any;
  student: any;
  studentSubscription: any;
  isMatchingLocked: boolean;
  matchingRun: any;
  pendingDocsCount: number;
  distinctUploadedDocs: any[];
  onOpenFullProfile: () => void;
  onNavigateTab: (tab: 'overview' | 'documents' | 'universities' | 'notes' | 'admission', docCat?: any) => void;
}

export function StudentOverviewTab({
  summaryLoading,
  summaryError,
  summaryData,
  student,
  studentSubscription,
  isMatchingLocked,
  matchingRun,
  pendingDocsCount,
  distinctUploadedDocs,
  onOpenFullProfile,
  onNavigateTab,
}: StudentOverviewTabProps) {
  return (
          <div className="space-y-5">
            {summaryLoading ? (
              <div className="p-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-germany-red" />
              </div>
            ) : summaryError ? (
              <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-red-500 text-xs font-bold bg-red-50">
                {summaryError}
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => onOpenFullProfile()}
                    className="py-2 px-4 text-xs font-extrabold flex items-center gap-1.5 bg-white dark:bg-[#151B27] text-germany-black dark:text-white hover:text-germany-red border border-gray-200/80 dark:border-gray-800/80 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>View Student Profile</span>
                  </button>
                </div>

                {/* Profile Snapshot Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">German Bavarian GPA</span>
                    <div className="text-sm font-display text-germany-black dark:text-white flex items-center gap-1.5">
                      <span className="text-germany-black dark:text-white font-black">{summaryData?.summary?.gpa || 'NA'}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Language Scores</span>
                    <div className="text-sm font-display text-germany-black dark:text-white">
                      {summaryData?.summary?.languageScore || 'NA'}
                    </div>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Target Intake</span>
                    <div className="text-sm font-display text-germany-black dark:text-white">{summaryData?.summary?.targetIntake || 'NA'}</div>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-[#0E121A] rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Readiness Score</span>
                    <div className="text-sm font-display text-germany-red font-black flex items-center gap-1.5">
                      <span>{summaryData?.summary?.readinessScore || 'NA'}</span>
                    </div>
                  </div>
                </div>

                {/* Advising Roadmap */}
                <div className="p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-germany-red" />
                      <h3 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
                        Study in Germany Admission Milestone Track
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {summaryData?.plan?.planName && (
                        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                          Plan: {summaryData.plan.planName}
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-gray-400">Status Overview</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {(() => {
                      const hasPurchasedPlan = Boolean(
                        summaryData?.plan?.planId ||
                        studentSubscription?.planId ||
                        student?.planName ||
                        student?.planId
                      );
                      const purchasedPlanName =
                        summaryData?.plan?.planName ||
                        studentSubscription?.plan?.name ||
                        student?.planName;

                      // Linear admission journey (ends strictly at shortlist_locked)
                      const linearMilestones = [
                        'signed_up',
                        'logged_in',
                        'profile_completed',
                        'matching_completed',
                        'shortlist_locked',
                      ];

                      const rawStatus = summaryData?.status || student?.status || 'signed_up';
                      const activeStatus = isMatchingLocked
                        ? 'shortlist_locked'
                        : rawStatus === 'plan_purchased'
                        ? 'matching_completed'
                        : rawStatus;
                      const currentIdx = linearMilestones.indexOf(activeStatus);

                      // ── Real-time Document Counts & Approval Stats (Decoupled & Non-Linear) ──
                      // 1. General Document Hub
                      const generalTotal = GENERAL_DOCUMENT_CATALOGUE.length;
                      const generalUploaded = GENERAL_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
                      const generalVerified = GENERAL_DOCUMENT_CATALOGUE.filter((cat) => findMatchingDoc(cat, distinctUploadedDocs)?.status === 'verified').length;
                      const generalRequired = GENERAL_DOCUMENT_CATALOGUE.filter((c) => c.required).length;
                      const isGeneralApproved = generalUploaded > 0 && generalVerified === generalUploaded && (generalUploaded >= generalRequired || generalUploaded === generalTotal);
                      const isGeneralUploaded = generalUploaded > 0 && !isGeneralApproved;

                      // 2. APS India
                      const apsTotal = APS_DOCUMENT_CATALOGUE.length;
                      const apsUploaded = APS_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
                      const apsVerified = APS_DOCUMENT_CATALOGUE.filter((cat) => findMatchingDoc(cat, distinctUploadedDocs)?.status === 'verified').length;
                      const apsRequired = APS_DOCUMENT_CATALOGUE.filter((c) => c.required).length;
                      const isApsApproved = apsUploaded > 0 && apsVerified === apsUploaded && (apsUploaded >= apsRequired || apsUploaded === apsTotal);
                      const isApsUploaded = apsUploaded > 0 && !isApsApproved;

                      // 3. Admission / Applications
                      const admissionTotal = ADMISSION_DOCUMENT_CATALOGUE.length;
                      const admissionUploaded = ADMISSION_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
                      const admissionVerified = ADMISSION_DOCUMENT_CATALOGUE.filter((cat) => findMatchingDoc(cat, distinctUploadedDocs)?.status === 'verified').length;
                      const admissionRequired = ADMISSION_DOCUMENT_CATALOGUE.filter((c) => c.required).length;
                      const isAdmissionApproved = admissionUploaded > 0 && admissionVerified === admissionUploaded && (admissionUploaded >= admissionRequired || admissionUploaded === admissionTotal);
                      const isAdmissionUploaded = admissionUploaded > 0 && !isAdmissionApproved;

                      // 4. Visa & Blocked Account
                      const visaTotal = VISA_DOCUMENT_CATALOGUE.length;
                      const visaUploaded = VISA_DOCUMENT_CATALOGUE.filter((cat) => Boolean(findMatchingDoc(cat, distinctUploadedDocs))).length;
                      const visaVerified = VISA_DOCUMENT_CATALOGUE.filter((cat) => findMatchingDoc(cat, distinctUploadedDocs)?.status === 'verified').length;
                      const visaRequired = VISA_DOCUMENT_CATALOGUE.filter((c) => c.required).length;
                      const isVisaApproved = visaUploaded > 0 && visaVerified === visaUploaded && (visaUploaded >= visaRequired || visaUploaded === visaTotal);
                      const isVisaUploaded = visaUploaded > 0 && !isVisaApproved;

                      const steps = [
                        { title: 'Profile Registration', stage: 'logged_in', stepNum: '01' },
                        { title: 'Profile Complete', stage: 'profile_completed', stepNum: '02' },
                        { title: 'Matching Engine', stage: 'matching_completed', stepNum: '03' },
                        { title: 'Plan / Subscription', stage: 'plan_subscription', stepNum: '04' },
                        { title: 'Shortlist Finalized', stage: 'shortlist_locked', stepNum: '05' },
                        { title: 'Document Verification', stage: 'documents', stepNum: '06', docCategory: 'general' as const },
                        { title: 'APS India Certificate', stage: 'aps', stepNum: '07', docCategory: 'aps' as const },
                        { title: 'Applications & Uni-Assist', stage: 'applications', stepNum: '08', docCategory: 'admission' as const },
                        { title: 'Visa & Blocked Account', stage: 'visa', stepNum: '09', docCategory: 'visa' as const },
                      ];

                      return steps.map((step) => {
                        // ── STEP 04: Plan / Subscription (Highlighted in Purple when purchased) ──
                        if (step.stage === 'plan_subscription') {
                          if (hasPurchasedPlan) {
                            return (
                              <div
                                key={step.title}
                                className="p-3 rounded-xl border flex flex-col justify-between gap-1 text-xs bg-purple-50/70 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800/80 shadow-xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300">
                                    Step {step.stepNum}
                                  </span>
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
                                    Purchased
                                  </span>
                                </div>
                                <div>
                                  <div className="font-extrabold text-purple-950 dark:text-purple-100 text-xs leading-tight line-clamp-1" title={purchasedPlanName || step.title}>
                                    {purchasedPlanName || step.title}
                                  </div>
                                  <div className="text-[10px] font-extrabold text-purple-700 dark:text-purple-300 truncate mt-0.5">
                                    Purchased & Active
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={step.title}
                              className="p-3 rounded-xl border flex flex-col justify-between gap-1 text-xs bg-[#F4F1EA]/60 dark:bg-[#151B27] border-[#EBE7E0] dark:border-white/5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-gray-400">
                                  Step {step.stepNum}
                                </span>
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gray-200/80 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                                  Pending
                                </span>
                              </div>
                              <div className="font-extrabold text-germany-black dark:text-white text-xs leading-tight">
                                {step.title}
                              </div>
                            </div>
                          );
                        }

                        // ── STEPS 06-09: Decoupled Document Blocks (Driven by live upload & approval status) ──
                        if (['documents', 'aps', 'applications', 'visa'].includes(step.stage)) {
                          let isApproved = false;
                          let isUploaded = false;
                          let uploadedCount = 0;
                          let verifiedCount = 0;
                          let totalCount = 0;
                          const targetCat = step.docCategory || 'general';

                          if (step.stage === 'documents') {
                            isApproved = isGeneralApproved;
                            isUploaded = isGeneralUploaded;
                            uploadedCount = generalUploaded;
                            verifiedCount = generalVerified;
                            totalCount = generalTotal;
                          } else if (step.stage === 'aps') {
                            isApproved = isApsApproved;
                            isUploaded = isApsUploaded;
                            uploadedCount = apsUploaded;
                            verifiedCount = apsVerified;
                            totalCount = apsTotal;
                          } else if (step.stage === 'applications') {
                            isApproved = isAdmissionApproved;
                            isUploaded = isAdmissionUploaded;
                            uploadedCount = admissionUploaded;
                            verifiedCount = admissionVerified;
                            totalCount = admissionTotal;
                          } else if (step.stage === 'visa') {
                            isApproved = isVisaApproved;
                            isUploaded = isVisaUploaded;
                            uploadedCount = visaUploaded;
                            verifiedCount = visaVerified;
                            totalCount = visaTotal;
                          }

                          const badgeText = isApproved
                            ? 'Approved'
                            : isUploaded
                            ? 'In Review'
                            : 'Pending';

                          const counterLabel = isApproved
                            ? `${verifiedCount}/${totalCount} Approved`
                            : isUploaded
                            ? `${uploadedCount}/${totalCount} Uploaded (${verifiedCount} Approved)`
                            : `0/${totalCount} Uploaded`;

                          return (
                            <div
                              key={step.title}
                              onClick={() => {
                                onNavigateTab('documents', targetCat);
                              }}
                              title="Click to view and verify documents in this section"
                              className={`p-3 rounded-xl border flex flex-col justify-between gap-1 text-xs cursor-pointer transition-all shadow-xs ${
                                isApproved
                                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400'
                                  : isUploaded
                                  ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 hover:border-amber-400'
                                  : 'bg-[#F4F1EA]/60 dark:bg-[#151B27] border-[#EBE7E0] dark:border-white/5 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-gray-400">
                                  Step {step.stepNum}
                                </span>
                                <span
                                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                    isApproved
                                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                                      : isUploaded
                                      ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                                      : 'bg-gray-200/80 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                  }`}
                                >
                                  {badgeText}
                                </span>
                              </div>
                              <div>
                                <div className="font-extrabold text-germany-black dark:text-white text-xs leading-tight">
                                  {step.title}
                                </div>
                                <div
                                  className={`text-[10px] font-bold mt-0.5 ${
                                    isApproved
                                      ? 'text-emerald-700 dark:text-emerald-400'
                                      : isUploaded
                                      ? 'text-amber-700 dark:text-amber-400'
                                      : 'text-gray-400 dark:text-gray-500'
                                  }`}
                                >
                                  {counterLabel}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // ── STEPS 01-03, 05: Admission Journey Sequence ──
                        let status = 'Pending';

                        if (step.stage === 'logged_in') {
                          status = 'Completed';
                        } else if (step.stage === 'profile_completed') {
                          if (currentIdx >= 2) status = 'Completed';
                          else if (currentIdx === 1) status = 'Current';
                        } else if (step.stage === 'matching_completed') {
                          if (currentIdx >= 3 || (matchingRun && matchingRun.status === 'completed')) status = 'Completed';
                          else if (currentIdx === 2) status = 'Current';
                        } else if (step.stage === 'shortlist_locked') {
                          if (isMatchingLocked || currentIdx >= 4 || rawStatus === 'shortlist_locked' || summaryData?.status === 'shortlist_locked') status = 'Completed';
                          else if (currentIdx === 3) status = 'Current';
                        }

                        const isCompleted = status === 'Completed';
                        const isCurrent = status === 'Current';

                        return (
                          <div
                            key={step.title}
                            className={`p-3 rounded-xl border flex flex-col justify-between gap-1 text-xs ${
                              isCompleted
                                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                                : isCurrent
                                ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                                : 'bg-[#F4F1EA]/60 dark:bg-[#151B27] border-[#EBE7E0] dark:border-white/5'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase text-gray-400">
                                Step {step.stepNum}
                              </span>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                  isCompleted
                                    ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                                    : isCurrent
                                    ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300'
                                    : 'bg-gray-200/80 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                {step.stage === 'shortlist_locked' && (isMatchingLocked || rawStatus === 'shortlist_locked' || summaryData?.status === 'shortlist_locked') ? 'Locked' : status}
                              </span>
                            </div>
                            <div className="font-extrabold text-germany-black dark:text-white text-xs leading-tight">
                              {step.title}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </>
            )}

            {/* Quick Consultation Jumpstart */}
            <div className="p-4 sm:p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white">
                  Action Required: {pendingDocsCount} Student Documents Pending Verification
                </h4>
                <p className="text-xs font-bold text-gray-500">
                  Verify uploaded transcripts, degree certificates, and statements of purpose to accelerate university submissions.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('documents')}
                className="neu-btn-primary py-2 px-4 text-xs font-extrabold whitespace-nowrap cursor-pointer shadow-xs"
              >
                Go to Document Hub
              </button>
            </div>
          </div>
  );
}
