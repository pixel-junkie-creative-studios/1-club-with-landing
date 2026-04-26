"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Target, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DailyGoals() {
  const { addKUnits, burnKUnits } = useStore();
  const [goals, setGoals] = useState({
    physical: false,
    deepWork: false,
    skill: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const [deducting, setDeducting] = useState(false);

  const completedCount = Object.values(goals).filter(Boolean).length;
  const progressPercentage = (completedCount / 3) * 100;
  const circumference = 2 * Math.PI * 60; // r=60
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (progressCircleRef.current) {
      gsap.to(progressCircleRef.current, {
        strokeDashoffset,
        duration: 1,
        ease: "power2.out",
        stroke: progressPercentage === 100 ? 'var(--color-fintech-success)' : 'var(--color-fintech-accent)'
      });
    }

    if (progressPercentage === 100) {
      setTimeout(() => {
        addKUnits(50);
        setGoals({ physical: false, deepWork: false, skill: false });
        // Soft success glow
        if (containerRef.current) {
          gsap.fromTo(containerRef.current, 
            { boxShadow: '0 0 40px rgba(52, 199, 89, 0.2)' },
            { boxShadow: '0 0 0px rgba(52, 199, 89, 0)', duration: 1 }
          );
        }
      }, 800);
    }
  }, [progressPercentage, strokeDashoffset, addKUnits]);

  const handleGoalToggle = (key: keyof typeof goals) => {
    setGoals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMissedGoals = () => {
    setDeducting(true);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: -10,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
        onComplete: () => {
          burnKUnits(100);
          setGoals({ physical: false, deepWork: false, skill: false });
          setDeducting(false);
          gsap.set(containerRef.current, { x: 0 });
        }
      });
    }
  };

  return (
    <div ref={containerRef} className="p-8 max-w-4xl mx-auto w-full h-full pt-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Daily Objectives</h1>
          <p className="text-fintech-gray-400 font-medium text-sm">Complete tasks to earn rewards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          <GoalItem 
            title="Physical Activity" 
            desc="1 hour of exercise or gym" 
            active={goals.physical} 
            onClick={() => handleGoalToggle('physical')} 
          />
          <GoalItem 
            title="Deep Work" 
            desc="4 hours of uninterrupted focus" 
            active={goals.deepWork} 
            onClick={() => handleGoalToggle('deepWork')} 
          />
          <GoalItem 
            title="Skill Development" 
            desc="1 hour of high-value skill learning" 
            active={goals.skill} 
            onClick={() => handleGoalToggle('skill')} 
          />

          <div className="mt-8 pt-8">
            <div className="glass-card p-6 border-fintech-danger/20 flex items-start gap-4">
              <div className="text-fintech-danger mt-1">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Missed Objectives</h3>
                <p className="text-fintech-gray-400 text-sm mb-4">Failing to meet your daily requirements results in a deduction from your balance.</p>
                <HapticButton variant="danger" onClick={handleMissedGoals} disabled={deducting} className="py-2.5 px-5 text-sm">
                  Acknowledge Missed Goals (-$100.00)
                </HapticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-white mb-8">Daily Progress</h3>
          
          <div className="relative flex items-center justify-center">
            <svg width="160" height="160" className="transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="60"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                ref={progressCircleRef}
                cx="80"
                cy="80"
                r="60"
                stroke="var(--color-fintech-accent)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-white">{completedCount}/3</span>
              <span className="text-xs font-medium text-fintech-gray-400 mt-1">Completed</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-fintech-gray-400">Reward upon completion</p>
            <p className="text-xl font-bold text-fintech-success mt-1">+$50.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalItem({ title, desc, active, onClick }: { title: string, desc: string, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card p-5 flex items-center cursor-pointer transition-all duration-300 transform hover:scale-[1.01]",
        active ? "border-fintech-accent/30 bg-fintech-accent/5" : "hover:bg-white/5"
      )}
    >
      <div className={cn(
        "mr-5 transition-colors duration-300",
        active ? "text-fintech-accent" : "text-fintech-gray-400"
      )}>
        {active ? <CheckCircle2 size={28} /> : <Circle size={28} />}
      </div>
      <div>
        <h3 className={cn("font-semibold text-lg transition-colors", active ? "text-white" : "text-fintech-gray-200")}>{title}</h3>
        <p className="text-sm text-fintech-gray-400">{desc}</p>
      </div>
    </div>
  );
}
