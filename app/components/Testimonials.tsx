"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Aarav S.",
    university: "TU Munich",
    text: "The AI SOP builder is insane. I had no idea how to structure my motivation letter for Germany. EuropeBridge drafted a perfect version that my guide just tweaked a little. Got admitted in 3 weeks!",
    doodle: "/doodles/laptop.png",
    doodleClasses: "-top-12 -right-6 w-24 h-24 transform rotate-6",
    delay: 0
  },
  {
    id: 2,
    name: "Priya M.",
    university: "RWTH Aachen",
    text: "I was super stressed about the Blocked Account and APS. Their tracker literally walked me through every single document I needed. Zero confusion. I recommend this to everyone going to Germany.",
    doodle: "/doodles/sucesss.png",
    doodleClasses: "-bottom-10 -right-6 w-28 h-28 transform -rotate-12",
    delay: 0.2
  },
  {
    id: 3,
    name: "Rohan K.",
    university: "HU Berlin",
    text: "I thought my GPA was too low for a public uni. The calculator showed me 15 programs I was eligible for, and my counselor got my visa approved flawlessly. They handle everything.",
    doodle: "/doodles/visa approved.png",
    doodleClasses: "-top-14 -left-8 w-28 h-28 transform -rotate-6",
    delay: 0.4
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 neu-bg relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[inset_2px_2px_5px_rgba(71,85,105,0.5),inset_-2px_-2px_5px_rgba(255,255,255,1)] text-xs tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Student Success Stories
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-4">Don't just take our word for it.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold text-sm lg:text-base">
            Join hundreds of students who successfully navigated the German admission process using EuropeBridge's automated tools and human experts.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 px-4 lg:px-0 mt-12">
          {testimonials.map((t) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: t.delay }}
              className="neu-card p-8 bg-white relative flex flex-col"
            >
              {/* Decorative Doodle */}
              <img 
                src={t.doodle} 
                alt="Student Doodle" 
                className={`absolute z-30 object-contain drop-shadow-xl pointer-events-none ${t.doodleClasses}`} 
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-germany-gold text-germany-gold drop-shadow-sm" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 font-bold text-sm italic mb-8 flex-grow leading-relaxed">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-display text-slate-500 text-lg shadow-inner">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-germany-black text-sm">{t.name}</div>
                  <div className="text-xs font-bold text-germany-red">{t.university}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
