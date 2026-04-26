"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Dumbbell, Brain, Wrench, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MiningForge() {
  const { kUnits, addKUnits, burnKUnits } = useStore();
  const [protocols, setProtocols] = useState({
    physical: false,
    deepWork: false,
    skill: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [shattering, setShattering] = useState(false);

  const completedCount = Object.values(protocols).filter(Boolean).length;
  const progressPercentage = (completedCount / 3) * 100;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        height: `${progressPercentage}%`,
        duration: 0.8,
        ease: "power3.out",
        backgroundColor: progressPercentage === 100 ? 'var(--color-kult-amber)' : 'var(--color-kult-gray-300)'
      });
    }

    if (progressPercentage === 100) {
      // Auto-mine when all complete
      setTimeout(() => {
        addKUnits(50);
        setProtocols({ physical: false, deepWork: false, skill: false });
        // Add a flash effect
        gsap.fromTo(containerRef.current, 
          { backgroundColor: 'rgba(255, 191, 0, 0.2)' },
          { backgroundColor: 'transparent', duration: 0.5 }
        );
      }, 1000);
    }
  }, [progressPercentage, addKUnits]);

  const handleProtocolToggle = (key: keyof typeof protocols) => {
    setProtocols(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFailProtocol = () => {
    setShattering(true);
    
    // Simulate shattering using GSAP on the container
    if (containerRef.current) {
      const tl = gsap.timeline();
      
      // Glitch and shake
      tl.to(containerRef.current, {
        x: () => Math.random() * 20 - 10,
        y: () => Math.random() * 20 - 10,
        opacity: 0.5,
        filter: 'blur(4px) contrast(200%) grayscale(100%)',
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      })
      // Drop down and fade out
      .to(containerRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          burnKUnits(500); // Massive penalty
          setProtocols({ physical: false, deepWork: false, skill: false });
          setShattering(false);
          
          // Reset
          gsap.set(containerRef.current, { x: 0, y: 0, opacity: 1, scale: 1, filter: 'none' });
        }
      });
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full h-full flex flex-col md:flex-row gap-12" ref={containerRef}>
      <div className="flex-1">
        <div className="mb-8 border-l-4 border-kult-amber pl-4">
          <h1 className="text-4xl font-mono font-black tracking-tighter uppercase">The Mining Forge</h1>
          <p className="text-kult-gray-300 font-mono text-sm mt-1">REAL-TIME K-UNIT GENERATION // DAILY PROTOCOL</p>
        </div>

        <div className="space-y-4">
          <ProtocolItem 
            icon={Dumbbell} 
            title="PHYSICAL DOMINANCE" 
            desc="1HR Intense Training / Sparring" 
            active={protocols.physical} 
            onClick={() => handleProtocolToggle('physical')} 
          />
          <ProtocolItem 
            icon={Brain} 
            title="DEEP WORK" 
            desc="4HRS Uninterrupted Focus Block" 
            active={protocols.deepWork} 
            onClick={() => handleProtocolToggle('deepWork')} 
          />
          <ProtocolItem 
            icon={Wrench} 
            title="SKILL ACQUISITION" 
            desc="1HR High-Income Skill Study" 
            active={protocols.skill} 
            onClick={() => handleProtocolToggle('skill')} 
          />
        </div>

        <div className="mt-12 p-6 border border-kult-red/30 bg-kult-red/5">
          <h2 className="text-kult-red font-mono text-sm mb-2 flex items-center gap-2">
            <AlertTriangle size={16} /> PROTOCOL FAILURE
          </h2>
          <p className="text-kult-gray-300 font-mono text-xs mb-4">Failing to meet the daily requirements results in immediate capital destruction.</p>
          <HapticButton variant="danger" onClick={handleFailProtocol} disabled={shattering}>
            CONFIRM FAILURE (BURN 500 K)
          </HapticButton>
        </div>
      </div>

      <div className="w-full md:w-32 flex flex-col items-center">
        <h3 className="font-mono text-xs text-kult-gray-300 mb-4 text-center tracking-widest" style={{ writingMode: 'vertical-rl' }}>MINING PROGRESS</h3>
        <div className="relative w-16 flex-1 bg-kult-charcoal border border-kult-gray-200 min-h-[300px] flex flex-col justify-end">
          {/* Progress Bar Fill */}
          <div 
            ref={progressBarRef}
            className="w-full bottom-0 absolute bg-kult-gray-300" 
            style={{ height: '0%' }}
          ></div>
          
          {/* Marker lines */}
          <div className="absolute top-1/3 w-full h-px bg-kult-charcoal z-10"></div>
          <div className="absolute top-2/3 w-full h-px bg-kult-charcoal z-10"></div>
        </div>
        <div className="mt-4 font-mono font-bold text-white">
          {progressPercentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

function ProtocolItem({ icon: Icon, title, desc, active, onClick }: { icon: any, title: string, desc: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center p-4 border transition-all duration-300 text-left group",
        active ? "bg-kult-amber/10 border-kult-amber" : "bg-kult-charcoal/50 border-kult-gray-200 hover:border-kult-gray-300"
      )}
    >
      <div className={cn(
        "p-3 border mr-4 transition-colors",
        active ? "bg-kult-amber text-black border-kult-amber" : "bg-transparent text-kult-gray-300 border-kult-gray-200 group-hover:text-white"
      )}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className={cn("font-mono font-bold text-lg", active ? "text-white" : "text-kult-gray-300 group-hover:text-white")}>{title}</h3>
        <p className={cn("font-mono text-xs", active ? "text-kult-amber" : "text-kult-gray-300")}>{desc}</p>
      </div>
      <div className="ml-auto">
        <div className={cn(
          "w-6 h-6 border transition-colors",
          active ? "bg-kult-amber border-kult-amber" : "bg-transparent border-kult-gray-300"
        )}></div>
      </div>
    </button>
  );
}
