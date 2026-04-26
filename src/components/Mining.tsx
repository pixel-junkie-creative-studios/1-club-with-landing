"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Cpu, Play, Square, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Mining() {
  const { addKUnits } = useStore();
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 mins
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  const TOTAL_TIME = 25 * 60;
  const circumference = 2 * Math.PI * 120; // r=120

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
        setProgress(((TOTAL_TIME - timeRemaining + 1) / TOTAL_TIME) * 100);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      setIsActive(false);
      setCompleted(true);
      addKUnits(1, 'Proof of Focus Reward', 'mining'); // Mints exactly 1 '1% Coin'
      
      // Success flash
      gsap.fromTo(containerRef.current, 
        { boxShadow: '0 0 50px rgba(52, 199, 89, 0.3)' },
        { boxShadow: '0 0 0px rgba(52, 199, 89, 0)', duration: 1.5 }
      );
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, addKUnits]);

  useEffect(() => {
    if (ringRef.current) {
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      gsap.to(ringRef.current, {
        strokeDashoffset,
        duration: 1,
        ease: "linear",
        stroke: completed ? 'var(--color-fintech-success)' : 'var(--color-fintech-accent)'
      });
    }
  }, [progress, circumference, completed]);

  const handleToggle = () => {
    if (completed) {
      // Reset
      setTimeRemaining(TOTAL_TIME);
      setProgress(0);
      setCompleted(false);
      return;
    }
    
    if (isActive) {
      // Penalty/Warning for stopping early
      if (confirm("WARNING: Halting the mining process will destroy all progress. You will receive 0 coins. Are you sure?")) {
        setIsActive(false);
        setTimeRemaining(TOTAL_TIME);
        setProgress(0);
      }
    } else {
      setIsActive(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="p-8 max-w-4xl mx-auto w-full h-full pt-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Live Mining Terminal</h1>
          <p className="text-fintech-gray-400 font-medium text-sm">Proof of Focus protocol. Allocate time to mint 1% Coins.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-fintech-dark border border-white/10 text-fintech-gray-300">
          <Zap size={14} className={isActive ? "text-fintech-accent animate-pulse" : ""} />
          <span>{isActive ? "Network Active" : "Network Idle"}</span>
        </div>
      </div>

      <div className="glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="relative flex items-center justify-center mb-12 mt-8">
          {/* Background Ring */}
          <svg width="280" height="280" className="transform -rotate-90 drop-shadow-2xl">
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress Ring */}
            <circle
              ref={ringRef}
              cx="140"
              cy="140"
              r="120"
              stroke="var(--color-fintech-accent)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              className="drop-shadow-[0_0_15px_rgba(0,112,243,0.5)]"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center">
            {completed ? (
              <CheckCircle2 size={48} className="text-fintech-success mb-2" />
            ) : (
              <Cpu size={32} className={cn("mb-3 transition-colors", isActive ? "text-fintech-accent" : "text-fintech-gray-500")} />
            )}
            <span className={cn(
              "text-5xl font-black tracking-tighter tabular-nums",
              completed ? "text-fintech-success" : "text-white"
            )}>
              {formatTime(timeRemaining)}
            </span>
            <span className="text-xs font-bold text-fintech-gray-400 mt-2 tracking-widest uppercase">
              {completed ? "Block Mined" : isActive ? "Hashing..." : "Ready"}
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-4 z-10">
          <div className="bg-fintech-dark/50 border border-white/5 rounded-xl p-4 flex justify-between items-center text-sm">
            <span className="text-fintech-gray-400">Reward Rate</span>
            <span className="text-white font-bold">1.00 <span className="text-fintech-accent">1% Coin</span></span>
          </div>
          
          {!isActive && !completed && (
            <div className="flex items-start gap-3 text-xs text-fintech-gray-400 bg-fintech-danger/5 border border-fintech-danger/10 p-4 rounded-xl">
              <AlertTriangle size={16} className="text-fintech-danger shrink-0 mt-0.5" />
              <p>Zero-Loophole Policy: You must keep this terminal active for the full duration to prove focus. Leaving or halting will destroy the block.</p>
            </div>
          )}

          <HapticButton 
            variant={completed ? "glass" : isActive ? "danger" : "default"} 
            className="w-full py-4 text-base"
            onClick={handleToggle}
          >
            {completed ? (
              <span>Start New Cycle</span>
            ) : isActive ? (
              <>
                <Square size={18} fill="currentColor" />
                <span>Halt Mining Process</span>
              </>
            ) : (
              <>
                <Play size={18} fill="currentColor" />
                <span>Initialize Protocol</span>
              </>
            )}
          </HapticButton>
        </div>
      </div>
    </div>
  );
}
