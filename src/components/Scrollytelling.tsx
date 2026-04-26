"use client";

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveScreen } = useStore();
  const [phase, setPhase] = useState("SYSTEM INITIALIZATION");

  // Arrays to generate elements declaratively
  const plates = Array.from({ length: 12 });
  const wheels = Array.from({ length: 4 });
  const glassPanels = Array.from({ length: 6 });

  useGSAP(() => {
    // Master timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500vh',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.1) setPhase("SYSTEM INITIALIZATION");
          else if (progress < 0.3) setPhase("PHASE 1: VAULT SECURED");
          else if (progress < 0.5) setPhase("PHASE 2: MOBILITY DEPLOYED");
          else if (progress < 0.7) setPhase("PHASE 3: AVIATION ENGAGED");
          else if (progress < 0.9) setPhase("PHASE 4: ESTATE ACQUIRED");
          else setPhase("PHASE 5: ECOSYSTEM UNLOCKED");
        }
      }
    });

    // --- The Transformer Protocol ---

    // SCROLL 1 (Wealth): The emblem fragments
    masterTl.to('.plate-group-1', { rotateX: 90, z: -100, stagger: 0.1 }, 0);
    masterTl.to('.plate-group-2', { rotateY: 90, z: 100, stagger: 0.1 }, 0.2);
    masterTl.to('.plate-group-3', { rotateZ: 90, z: -50, stagger: 0.1 }, 0.4);

    // SCROLL 2 (Supercars)
    masterTl.to('.plate-group-1', { scaleX: 3, scaleY: 0.2, rotateX: 0, stagger: 0.05 }, "-=0.5");
    masterTl.to('.plate-group-2', { scaleX: 0.2, scaleY: 3, rotateY: 0, stagger: 0.05 }, "-=0.5");
    masterTl.to('.plate-group-3', { scale: 2, rotateZ: 0, stagger: 0.05 }, "-=0.5");
    masterTl.to('.wheel', { x: (i) => [-150, -50, 50, 150][i], y: 200, opacity: 1, stagger: 0.1 }, "-=0.3");

    // SCROLL 3 (Aviation)
    masterTl.to('.wheel', { y: 0, scale: 0, opacity: 0, stagger: 0.05 }, "-=0.2");
    masterTl.to('.plate-0, .plate-1', { x: -150, stagger: 0.1 }, "-=0.5");
    masterTl.to('.plate-2, .plate-3', { x: 150, stagger: 0.1 }, "-=0.5");
    masterTl.to('.plate-4, .plate-5', { rotateX: 90, z: -100, stagger: 0.1 }, "-=0.3");
    masterTl.to('.plate-6, .plate-7', { rotateX: -90, z: 100, stagger: 0.1 }, "-=0.3");

    // SCROLL 4 (Mansions)
    masterTl.to('.plate', { rotateX: 90, z: (i) => (i % 2 === 0 ? -200 : 200), stagger: 0.05 }, "-=0.5");
    masterTl.to('.glass-panel', { opacity: 1, y: 0, stagger: 0.05 }, "-=0.3");

    // FINAL (The Portal)
    masterTl.to('.plate', { scale: 0.1, rotateZ: 360, borderRadius: '50%', opacity: 0, stagger: 0.01 }, "-=0.5");
    masterTl.to('.glass-panel', { scale: 0, opacity: 0, stagger: 0.01 }, "-=0.5");
    masterTl.to('.hero-text', { opacity: 0, scale: 2, duration: 0.5 }, "-=0.5");

    // Reveal final button
    masterTl.fromTo('.final-portal', 
      { opacity: 0, scale: 0.5, pointerEvents: 'none' },
      { opacity: 1, scale: 1, pointerEvents: 'auto', duration: 0.5, ease: "back.out(1.7)" }
    );

    // Force a refresh to calculate pin spacer height accurately
    ScrollTrigger.refresh();

  }, { scope: containerRef }); // Automatically handles GSAP cleanup and context

  return (
    <div className="w-full relative bg-fintech-dark">
      <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-fintech-dark flex items-center justify-center">
      
      {/* God Level HUD Overlay */}
      <div className="absolute top-8 left-8 z-[200] pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-fintech-accent animate-pulse shadow-fintech-glow"></div>
          <span className="text-xs font-mono font-bold tracking-widest text-fintech-accent">{phase}</span>
        </div>
        <div className="h-px w-32 bg-gradient-to-r from-fintech-accent to-transparent mt-2 opacity-50"></div>
      </div>

      <div className="absolute bottom-8 left-0 w-full flex justify-center z-[200] pointer-events-none">
        <div className="flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-mono tracking-widest text-white uppercase">Initiate Scroll Sequence</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

      {/* Hero 1% Text */}
      <div className="hero-text absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-fintech-gray-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          1%
        </div>
      </div>

      {/* Structural Geometry (Plates) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none perspective-[1000px] transform-style-3d">
        {plates.map((_, i) => (
          <div
            key={`plate-${i}`}
            className={cn(
              `plate plate-${i} absolute w-64 h-64 border border-fintech-accent/30 shadow-[0_0_15px_rgba(0,122,255,0.1)]`,
              i < 4 ? 'plate-group-1' : i < 8 ? 'plate-group-2' : 'plate-group-3'
            )}
            style={{
              background: `radial-gradient(circle at ${i * 30}% ${i * 20}%, rgba(0,122,255,0.1), rgba(10,10,10,0.8))`,
              backdropFilter: 'blur(4px)'
            }}
          />
        ))}

        {/* Wheels / Turbines */}
        {wheels.map((_, i) => (
          <div
            key={`wheel-${i}`}
            className="wheel absolute w-24 h-24 rounded-full border-2 border-fintech-accent opacity-0"
            style={{
              background: 'radial-gradient(circle, rgba(0,122,255,0.2) 20%, transparent 80%)',
              boxShadow: '0 0 20px rgba(0,122,255,0.3) inset'
            }}
          />
        ))}

        {/* Glass Panels (Mansions) */}
        {glassPanels.map((_, i) => (
          <div
            key={`glass-${i}`}
            className="glass-panel absolute w-80 h-96 opacity-0 translate-y-[-50px]"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px'
            }}
          />
        ))}
      </div>

      {/* Final Portal Button */}
      <div className="final-portal absolute z-50 opacity-0 scale-50">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-fintech-accent to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <HapticButton 
            onClick={() => setActiveScreen('wallet')}
            className="relative px-12 py-6 bg-black rounded-full border border-white/10 text-white font-bold tracking-widest uppercase text-lg hover:bg-white/5 transition-all flex items-center gap-3"
          >
            Enter Ecosystem
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </HapticButton>
        </div>
      </div>
      </div>
    </div>
  );
}