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
import { AccountProfileTab } from './account/AccountProfileTab';
import { AccountSecurityTab } from './account/AccountSecurityTab';
import { AccountPlansTab } from './account/AccountPlansTab';

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
        <AccountProfileTab
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          profileSuccess={profileSuccess}
          profileError={profileError}
          profileSaving={profileSaving}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onSave={handleSaveProfile}
        />
      )}

      {/* TAB 2: Password & Security */}
      {activeTab === 'security' && (
        <AccountSecurityTab
          loadingSecurity={loadingSecurity}
          hasPassword={hasPassword}
          securitySuccess={securitySuccess}
          securityError={securityError}
          securitySaving={securitySaving}
          showCurrentPass={showCurrentPass}
          showNewPass={showNewPass}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onToggleShowCurrentPass={() => setShowCurrentPass(!showCurrentPass)}
          onToggleShowNewPass={() => setShowNewPass(!showNewPass)}
          onCurrentPasswordChange={setCurrentPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSave={handleSavePassword}
        />
      )}

      {/* TAB 3: Membership & Plans (Student Only) */}
      {isStudent && activeTab === 'plans' && (
        <AccountPlansTab
          isSubscriptionActive={isSubscriptionActive}
          subscriptionStatus={subscriptionStatus}
          activePlanId={activePlanId}
          checkoutSuccess={checkoutSuccess}
          checkoutError={checkoutError}
          loadingSubscription={loadingSubscription}
          plans={plans}
          checkoutLoading={checkoutLoading}
          onPurchasePlan={handlePurchasePlan}
        />
      )}
    </div>
  );
}
