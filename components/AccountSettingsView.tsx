"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  Award,
  Check,
  ArrowRight,
  Loader2,
  RefreshCw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { loadRazorpayScript } from '@/lib/servicesPayment';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface AccountSettingsViewProps {
  forcedRole?: 'student' | 'counsellor' | 'admin' | 'superadmin' | 'marketing';
}

interface SubscriptionPlan {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  maxDisplayCount: number;
  maxShortlistCount: number;
  priceInr: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

export default function AccountSettingsView({ forcedRole }: AccountSettingsViewProps) {
  const { user, setUser, checkAuth } = useAppStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'plans'>('profile');

  const role = forcedRole || (user?.role as any) || 'student';
  const isStudent = role === 'student';

  // Profile Form State
  const [firstName, setFirstName] = useState(user?.firstName || user?.first_name || '');
  const [lastName, setLastName] = useState(user?.lastName || user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password / Security Form State
  const [loadingSecurity, setLoadingSecurity] = useState(true);
  const [hasPassword, setHasPassword] = useState<boolean>(user?.hasPassword ?? false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(user?.isGoogleUser ?? false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);

  // Student Subscription & Plans State
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  // Initialize / Sync user details when auth data loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || user.first_name || '');
      setLastName(user.lastName || user.last_name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      if (user.hasPassword !== undefined) {
        setHasPassword(Boolean(user.hasPassword));
        setLoadingSecurity(false);
      }
      if (user.isGoogleUser !== undefined) {
        setIsGoogleUser(Boolean(user.isGoogleUser));
      }
    }
  }, [user]);

  // Fetch full user details from /auth/me on mount to ensure fresh state
  const refreshUserData = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFirstName(data.user.firstName || data.user.first_name || '');
          setLastName(data.user.lastName || data.user.last_name || '');
          setEmail(data.user.email || '');
          setPhone(data.user.phone || '');
          setHasPassword(Boolean(data.user.hasPassword));
          setIsGoogleUser(Boolean(data.user.isGoogleUser));
        }
      }
    } catch {
      // Ignore background refresh errors
    } finally {
      setLoadingSecurity(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  // Fetch subscription plans & status for students
  const fetchSubscriptionData = async () => {
    if (!isStudent) return;
    setLoadingSubscription(true);
    try {
      const [plansRes, statusRes] = await Promise.all([
        fetch(`${API_URL}/subscription/plans`, { credentials: 'include' }),
        fetch(`${API_URL}/subscription/status`, { credentials: 'include' }),
      ]);

      if (plansRes.ok) {
        const plansData = await plansRes.json();
        setPlans(plansData || []);
      }

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setSubscriptionStatus(statusData);
      }
    } catch {
      // Ignore error
    } finally {
      setLoadingSubscription(false);
    }
  };

  useEffect(() => {
    if (isStudent) {
      fetchSubscriptionData();
    }
  }, [isStudent]);

  // Handle Profile Update
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(null);
    setProfileError(null);

    try {
      const res = await fetch(`${API_URL}/auth/account`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update account details.');
      }

      setProfileSuccess('Account details saved successfully! Email and phone are synchronized with your profile.');
      if (data.user) {
        setUser(data.user);
      }
      setTimeout(() => setProfileSuccess(null), 5000);
    } catch (err: any) {
      setProfileError(err.message || 'An error occurred while updating your account.');
    } finally {
      setProfileSaving(false);
    }
  };

  // Handle Password Set / Change
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySaving(true);
    setSecuritySuccess(null);
    setSecurityError(null);

    if (newPassword.length < 6) {
      setSecurityError('New password must be at least 6 characters long.');
      setSecuritySaving(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError('New password and confirm password do not match.');
      setSecuritySaving(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: hasPassword ? currentPassword : undefined,
          newPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update password.');
      }

      setSecuritySuccess(data.message || 'Password updated successfully!');
      setHasPassword(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSecuritySuccess(null), 5000);
    } catch (err: any) {
      setSecurityError(err.message || 'An error occurred while setting your password.');
    } finally {
      setSecuritySaving(false);
    }
  };

  // Handle Razorpay Plan Purchase
  const handlePurchasePlan = async (planId: string) => {
    setCheckoutLoading(planId);
    setCheckoutError(null);
    setCheckoutSuccess(null);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Payment gateway failed to load. Please check your internet connection.');
      }

      const orderRes = await fetch(`${API_URL}/subscription/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId }),
      });

      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) {
        throw new Error(orderData.message || 'Failed to initiate plan order.');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EuropeBridge',
        description: `${orderData.plan?.name || 'Admission Plan'} — Membership`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            setCheckoutLoading(planId);
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
            if (!verifyRes.ok) {
              throw new Error(verifyData.message || 'Payment verification failed.');
            }

            setCheckoutSuccess('Plan activated successfully! Your admission benefits and shortlist limits are now active.');
            await fetchSubscriptionData();
            setTimeout(() => setCheckoutSuccess(null), 6000);
          } catch (err: any) {
            setCheckoutError(err.message || 'Payment verification failed. Please contact support.');
          } finally {
            setCheckoutLoading(null);
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
      setCheckoutError(err.message || 'Failed to start payment checkout.');
      setCheckoutLoading(null);
    }
  };

  // Determine active plan correctly whether returned at root (statusData.planId) or nested
  const activePlanId = subscriptionStatus?.planId || subscriptionStatus?.subscription?.plan_id || subscriptionStatus?.subscription?.planId;
  const isSubscriptionActive = subscriptionStatus?.status === 'ACTIVE' || subscriptionStatus?.subscription?.status === 'ACTIVE';

  const roleLabels: Record<string, string> = {
    student: 'Student Account',
    counsellor: 'German Education Advisor',
    admin: 'Platform Administrator',
    superadmin: 'Super Administrator',
    marketing: 'Marketing Executive',
    finance: 'Finance & Compliance',
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-germany-black dark:text-white tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal profile, linked credentials, password security, and active memberships.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 self-start sm:self-center">
          <ShieldCheck className="w-3.5 h-3.5 text-germany-red" />
          <span>{roleLabels[role] || 'User Account'}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'text-gray-600 dark:text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile &amp; Contact</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
              : 'text-gray-600 dark:text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Password &amp; Security</span>
          {!hasPassword && !loadingSecurity && (
            <span className="w-2 h-2 rounded-full bg-amber-500" title="Password not set" />
          )}
        </button>

        {isStudent && (
          <button
            type="button"
            onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'plans'
                ? 'bg-germany-black text-white dark:bg-white dark:text-germany-black shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-germany-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Membership &amp; Plans</span>
            {isSubscriptionActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Plan" />
            )}
          </button>
        )}
      </div>

      {/* TAB 1: Profile & Contact */}
      {activeTab === 'profile' && (
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

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
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
      )}

      {/* TAB 2: Password & Security */}
      {activeTab === 'security' && (
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

              <form onSubmit={handleSavePassword} className="space-y-4 max-w-xl">
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
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
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
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter strong new password"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#151B27] border border-gray-200 dark:border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-germany-black dark:text-white focus:outline-none focus:border-germany-red focus:bg-white dark:focus:bg-[#111622] transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
      )}

      {/* TAB 3: Membership & Plans (Student Only) */}
      {isStudent && activeTab === 'plans' && (
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
                          onClick={() => !isOtherLocked && handlePurchasePlan(p.id)}
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
      )}
    </div>
  );
}
