"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, PhoneCall, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlockedAccountForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [targetDegree, setTargetDegree] = useState("Master's Degree");
  const [intake, setIntake] = useState('Winter Semester 2026');
  const [preferredProvider, setPreferredProvider] = useState('Expatrio (Recommended)');
  const [appointmentUrgency, setAppointmentUrgency] = useState('Booked in 2-4 Weeks');
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
    <section id="booking" className="py-8 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-12 shadow-[0_16px_40px_rgba(22,22,26,0.05)] relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Fast Onboarding Request
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            Apply for Your <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Blocked Account</em>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--lp-text-muted)] font-medium leading-relaxed">
            Submit your details below. A dedicated EuropeBridge senior finance counselor will call you within <strong className="text-[var(--lp-text)] font-semibold">60 minutes</strong> (working hours) to finalize your setup, unlock health insurance cashback, and expedite your 24h blocking confirmation.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-[#ece7dd]/60 border border-[#e2ddd3] rounded-3xl text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="lp-serif text-2xl font-bold text-[var(--lp-text)]">Application Received Successfully!</h3>
            <p className="text-sm text-[var(--lp-muted)] font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. A EuropeBridge senior finance advisor has been assigned to your case and will call you at <strong>{countryCode} {phone}</strong> within 60 minutes.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#e5e0d3] text-xs text-[var(--lp-text)] font-medium max-w-md mx-auto space-y-1">
              <div>Selected Plan: <strong>{preferredProvider}</strong></div>
              <div>Target Intake: <strong>{intake}</strong></div>
              <div>Visa Appointment: <strong>{appointmentUrgency}</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/4915212345678?text=Hi%20EuropeBridge%20team,%20I%20just%20submitted%20my%20blocked%20account%20request%20for%20${encodeURIComponent(firstName)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto lp-btn lp-btn--red px-6 py-3 text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Need Urgent Callback on WhatsApp?</span>
              </a>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto lp-btn lp-btn--ghost-dark px-6 py-3 text-xs font-bold"
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
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Phone Number (WhatsApp) *</label>
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 rounded-2xl border border-[#e5e0d3] font-bold text-xs bg-white focus:border-[var(--lp-red)] outline-none text-[var(--lp-text)]"
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
                    className="flex-1 px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                  />
                </div>
              </div>
            </div>

            {/* Target Intake and Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Target Intake</label>
                <select
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white focus:border-[var(--lp-red)] outline-none text-[var(--lp-text)]"
                >
                  <option value="Winter Semester 2026">Winter Semester 2026 (Sep/Oct)</option>
                  <option value="Summer Semester 2027">Summer Semester 2027 (Mar/Apr)</option>
                  <option value="Winter Semester 2027">Winter Semester 2027</option>
                  <option value="Urgent / Immediate Intake">Urgent / Immediate Intake</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Degree / Visa Type</label>
                <select
                  value={targetDegree}
                  onChange={(e) => setTargetDegree(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white focus:border-[var(--lp-red)] outline-none text-[var(--lp-text)]"
                >
                  <option value="Master's Degree">Master&apos;s Degree (€11,904)</option>
                  <option value="Bachelor's Degree">Bachelor&apos;s Degree (€11,904)</option>
                  <option value="Language Course / Studienkolleg">Language Course / Studienkolleg</option>
                  <option value="Chancenkarte (Opportunity Card)">Chancenkarte (Opportunity Card - €1,027/mo)</option>
                  <option value="Jobseeker / Exchange Student">Jobseeker / Exchange Student</option>
                </select>
              </div>
            </div>

            {/* Preferred Provider & Visa Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Preferred Provider</label>
                <select
                  value={preferredProvider}
                  onChange={(e) => setPreferredProvider(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white focus:border-[var(--lp-red)] outline-none text-[var(--lp-text)]"
                >
                  <option value="Expatrio (Recommended)">Expatrio (Recommended - Highest Cashback)</option>
                  <option value="Coracle (Zero Monthly Fee)">Coracle (Zero Monthly Maintenance)</option>
                  <option value="Fintiba (Sutor Bank)">Fintiba (Traditional Sutor Bank)</option>
                  <option value="Need Counselor Advice">Help Me Choose (Need Counselor Advice)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Visa Appointment Status</label>
                <select
                  value={appointmentUrgency}
                  onChange={(e) => setAppointmentUrgency(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white focus:border-[var(--lp-red)] outline-none text-[var(--lp-text)]"
                >
                  <option value="Booked in < 7 Days (URGENT)">Booked in &lt; 7 Days (URGENT)</option>
                  <option value="Booked in 2-4 Weeks">Booked in 2-4 Weeks</option>
                  <option value="Waiting for VFS Slot">Waiting for VFS Slot Opening</option>
                  <option value="Planning Ahead / Not Booked">Planning Ahead / Not Booked</option>
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
                className="w-4 h-4 rounded text-[var(--lp-red)] accent-[var(--lp-red)] mt-1 cursor-pointer shrink-0"
              />
              <label htmlFor="consent" className="text-xs text-[var(--lp-text-muted)] font-medium leading-relaxed cursor-pointer select-none">
                I agree that EuropeBridge may store my details and contact me via phone or WhatsApp regarding German blocked account services. EuropeBridge does not charge any student agency markup.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full lp-btn lp-btn--red py-4 text-xs font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50"
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

