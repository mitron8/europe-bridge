"use client";
import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, ArrowRight, Clock, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
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
          <div className="p-5 rounded-2xl bg-green-50 border-2 border-green-300 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-700 shrink-0" />
              <h3 className="font-extrabold text-green-950 text-base">Full Refund Guarantee</h3>
            </div>
            <p className="text-xs sm:text-sm text-green-900 font-medium leading-relaxed">
              We register you for the dMAT before the official registration window closes, or you get an immediate 100% full refund of our service fee. No questions asked.
            </p>
          </div>

          {/* What you pay separately */}
          <div className="neu-card p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">
              What You Pay Separately
            </span>
            <div className="flex items-start gap-2.5 text-xs text-gray-600 font-medium leading-relaxed">
              <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-germany-black font-bold">The 150 EUR dMAT Exam Fee:</strong> You pay this directly to g.a.s.t. during official slot confirmation; EuropeBridge does not collect or mark up this official fee.
              </span>
            </div>
          </div>

          {/* Included Checklist */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Dedicated slot reservation in your preferred Indian city</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>General Academic Module mock questions &amp; solutions</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>One-on-one counselor guidance for APS certificate filing</span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-6">
          <div className="neu-card p-6 sm:p-8 bg-white border-2 border-germany-red/30 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-germany-black font-display">
                Start Your Registration
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Enter your details to initiate your candidate file and secure your preferred centre.
              </p>
              <div className="mt-3 inline-block px-3 py-1 bg-amber-50 rounded-lg border border-amber-200 text-xs font-bold text-amber-900">
                Today&apos;s Fee: <strong className="text-germany-black font-extrabold">₹1,999 (INR)</strong>
              </div>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-50 border-2 border-green-300 rounded-2xl text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto font-bold">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-green-950 font-display">Registration Initialized!</h3>
                <p className="text-xs text-green-800 font-medium leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our test coordinator will connect with you via WhatsApp at <strong>{countryCode} {phone}</strong> within 2 hours to confirm your g.a.s.t. credentials and target city (<strong>{city}</strong>).
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="neu-btn px-4 py-2 text-xs font-extrabold text-germany-black bg-white border border-gray-200 mt-2"
                >
                  Submit Another Profile
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">WhatsApp Number *</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
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
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Preferred Test City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
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
                    <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target Intake *</label>
                    <select
                      value={intake}
                      onChange={(e) => setIntake(e.target.value)}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
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
                    className="mt-1 w-4 h-4 text-germany-red rounded focus:ring-germany-red accent-germany-red cursor-pointer"
                  />
                  <label htmlFor="dmat-consent" className="text-[11px] text-gray-600 font-medium leading-tight cursor-pointer">
                    I understand that EuropeBridge will register my g.a.s.t. test seat for ₹1,999. The 150 EUR exam fee is paid separately to g.a.s.t.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="neu-btn-primary w-full py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
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
