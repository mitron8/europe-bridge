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
  const planeRef = useRef<HTMLDivElement>(null);
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
      
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      // Initialize airplane at starting point
      const startPoint = path.getPointAtLength(0);
      const nextStart = path.getPointAtLength(8);
      const initialAngle = Math.atan2(nextStart.y - startPoint.y, nextStart.x - startPoint.x) * (180 / Math.PI);
      
      if (planeRef.current) {
        planeRef.current.style.left = `${(startPoint.x / 1000) * 100}%`;
        planeRef.current.style.top = `${(startPoint.y / 950) * 100}%`;
        planeRef.current.style.transform = `translate(-50%, -50%) rotate(${initialAngle}deg)`;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopWrapperRef.current,
          start: "top top",
          end: "+=2800", // Smooth scroll distance to complete the map
          scrub: 1,
          pin: true,
        }
      });

      // 1. Draw the main red road AND fly the aerial airplane along the curve
      tl.to(path, { 
        strokeDashoffset: 0, 
        ease: "none", 
        duration: 1,
        onUpdate: function() {
          if (!path || !planeRef.current) return;
          const progress = this.progress();
          const currentLength = progress * pathLength;
          const point = path.getPointAtLength(currentLength);
          
          // Calculate heading angle for 360-degree aerial flight steering
          let angle = initialAngle;
          if (currentLength < pathLength - 2) {
            const nextLength = Math.min(pathLength, currentLength + 8);
            const nextPoint = path.getPointAtLength(nextLength);
            angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
          } else {
            const prevLength = Math.max(0, currentLength - 8);
            const prevPoint = path.getPointAtLength(prevLength);
            angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI);
          }

          // Smoothly touch down & disappear as the airplane reaches the campus destination
          let opacity = 1;
          let scale = 1;
          if (progress > 0.80) {
            // Smoothly land and fade out between 80% and 93% progress
            opacity = Math.max(0, 1 - (progress - 0.80) / 0.13);
            scale = 0.4 + opacity * 0.6;
          }
          if (progress >= 0.93) {
            opacity = 0;
            scale = 0.4;
          }

          planeRef.current.style.opacity = `${opacity}`;
          planeRef.current.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
          planeRef.current.style.left = `${(point.x / 1000) * 100}%`;
          planeRef.current.style.top = `${(point.y / 950) * 100}%`;
          planeRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
        }
      });

      // 2. Pop the cards as the road reaches them
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
    <section id="our-process" ref={containerRef} className="relative w-full overflow-hidden z-20">
      
      {/* 
        ========================================================
        DESKTOP LAYOUT
        ========================================================
      */}
      <div ref={desktopWrapperRef} className="hidden md:flex relative w-full h-screen items-center justify-center pt-[80px]">
        
        {/* Header */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[4px_4px_12px_rgba(71,85,105,0.4),inset_-2px_-2px_6px_rgba(71,85,105,0.4),inset_2px_2px_6px_rgba(255,255,255,1)] text-xs tracking-wide mb-4">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            The Journey Map
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-2">How We Work</h2>
        </div>

        <div className="relative w-full max-w-[1200px] h-[80vh] mx-auto mt-[5%]">
          
          {/* Scenic German University Campus Landmark at finish line */}
          <div className="absolute left-[80%] lg:left-[83%] top-[56%] lg:top-[58%] pointer-events-none z-10">
            <img 
              src="/illustrations/german-campus.png" 
              alt="German University Campus" 
              className="w-48 sm:w-60 lg:w-72 h-auto object-contain drop-shadow-xl" 
            />
          </div>

          {/* 2D Cartoon Airplane (Upper / Top-Down View) flying along the road */}
          <div 
            ref={planeRef}
            className="absolute pointer-events-none z-30 will-change-transform"
            style={{ left: "15%", top: "8%" }}
          >
            <img 
              src="/illustrations/airplane-top.png" 
              alt="Airplane Flying" 
              className="w-16 sm:w-20 lg:w-24 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" 
            />
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

          {/* Mobile Campus Destination */}
          <div className="pt-4 flex flex-col items-center text-center relative z-20">
            <img 
              src="/illustrations/german-campus.png" 
              alt="German University Campus" 
              className="w-48 h-auto object-contain drop-shadow-md mb-2" 
            />
            <span className="text-[11px] font-black text-germany-red uppercase tracking-wider">
              Destination: German University Campus
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default OurProcess;
