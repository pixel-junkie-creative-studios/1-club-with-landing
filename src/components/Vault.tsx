"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { ArrowRightLeft, Flame } from 'lucide-react';

export function Vault() {
  const { kUnits, burnKUnits, transactions } = useStore();
  const [transferAmount, setTransferAmount] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  
  const vaultRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);

  const spreadVig = 0.03; // 3% Vig
  const calculatedVig = transferAmount ? (parseFloat(transferAmount) * spreadVig).toFixed(2) : '0.00';
  const finalTransfer = transferAmount ? (parseFloat(transferAmount) - parseFloat(calculatedVig)).toFixed(2) : '0.00';

  useEffect(() => {
    if (vaultRef.current) {
      gsap.fromTo(vaultRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }
      );
    }
    
    // Animate dial rotation continuously
    if (dialRef.current) {
      gsap.to(dialRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0 || !targetUser) return;
    if (amount > kUnits) {
      alert("LIQUIDITY BREACH: INSUFFICIENT K-UNITS");
      return;
    }
    
    // Vault dial fast spin on action
    gsap.to(dialRef.current, {
      rotate: '+=720',
      duration: 1.5,
      ease: "power2.inOut"
    });

    if (liquidRef.current) {
      const tl = gsap.timeline();
      tl.to(liquidRef.current, { height: '100%', opacity: 0.8, duration: 0.6, ease: "power2.in" })
        .to(liquidRef.current, { height: '0%', opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => {
          burnKUnits(amount, `Vault Transfer to ${targetUser}`, 'transfer');
          setTransferAmount('');
          setTargetUser('');
        }});
    }
  };

  const handleBurnProtocol = () => {
    if (kUnits < 100) return;
    setIsBurning(true);
    
    // Shake effect
    gsap.to(vaultRef.current, {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      duration: 0.05,
      repeat: 20,
      yoyo: true,
      onComplete: () => {
        burnKUnits(100, 'Protocol Scarcity Burn', 'service');
        setIsBurning(false);
        gsap.set(vaultRef.current, { x: 0, y: 0 });
      }
    });
  };

  return (
    <div ref={vaultRef} className="p-8 max-w-6xl mx-auto w-full h-full pt-12 pb-24 relative">
      {/* Security Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,122,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,255,0.5) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }}></div>

      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic">Deep Vault</h1>
          <p className="text-fintech-gray-500 font-mono text-xs tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fintech-success animate-pulse"></span>
            Cold Storage Sector 7 // Encrypted
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-fintech-gray-500 uppercase tracking-[0.3em] mb-1">Available Liquidity</div>
          <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
            {kUnits.toLocaleString()} <span className="text-fintech-accent text-xl italic">K</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* The Vault Dial Interface */}
        <div className="lg:col-span-2 glass-card p-1 relative overflow-hidden group">
          <div className="bg-black/40 p-8 h-full rounded-[20px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div ref={dialRef} className="w-64 h-64 border-[12px] border-white/5 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-full h-1 bg-fintech-accent/40 absolute top-1/2 -translate-y-1/2"></div>
                <div className="w-1 h-full bg-fintech-accent/40 absolute left-1/2 -translate-x-1/2"></div>
                <div className="w-48 h-48 border-[1px] border-white/10 rounded-full"></div>
              </div>
            </div>

            <div className="relative z-10 max-w-md">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ArrowRightLeft className="text-fintech-accent" />
                Inter-Vault Bridge
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-fintech-gray-500 uppercase tracking-widest">Protocol Address</label>
                  <input 
                    type="text" 
                    placeholder="0x... or @alias"
                    value={targetUser}
                    onChange={(e) => setTargetUser(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-mono focus:outline-none focus:border-fintech-accent/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-fintech-gray-500 uppercase tracking-widest">Liquidity Amount</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-2xl font-bold focus:outline-none focus:border-fintech-accent/50 transition-colors"
                  />
                </div>

                <div className="bg-fintech-accent/5 rounded-xl p-6 border border-fintech-accent/10">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-fintech-gray-500">NETWORK VIG (3%):</span>
                    <span className="text-fintech-accent">-{calculatedVig} K</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">NET DELIVERY:</span>
                    <span className="text-white">{finalTransfer} K</span>
                  </div>
                </div>

                <HapticButton 
                  onClick={handleTransfer} 
                  className="w-full py-5 text-lg font-black tracking-tighter bg-white text-black hover:bg-fintech-gray-300"
                >
                  INITIALIZE BRIDGE
                </HapticButton>
              </div>
            </div>

            {/* Liquid Animation Layer */}
            <div 
              ref={liquidRef}
              className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-fintech-accent/40 to-transparent opacity-0 pointer-events-none blur-xl"
            ></div>
          </div>
        </div>

        {/* Burn Protocol & Ledger */}
        <div className="space-y-8">
          <div className="glass-card p-8 border-fintech-danger/20 bg-fintech-danger/[0.02]">
            <div className="flex items-center gap-3 mb-4 text-fintech-danger">
              <Flame size={20} className="animate-bounce" />
              <h2 className="text-lg font-bold uppercase tracking-tighter italic">Burn Protocol</h2>
            </div>
            <p className="text-xs text-fintech-gray-500 leading-relaxed mb-6">
              Enforce deflationary pressure. Permanent removal of 100 K from global circulation.
            </p>
            <HapticButton 
              variant="danger" 
              onClick={handleBurnProtocol} 
              className="w-full py-4 font-black"
              disabled={isBurning || kUnits < 100}
            >
              {isBurning ? 'INCINERATING...' : 'EXECUTE BURN (-100 K)'}
            </HapticButton>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xs font-bold text-fintech-gray-500 uppercase tracking-widest mb-6">Vault Activity</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {transactions.filter(tx => tx.type === 'transfer' || tx.type === 'service').map((tx) => (
                <div key={tx.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <div>
                    <div className="text-[11px] font-bold text-white uppercase">{tx.title}</div>
                    <div className="text-[9px] text-fintech-gray-500 font-mono">{tx.date}</div>
                  </div>
                  <div className="text-xs font-bold text-white">-{tx.amount} K</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

