"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { TrendingUp, Rocket, Lightbulb, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Venture {
  id: string;
  name: string;
  stage: string;
  valuation: number;
  pricePerShare: number;
  change: string;
  positive: boolean;
  description: string;
  icon: any;
  color: string;
  bg: string;
  chart: string;
}

export function Ventures() {
  const { kUnits, burnKUnits, submitIdea } = useStore();
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [pitchForm, setPitchForm] = useState({ name: '', industry: '', description: '' });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const ventures = [
    {
      id: 'AURA',
      name: 'Aura Logistics AI',
      stage: 'Seed Stage',
      valuation: 2500000,
      pricePerShare: 12.50,
      change: '+4.2%',
      positive: true,
      description: 'Predictive routing algorithms for last-mile delivery. MVP live with 3 beta clients in Kochi.',
      icon: Rocket,
      color: 'text-fintech-accent',
      bg: 'bg-fintech-accent/10',
      chart: "M0,50 Q10,40 20,45 T40,30 T60,35 T80,15 T100,5",
    },
    {
      id: 'OMNI',
      name: 'OmniHealth Sync',
      stage: 'Idea Stage',
      valuation: 500000,
      pricePerShare: 2.10,
      change: '+12.5%',
      positive: true,
      description: 'Unified health record API for fragmented clinical data. Prototype currently in development by 1% Club Services.',
      icon: Lightbulb,
      color: 'text-fintech-success',
      bg: 'bg-fintech-success/10',
      chart: "M0,40 Q20,30 40,45 T70,20 T100,10",
    },
    {
      id: 'NEXS',
      name: 'Nexus Security',
      stage: 'Growth Stage',
      valuation: 8500000,
      pricePerShare: 45.00,
      change: '-1.2%',
      positive: false,
      description: 'Decentralized perimeter monitoring using drone swarms. Contracted with 2 government agencies.',
      icon: Activity,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      chart: "M0,10 Q20,20 40,15 T70,40 T100,30",
    }
  ];

  const handleInvest = () => {
    const amount = parseFloat(investAmount);
    if (isNaN(amount) || amount <= 0) return;
    if (amount > kUnits) {
      alert("Insufficient funds for this execution.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      if (selectedVenture) {
        burnKUnits(amount, `Equity Stake: ${selectedVenture.id}`, 'investment');
      }
      setIsProcessing(false);
      setSelectedVenture(null);
      setInvestAmount('');
    }, 800);
  };

  const handlePitchSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      submitIdea(pitchForm);
      setIsProcessing(false);
      setShowPitchModal(false);
      setPitchForm({ name: '', industry: '', description: '' });
      alert("Pitch submitted successfully. The ONES are reviewing your term sheet.");
    }, 1200);
  };

  return (
    <div ref={containerRef} className="p-8 max-w-6xl mx-auto w-full h-full pt-12">
      {/* Ticker Tape Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Startup Exchange</h1>
          <p className="text-fintech-gray-400 font-medium text-sm">Real-time valuation and equity allocation market.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-xs text-fintech-gray-400 font-medium">Market Trend</div>
            <div className="text-fintech-success font-bold flex items-center justify-end gap-1">
              <TrendingUp size={16} /> +5.4%
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <div className="text-right">
            <div className="text-xs text-fintech-gray-400 font-medium">Available Capital</div>
            <div className="text-white font-bold">${kUnits.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Markets List */}
        <div className="lg:col-span-2 space-y-4">
          {ventures.map((venture) => (
            <div 
              key={venture.id} 
              className={cn(
                "glass-card p-6 cursor-pointer transition-all duration-300 border hover:border-white/20 group",
                selectedVenture?.id === venture.id ? "border-fintech-accent ring-1 ring-fintech-accent/50 bg-white/5" : "border-white/5"
              )}
              onClick={() => setSelectedVenture(venture)}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center w-1/2">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", venture.bg, venture.color)}>
                    <venture.icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="text-lg font-bold text-white">{venture.id}</h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-white/10 text-fintech-gray-300 uppercase tracking-widest">
                        {venture.stage}
                      </span>
                    </div>
                    <p className="text-xs text-fintech-gray-400">{venture.name}</p>
                  </div>
                </div>
                
                {/* Simulated Chart */}
                <div className="w-24 h-12 relative opacity-70 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    <path 
                      d={venture.chart} 
                      fill="none" 
                      stroke={venture.positive ? "var(--color-fintech-success)" : "var(--color-fintech-danger)"} 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>

                <div className="text-right w-1/4">
                  <div className="text-lg font-bold text-white">${venture.pricePerShare.toFixed(2)}</div>
                  <div className={cn(
                    "text-xs font-semibold flex items-center justify-end gap-0.5",
                    venture.positive ? "text-fintech-success" : "text-fintech-danger"
                  )}>
                    {venture.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {venture.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trade Execution Terminal */}
        <div className="glass-card p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold text-white mb-6">Execution Terminal</h2>
          
          {selectedVenture ? (
            <div className="space-y-5">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div>
                  <div className="text-white font-bold text-xl">{selectedVenture.id}</div>
                  <div className="text-xs text-fintech-gray-400">{selectedVenture.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-fintech-gray-400 text-xs">Market Cap</div>
                  <div className="text-white font-medium">${(selectedVenture.valuation / 1000000).toFixed(2)}M</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-fintech-gray-400 mb-2">
                  <label>Order Value</label>
                  <span>Available: ${kUnits.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-fintech-gray-400 text-lg">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full bg-fintech-dark border border-white/10 rounded-xl pl-10 pr-5 py-4 text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="bg-fintech-dark/50 rounded-xl p-5 border border-white/5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-fintech-gray-400">Current Share Price</span>
                  <span className="text-white font-medium">${selectedVenture.pricePerShare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-fintech-gray-400">Estimated Shares</span>
                  <span className="text-fintech-accent font-medium">
                    {investAmount ? (parseFloat(investAmount) / selectedVenture.pricePerShare).toFixed(4) : '0.0000'}
                  </span>
                </div>
              </div>

              <HapticButton 
                onClick={handleInvest} 
                className="w-full py-4 text-base mt-2"
                disabled={isProcessing || !investAmount}
              >
                {isProcessing ? 'Executing...' : 'Buy Market'}
              </HapticButton>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
              <TrendingUp size={48} className="text-fintech-gray-400 mb-4" />
              <p className="text-fintech-gray-400 text-sm">Select an asset from the order book to execute a trade.</p>
            </div>
          )}

          {/* List Your Idea Section */}
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="bg-fintech-accent/5 border border-fintech-accent/20 rounded-xl p-5 text-center">
              <h3 className="text-white font-bold mb-2">Have a billion-dollar idea?</h3>
              <p className="text-xs text-fintech-gray-400 mb-4">We build, validate, and grow it for you. We take a 35% equity stake. Zero upfront cost.</p>
              <HapticButton 
                variant="default" 
                className="w-full py-3 text-sm bg-white text-black hover:bg-gray-200"
                onClick={() => setShowPitchModal(true)}
              >
                Pitch Your Idea
              </HapticButton>
            </div>
          </div>
        </div>

      </div>

      {/* Pitch Modal */}
      {showPitchModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-8 border border-white/10 relative shadow-2xl">
            <button 
              onClick={() => setShowPitchModal(false)}
              className="absolute top-4 right-4 text-fintech-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Submit Pitch</h2>
            <p className="text-sm text-fintech-gray-400 mb-6">Enter your idea below. Our executive team will review it within 24 hours.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-fintech-gray-400 uppercase tracking-widest mb-1 block">Project Name</label>
                <input 
                  type="text" 
                  value={pitchForm.name}
                  onChange={e => setPitchForm({...pitchForm, name: e.target.value})}
                  className="w-full bg-fintech-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-fintech-accent"
                  placeholder="E.g. NeuralNet CRM"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-fintech-gray-400 uppercase tracking-widest mb-1 block">Industry</label>
                <input 
                  type="text" 
                  value={pitchForm.industry}
                  onChange={e => setPitchForm({...pitchForm, industry: e.target.value})}
                  className="w-full bg-fintech-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-fintech-accent"
                  placeholder="E.g. SaaS, Fintech, AI"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-fintech-gray-400 uppercase tracking-widest mb-1 block">The Idea (Simple Explanation)</label>
                <textarea 
                  value={pitchForm.description}
                  onChange={e => setPitchForm({...pitchForm, description: e.target.value})}
                  className="w-full bg-fintech-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-fintech-accent min-h-[100px]"
                  placeholder="Explain it like I'm 5..."
                />
              </div>

              <div className="bg-fintech-success/10 border border-fintech-success/30 rounded-xl p-4 mt-2">
                <p className="text-xs text-fintech-success font-medium">By submitting, you agree to our standard term sheet: 1% Club provides all engineering, branding, and GTM support in exchange for a 35% equity stake.</p>
              </div>

              <HapticButton 
                className="w-full py-4 text-base font-bold mt-4"
                onClick={handlePitchSubmit}
                disabled={!pitchForm.name || !pitchForm.description || isProcessing}
              >
                {isProcessing ? 'Transmitting...' : 'Sign & Submit Pitch'}
              </HapticButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

