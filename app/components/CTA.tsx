"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section id="cta" className="py-24 px-4 neu-bg relative overflow-hidden z-20">
      <div className="max-w-5xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden relative rounded-[40px] bg-germany-gold p-10 md:p-16 text-center shadow-[12px_12px_30px_rgba(244,162,97,0.4),inset_-8px_-8px_16px_rgba(200,110,40,0.3),inset_8px_8px_16px_rgba(255,230,180,0.9)]"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-germany-red/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-germany-gold/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-32 bg-germany-black/5 rotate-[-15deg] blur-[40px] pointer-events-none"></div>

          {/* Doodles */}
          <img 
            src="/doodles/contact us.png" 
            alt="Contact" 
            className="absolute -left-4 md:left-8 bottom-0 w-32 md:w-48 object-contain drop-shadow-md z-10 pointer-events-none hidden sm:block" 
          />
          <img 
            src="/doodles/happy.png" 
            alt="Happy" 
            className="absolute -right-4 md:right-8 top-8 w-24 md:w-40 object-contain drop-shadow-md z-10 pointer-events-none hidden sm:block transform rotate-12" 
          />

          <div className="relative z-20 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-germany-black drop-shadow-sm">
              Ready to start your <br className="hidden sm:block" /><span className="text-white drop-shadow-md">German Journey?</span>
            </h2>
            <p className="text-germany-black/90 font-extrabold text-sm md:text-base mb-10 max-w-xl mx-auto">
              Create your free account today. Let our AI evaluate your profile, draft your documents, and connect you with a dedicated guide. No commitments required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="neu-btn-primary w-full sm:w-auto px-8 py-4 gap-2 text-base inline-flex items-center justify-center">
                <span>Start for Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="neu-btn w-full sm:w-auto px-8 py-4 text-germany-black font-extrabold text-base inline-flex items-center justify-center">
                Talk to Sales
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;
