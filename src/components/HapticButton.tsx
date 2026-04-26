"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface HapticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger' | 'ghost' | 'glass';
}

export function HapticButton({ 
  children, 
  className, 
  variant = 'default',
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props 
}: HapticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { 
        scale: 1.02,
        duration: 0.4,
        ease: "elastic.out(1, 0.75)"
      });
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { 
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
    onMouseLeave?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.96, duration: 0.15, ease: "power2.out" });
    }
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 1.02, duration: 0.4, ease: "elastic.out(1, 0.75)" });
    }
    onMouseUp?.(e);
  };

  const baseStyles = "relative font-semibold tracking-wide transition-colors duration-300 focus:outline-none rounded-2xl px-6 py-3.5 flex items-center justify-center gap-2 overflow-hidden";
  
  const variants = {
    default: "bg-fintech-accent text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20",
    danger: "bg-fintech-danger/10 text-fintech-danger hover:bg-fintech-danger/20",
    ghost: "bg-transparent text-fintech-accent hover:bg-fintech-gray-100",
    glass: "glass-card text-white hover:bg-white/10 border border-white/10",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(baseStyles, variants[variant], className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  );
}

