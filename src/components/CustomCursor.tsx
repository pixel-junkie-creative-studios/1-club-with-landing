"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorOuterRef.current || !cursorInnerRef.current) return;

    gsap.set(cursorOuterRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorInnerRef.current, { xPercent: -50, yPercent: -50 });

    const xToOuter = gsap.quickTo(cursorOuterRef.current, "x", { duration: 0.15, ease: "power3" });
    const yToOuter = gsap.quickTo(cursorOuterRef.current, "y", { duration: 0.15, ease: "power3" });
    const xToInner = gsap.quickTo(cursorInnerRef.current, "x", { duration: 0.05, ease: "power3" });
    const yToInner = gsap.quickTo(cursorInnerRef.current, "y", { duration: 0.05, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xToOuter(e.clientX);
      yToOuter(e.clientY);
      xToInner(e.clientX);
      yToInner(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursorOuterRef.current, { scale: 1.8, backgroundColor: 'rgba(0, 122, 255, 0.1)', duration: 0.3 });
      gsap.to(cursorInnerRef.current, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorOuterRef.current, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(cursorInnerRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Mutation observer to handle dynamically added elements
    const observeInteractiveElements = () => {
      const interactives = document.querySelectorAll('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactives;
    };

    let currentInteractives = observeInteractiveElements();

    const observer = new MutationObserver(() => {
      currentInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      currentInteractives = observeInteractiveElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      currentInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body, button, a { cursor: none !important; }
      `}} />
      <div 
        ref={cursorOuterRef} 
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-fintech-accent rounded-full pointer-events-none z-[9999] shadow-fintech-glow mix-blend-screen"
      />
      <div 
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000]" 
      />
    </>
  );
}
