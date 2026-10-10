"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ArrowRight, Languages } from 'lucide-react';

const LanguagePartner = () => {
  const [dinoImgSrc, setDinoImgSrc] = useState("/doodles/teacher_dino.png");

  return (
    <section className="py-12 px-4 neu-bg relative overflow-hidden z-20" id="language-school">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="neu-card relative p-6 sm:p-8 md:p-10 border border-white/80 overflow-hidden"
        >
          {/* Subtle Glows */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-germany-gold/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-germany-red/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

            {/* Left: Message & Discount */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full font-bold text-germany-red shadow-[2px_2px_6px_rgba(71,85,105,0.2),inset_-1px_-1px_3px_rgba(71,85,105,0.15),inset_1px_1px_3px_rgba(255,255,255,1)] text-[11px] tracking-wide">
                <Languages className="w-3.5 h-3.5 text-germany-red" />
                <span>Official Partner • Eurolingo Academy</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-germany-black leading-tight">
                Want to learn German? <span className="text-germany-red">Meet Eurolingo Academy!</span>
              </h3>

              <p className="text-gray-600 font-bold text-xs sm:text-sm max-w-lg leading-relaxed">
                Master German from A1 to C1 with live interactive batches, native German trainers, and Goethe &amp; TestDaF exam prep through our partner, Eurolingo Academy.
              </p>

              {/* Simple Discount Badge */}
              <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100/90 text-amber-900 border border-amber-300/60 rounded-full text-xs font-black">
                  <Tag className="w-3 h-3 text-amber-600" />
                  Exclusive 25% Off
                </span>
                <span className="text-xs font-extrabold text-germany-black bg-white px-2.5 py-1 rounded-full shadow-[inset_1px_1px_3px_rgba(210,205,195,0.5)]">
                  Use Code: <strong className="text-germany-red font-black">EUROLINGO25</strong>
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a 
                  href="#language-school"
                  className="neu-btn-primary inline-flex px-6 py-2.5 text-xs sm:text-sm gap-2"
                >
                  <span>Explore Eurolingo Classes</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Dino */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="shrink-0 flex flex-col items-center"
            >
              <img 
                src={dinoImgSrc} 
                alt="Eurolingo Dino Mascot" 
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-md"
              />
              <span className="text-[11px] font-black text-gray-500 mt-1">Dino (Eurolingo Academy)</span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguagePartner;
