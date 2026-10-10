"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShortlistingBooking = () => {
  const [plan, setPlan] = useState<'standard' | 'express'>('standard');
  const [degreeLevel, setDegreeLevel] = useState<'masters' | 'bachelors'>('masters');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science & IT');
  const [intake, setIntake] = useState('Winter Semester 2026');
  const [cgpa, setCgpa] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="booking" className="py-12 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Direct Application Order</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Order Your University Shortlist
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Fill in your basic academic preferences below. Our counselors will initiate your transcript audit immediately upon receiving your submission.
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
            <h3 className="text-2xl font-black text-green-900 font-display">Order Request Received!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your request for the <strong>{plan === 'express' ? 'Express Order (24h - ₹5,999)' : 'Standard Order (3 days - ₹4,999)'}</strong> for <strong>{fieldOfStudy}</strong> ({intake}) has been logged.
            </p>
            <div className="p-4 bg-white/80 rounded-2xl border border-green-200 text-xs text-green-900 max-w-md mx-auto space-y-1 text-left">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Confirmation Sent To:</span>
                <span className="font-black">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Expected First Draft:</span>
                <span className="font-black text-germany-red">{plan === 'express' ? 'Within 24 Hours' : 'Within 3 Working Days'}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium pt-2">
              Please check your email for the detailed marksheet &amp; syllabus upload link.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="neu-btn px-6 py-2.5 text-xs font-extrabold text-germany-black bg-white border border-gray-200 mt-2"
            >
              Order for Another Profile
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Plan Selector Radios */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                Select Service Package *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan('standard')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                    plan === 'standard'
                      ? 'border-germany-black bg-gray-50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <span className="text-sm font-black text-germany-black block">Standard Plan</span>
                    <span className="text-xs text-gray-500 font-medium">First draft in 3 working days</span>
                  </div>
                  <span className="text-base font-black text-germany-black">₹4,999</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('express')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                    plan === 'express'
                      ? 'border-germany-red bg-red-50/50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-germany-red">Express Plan</span>
                      <Zap className="w-3.5 h-3.5 text-germany-red fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">First draft in 24 hours</span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹5,999</span>
                </button>
              </div>
            </div>

            {/* Degree & Intake */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Degree Level *</label>
                <select 
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                >
                  <option value="masters">Master&apos;s (M.Sc / M.Eng / M.A)</option>
                  <option value="bachelors">Bachelor&apos;s (B.Sc / B.Eng)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target Intake *</label>
                <select 
                  value={intake}
                  onChange={(e) => setIntake(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                >
                  <option value="Winter Semester 2026">Winter Semester 2026 (Oct Start)</option>
                  <option value="Summer Semester 2027">Summer Semester 2027 (Apr Start)</option>
                  <option value="Winter Semester 2027">Winter Semester 2027</option>
                </select>
              </div>
            </div>

            {/* Target Field of Study */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Field of Study *</label>
                <input 
                  type="text" 
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  placeholder="e.g. Data Science, Robotics, Management"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Bachelor CGPA / % (Optional)</label>
                <input 
                  type="text" 
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g. 8.4 / 10 or 78%"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Rahul"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Sharma"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">WhatsApp / Phone *</label>
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 px-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    required
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox"
                id="consent-shortlist"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-germany-red border-gray-300 rounded focus:ring-germany-red accent-germany-red cursor-pointer"
              />
              <label htmlFor="consent-shortlist" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer">
                I agree that EuropeBridge may process my profile details to prepare my university shortlist. I understand EuropeBridge prioritizes 100% public, tuition-free German universities.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="neu-btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Generating Order Request...</span>
              ) : (
                <>
                  <span>
                    Proceed to Shortlist Order — {plan === 'express' ? '₹5,999 (24h Express)' : '₹4,999 (Standard 3-Day)'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                256-Bit Encrypted Data
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-germany-red" />
                Strict Delivery Guarantee
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
