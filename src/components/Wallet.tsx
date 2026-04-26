"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Send, ArrowDownLeft, Check, WalletIcon, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Wallet() {
  const { kUnits, burnKUnits, transactions } = useStore();
  const [transferAmount, setTransferAmount] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const processingFeeRate = 0.03; // 3%
  const fee = transferAmount ? (parseFloat(transferAmount) * processingFeeRate).toFixed(2) : '0.00';
  const totalDeduction = transferAmount ? (parseFloat(transferAmount) + parseFloat(fee)).toFixed(2) : '0.00';

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { y: 20 },
        { y: 0, duration: 0.8, ease: "power4.out" }
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0 || !targetUser) return;
    if (amount + parseFloat(fee) > kUnits) {
      alert("Insufficient capital for this maneuver.");
      return;
    }

    setIsProcessing(true);
    
    // Simulating blockchain confirmation
    setTimeout(() => {
      burnKUnits(amount + parseFloat(fee), `Transfer to ${targetUser}`, 'transfer');
      setIsProcessing(false);
      setShowSuccess(true);
      setTransferAmount('');
      setTargetUser('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="p-8 max-w-6xl mx-auto w-full h-full pt-12 pb-24">
      {/* 3D Premium Balance Card */}
      <div 
        className="perspective-1000 mb-12"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={cardRef}
          className="glass-card p-10 relative overflow-hidden transform-style-3d bg-gradient-to-br from-white/[0.05] to-white/[0.01] border-white/10 shadow-2xl"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Animated Background Orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-fintech-accent/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-fintech-gray-400 text-sm font-medium tracking-widest uppercase mb-1">Portfolio Value</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-fintech-gray-400">$</span>
                  <AnimatedBalance value={kUnits} />
                </div>
              </div>
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
                 <WalletIcon size={28} className="text-fintech-accent" />
               </div>
            </div>

            <div className="flex flex-wrap gap-8">
              <Stat mini title="Daily Change" value="+$420.69" color="text-fintech-success" />
              <Stat mini title="Network Tier" value="GHOST" color="text-white" />
              <Stat mini title="Uptime" value="99.98%" color="text-fintech-accent" />
            </div>
          </div>

          {/* Card Number / ID Mockup */}
          <div className="absolute bottom-6 right-8 text-[10px] font-mono text-white/20 tracking-[0.3em]">
            1PC-SHADOW-OPS-8842-1109
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Execution Terminal */}
        <div className="glass-card p-8 relative overflow-hidden" ref={formRef}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-fintech-accent/10 flex items-center justify-center text-fintech-accent border border-fintech-accent/20">
              <Send size={18} />
            </div>
            <h2 className="text-xl font-bold text-white">Capital Dispatch</h2>
          </div>
          
          <div className="space-y-6">
            <div className="group">
              <label className="text-xs font-bold text-fintech-gray-500 mb-2 block tracking-widest uppercase">Target Destination</label>
              <input 
                type="text" 
                placeholder="@alias_or_address"
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-fintech-accent/50 transition-all placeholder:text-fintech-gray-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-fintech-gray-500 mb-2 block tracking-widest uppercase">Allocation Amount</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-fintech-gray-400 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-10 pr-5 py-4 text-white text-xl font-bold focus:outline-none focus:ring-1 focus:ring-fintech-accent/50 transition-all shadow-inner"
                />
              </div>
            </div>
            
            <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5 space-y-3 backdrop-blur-sm">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-fintech-gray-500">NETWORK FEE (3%)</span>
                <span className="text-fintech-gray-400">${fee}</span>
              </div>
              <div className="h-px w-full bg-white/5 my-1"></div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-white">TOTAL DISPATCH</span>
                <span className="text-fintech-accent">${totalDeduction}</span>
              </div>
            </div>

            <HapticButton 
              onClick={handleTransfer} 
              className="w-full py-5 text-lg font-black tracking-tighter"
              disabled={isProcessing}
            >
              {isProcessing ? 'INITIATING...' : 'EXECUTE TRANSFER'}
            </HapticButton>
          </div>

          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 z-20 bg-fintech-success/90 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center mb-4">
                <Check size={40} strokeWidth={4} />
              </div>
              <h3 className="text-2xl font-black tracking-tighter">DISPATCH COMPLETE</h3>
              <p className="text-sm font-bold opacity-80 mt-1 uppercase tracking-widest">Target Confirmed</p>
            </div>
          )}
        </div>

        {/* Realtime Ledger */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Global Ledger</h2>
            <div className="text-[10px] font-bold text-fintech-gray-500 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-fintech-success animate-pulse"></div>
              LIVE SYNC
            </div>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {transactions.map((tx) => (
              <ActivityItem 
                key={tx.id} 
                icon={tx.positive ? ArrowDownLeft : Send} 
                title={tx.title} 
                date={tx.date} 
                amount={`${tx.positive ? '+' : '-'}$${tx.amount.toLocaleString()}`} 
                positive={tx.positive} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedBalance({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const countRef = useRef({ val: value });

  useEffect(() => {
    gsap.to(countRef.current, {
      val: value,
      duration: 1.5,
      ease: "power3.out",
      onUpdate: () => setDisplayValue(countRef.current.val)
    });
  }, [value]);

  return (
    <span className="text-6xl font-black tracking-tighter text-white tabular-nums">
      {displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}

function Stat({ title, value, color, mini }: { title: string, value: string, color: string, mini?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-fintech-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <p className={cn("font-bold", mini ? "text-lg" : "text-2xl", color)}>{value}</p>
    </div>
  );
}

function ActivityItem({ icon: Icon, title, date, amount, positive }: { icon: LucideIcon, title: string, date: string, amount: string, positive?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/[0.03] rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-white/5">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg",
          positive ? "bg-fintech-success/10 text-fintech-success" : "bg-white/5 text-fintech-gray-400"
        )}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm tracking-tight">{title}</h3>
          <p className="text-[10px] font-medium text-fintech-gray-500 uppercase tracking-widest">{date}</p>
        </div>
      </div>
      <div className={cn("font-black text-sm tracking-tight", positive ? "text-fintech-success" : "text-white")}>
        {amount}
      </div>
    </div>
  );
}

