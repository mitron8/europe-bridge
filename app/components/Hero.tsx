"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Send, 
  Phone, 
  Mail, 
  User, 
  MessageSquare, 
  Check, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

const serviceOptions = [
  { label: 'University Admissions & Shortlisting', value: 'Admissions & Shortlisting' },
  { label: 'APS Certification Assistance', value: 'APS Verification' },
  { label: 'Student Visa & Blocked Account', value: 'Visa & Blocked Account' },
  { label: 'German Language (A1 - C1)', value: 'German Language Course' },
  { label: 'General Profile Evaluation', value: 'General Guidance' }
];

const Hero = () => {
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Admissions & Shortlisting');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center pt-[140px] sm:pt-[150px] lg:pt-[130px] pb-[80px] lg:pb-[60px] px-4 md:px-[5%] overflow-hidden neu-bg">
      
      {/* Animated Background Glow Elements */}
      <motion.div 
        className="absolute top-[10%] left-[5%] w-64 h-64 bg-germany-red/5 rounded-full blur-3xl z-0 pointer-events-none"
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-germany-gold/10 rounded-full blur-3xl z-0 pointer-events-none"
        animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-[40%] left-[40%] w-72 h-72 bg-germany-black/5 rounded-full blur-3xl z-0 pointer-events-none"
        animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto z-10 gap-12 lg:gap-14 mt-4 sm:mt-6 lg:mt-8">
        
        {/* Left Content Area */}
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left relative z-10 space-y-4 lg:space-y-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Clay Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[4px_4px_12px_rgba(71,85,105,0.4),inset_-2px_-2px_6px_rgba(71,85,105,0.4),inset_2px_2px_6px_rgba(255,255,255,1)] text-[11px] md:text-xs tracking-wide">
            <span className="w-2 h-2 rounded-full bg-germany-gold animate-pulse"></span>
            Built by Alumni from Top German Universities
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.8rem] leading-tight md:leading-[1.1] text-germany-black relative drop-shadow-sm flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2">
            <span>Germany Awaits.</span>
            <motion.img 
              src="/doodles/german cutie.png" 
              alt="German Cutie Penguin" 
              className="w-12 h-12 md:w-28 md:h-28 object-contain drop-shadow-md pb-1"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-germany-red">We'll Take You There.</span>
          </h1>
          
          <p className="text-sm md:text-base pt-2 leading-relaxed font-bold text-gray-500 max-w-xl mx-auto lg:mx-0">
            Skip the confusion and let our experts guide your journey. From university admissions and APS certification to job matching and seamless visa approval, we handle the heavy lifting so you can focus on your future.
          </p>

          {/* USP Checkmarks */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            {['University Admissions', 'Career Matching', 'End-to-End Visa Support'].map((usp, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-1.5 text-[11px] md:text-xs font-extrabold text-germany-black bg-white px-3 py-1.5 rounded-xl shadow-[4px_4px_10px_rgba(71,85,105,0.4),inset_-2px_-2px_5px_rgba(71,85,105,0.4),inset_2px_2px_5px_rgba(255,255,255,1)] cursor-default transition-colors hover:text-germany-red"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-germany-red" />
                <span>{usp}</span>
              </motion.div>
            ))}
          </div>

          {/* Doodle Callout Box */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-white p-3 md:p-4 rounded-[20px] max-w-md mx-auto lg:mx-0 mt-2 shadow-[6px_6px_16px_rgba(71,85,105,0.4),inset_-4px_-4px_10px_rgba(71,85,105,0.3),inset_4px_4px_10px_rgba(255,255,255,1)] text-center sm:text-left">
            <img src="/doodles/university.png" alt="Peer the Penguin" className="w-20 h-20 object-contain drop-shadow-md shrink-0" />
            <div className="text-[11px] md:text-xs text-gray-500 font-bold mt-1 sm:mt-0 leading-snug">
              <span className="block text-germany-black font-extrabold text-sm mb-0.5">Meet Peer, the Guide Penguin!</span>
              "Have questions about studying in Germany? Send us a message and our alumni counsellors will guide you!"
            </div>
          </div>
        </motion.div>

        {/* Right Contact Form Area */}
        <div 
          className="flex-1 w-full max-w-md lg:max-w-[430px] relative z-10 mx-auto mt-6 lg:mt-0 pt-6"
          onMouseEnter={() => setIsFormHovered(true)}
          onMouseLeave={() => setIsFormHovered(false)}
        >
          {/* Peeking Mascot Doodle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 50, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.5, delay: 0.5 }}
            className="absolute -top-[55px] -right-2 z-0 pointer-events-none"
          >
            <div className={`transition-all duration-500 ease-in-out ${isFormHovered ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <img src="/doodles/university.png" alt="Peeking Penguin" className="w-[145px] h-[145px] object-contain drop-shadow-lg transform rotate-6" />
            </div>
          </motion.div>

          <motion.div 
            className="w-full bg-white neu-card p-6 sm:p-7 relative z-10 overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* German Flag Tricolor Top Bar */}
            <div className="absolute top-0 left-0 w-full h-2 flex">
              <div className="flex-1 bg-germany-black"></div>
              <div className="flex-1 bg-germany-red"></div>
              <div className="flex-1 bg-germany-gold"></div>
            </div>

            {!submitted ? (
              <>
                <div className="text-center mt-1 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-germany-red/10 text-germany-red rounded-full font-extrabold text-[10px] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Free 1-on-1 Consultation</span>
                  </div>
                  <h3 className="font-display text-2xl text-germany-black tracking-wide leading-tight">
                    Get in Touch
                  </h3>
                  <p className="text-[11px] md:text-xs font-bold text-gray-500 mt-0.5">
                    Speak directly with an alumnus from a top German university.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Your Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma" 
                        className="w-full pl-10 pr-4 py-2 neu-input font-bold text-germany-black text-xs placeholder-gray-400" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Email</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com" 
                          className="w-full pl-8 pr-3 py-2 neu-input font-bold text-germany-black text-xs placeholder-gray-400" 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">WhatsApp No.</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765..." 
                          className="w-full pl-8 pr-3 py-2 neu-input font-bold text-germany-black text-xs placeholder-gray-400" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">I Need Help With</label>
                    <div className="relative">
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full pl-3 pr-10 py-2 neu-input font-bold text-germany-black text-xs bg-white cursor-pointer flex items-center justify-between min-h-[38px]"
                      >
                        <span className="truncate">
                          {serviceOptions.find(o => o.value === service)?.label || service}
                        </span>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-2 bg-[#EBE7E0] border border-[#E2DDD3] p-1.5 shadow-[6px_6px_16px_rgba(71,85,105,0.4),inset_-4px_-4px_10px_rgba(71,85,105,0.3),inset_4px_4px_10px_rgba(255,255,255,1)] rounded-[15px]"
                          >
                            {serviceOptions.map((option) => (
                              <div
                                key={option.value}
                                onClick={() => {
                                  setService(option.value);
                                  setIsDropdownOpen(false);
                                }}
                                className={`px-3 py-2 text-xs font-bold cursor-pointer rounded-xl transition-colors ${
                                  service === option.value 
                                    ? 'bg-germany-red/10 text-germany-red' 
                                    : 'text-germany-black hover:bg-white/50'
                                }`}
                              >
                                {option.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Your Message / Target Program (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                      <textarea 
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="e.g. M.Sc. Computer Science for Winter 2026..." 
                        className="w-full pl-8 pr-3 py-1.5 neu-input font-bold text-germany-black text-xs placeholder-gray-400 resize-none" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full neu-btn-primary py-2.5 px-4 font-bold text-xs sm:text-sm cursor-pointer gap-2 flex items-center justify-center mt-1 disabled:opacity-50"
                  >
                    <span>{loading ? 'Submitting Request...' : 'Request Free Consultation'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-center font-bold text-gray-400 pt-0.5">
                    🔒 We respect your privacy. Fast WhatsApp/Email response within 24h.
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-4"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                
                <div>
                  <h4 className="font-display text-2xl text-germany-black">Vielen Dank!</h4>
                  <p className="text-xs font-bold text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    Thanks for reaching out, <strong className="text-germany-black">{name || 'there'}</strong>. One of our Germany education advisors will connect with you via WhatsApp/Email shortly.
                  </p>
                </div>

                <div className="p-3.5 bg-[#EBE7E0]/60 rounded-2xl border border-[#E2DDD3] text-left space-y-1 text-xs font-bold text-gray-700">
                  <div className="flex justify-between">
                    <span>Topic:</span>
                    <strong className="text-germany-black">{service}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <strong className="text-emerald-700">Within 24 Hours</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="neu-btn w-full py-2.5 text-xs font-extrabold text-gray-700 hover:text-germany-red"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
