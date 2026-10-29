"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, X, ArrowRight, Clock, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { startServiceCheckout } from '@/lib/servicesPayment';
import { useAppStore } from '@/store/useAppStore';

export const DmatPricing = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [city, setCity] = useState('Delhi NCR');
  const [intake, setIntake] = useState('Summer Semester 2027');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { user } = useAppStore();

  useEffect(() => {
    if (user) {
      if (user.first_name && !name) {
        setName(`${user.first_name} ${user.last_name || ''}`.trim());
      }
      if (user.email && !email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !consent) return;

    setIsSubmitting(true);
    try {
      const success = await startServiceCheckout({
        planKey: 'DMAT_FAST_TRACK',
        studentInputs: {
          name,
          email,
          phone: `${countryCode} ${phone}`,
          city,
          intake,
        },
        returnUrl: '/services/dmat-aps-fast-track#pricing',
      });

      if (success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('DMAT fast-track booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Transparent Pricing & Guarantees */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-germany-red">
              Transparent Service Fee
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-germany-black font-display">₹1,999</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">one-time service fee</span>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              We manage the entire registration lifecycle, test centre slot reservation, deadline tracking, and mock exam pack.
            </p>
          </div>

          {/* Refund Guarantee Badge */}
          <div className="p-5 rounded-2xl bg-[#faf8f3] border border-[#e5e0d3] space-y-2 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#b4232f] shrink-0" />
              <h3 className="font-bold text-[#16161a] text-base">Full Refund Guarantee</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5e5b54] font-medium leading-relaxed">
              We register you for the dMAT before the official registration window closes, or you get an immediate 100% full refund of our service fee. No questions asked.
            </p>
          </div>

          {/* What you pay separately */}
          <div className="p-5 rounded-2xl bg-white border border-[#e5e0d3] space-y-3 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5e5b54] block">
              What You Pay Separately
            </span>
            <div className="flex items-start gap-2.5 text-xs text-[#5e5b54] font-medium leading-relaxed">
              <X className="w-4 h-4 text-[#b4232f] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#16161a] font-bold">The 150 EUR dMAT Exam Fee:</strong> You pay this directly to g.a.s.t. during official slot confirmation; EuropeBridge does not collect or mark up this official fee.
              </span>
            </div>
          </div>

          {/* Included Checklist */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#16161a]">
              <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
              <span>Dedicated slot reservation in your preferred Indian city</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#16161a]">
              <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
              <span>General Academic Module mock questions &amp; solutions</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#16161a]">
              <CheckCircle2 className="w-4 h-4 text-[#16161a] shrink-0" />
              <span>One-on-one counselor guidance for APS certificate filing</span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 bg-[#faf8f3] rounded-3xl border border-[#e5e0d3] space-y-6 shadow-xs">
            <div className="border-b border-[#e5e0d3] pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#16161a] font-display">
                Start Your Registration
              </h2>
              <p className="text-xs text-[#5e5b54] font-medium mt-1">
                Enter your details to initiate your candidate file and secure your preferred centre.
              </p>
              <div className="mt-3 inline-block px-3 py-1 bg-white rounded-lg border border-[#e5e0d3] text-xs font-bold text-[#16161a]">
                Today&apos;s Fee: <strong className="text-[#16161a] font-extrabold">₹1,999 (INR)</strong>
              </div>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white border border-[#e5e0d3] rounded-2xl text-center space-y-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-[#16161a] text-[#c9a35b] flex items-center justify-center mx-auto font-bold shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#16161a] font-display">Registration Initialized!</h3>
                <p className="text-xs text-[#5e5b54] font-medium leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our test coordinator will connect with you via WhatsApp at <strong>{countryCode} {phone}</strong> within 2 hours to confirm your g.a.s.t. credentials and target city (<strong>{city}</strong>).
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href="/dashboard/student/services"
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-white bg-[#b4232f] hover:bg-[#901c26] rounded-xl transition-colors shadow-xs"
                  >
                    Track in Dashboard →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[#16161a] bg-[#faf8f3] border border-[#e5e0d3] rounded-xl hover:border-[#16161a] transition-all cursor-pointer shadow-xs"
                  >
                    Submit Another Profile
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#5e5b54] tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 bg-white border border-[#e5e0d3] rounded-xl text-sm font-bold text-[#16161a] focus:outline-none focus:border-[#16161a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#5e5b54] tracking-wider block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-3 bg-white border border-[#e5e0d3] rounded-xl text-sm font-bold text-[#16161a] focus:outline-none focus:border-[#16161a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#5e5b54] tracking-wider block">WhatsApp Number *</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-2 py-3 bg-white border border-[#e5e0d3] rounded-xl text-sm font-bold text-[#16161a] focus:outline-none focus:border-[#16161a]"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+49">+49 (DE)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+1">+1 (US)</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 px-4 py-3 bg-white border border-[#e5e0d3] rounded-xl text-sm font-bold text-[#16161a] focus:outline-none focus:border-[#16161a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#5e5b54] tracking-wider block">Preferred Test City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-3 bg-white border border-[#e5e0d3] rounded-xl text-xs sm:text-sm font-bold text-[#16161a] focus:outline-none focus:border-[#16161a]"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Kochi">Kochi</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-[#5e5b54] tracking-wider block">Target Intake *</label>
                    <select
                      value={intake}
                      onChange={(e) => setIntake(e.target.value)}
                      className="w-full px-3 py-3 bg-white border border-[#e5e0d3] rounded-xl text-xs sm:text-sm font-bold text-[#16161a] focus:outline-none focus:border-[#16161a]"
                    >
                      <option value="Summer Semester 2027">Summer Semester 2027</option>
                      <option value="Winter Semester 2027">Winter Semester 2027</option>
                      <option value="Summer Semester 2028">Summer Semester 2028</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="dmat-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-[#16161a] rounded focus:ring-[#16161a] accent-[#16161a] cursor-pointer"
                  />
                  <label htmlFor="dmat-consent" className="text-[11px] text-[#5e5b54] font-medium leading-tight cursor-pointer">
                    I understand that EuropeBridge will register my g.a.s.t. test seat for ₹1,999. The 150 EUR exam fee is paid separately to g.a.s.t.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="neu-btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Initiating Fast-Track Booking...</span>
                  ) : (
                    <>
                      <span>Continue to Secure Payment (₹1,999)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
