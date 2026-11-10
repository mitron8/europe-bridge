"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  User,
  GraduationCap,
  Calendar,
  Award,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  selectedPrice: string;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  selectedPrice,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intake, setIntake] = useState('Winter Semester 2026');
  const [field, setField] = useState('Computer Science / IT / AI');
  const [gpa, setGpa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{
    orderId?: string;
    paymentId?: string;
  }>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMessage(null);
    } else {
      document.body.style.overflow = 'unset';
      setIsSubmitted(false);
      setErrorMessage(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isFree =
    selectedPlan.toLowerCase().includes('free') ||
    selectedPrice === '₹0' ||
    selectedPrice === 'Free';

  // Helper to load Razorpay Standard Checkout SDK
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setErrorMessage(null);

    // Free Consultation booking
    if (isFree) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 700);
      return;
    }

    // Paid Plan Razorpay Standard Web Checkout
    try {
      setIsSubmitting(true);

      // Parse amount from selectedPrice (e.g. "₹29,999" -> 2999900 paise)
      const cleanNumeric = parseInt(selectedPrice.replace(/[^0-9]/g, ''), 10);
      const priceInr = !isNaN(cleanNumeric) && cleanNumeric > 0 ? cleanNumeric : 29999;
      const amountInPaise = priceInr * 100;

      // Ensure Razorpay SDK script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      // 1. Backend Create Order
      const orderRes = await fetch(`${apiUrl}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `eb_rcpt_${Date.now()}`,
          notes: {
            name,
            email: email.trim().toLowerCase(),
            phone,
            planName: selectedPlan,
            selectedPrice,
            gpa,
            intake,
            field,
          },
        }),
      });

      if (!orderRes.ok) {
        const errJson = await orderRes.json().catch(() => ({}));
        throw new Error(errJson.message || `Failed to create payment order (${orderRes.status})`);
      }

      const orderData = await orderRes.json();
      const razorpayKey =
        orderData.key_id ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        'rzp_test_Tw7frcXLaL9h8I';

      // 2. Open Razorpay Standard Checkout Modal
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'EuropeBridge',
        description: selectedPlan,
        order_id: orderData.order_id || orderData.orderId,
        prefill: {
          name,
          email: email.trim().toLowerCase(),
          contact: phone,
        },
        theme: {
          color: '#9e2a2b',
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
        handler: async function (response: any) {
          try {
            setIsVerifying(true);

            // 3. Backend Verify Signature
            const verifyRes = await fetch(`${apiUrl}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                notes: {
                  name,
                  email: email.trim().toLowerCase(),
                  phone,
                  planName: selectedPlan,
                  selectedPrice,
                  gpa,
                  intake,
                  field,
                },
              }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.message || 'Payment verification failed');
            }

            setPaymentDetails({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            });
            setIsSubmitted(true);
          } catch (verifyErr: any) {
            setErrorMessage(verifyErr.message || 'Payment verification failed. Please contact support.');
          } finally {
            setIsVerifying(false);
            setIsSubmitting(false);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setErrorMessage(resp.error?.description || 'Payment was unsuccessful or cancelled by user.');
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to start checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0d0d10]/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] rounded-2xl sm:rounded-3xl bg-[#faf8f4] border border-[#e2ddd4] p-5 sm:p-6 shadow-[0_24px_65px_-12px_rgba(22,22,26,0.22)] z-10 max-h-[calc(100vh-2rem)] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#ded8cb_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ded8cb] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#b8b2a5]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 h-8 w-8 rounded-full bg-[#ede7dc] text-[#6b665d] hover:bg-[#e0d9cd] hover:text-[#16161a] transition-all flex items-center justify-center cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Header */}
                <div className="mb-4 sm:mb-5 pr-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e2a2b] bg-[#9e2a2b]/10 px-2.5 py-0.5 rounded-full border border-[#9e2a2b]/20 inline-flex items-center gap-1.5 mb-1.5">
                    {isFree ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9e2a2b] animate-pulse" />
                        Free Strategy Session
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9e2a2b]" />
                        Official Admission Enrollment
                      </>
                    )}
                  </span>
                  <h3 className="text-xl sm:text-[22px] font-serif font-bold text-[#16161a] tracking-tight leading-snug">
                    {isFree ? "Book Free 1-on-1 Consultation" : `Enroll in ${selectedPlan}`}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-[#16161a]">{selectedPrice}</span>
                    <span className="text-xs text-[#787369]">
                      {isFree
                        ? "30-min strategy call · No sales pressure · Direct alumni guidance"
                        : "One-time fee · Razorpay Secured · Instant Account Activation"}
                    </span>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold">{errorMessage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-red-500 hover:text-red-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8a857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8a857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8a857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CGPA & Target Intake */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        Current GPA / % (Approx)
                      </label>
                      <input
                        type="text"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        placeholder="e.g. 8.2 CGPA or 76%"
                        className="w-full px-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        Target Intake
                      </label>
                      <select
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all cursor-pointer whitespace-normal break-words"
                      >
                        <option value="Winter Semester 2026">Winter 2026 (Oct 2026)</option>
                        <option value="Summer Semester 2027">Summer 2027 (Apr 2027)</option>
                        <option value="Winter Semester 2027">Winter 2027 (Oct 2027)</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Field */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                      Field of Study
                    </label>
                    <select
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all cursor-pointer whitespace-normal break-words"
                    >
                      <option value="Computer Science / IT / AI">Computer Science / IT / AI / Data</option>
                      <option value="Mechanical / Automotive / Mechatronics">Mechanical / Automotive / Mechatronics</option>
                      <option value="Electrical / Embedded Systems">Electrical / Embedded Systems</option>
                      <option value="Management / Industrial Engineering">Management / Industrial Engineering</option>
                      <option value="Biotechnology / Life Sciences">Biotechnology / Life Sciences</option>
                      <option value="Bachelor's Program / Studienkolleg">Bachelor&apos;s Program / Studienkolleg</option>
                      <option value="Other">Other Field</option>
                    </select>
                  </div>

                  {/* Free Plan Assessment Pill */}
                  {isFree && (
                    <div className="rounded-xl bg-[#ede7dc]/60 border border-[#ded8cb] px-3.5 py-2.5 text-xs text-[#4a4740] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2e7d46] shrink-0" />
                        <span className="text-[12px] leading-snug">
                          Free profile assessment &amp; English-taught public university options
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#2e7d46] bg-[#2e7d46]/10 px-2 py-0.5 rounded-full shrink-0">
                        100% Free
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isVerifying}
                    className="w-full py-3 px-4 rounded-xl bg-[#9e2a2b] text-white hover:bg-[#852324] active:scale-[0.99] transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 mt-2"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Payment...</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isFree ? "Scheduling Your Session..." : "Connecting to Razorpay..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{isFree ? "Schedule Free Consultation" : `Confirm & Pay with Razorpay (${selectedPrice})`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10.5px] text-center text-[#787369] pt-0.5 leading-tight flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2e7d46]" />
                    <span>Razorpay Standard Checkout · 256-Bit SSL Encrypted · Instant Admission Activation</span>
                  </p>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="py-6 sm:py-8 text-center space-y-3.5">
                <div className="w-14 h-14 rounded-full bg-[#2e7d46]/15 text-[#2e7d46] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16161a]">
                  {isFree ? "Consultation Booked!" : "Payment Confirmed & Seat Reserved!"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5e5b54] max-w-sm mx-auto leading-relaxed">
                  {isFree ? (
                    <>
                      Thank you, <strong className="text-[#16161a]">{name}</strong>. An EuropeBridge Germany admissions counselor will message you on WhatsApp to confirm your 1-on-1 slot.
                    </>
                  ) : (
                    <>
                      Thank you, <strong className="text-[#16161a]">{name}</strong>. Your payment for <strong className="text-[#9e2a2b]">{selectedPlan}</strong> was verified and your student account is active.
                    </>
                  )}
                </p>

                <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#e5e0d3] text-left text-xs text-[#4a4740] space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Registered Email:</span>
                    <strong className="text-[#16161a]">{email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787369]">WhatsApp Number:</span>
                    <strong className="text-[#16161a]">{phone}</strong>
                  </div>
                  {paymentDetails.paymentId && (
                    <div className="flex justify-between">
                      <span className="text-[#787369]">Payment ID:</span>
                      <strong className="text-[#2e7d46] font-mono text-[11px]">{paymentDetails.paymentId}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Target Intake:</span>
                    <strong className="text-[#16161a]">{intake}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Access Status:</span>
                    <strong className="text-[#2e7d46]">
                      {isFree ? "Consultation Scheduled" : "Full Access Unlocked (Plan Active)"}
                    </strong>
                  </div>
                </div>

                {!isFree && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-left text-xs text-emerald-900 space-y-1 max-w-sm mx-auto">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ready to Access Your Services?</span>
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      Log in using your Gmail (<strong>{email}</strong>) to immediately access restricted services, document generation, and your assigned advisor.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-[#ded8cb] bg-white text-[#16161a] text-xs font-bold hover:bg-[#f4f1ea] transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    href="/login"
                    className="px-5 py-2.5 rounded-xl bg-[#16161a] text-white text-xs font-bold hover:bg-[#303038] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Proceed to Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
