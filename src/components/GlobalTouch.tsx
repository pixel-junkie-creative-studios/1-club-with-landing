"use client";

import React, { useEffect } from 'react';
import gsap from 'gsap';

export function GlobalTouch() {
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Create a ripple element
      const ripple = document.createElement('div');
      ripple.className = 'fixed pointer-events-none z-[9999] rounded-full border border-fintech-accent/50 bg-fintech-accent/10';
      ripple.style.width = '40px';
      ripple.style.height = '40px';
      ripple.style.left = `${e.clientX - 20}px`;
      ripple.style.top = `${e.clientY - 20}px`;
      
      document.body.appendChild(ripple);

      // Animate the ripple using GSAP
      gsap.fromTo(ripple, 
        { scale: 0, opacity: 1 },
        { 
          scale: 3, 
          opacity: 0, 
          duration: 0.8, 
          ease: "power2.out",
          onComplete: () => {
            ripple.remove();
          }
        }
      );
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return null;
}
