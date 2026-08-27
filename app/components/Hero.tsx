"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [maxScore, setMaxScore] = useState("");
  const [minScore, setMinScore] = useState("");
  const [yourScore, setYourScore] = useState("");
  const [calculatedGpa, setCalculatedGpa] = useState<string | null>(null);

  const calculateGpa = (e: React.FormEvent) => {
    e.preventDefault();
    const max = parseFloat(maxScore);
    const min = parseFloat(minScore);
    const yours = parseFloat(yourScore);

    if (!isNaN(max) && !isNaN(min) && !isNaN(yours) && max !== min) {
      // Modified Bavarian Formula
      const germanGpa = 1 + 3 * (max - yours) / (max - min);
      // Ensure GPA is bounded logically
      setCalculatedGpa(Math.max(1.0, Math.min(6.0, germanGpa)).toFixed(1));
    }
  };

  return (
    <section id="hero" className="relative min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-center pt-[120px] lg:pt-[80px] pb-[60px] lg:pb-[20px] px-4 md:px-[5%] overflow-hidden neu-bg">
      
      {/* Animated Background Elements */}
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

      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto z-10 gap-12 lg:gap-16 mt-4 lg:mt-0">
        
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
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.8rem] leading-tight md:leading-[0.4] text-germany-black relative drop-shadow-sm flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2">
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
          
          <p className="text-sm md:text-base pt-4 leading-snug font-bold text-gray-500 max-w-xl mx-auto lg:mx-0">
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
              "I'll be guiding you through every step of your German dream. Let's calculate your German GPA below!"
            </div>
          </div>
        </motion.div>

        {/* Right Form Area */}
        <div 
          className="flex-1 w-full max-w-md lg:max-w-[420px] relative z-10 mx-auto"
          onMouseEnter={() => setIsFormHovered(true)}
          onMouseLeave={() => setIsFormHovered(false)}
        >
          {/* Peeking Doodle (Sibling to the card, lower z-index to hide behind it) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 50, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.5, delay: 0.5 }}
            className="absolute -top-[85px] -right-2 z-0 pointer-events-none"
          >
            <div className={`transition-all duration-500 ease-in-out ${isFormHovered ? 'translate-y-16 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <img src="/doodles/university.png" alt="Peeking Penguin" className="w-[150px] h-[150px] object-contain drop-shadow-lg transform rotate-6" />
            </div>
          </motion.div>

          <motion.div 
            className="w-full bg-white neu-card p-6 lg:p-7 relative z-10 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* German Flag Tricolor Top Bar inside the card */}
            <div className="absolute top-0 left-0 w-full h-2 flex">
              <div className="flex-1 bg-germany-black"></div>
              <div className="flex-1 bg-germany-red"></div>
              <div className="flex-1 bg-germany-gold"></div>
            </div>

            <h3 className="font-display text-xl mb-1 text-center text-germany-black tracking-wide drop-shadow-sm mt-1">German GPA Calculator</h3>
            <p className="text-[11px] md:text-xs font-bold text-gray-500 text-center mb-4">Convert your local grades to the German scale.</p>
            
            <form onSubmit={calculateGpa} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-germany-black ml-1">Max Score</label>
                  <input 
                    type="number" 
                    step="any"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    placeholder="e.g. 100" 
                    className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
                    required 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-germany-black ml-1">Min Passing</label>
                  <input 
                    type="number" 
                    step="any"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    placeholder="e.g. 40" 
                    className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-germany-black ml-1">Your Score</label>
                <input 
                  type="number" 
                  step="any"
                  value={yourScore}
                  onChange={(e) => setYourScore(e.target.value)}
                  placeholder="e.g. 8.5 or 75" 
                  className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
                  required 
                />
              </div>

              {calculatedGpa && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '0.5rem' }}
                  className="p-3 bg-germany-gold/10 border border-germany-gold/30 rounded-xl text-center overflow-hidden"
                >
                  <span className="text-xs font-bold text-gray-500">Your German GPA:</span>
                  <div className="text-2xl font-display text-germany-black">{calculatedGpa}</div>
                </motion.div>
              )}

              <div className="mt-1">
                <button type="submit" className="w-full neu-btn-primary px-5 py-3 font-bold text-base cursor-pointer gap-2">
                  <span>Calculate GPA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
