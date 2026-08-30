"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlockedAccountForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="booking" className="py-12 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <PhoneCall className="w-4 h-4" />
            <span>Fast Onboarding Request</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Apply for Your Blocked Account
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Submit your contact details below. Our senior advisor will call you within <strong className="text-germany-black">60 minutes</strong> (working hours) to assist with account setup and 24h blocking confirmation.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-green-50 border-2 border-green-300 rounded-3xl text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto font-bold">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-green-900 font-display">Application Received!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. A senior EuropeBridge finance advisor will reach out to you at <strong>{countryCode} {phone}</strong> within 60 minutes.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="neu-btn px-6 py-2.5 text-xs font-extrabold text-germany-black bg-white border border-gray-200 mt-2"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Email Address *</label>
              <input 
                type="email" 
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Phone Number *</label>
              <div className="flex gap-2">
                <select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-3 rounded-xl border border-gray-300 font-bold text-xs bg-gray-50 focus:border-germany-red outline-none"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input 
                  type="tel" 
                  required
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 rounded text-germany-red focus:ring-germany-red accent-germany-red mt-0.5 cursor-pointer shrink-0"
              />
              <label htmlFor="consent" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer select-none">
                I agree that EuropeBridge may store my details and contact me via phone or email regarding blocked account services. I can request data deletion at any time.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full neu-btn-primary py-4 text-base font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Submit Request</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
