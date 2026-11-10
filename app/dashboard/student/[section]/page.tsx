"use client";

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProfileCompletionGate from '@/components/ProfileCompletionGate';
import StudentStageGate from '@/components/StudentStageGate';
import { StudentDocumentHub } from '@/components/StudentDocumentHub';
import { StudentServicesHub } from '@/components/StudentServicesHub';
import AccountSettingsView from '@/components/AccountSettingsView';
import {
  Compass,
  Bookmark,
  FileText,
  CheckCircle2,
  Send,
  Plane,
  Settings,
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
  Award,
  GraduationCap,
  Layers,
  Trash2,
  Lock,
} from 'lucide-react';

const VALID_SECTIONS = [
  'matching', 'shortlist', 'documents',
  'aps', 'applications', 'visa', 'account', 'help', 'services'
];

const RESTRICTED_SECTIONS = [
  'matching', 'shortlist', 'documents',
  'aps', 'applications', 'visa'
];

interface SectionConfig {
  title: string;
  subtitle: string;
  icon: any;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  matching: {
    title: 'AI Matching Engine',
    subtitle: 'Find German universities matching your exact academic profile and career goals.',
    icon: Compass,
  },
  documents: {
    title: 'Document Hub',
    subtitle: 'Upload, manage, and verify all essential admission and visa documents.',
    icon: FileText,
  },
  aps: {
    title: 'APS India Checklist',
    subtitle: 'Step-by-step verification checklist for the mandatory APS Certificate.',
    icon: CheckCircle2,
  },
  shortlist: {
    title: 'My Shortlist',
    subtitle: 'Your selected universities and programs ready for application.',
    icon: Bookmark,
  },
  applications: {
    title: 'College Applications',
    subtitle: 'Track your Uni-Assist and direct university submissions in real-time.',
    icon: Send,
  },
  visa: {
    title: 'Visa & Relocation Support',
    subtitle: 'Blocked account setup, health insurance, and embassy appointment assistance.',
    icon: Plane,
  },
  account: {
    title: 'Account Settings',
    subtitle: 'Manage your credentials, notification preferences, and assigned counsellor.',
    icon: Settings,
  },
  services: {
    title: 'My Purchased Services',
    subtitle: 'Track your SOP, LOR, CV, Shortlisting, and Visa preparation orders, deliverables, and counselor feedback.',
    icon: Layers,
  },
};

// ── Eligibility badge helper ─────────────────────────────────────────────────
const ELIGIBILITY_STYLES: Record<string, string> = {
  ELIGIBLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CONDITIONAL: 'bg-amber-100 text-amber-700 border-amber-200',
  NEEDS_REVIEW: 'bg-blue-100 text-blue-700 border-blue-200',
  NOT_ELIGIBLE: 'bg-red-100 text-red-700 border-red-200',
};
const ELIGIBILITY_LABELS: Record<string, string> = {
  ELIGIBLE: 'Eligible',
  CONDITIONAL: 'Conditional',
  NEEDS_REVIEW: 'Needs Review',
  NOT_ELIGIBLE: 'Not Eligible',
};

function EligibilityBadge({ status }: { status: string }) {
  return (
    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${ELIGIBILITY_STYLES[status] ?? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
      {ELIGIBILITY_LABELS[status] ?? status}
    </span>
  );
}

// ── Matching Section component ────────────────────────────────────────────────
function MatchingSection() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

  const [run, setRun] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [status, setStatus] = useState<'LOADING' | 'SUBSCRIPTION_REQUIRED' | 'ACTIVE' | 'NOT_RUN'>('LOADING');
  const [isLocked, setIsLocked] = useState(false);
  const [totalMatchedCount, setTotalMatchedCount] = useState<number>(0);
  const [loadingResults, setLoadingResults] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortlistingProgId, setShortlistingProgId] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const fetchResults = async () => {
    setLoadingResults(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/matching/results`, { credentials: 'include' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Server error ${res.status}`);
      }
      const data = await res.json();
      setRun(data.run ?? null);
      setResults(data.results ?? []);
      setRecommendations(data.recommendations ?? []);
      setSubscription(data.subscription ?? null);
      setPlans(data.plans ?? []);
      setStatus(data.status || 'ACTIVE');
      setIsLocked(Boolean(data.isLocked));
      setTotalMatchedCount(data.totalMatchedCount ?? 0);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load results');
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Poll while a run is in progress
  useEffect(() => {
    if (!run || run.status === 'completed' || run.status === 'failed') return;
    const timer = setInterval(fetchResults, 3000);
    return () => clearInterval(timer);
  }, [run?.status]);

  const handleRunMatching = async () => {
    if (isLocked) return;
    setRunning(true);
    setError(null);
    setRecommendations([]);
    setResults([]);
    try {
      const res = await fetch(`${API_URL}/matching/run`, {
        method: 'POST',
        credentials: 'include',
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message ?? `Server error ${res.status}`);
      fetchResults();
    } catch (err: any) {
      setError(err.message ?? 'Failed to start matching');
      setRunning(false);
    } finally {
      setRunning(false);
    }
  };

  const handleRemoveShortlist = async (programmeId: string | number) => {
    if (isLocked) return;
    setShortlistingProgId(String(programmeId));
    try {
      const res = await fetch(`${API_URL}/student/recommendations/${programmeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 && data.message?.includes('locked')) {
          setIsLocked(true);
        }
        throw new Error(data.message ?? 'Failed to remove from shortlist');
      }
      await fetchResults();
    } catch (err: any) {
      alert(err.message ?? 'Could not remove from shortlist');
    } finally {
      setShortlistingProgId(null);
    }
  };

  const handleShortlistMatchedProgramme = async (programmeId: string | number) => {
    if (isLocked) return;
    setShortlistingProgId(String(programmeId));
    try {
      const res = await fetch(`${API_URL}/student/recommendations/shortlist-programme`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ programmeId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 && data.message?.includes('locked')) {
          setIsLocked(true);
        }
        throw new Error(data.message ?? 'Failed to shortlist programme');
      }

      await fetchResults();
    } catch (err: any) {
      alert(err.message ?? 'Could not add to shortlist');
    } finally {
      setShortlistingProgId(null);
    }
  };

  const handlePurchasePlan = async (planId: string) => {
    setCheckoutLoading(planId);
    setCheckoutError(null);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Razorpay SDK failed to load. Please check your connection.');

      const orderRes = await fetch(`${API_URL}/subscription/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId }),
      });
      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) throw new Error(orderData.message || 'Failed to initiate order');

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EuropeBridge',
        description: `${orderData.plan?.name || 'Matching Plan'} — Full Access`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            setLoadingResults(true);
            const verifyRes = await fetch(`${API_URL}/subscription/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok) throw new Error(verifyData.message || 'Payment verification failed');
            await fetchResults();
          } catch (err: any) {
            setCheckoutError(err.message || 'Payment verification failed. Please contact support.');
          } finally {
            setLoadingResults(false);
          }
        },
        modal: {
          ondismiss: function () {
            setCheckoutLoading(null);
          },
        },
        theme: {
          color: '#DE0000',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setCheckoutError(err.message || 'Failed to start payment checkout');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const isRunning = run?.status === 'running' || run?.status === 'pending' || running;
  const eligibleResults = results.filter((r: any) => r.eligibilityStatus !== 'NOT_ELIGIBLE');

  // Shortlist counts
  const shortlistedItems = recommendations.filter((r) => r.status && r.status !== 'recommended');
  const maxShortlistCount = subscription?.maxShortlistCount ?? 3;
  const maxDisplayCount = subscription?.maxDisplayCount ?? 5;
  const isShortlistFull = shortlistedItems.length >= maxShortlistCount;

  return (
    <div className="space-y-6">
      {/* Action & Subscription Status Bar */}
      <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
              {run?.status === 'completed'
                ? `Last automated scan: ${new Date(run.completed_at || run.created_at).toLocaleDateString()} — ${run.candidates_evaluated ?? 0} evaluated (${run.results_generated ?? totalMatchedCount ?? results.length} matches found)`
                : run?.status === 'running' || run?.status === 'pending'
                ? 'Matching scan in progress…'
                : 'Evaluate your academic profile across all accredited German university programmes.'}
            </p>
            {subscription?.status === 'ACTIVE' && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">
                {subscription.plan?.name || 'Active Plan'} ({maxDisplayCount} Shown / {maxShortlistCount} Shortlist)
              </span>
            )}
            {isLocked && status === 'SUBSCRIPTION_REQUIRED' ? (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 flex items-center gap-1">
                🔒 Plan Required to Re-run
              </span>
            ) : isLocked ? (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800/60 flex items-center gap-1">
                🔒 Shortlist Locked
              </span>
            ) : null}
          </div>
          {run?.status === 'failed' && (
            <p className="text-[11px] text-red-600 dark:text-red-400 font-medium mt-0.5">Last automated run timed out. You can re-run below.</p>
          )}
          {isLocked && status === 'SUBSCRIPTION_REQUIRED' ? (
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
              Matching engine scan complete. Select a matching plan below to unlock your full programme results and re-running.
            </p>
          ) : isLocked ? (
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold mt-0.5">
              Your Germany admissions counsellor has reviewed and locked your shortlist. Matching re-runs are disabled.
            </p>
          ) : null}
        </div>
        <button
          id="run-matching-btn"
          onClick={handleRunMatching}
          disabled={running || isLocked}
          title={
            isLocked && status === 'SUBSCRIPTION_REQUIRED'
              ? 'Select a matching plan below to unlock re-running the engine'
              : isLocked
              ? 'Matching and shortlist are locked by your counsellor'
              : undefined
          }
          className={`flex items-center gap-2 py-2.5 px-5 text-xs font-extrabold rounded-xl shadow-xs transition-colors shrink-0 ${
            isLocked
              ? 'bg-purple-100 text-purple-700 border border-purple-300 cursor-not-allowed opacity-80'
              : 'bg-germany-red hover:bg-[#D62839] disabled:opacity-50 text-white cursor-pointer disabled:cursor-not-allowed'
          }`}
        >
          {isLocked ? (
            <><Lock className="w-3.5 h-3.5 text-purple-700" /> Shortlist Locked</>
          ) : running ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting…</>
          ) : run?.status === 'running' || run?.status === 'pending' ? (
            <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Re-start Matching</>
          ) : run?.status === 'completed' ? (
            <><RefreshCw className="w-3.5 h-3.5" /> Re-run Matching</>
          ) : (
            <><Compass className="w-3.5 h-3.5" /> Run Matching Engine</>
          )}
        </button>
      </div>

      {/* Shortlist Locked Callout Banner */}
      {isLocked && status !== 'SUBSCRIPTION_REQUIRED' && (
        <div className="neu-card p-4 bg-purple-50/90 border border-purple-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-purple-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-200/80 text-purple-800 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-purple-800" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-purple-800">
                Shortlist &amp; Matching Finalized by Your Advisor
              </p>
              <p className="text-xs text-purple-700 font-medium">
                Your application programmes are locked for processing. All modifications and matching re-runs are disabled.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/student/shortlist"
            className="text-xs font-black px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white shadow-xs shrink-0 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>View Locked Shortlist</span>
          </Link>
        </div>
      )}

      {/* Global Error Banner */}
      {error && (
        <div className="neu-card p-4 bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-xs font-bold text-red-700">{error}</p>
          <button onClick={fetchResults} className="ml-auto text-xs font-extrabold text-red-700 underline cursor-pointer">Retry</button>
        </div>
      )}

      {/* Checkout Error Banner */}
      {checkoutError && (
        <div className="neu-card p-4 bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-xs font-bold text-red-700">{checkoutError}</p>
          <button onClick={() => setCheckoutError(null)} className="ml-auto text-xs font-extrabold text-red-700 underline cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Loading state */}
      {(loadingResults || isRunning) && !error && (
        <div className="neu-card p-10 bg-white text-center space-y-3 animate-pulse">
          <Loader2 className="w-8 h-8 text-germany-red mx-auto animate-spin" />
          <p className="text-xs font-bold text-gray-400">
            {isRunning ? 'Running the matching engine across all German programmes…' : 'Loading matching recommendations…'}
          </p>
        </div>
      )}

      {/* ========================================================
          SUBSCRIPTION GATED BLOCKER (Before Payment)
      ======================================================== */}
      {!loadingResults && !isRunning && status === 'SUBSCRIPTION_REQUIRED' && (
        <div className="space-y-6">
          <div className="neu-card p-6 sm:p-8 bg-gradient-to-br from-white via-[#FCFBF9] to-red-50/30 dark:from-[#111622] dark:via-[#0E121A] dark:to-red-950/20 border-2 border-germany-red/40 dark:border-germany-red/40 rounded-3xl space-y-6 relative overflow-hidden shadow-sm">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-germany-red bg-red-100/80 px-3 py-1 rounded-full border border-germany-red/20 inline-flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-germany-red" />
                Admission Matching Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black dark:text-white font-display tracking-tight">
                Unlock Your Tailored German University Programmes
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                {totalMatchedCount > 0
                  ? `Your profile has been evaluated against accredited German universities, and ${totalMatchedCount} potential programmes were identified. Select a matching plan to unlock your curated university list and build your application shortlist.`
                  : 'Select an admission matching plan to unlock your curated programme list, advisor review, and shortlisting tools.'}
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {plans.map((p) => {
                const isPopular = p.popular || p.id === 'PLAN_2';
                return (
                  <div
                    key={p.id}
                    className={`neu-card p-6 flex flex-col justify-between rounded-2xl bg-white border-2 transition-all relative ${
                      isPopular
                        ? 'border-germany-red shadow-md ring-2 ring-germany-red/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 right-6 px-3 py-0.5 bg-germany-red text-white text-[9px] font-black uppercase tracking-wider rounded-full shadow-xs">
                        Most Popular
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                          {p.subtitle || p.name}
                        </span>
                        <h3 className="text-lg font-black font-display text-germany-black dark:text-white mt-1">
                          {p.name}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-germany-black dark:text-white font-display">
                            ₹{p.priceInr.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] font-bold text-gray-400">/ one-time</span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium mt-1 leading-snug">
                          {p.description}
                        </p>
                      </div>

                      {/* Enforceable Limits Callout */}
                      <div className="p-3 bg-[#FDFBF7] dark:bg-[#151B27] border border-[#EBE7E0] dark:border-gray-800 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between items-center text-germany-black dark:text-gray-200 font-extrabold">
                          <span>Programmes Shown:</span>
                          <span className="text-germany-red">{p.maxDisplayCount} max</span>
                        </div>
                        <div className="flex justify-between items-center text-germany-black dark:text-gray-200 font-extrabold">
                          <span>Shortlist Capacity:</span>
                          <span className="text-emerald-700">{p.maxShortlistCount} max</span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 text-[11px] text-gray-600 dark:text-gray-300 font-medium pt-1">
                        {p.features?.map((f: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handlePurchasePlan(p.id)}
                        disabled={checkoutLoading !== null}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs ${
                          isPopular
                            ? 'bg-germany-red hover:bg-[#D62839] text-white'
                            : 'bg-germany-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-germany-black text-white'
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                      >
                        {checkoutLoading === p.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Opening Checkout…</span>
                          </>
                        ) : (
                          <>
                            <span>Select {p.name.split('—')[0].trim()}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] font-bold text-gray-400">
                🔒 Secured by Razorpay 256-bit encryption • Direct instant access upon bank verification
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No run yet */}
      {!loadingResults && !isRunning && !error && (status === 'NOT_RUN' || (!run && eligibleResults.length === 0)) && (
        <div className="neu-card p-10 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 text-center space-y-3">
          <Compass className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="font-display text-base text-germany-black">Run Matching to Discover Programmes</h3>
          <p className="text-xs font-medium text-gray-500 max-w-sm mx-auto">
            The engine will evaluate your profile against thousands of German university programmes and rank eligible ones for you.
          </p>
        </div>
      )}

      {/* Completed with 0 results */}
      {!loadingResults && !isRunning && !error && status === 'ACTIVE' && run?.status === 'completed' && eligibleResults.length === 0 && (
        <div className="neu-card p-6 sm:p-8 bg-white border border-[#EBE7E0] rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-germany-red/10 text-germany-red border border-germany-red/20">
                Admissions Team in Action
              </span>
              <h3 className="font-display text-base sm:text-lg text-germany-black font-bold leading-tight">
                Our Germany Specialists are Handpicking Programmes for You
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Because German universities have specific faculty criteria, our senior admissions counsellors are personally evaluating your profile to match you with specialized programs, pathway options, and strategic partner universities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Active Paid Curated Results Grid */}
      {!loadingResults && !isRunning && status === 'ACTIVE' && eligibleResults.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="border-t border-[#EBE7E0] dark:border-gray-800 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base text-germany-black dark:text-white font-bold">
                  Curated Matching Programmes ({eligibleResults.length})
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  Plan Limit: Max {maxDisplayCount} Displayed
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Top eligible programmes selected for your degree focus and academic background
              </p>
            </div>

            <div className="text-right text-xs font-bold text-gray-500">
              Shortlist status: <span className="font-black text-germany-black">{shortlistedItems.length}</span> / {maxShortlistCount}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {eligibleResults.map((r: any) => {
              const progId = r.programmeId || r.id;
              const isAlreadyShortlisted = recommendations.some(
                (rec) => String(rec.programmeId) === String(progId) && rec.status !== 'recommended',
              );

              return (
                <div
                  key={r.id}
                  className={`neu-card p-5 space-y-4 hover:-translate-y-1 transition-all border relative overflow-hidden ${
                    isAlreadyShortlisted
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : isLocked
                      ? 'bg-gray-50/60 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 opacity-75'
                      : 'bg-white dark:bg-[#111622] border-gray-200/80 dark:border-gray-800'
                  }`}
                >
                  {isAlreadyShortlisted && (
                    <div className="absolute top-0 right-0 px-3 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white rounded-bl-xl shadow-xs flex items-center gap-1 z-10">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Shortlisted</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">
                        #{r.rank} • {r.universityType ?? 'University'}
                      </span>
                      <h3 className="font-display text-sm text-germany-black dark:text-white leading-tight whitespace-normal break-words">{r.universityName}</h3>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-300 leading-snug">{r.programName}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{r.degree}</p>
                    </div>
                    <EligibilityBadge status={r.eligibilityStatus} />
                  </div>

                  {/* Key facts */}
                  <div className="text-[11px] text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>📍 {[r.city, r.country].filter(Boolean).join(', ') || 'NA'}</span>
                      <span className="font-extrabold text-germany-black dark:text-white">{r.tuitionPerSemester ?? 'NA'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🌐 {r.language ?? 'NA'}</span>
                      <span>⏰ {r.nonEuDeadline ?? 'NA'}</span>
                    </div>
                  </div>

                  {/* Matched reasons */}
                  {r.matchedReasons?.length > 0 && (
                    <div className="pt-2 border-t border-[#EBE7E0]">
                      <p className="text-[10px] font-extrabold text-emerald-700 mb-1">✓ Why it matched</p>
                      <ul className="space-y-0.5">
                        {r.matchedReasons.slice(0, 2).map((reason: string, i: number) => (
                          <li key={i} className="text-[10px] text-gray-600 truncate">• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Gaps/missing */}
                  {r.requirementGaps?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-extrabold text-amber-700 mb-1">⚠ Gaps</p>
                      <ul className="space-y-0.5">
                        {r.requirementGaps.slice(0, 2).map((gap: string, i: number) => (
                          <li key={i} className="text-[10px] text-gray-500 truncate">• {gap}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {r.gpaFallbackUsed && (
                    <p className="text-[10px] text-gray-400 italic">GPA: platform fallback (≤ 3.0) applied</p>
                  )}

                  {/* Action row: Website + Shortlist */}
                  <div className="pt-2 border-t border-[#EBE7E0] flex items-center justify-between gap-2">
                    {r.programUrl ? (
                      <a
                        href={r.programUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-extrabold text-germany-red hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" /> Website
                      </a>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-medium">Public Uni</span>
                    )}

                    {isAlreadyShortlisted ? (
                      <button
                        type="button"
                        onClick={() => handleRemoveShortlist(progId)}
                        disabled={shortlistingProgId === String(progId) || isLocked}
                        title={isLocked ? 'Shortlist is locked by your counsellor' : 'Click to remove from shortlist'}
                        className={`flex items-center gap-1.5 text-[11px] font-extrabold py-1.5 px-3 rounded-xl shadow-xs transition-colors ${
                          isLocked
                            ? 'bg-emerald-600/80 text-white cursor-not-allowed opacity-90'
                            : 'text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                        }`}
                      >
                        {shortlistingProgId === String(progId) ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : isLocked ? (
                          <Lock className="w-3 h-3 text-white" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        )}
                        <span>{isLocked ? 'Shortlisted (Locked)' : 'Shortlisted'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleShortlistMatchedProgramme(progId)}
                        disabled={shortlistingProgId === String(progId) || isLocked || isShortlistFull}
                        title={
                          isLocked
                            ? 'Shortlist is locked by your counsellor'
                            : isShortlistFull
                            ? `Shortlist limit of ${maxShortlistCount} reached for your plan`
                            : undefined
                        }
                        className={`flex items-center gap-1.5 text-[11px] font-extrabold py-1.5 px-3 rounded-xl shadow-xs transition-colors ${
                          isLocked
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                            : 'text-white bg-germany-black hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {shortlistingProgId === String(progId) ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : isLocked ? (
                          <Lock className="w-3 h-3 text-gray-400" />
                        ) : (
                          <Bookmark className="w-3 h-3 text-germany-gold" />
                        )}
                        <span>{isLocked ? 'Locked' : isShortlistFull ? 'Shortlist Full' : 'Shortlist'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shortlist Section component ──────────────────────────────────────────────
function ShortlistSection() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
  const [items, setItems] = useState<any[]>([]);
  const [subInfo, setSubInfo] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchShortlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const [recRes, matchRes] = await Promise.all([
        fetch(`${API_URL}/student/recommendations`, { credentials: 'include' }),
        fetch(`${API_URL}/matching/results`, { credentials: 'include' }),
      ]);
      if (!recRes.ok) throw new Error('Failed to load shortlist');
      const recData = await recRes.json();
      setItems(Array.isArray(recData) ? recData : []);

      if (matchRes.ok) {
        const matchData = await matchRes.json();
        setSubInfo(matchData.subscription || null);
        setIsLocked(Boolean(matchData.isLocked));
      }
    } catch (err: any) {
      setError(err.message ?? 'Failed to load shortlist');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShortlist = async (recId: string) => {
    if (isLocked) return;
    setDeletingId(recId);
    try {
      const res = await fetch(`${API_URL}/student/recommendations/${recId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 && data.message?.includes('locked')) {
          setIsLocked(true);
        }
        throw new Error(data.message ?? 'Failed to remove from shortlist');
      }

      await fetchShortlist();
    } catch (err: any) {
      alert(err.message ?? 'Could not remove from shortlist');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchShortlist();
  }, []);

  const shortlistedItems = items.filter((i) => i.status !== 'recommended');
  const maxShortlistCount = subInfo?.maxShortlistCount ?? 3;
  const allItems = items;

  return (
    <div className="space-y-5">
      {/* Shortlist Header & Limits */}
      <div className="neu-card p-5 bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-base text-germany-black dark:text-white font-bold">Your University Shortlist</h3>
            {subInfo?.status === 'ACTIVE' && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                Plan Capacity: {shortlistedItems.length} / {maxShortlistCount} Shortlisted
              </span>
            )}
            {isLocked && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
                🔒 Locked by Counsellor
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-gray-500 mt-1">
            {isLocked
              ? 'Your shortlist is finalized and locked for university applications.'
              : shortlistedItems.length > 0
              ? `${shortlistedItems.length} programme${shortlistedItems.length > 1 ? 's' : ''} currently saved in your active application shortlist (max ${maxShortlistCount}).`
              : 'Add programmes from your Matching Engine tab to build your application shortlist.'}
          </p>
        </div>
        <Link
          href="/dashboard/student/matching"
          className="neu-btn-primary py-2 px-4 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Matches &amp; Recommendations</span>
        </Link>
      </div>

      {loading && (
        <div className="neu-card p-10 bg-white text-center space-y-3 animate-pulse">
          <Loader2 className="w-8 h-8 text-germany-red mx-auto animate-spin" />
          <p className="text-xs font-bold text-gray-400">Loading shortlist…</p>
        </div>
      )}

      {error && (
        <div className="neu-card p-4 bg-red-50 border border-red-200 flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-red-700">{error}</p>
          <button onClick={fetchShortlist} className="text-xs font-extrabold text-red-700 underline cursor-pointer">Retry</button>
        </div>
      )}

      {!loading && !error && allItems.length === 0 && (
        <div className="neu-card p-10 bg-white text-center space-y-3">
          <Bookmark className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="font-display text-base text-germany-black">No Shortlisted Programmes Yet</h3>
          <p className="text-xs font-medium text-gray-500 max-w-sm mx-auto">
            Browse through programmes recommended by your counsellor or discover options via the AI Matching Engine.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/student/matching"
              className="neu-btn-primary py-2.5 px-5 text-xs font-extrabold inline-flex items-center gap-2"
            >
              <span>Go to Matching Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && allItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {allItems.map((rec: any) => (
            <div
              key={rec.id}
              className="neu-card p-5 bg-white dark:bg-[#111622] space-y-4 hover:-translate-y-1 transition-transform border border-[#EBE7E0] dark:border-gray-800 relative"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0 pr-2">
                  <span className="text-[10px] font-extrabold text-germany-red uppercase tracking-wider">
                    {rec.universityType || rec.type || 'Public University'}
                  </span>
                  <h3 className="font-display text-sm text-germany-black leading-tight whitespace-normal break-words">
                    {rec.universityName || rec.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-700 leading-snug">
                    {rec.programName || rec.program}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">{rec.degree || 'Master of Science'}</p>
                </div>
                {isLocked ? (
                  <span
                    title="Shortlist is locked by your counsellor"
                    className="p-1.5 text-purple-600 bg-purple-50 rounded-lg border border-purple-200 cursor-not-allowed shrink-0"
                  >
                    <Lock className="w-3.5 h-3.5 text-purple-600" />
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDeleteShortlist(rec.id)}
                    disabled={deletingId === rec.id}
                    title="Remove from shortlist"
                    className="p-1.5 text-gray-400 hover:text-germany-red hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    {deletingId === rec.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-germany-red" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              <div className="text-[11px] text-gray-500 space-y-1 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EBE7E0]">
                <div className="flex justify-between">
                  <span>📍 {rec.location || 'Germany'}</span>
                  <span className="font-extrabold text-germany-black">{rec.tuitionPerSemester || rec.tuition || '€0 / sem'}</span>
                </div>
                <div className="flex justify-between">
                  <span>⏰ Deadline: {rec.nonEuDeadline || rec.deadline || 'July 15, 2026'}</span>
                </div>
              </div>

              {rec.notes && (
                <div className="p-2.5 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 italic">
                  Advisor: &quot;{rec.notes}&quot;
                </div>
              )}

              <div className="pt-2 border-t border-[#EBE7E0] flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  {rec.status.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400">
                    {rec.counsellorName ? `Recommended by ${rec.counsellorName}` : 'Counsellor Selected'}
                  </span>
                  {isLocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-black text-purple-700 bg-purple-100/70 border border-purple-200 px-2 py-0.5 rounded-md">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDeleteShortlist(rec.id)}
                      disabled={deletingId === rec.id}
                      title="Remove from shortlist"
                      className="flex items-center gap-1 text-[11px] font-extrabold text-red-600 hover:text-red-700 hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{deletingId === rec.id ? 'Removing…' : 'Remove'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StudentSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = use(params);
  const section = resolvedParams.section;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const config = SECTION_CONFIGS[section] || {
    title: section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: `Manage your ${section}`,
    icon: Compass,
  };

  const Icon = config.icon;
  const isRestricted = RESTRICTED_SECTIONS.includes(section);
  const [completionPercentage, setCompletionPercentage] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [gates, setGates] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(isRestricted);

  useEffect(() => {
    if (!isRestricted) return;

    const checkProfileStatus = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
        const res = await fetch(`${API_URL}/student/profile`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          const pct = typeof data.completionPercentage === 'number' ? data.completionPercentage : 0;
          setCompletionPercentage(pct);
          if (data.firstName) setUserName(data.firstName);
          if (data.gates) setGates(data.gates);
        } else {
          setCompletionPercentage(0);
        }
      } catch (err) {
        console.error('Failed to load profile for section check:', err);
        setCompletionPercentage(0);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfileStatus();
  }, [isRestricted]);

  return (
    <div className="space-y-6">
      {/* Loading Skeleton */}
      {isRestricted && isLoading && (
        <div className="neu-card p-10 bg-white dark:bg-[#111622] text-center space-y-3 animate-pulse">
          <div className="w-10 h-10 bg-[#EBE7E0] dark:bg-gray-800 rounded-full mx-auto" />
          <p className="text-xs font-bold text-gray-400">Loading your profile status...</p>
        </div>
      )}

      {/* Profile incomplete gate */}
      {isRestricted && !isLoading && completionPercentage !== null && completionPercentage < 100 && (
        <ProfileCompletionGate
          sectionTitle={config.title}
          completionPercentage={completionPercentage}
          userName={userName}
        />
      )}

      {/* Section content (only shown if unlocked) */}
      {(!isRestricted || (!isLoading && completionPercentage !== null && completionPercentage >= 100)) && (
        <>
          {section === 'matching' && <MatchingSection />}
          {section === 'shortlist' && (
            gates && !gates.shortlistUnlocked ? (
              !gates.hasMatchingRun ? (
                <StudentStageGate type="shortlist_matching_needed" userName={userName} />
              ) : (
                <StudentStageGate type="shortlist_plan_needed" userName={userName} />
              )
            ) : (
              <ShortlistSection />
            )
          )}
          {section === 'documents' && (
            gates && !gates.documentsUnlocked ? (
              !gates.hasActivePlan ? (
                <StudentStageGate type="documents_plan_needed" userName={userName} />
              ) : (
                <StudentStageGate type="documents_lock_needed" userName={userName} />
              )
            ) : (
              <StudentDocumentHub />
            )
          )}
          {section === 'services' && <StudentServicesHub />}
          {section === 'account' && <AccountSettingsView forcedRole='student' />}
          {!['matching', 'shortlist', 'documents', 'aps', 'services', 'account'].includes(section) && (
            <div className="neu-card p-8 bg-white dark:bg-[#111622] text-center space-y-4">
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="font-display text-xl text-germany-black dark:text-white">{config.title} Module</h3>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  This module is actively synced with your student records. You can update your details or schedule a consultation with your assigned Germany advisor.
                </p>
                <div className="pt-2">
                  <button className="neu-btn-primary py-2.5 px-5 text-xs font-extrabold mx-auto">
                    Update {config.title}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
