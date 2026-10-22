"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Mail, User, GraduationCap, Calendar, Sparkles } from 'lucide-react';

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
  selectedPrice
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intake, setIntake] = useState('Winter Semester 2026');
  const [field, setField] = useState('Computer Science / IT / AI');
  const [gpa, setGpa] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'online' | 'emi' | 'counselor'>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-3xl bg-[#fbf9f4] border border-[#e5e0d3] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#787369] hover:text-[#16161a] hover:bg-[#ece7dd] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Header */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e2a2b] bg-[#9e2a2b]/10 px-3 py-1 rounded-full border border-[#9e2a2b]/20 inline-block mb-2">
                    Package Onboarding
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16161a]">
                    Enroll in {selectedPlan}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#16161a]">{selectedPrice}</span>
                    <span className="text-xs text-[#787369]">One-time fee · No hidden charges</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold text-[#4a4740] block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#787369] absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#dcd7cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-[#4a4740] block mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#787369] absolute left-3 top-3.5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#dcd7cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#4a4740] block mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#787369] absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#dcd7cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CGPA & Target Intake */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-bold text-[#4a4740] block mb-1">
                        Current GPA / % (Approx)
                      </label>
                      <input
                        type="text"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        placeholder="e.g. 8.2 CGPA or 76%"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd7cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#4a4740] block mb-1">
                        Target Intake
                      </label>
                      <select
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd7cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a]"
                      >
                        <option value="Winter Semester 2026">Winter 2026 (Oct 2026)</option>
                        <option value="Summer Semester 2027">Summer 2027 (Apr 2027)</option>
                        <option value="Winter Semester 2027">Winter 2027 (Oct 2027)</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Field */}
                  <div>
                    <label className="text-xs font-bold text-[#4a4740] block mb-1">
                      Field of Study
                    </label>
                    <select
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd7cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a]"
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

                  {/* Next Step Options */}
                  <div className="pt-2">
                    <label className="text-xs font-bold text-[#4a4740] block mb-2">
                      How would you like to proceed?
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentPreference('online')}
                        className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                          paymentPreference === 'online'
                            ? 'bg-[#16161a] text-white border-[#16161a]'
                            : 'bg-white border-[#dcd7cb] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        Instant Link / UPI
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentPreference('emi')}
                        className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                          paymentPreference === 'emi'
                            ? 'bg-[#16161a] text-white border-[#16161a]'
                            : 'bg-white border-[#dcd7cb] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        No-Cost EMI
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentPreference('counselor')}
                        className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                          paymentPreference === 'counselor'
                            ? 'bg-[#16161a] text-white border-[#16161a]'
                            : 'bg-white border-[#dcd7cb] text-[#4a4740] hover:border-[#16161a]'
                        }`}
                      >
                        Counselor Call
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#9e2a2b] text-white hover:bg-[#852324] transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Seat...</span>
                    ) : (
                      <>
                        <span>Confirm Admission Plan Enrollment</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#787369] pt-1">
                    🔒 Strict Privacy Guarantee · An EuropeBridge counsellor contacts you within 2 business hours.
                  </p>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2e7d46]/15 text-[#2e7d46] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#16161a]">
                  Application Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#5e5b54] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#16161a]">{name}</strong>. We have registered your enrollment for the <strong className="text-[#9e2a2b]">{selectedPlan}</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-[#faf8f3] border border-[#e5e0d3] text-left text-xs text-[#4a4740] space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#787369]">WhatsApp Confirmation:</span>
                    <strong className="text-[#16161a]">{phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Target Intake:</span>
                    <strong className="text-[#16161a]">{intake}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Counselor Assigned:</span>
                    <strong className="text-[#2e7d46]">Yes (Onboarding Lead)</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#16161a] text-white text-xs font-bold hover:bg-[#303038] transition-all cursor-pointer mt-4"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
