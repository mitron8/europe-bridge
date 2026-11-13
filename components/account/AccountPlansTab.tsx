"use client";

import React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Loader2,
  Lock,
} from 'lucide-react';

export interface AdmissionPlan {
  id: string;
  name: string;
  subtitle: string;
  priceInr: number;
  maxDisplayCount: number;
  maxShortlistCount: number;
  features: string[];
  popular?: boolean;
}

interface AccountPlansTabProps {
  isSubscriptionActive: boolean;
  subscriptionStatus: any;
  activePlanId: string | null;
  checkoutSuccess: string | null;
  checkoutError: string | null;
  loadingSubscription: boolean;
  plans: AdmissionPlan[];
  checkoutLoading: string | null;
  onPurchasePlan: (planId: string) => void;
}

export function AccountPlansTab({
  isSubscriptionActive,
  subscriptionStatus,
  activePlanId,
  checkoutSuccess,
  checkoutError,
  loadingSubscription,
  plans,
  checkoutLoading,
  onPurchasePlan,
}: AccountPlansTabProps) {
  return (
    <div className="space-y-6">
      {/* Current Membership Card */}
      <div className="bg-white dark:bg-[#111622] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Current Membership Status
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <h2 className="text-xl font-black text-germany-black dark:text-white">
                {isSubscriptionActive
                  ? subscriptionStatus?.plan?.name || subscriptionStatus?.activePlan?.name || subscriptionStatus?.planId || 'Active Admission Plan'
                  : 'Free Explorer Tier'}
              </h2>
              <span
                className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  isSubscriptionActive
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {isSubscriptionActive ? 'Purchased & Locked' : 'No Plan Purchased'}
              </span>
            </div>
          </div>

          {isSubscriptionActive && (
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Display: <strong className="text-germany-red">{subscriptionStatus?.maxDisplayCount || 5}</strong> matches &bull; Shortlist: <strong className="text-blue-600">{subscriptionStatus?.maxShortlistCount || 3}</strong> max
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                Plan Status: <strong className="text-emerald-600 font-bold">Active for Current Application Cycle</strong>
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
          {isSubscriptionActive
            ? 'Your active plan is locked in for your German admission cycle. It unlocks full Matching Engine results, counsellor curation, university shortlist locking, and Document Hub access.'
            : 'Activate an official admission plan to evaluate your academic profile across all 16 German federal states, curate your university shortlist, and upload verified documents.'}
        </p>
      </div>

      {/* Feedback alerts */}
      {checkoutSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{checkoutSuccess}</span>
        </div>
      )}

      {checkoutError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-germany-red shrink-0" />
          <span>{checkoutError}</span>
        </div>
      )}

      {/* Information banner when a plan is already active */}
      {isSubscriptionActive && (
        <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-3">
          <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Your plan is purchased and locked in:</strong> You are currently enrolled in{' '}
            <strong>{subscriptionStatus?.plan?.name || subscriptionStatus?.activePlan?.name || activePlanId}</strong>. Other packages are locked and grayed out to safeguard your current admission shortlist and assigned counsellor review.
          </span>
        </div>
      )}

      {/* Available Admission Plans Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-germany-black dark:text-white uppercase tracking-wider">
          {isSubscriptionActive ? 'Admission Matching Packages (Locked for Current Cycle)' : 'Available Admission Matching Packages'}
        </h3>

        {loadingSubscription ? (
          <div className="p-8 text-center bg-white dark:bg-[#111622] rounded-2xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-germany-red" />
            <span>Loading available admission plans...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((p) => {
              const isCurrent = isSubscriptionActive && activePlanId === p.id;
              const isOtherLocked = isSubscriptionActive && !isCurrent;
              const isProcessing = checkoutLoading === p.id;

              return (
                <div
                  key={p.id}
                  className={`rounded-2xl p-6 transition-all flex flex-col justify-between relative ${
                    isCurrent
                      ? 'bg-white dark:bg-[#111622] border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : isOtherLocked
                      ? 'bg-gray-50/70 dark:bg-gray-900/30 border border-dashed border-gray-300 dark:border-gray-800 opacity-40 grayscale select-none'
                      : p.popular
                      ? 'bg-white dark:bg-[#111622] border-germany-red ring-1 ring-germany-red/30 shadow-sm'
                      : 'bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 hover:border-gray-300'
                  }`}
                >
                  {/* Active / Popular Badges */}
                  {isCurrent ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>Purchased Plan (Active)</span>
                    </div>
                  ) : p.popular && !isSubscriptionActive ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-germany-red text-white shadow-2xs">
                      Most Popular
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-black text-germany-black dark:text-white">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                        {p.subtitle}
                      </p>
                    </div>

                    <div className="border-t border-b border-gray-100 dark:border-gray-800/80 py-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-germany-black dark:text-white">
                          ₹{p.priceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">/ complete cycle</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                        Up to <strong>{p.maxDisplayCount}</strong> matched programmes &bull; <strong>{p.maxShortlistCount}</strong> university shortlists
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {p.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-germany-red shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      disabled={isCurrent || isOtherLocked || !!checkoutLoading}
                      onClick={() => !isOtherLocked && onPurchasePlan(p.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isCurrent
                          ? 'bg-emerald-600 text-white shadow-xs cursor-default'
                          : isOtherLocked
                          ? 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed'
                          : p.popular
                          ? 'bg-germany-red hover:bg-red-700 text-white shadow-xs cursor-pointer'
                          : 'bg-germany-black hover:bg-gray-800 text-white dark:bg-white dark:text-germany-black dark:hover:bg-gray-100 shadow-xs cursor-pointer'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Opening Razorpay...</span>
                        </>
                      ) : isCurrent ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Your Purchased Plan</span>
                        </>
                      ) : isOtherLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Plan Locked</span>
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4" />
                          <span>Choose &amp; Activate Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Purchased Individual Services Link */}
      <div className="p-6 bg-[#faf8f3] dark:bg-[#151B27] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-germany-black dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-germany-red" />
            <span>Specialized Document &amp; Visa Services</span>
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Need individual SOP writing, Europass CV drafting, LOR editing, or German visa assistance?
          </p>
        </div>
        <Link
          href="/dashboard/student/services"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#111622] text-germany-black dark:text-white border border-gray-200 dark:border-gray-700 hover:border-gray-400 transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-center"
        >
          <span>View Purchased Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
