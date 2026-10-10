"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, PhoneCall, HeartHandshake, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const HealthInsuranceBooking = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [ageGroup, setAgeGroup] = useState('Under 30 Years (Standard Public)');
  const [studentStatus, setStudentStatus] = useState("Master's / Bachelor's Degree Student");
  const [targetUniversity, setTargetUniversity] = useState('');
  const [preferredProvider, setPreferredProvider] = useState('TK (Techniker Krankenkasse)');
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
    <section id="booking" className="py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Fast Health Insurance Onboarding</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Apply for German Health Insurance
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Submit your information below. A dedicated EuropeBridge senior healthcare counselor will follow up within <strong className="text-germany-black font-extrabold">60 minutes</strong> (working hours) to finalize your policy and transmit your M10 certificate to your university.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-green-50 border-2 border-green-300 rounded-3xl text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-green-900 font-display">Application Received!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. A EuropeBridge health insurance advisor has been assigned to your case and will contact you at <strong>{countryCode} {phone}</strong> within 60 minutes.
            </p>

            <div className="p-4 rounded-2xl bg-white/80 border border-green-200 text-xs text-green-900 font-semibold max-w-md mx-auto space-y-1">
              <div>Selected Provider: <strong>{preferredProvider}</strong></div>
              <div>Age Group: <strong>{ageGroup}</strong></div>
              <div>Target University: <strong>{targetUniversity || 'General Intake'}</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/4915212345678?text=Hi%20EuropeBridge%20team,%20I%20just%20submitted%20my%20health%20insurance%20request%20for%20${encodeURIComponent(firstName)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Urgent WhatsApp Callback?</span>
              </a>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto neu-btn px-6 py-3 text-xs font-extrabold text-germany-black bg-white border border-gray-200"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Priya"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Nair"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Phone Number (WhatsApp) *</label>
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
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Age Group & Student Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Age Group *</label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm bg-white focus:border-germany-red outline-none"
                >
                  <option value="Under 30 Years (Standard Public)">Under 30 Years (Standard Student Public ~€140–€150)</option>
                  <option value="30 Years or Older (Private / Voluntary)">30 Years or Older (Private / Voluntary Public)</option>
                  <option value="Language Student / Studienkolleg">Language Student / Studienkolleg (Expat Prep)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Enrollment Status</label>
                <select
                  value={studentStatus}
                  onChange={(e) => setStudentStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm bg-white focus:border-germany-red outline-none"
                >
                  <option value="Master's / Bachelor's Degree Student">Master&apos;s / Bachelor&apos;s Degree Student</option>
                  <option value="PhD Scholar / Postgrad Researcher">PhD Scholar / Postgrad Researcher</option>
                  <option value="Preparatory / Studienkolleg Student">Preparatory / Studienkolleg Student</option>
                  <option value="Chancenkarte / Jobseeker / Expat">Chancenkarte / Jobseeker / Expat</option>
                </select>
              </div>
            </div>

            {/* University & Preferred Provider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target German University / City</label>
                <input 
                  type="text" 
                  placeholder="e.g. TU Munich, RWTH Aachen, Berlin"
                  value={targetUniversity}
                  onChange={(e) => setTargetUniversity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red outline-none bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Preferred Insurer</label>
                <select
                  value={preferredProvider}
                  onChange={(e) => setPreferredProvider(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm bg-white focus:border-germany-red outline-none"
                >
                  <option value="TK (Techniker Krankenkasse)">TK (Techniker Krankenkasse - Most Popular)</option>
                  <option value="Barmer">Barmer (Nationwide Excellence)</option>
                  <option value="AOK">AOK (Campus Helpdesks)</option>
                  <option value="Ottonova / Private Partner">Ottonova / Private Expat (For 30+ / Prep)</option>
                  <option value="Help Me Decide">Help Me Decide (Need Counselor Advice)</option>
                </select>
              </div>
            </div>

            {/* Consent Checkbox */}
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
                I agree that EuropeBridge may store my details and contact me via phone or WhatsApp regarding German health insurance setup and digital M10 university registration. EuropeBridge does not charge students any agency fee.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full neu-btn-primary py-4 text-base font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Request 60-Minute Callback &amp; Setup</span>
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
