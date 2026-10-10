"use client";

import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Package, 
  ShieldCheck, 
  Building2, 
  Clock, 
  MessageSquare,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DHLBookingForm = () => {
  // Application packet count
  const [packetCount, setPacketCount] = useState<number>(1);
  
  // Destination preset
  const [destinationType, setDestinationType] = useState<'uni-assist' | 'university' | 'aps'>('uni-assist');
  const [customUniversity, setCustomUniversity] = useState('');
  
  // Sender details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  
  // Doorstep pickup address
  const [pickupAddress, setPickupAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  
  // Form submission state
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pricePerPacket = 2033;
  const totalPrice = packetCount * pricePerPacket;
  const estimatedSavings = packetCount * (4200 - 2033);

  const handleIncrement = () => {
    if (packetCount < 10) setPacketCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (packetCount > 1) setPacketCount(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !pickupAddress || !city || !pincode || !consent) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <section id="booking" className="py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Package className="w-4 h-4" />
            <span>Official Courier Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Book Your DHL Express Courier
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Flat ₹2,033 per application dossier. Free doorstep pickup across India, 3–4 working days air transit to Germany, and official 10-digit AWB tracking.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-10 bg-green-50 border-2 border-green-300 rounded-3xl text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-green-800 bg-white/80 px-3 py-1 rounded-full border border-green-200">
                Booking Logged • Ref #EB-DHL-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-green-950 font-display pt-1">
                Thank You, {firstName}!
              </h3>
              <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
                Your courier pickup request for <strong>{packetCount} {packetCount === 1 ? 'application packet' : 'application packets'}</strong> has been registered. A dedicated DHL Express logistics manager will call you at <strong>{countryCode} {phone}</strong> within 24 hours to confirm your pickup slot and dispatch the courier.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-green-200 text-xs text-green-900 max-w-md mx-auto space-y-2 text-left font-semibold">
              <div className="flex justify-between border-b border-green-100 pb-2">
                <span className="text-gray-600">Primary Destination:</span>
                <span className="font-extrabold text-germany-black">
                  {destinationType === 'uni-assist' && 'uni-assist e.V. (Berlin)'}
                  {destinationType === 'aps' && 'APS India (New Delhi)'}
                  {destinationType === 'university' && (customUniversity || 'German Public University')}
                </span>
              </div>
              <div className="flex justify-between border-b border-green-100 pb-2">
                <span className="text-gray-600">Packets / Envelopes:</span>
                <span className="font-extrabold text-germany-black">{packetCount} Packet{packetCount > 1 ? 's' : ''} (Flat ₹2,033 each)</span>
              </div>
              <div className="flex justify-between border-b border-green-100 pb-2">
                <span className="text-gray-600">Pickup City / PIN:</span>
                <span className="font-extrabold text-germany-black">{city} ({pincode})</span>
              </div>
              <div className="flex justify-between text-sm font-black text-germany-red pt-1">
                <span>Total Amount to Pay:</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left space-y-1 font-medium">
              <span className="font-bold block uppercase text-[10px] tracking-wider text-amber-950">Next Steps:</span>
              <p>1. Keep university transcripts in sealed, university-stamped envelopes.</p>
              <p>2. Keep 1 self-attested ID photocopy (Aadhaar / Passport) ready for the DHL agent.</p>
              <p>3. Online payment is completed securely after phone confirmation.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/4915212345678?text=Hi%20EuropeBridge,%20I%20just%20booked%20DHL%20Express%20for%20${packetCount}%20packets%20for%20${encodeURIComponent(firstName)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Support</span>
              </a>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto neu-btn px-6 py-3 text-xs font-extrabold text-germany-black bg-white border border-gray-200"
              >
                Book Another Packet
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* 1. Packet Quantity Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                1. Number of Application Packets *
              </label>
              
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPacketCount(num)}
                    className={`py-3 px-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      packetCount === num
                        ? 'border-germany-black bg-gray-50 shadow-inner'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-sm sm:text-base font-black text-germany-black">
                      {num} {num === 1 ? 'Packet' : 'Packets'}
                    </span>
                    <span className="block text-[11px] font-bold text-germany-red mt-0.5">
                      ₹{(num * pricePerPacket).toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>

              {/* Stepper for 4+ Packets */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <span className="font-semibold text-gray-700">Need more envelopes? (Up to 10):</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={packetCount <= 1}
                    className="w-7 h-7 rounded-lg bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-black text-sm text-germany-black w-6 text-center">{packetCount}</span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={packetCount >= 10}
                    className="w-7 h-7 rounded-lg bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Destination Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                2. Target Destination *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDestinationType('uni-assist')}
                  className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                    destinationType === 'uni-assist'
                      ? 'border-germany-red bg-red-50/40 text-germany-red'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-black">uni-assist e.V.</span>
                  <span className="text-[11px] font-medium opacity-80">Berlin, Germany</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDestinationType('university')}
                  className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                    destinationType === 'university'
                      ? 'border-germany-red bg-red-50/40 text-germany-red'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-black">Direct University</span>
                  <span className="text-[11px] font-medium opacity-80">TUM, RWTH, etc.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDestinationType('aps')}
                  className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                    destinationType === 'aps'
                      ? 'border-germany-red bg-red-50/40 text-germany-red'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-black">APS New Delhi</span>
                  <span className="text-[11px] font-medium opacity-80">Verification Desk</span>
                </button>
              </div>

              {/* Destination Address Preview */}
              {destinationType === 'uni-assist' && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-germany-black">Pre-verified uni-assist Address:</strong>
                    <p className="text-gray-600">uni-assist e.V., Geneststraße 5, 10829 Berlin, Germany</p>
                  </div>
                </div>
              )}

              {destinationType === 'aps' && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-germany-black">Pre-verified APS Address:</strong>
                    <p className="text-gray-600">Gate No. 3, DLTA Complex, R.K. Khanna Stadium, 110029 New Delhi, India</p>
                  </div>
                </div>
              )}

              {destinationType === 'university' && (
                <div className="space-y-1 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Enter University & City (e.g. Technical University of Munich - Arcisstraße 21)"
                    value={customUniversity}
                    onChange={(e) => setCustomUniversity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>
              )}
            </div>

            {/* 3. Sender Contact Details */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                3. Student Contact Details *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">WhatsApp Phone *</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-3 py-3 rounded-xl border border-gray-300 font-bold text-xs bg-gray-50 focus:border-germany-red outline-none"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Doorstep Pickup Address */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                4. Doorstep Pickup Address (India) *
              </label>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Flat / House No., Street, Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 302, Sunrise Towers, Near Metro Station"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Bangalore, Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharashtra, Karnataka"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">PIN Code (6 Digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 411001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Preferred Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                <span>Application Envelopes:</span>
                <span className="font-extrabold text-germany-black">{packetCount} Packet{packetCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                <span>EuropeBridge Student Rate:</span>
                <span>₹{pricePerPacket.toLocaleString('en-IN')} / packet</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-emerald-700">
                <span>Free Doorstep Pickup &amp; 10-Digit AWB:</span>
                <span>Included (₹0)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-emerald-700">
                <span>Estimated Counter Savings:</span>
                <span>Save ~₹{estimatedSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-base sm:text-lg font-black text-germany-black border-t border-gray-200 pt-2 font-display">
                <span>Total Courier Fee:</span>
                <span className="text-germany-red">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Notice & Consent */}
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-0.5">
                <span className="font-extrabold block">KYC Verification at Doorstep:</span>
                <p className="text-amber-800">
                  Please hand over 1 self-attested ID copy (Aadhaar or Passport) to the DHL executive at pickup. Transcripts must be inside sealed envelopes.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="dhl-consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-5 h-5 rounded text-germany-red focus:ring-germany-red accent-germany-red mt-0.5 cursor-pointer shrink-0"
                />
                <label htmlFor="dhl-consent" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer select-none">
                  I confirm that my document packet weighs under 500g and contains academic documents. I agree to EuropeBridge and DHL contacting me regarding this shipment.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full neu-btn-primary py-4 text-base font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Registering Booking Request...</span>
              ) : (
                <>
                  <span>Book DHL Express Courier — ₹{totalPrice.toLocaleString('en-IN')}</span>
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
