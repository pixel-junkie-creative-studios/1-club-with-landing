"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function AppLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(Math.floor(currentProgress));
      
      if (currentProgress === 100) {
        clearInterval(interval);
      }
    }, 100);

    // Initial entrance animation
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Exit animation timeline
    const tl = gsap.timeline({
      delay: 0.5, // Reduced delay for faster transition
      onComplete: () => {
        onComplete();
      }
    });

    tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power3.in" })
      .to(barRef.current, { opacity: 0, duration: 0.2 }, "-=0.2")
      .to(containerRef.current, { opacity: 0, backdropFilter: "blur(0px)", duration: 0.6, ease: "power2.inOut" });

    // Fallback in case GSAP hangs
    const fallbackTimer = setTimeout(() => {
      onComplete();
    }, 3000); // Faster fallback

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      tl.kill(); // Fix for React 18 Strict Mode
    };
  }, []); // Empty dependency array prevents infinite re-renders

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-fintech-dark text-white"
    >
      <div ref={textRef} className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-fintech-accent to-blue-400 shadow-lg shadow-blue-500/30 flex items-center justify-center mb-6">
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2">1% CLUB</h1>
        <p className="text-fintech-gray-400 text-sm font-medium tracking-widest uppercase mb-8">Ecosystem Initialization</p>
        
        <div ref={barRef} className="w-48">
          <div className="flex justify-between text-xs text-fintech-gray-500 mb-2 font-mono">
            <span>SYS.BOOT</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-fintech-accent transition-all duration-100 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
