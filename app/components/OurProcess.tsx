"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { title: "Make an Account", desc: "Sign up in seconds and get access.", pos: { left: "15%", top: "10%" } },
  { title: "Upload Documents", desc: "Our AI evaluates your profile instantly.", pos: { left: "75%", top: "28%" } },
  { title: "Talk to Your Guide", desc: "Match with an expert for your strategy.", pos: { left: "50%", top: "50%" } },
  { title: "Choose Your Plan", desc: "Select a tier that fits your needs.", pos: { left: "25%", top: "72%" } },
  { title: "Journey to Germany", desc: "We handle visa and admission!", pos: { left: "85%", top: "70%" } },
];

const OurProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopWrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ==========================================
    // DESKTOP: Sticky Winding Map Animation
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      if (!pathRef.current || !desktopWrapperRef.current) return;
      
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopWrapperRef.current,
          start: "top top",
          end: "+=3000", // 3000px of scrolling to complete the map
          scrub: 1,
          pin: true,
        }
      });

      // 1. Draw the main red road
      tl.to(pathRef.current, { strokeDashoffset: 0, ease: "none", duration: 1 });

      // 2. Pop the cards (and their doodles) as the road reaches them
      desktopCardsRef.current.forEach((card, i) => {
        if (!card) return;
        const triggerTime = i * 0.23; 
        
        tl.fromTo(card,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "back.out(1.5)", duration: 0.1 },
          triggerTime
        );
      });
    });

    // ==========================================
    // MOBILE: Vertical Scrolling Timeline
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      if (!containerRef.current || !mobileLineRef.current) return;

      gsap.fromTo(mobileLineRef.current, 
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      mobileCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: 50, scale: 0.9 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

  }, { scope: containerRef });

  return (
    <section id="our-process" ref={containerRef} className=" relative w-full overflow-hidden z-20">
      
      {/* 
        ========================================================
        DESKTOP LAYOUT
        ========================================================
      */}
      <div ref={desktopWrapperRef} className="hidden md:flex relative w-full h-screen items-center justify-center pt-[80px]">
        
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[4px_4px_12px_rgba(71,85,105,0.4),inset_-2px_-2px_6px_rgba(71,85,105,0.4),inset_2px_2px_6px_rgba(255,255,255,1)] text-xs tracking-wide mb-4">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            The Journey Map
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-2">How We Work</h2>
        </div>

        <div className="relative w-full max-w-[1200px] h-[80vh] mx-auto mt-[5%]">
          


          {/* Scenic Environment */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* End of Main Road Scenery (Tent) */}
            <img src="/doodles/tent-Photoroom.png" alt="Tent" className="absolute left-[92%] top-[75%] w-28 md:w-36 object-contain opacity-90 drop-shadow-md transform -rotate-3" />
          </div>



          {/* Background SVG Road (Empty Groove) */}
          <svg viewBox="0 0 1000 950" className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
            <path 
              d="M 150,80 C 800,80 900,224 500,400 C 100,576 250,720 850,720" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="20" 
              strokeLinecap="round" 
              style={{ filter: "drop-shadow(4px 4px 6px rgba(71,85,105,0.5))" }}
            />
          </svg>
          
          {/* Active SVG Road (Red Fill) */}
          <svg viewBox="0 0 1000 950" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              d="M 150,80 C 800,80 900,224 500,400 C 100,576 250,720 850,720" 
              fill="none" 
              stroke="#E63946" 
              strokeWidth="12" 
              strokeLinecap="round" 
              style={{ filter: "drop-shadow(0 0 8px rgba(230,57,70,0.6))" }}
            />
          </svg>

          {/* Map Checkpoint Cards */}
          {steps.map((step, index) => (
            <div 
              key={index} 
              ref={el => { if(el) desktopCardsRef.current[index] = el; }}
              className="absolute w-[240px] lg:w-[280px] -translate-x-1/2 -translate-y-1/2 z-20 opacity-0"
              style={{ left: step.pos.left, top: step.pos.top }}
            >
              {/* Checkpoint Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[6px_6px_12px_rgba(71,85,105,0.5),inset_-2px_-2px_4px_rgba(71,85,105,0.4),inset_2px_2px_4px_rgba(255,255,255,1)] z-[-1]">
                <span className="w-5 h-5 bg-germany-gold rounded-full shadow-inner animate-pulse"></span>
              </div>
              
              {/* Card Wrapper */}
              <div className={`relative mt-8 ${index % 2 === 0 ? 'ml-12' : '-ml-12'}`}>
                {/* Clay Card Body */}
                <div className="neu-card p-5 bg-white relative z-20">
                  <h3 className="text-lg font-display text-germany-black leading-tight mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs font-bold">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ========================================================
        MOBILE LAYOUT
        ========================================================
      */}
      <div className="md:hidden py-24 px-4">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[4px_4px_12px_rgba(71,85,105,0.4),inset_-2px_-2px_6px_rgba(71,85,105,0.4),inset_2px_2px_6px_rgba(255,255,255,1)] text-xs tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Seamless Workflow
          </div>
          <h2 className="font-display text-4xl text-germany-black mb-4">How We Work</h2>
        </div>

        <div className="relative max-w-sm mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-2 bg-white shadow-[inset_2px_2px_5px_rgba(71,85,105,0.5),inset_-2px_-2px_5px_rgba(255,255,255,1)] rounded-full -translate-x-1/2 z-0"></div>
          <div ref={mobileLineRef} className="absolute left-6 top-0 w-2 bg-germany-red rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(230,57,70,0.6)] origin-top"></div>

          <div className="space-y-16 relative z-20 pt-8 pb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center justify-between w-full">
                
                <div className="absolute left-6 w-8 h-8 rounded-full bg-white flex items-center justify-center -translate-x-1/2 z-20 shadow-[4px_4px_8px_rgba(71,85,105,0.5),inset_-2px_-2px_4px_rgba(71,85,105,0.4),inset_2px_2px_4px_rgba(255,255,255,1)]">
                  <span className="w-3 h-3 bg-germany-gold rounded-full shadow-inner"></span>
                </div>

                <div 
                  ref={el => { if(el) mobileCardsRef.current[index] = el; }}
                  className="w-full pl-14"
                >
                  <div className="relative">
                    <div className="neu-card p-6 bg-white relative z-20">
                      <h3 className="text-lg font-display text-germany-black mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-xs font-bold leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default OurProcess;
