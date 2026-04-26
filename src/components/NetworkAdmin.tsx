"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Check, X, ShieldCheck, Users, Activity, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NetworkAdmin() {
  const { members, monthlyFee } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [initiates, setInitiates] = useState([
    { id: 'USR-8492', name: 'Alex Rivera', status: 'Pending Review', capital: 25000, date: 'Oct 24, 2023' },
    { id: 'USR-8493', name: 'Sarah Chen', status: 'Pending Review', capital: 10000, date: 'Oct 24, 2023' },
    { id: 'USR-8494', name: 'Marcus Johnson', status: 'Pending Review', capital: 50000, date: 'Oct 23, 2023' },
  ]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleApprove = (id: string) => {
    setInitiates(initiates.filter(i => i.id !== id));
  };

  const handleReject = (id: string) => {
    setInitiates(initiates.filter(i => i.id !== id));
  };

  const monthlyRevenue = members * monthlyFee;

  return (
    <div ref={containerRef} className="p-8 max-w-6xl mx-auto w-full h-full pt-12">
      <div className="flex justify-between items-end mb-10 border-b border-fintech-danger/20 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <EyeOff size={24} className="text-fintech-danger" />
            <h1 className="text-3xl font-bold tracking-tight text-white">God Mode</h1>
          </div>
          <p className="text-fintech-gray-400 font-medium text-sm flex items-center gap-2">
            <ShieldCheck size={16} className="text-fintech-accent" />
            1% Club Founder Access Verified. This terminal is hidden from standard users.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Stat Cards */}
        <StatCard icon={Users} title="Active Members" value={`${members} / 50`} trend="+2 this week" />
        <StatCard icon={Activity} title="Monthly Recurring" value={`$${monthlyRevenue.toLocaleString()}`} trend="Stable" />
        <StatCard icon={ShieldCheck} title="Network TVL" value="$12.5M" trend="+4.2% this month" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="font-semibold text-white">Pending Applications</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {initiates.length} Action Required
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-fintech-gray-400 text-xs uppercase tracking-wider bg-black/20">
                  <th className="p-5 font-medium">User</th>
                  <th className="p-5 font-medium">Capital</th>
                  <th className="p-5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {initiates.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-10 text-center text-fintech-gray-400">
                      No pending applications.
                    </td>
                  </tr>
                ) : (
                  initiates.map((initiate) => (
                    <tr key={initiate.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="p-5 text-white font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-fintech-gray-200 flex items-center justify-center text-fintech-gray-400 font-bold text-xs">
                          {initiate.name.charAt(0)}
                        </div>
                        <div>
                          <div>{initiate.name}</div>
                          <div className="text-[10px] text-fintech-gray-500 font-mono">{initiate.id}</div>
                        </div>
                      </td>
                      <td className="p-5 text-white font-medium">${initiate.capital.toLocaleString()}</td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-fintech-success hover:bg-fintech-success/20 transition-colors"
                            onClick={() => handleApprove(initiate.id)}
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-fintech-danger hover:bg-fintech-danger/20 transition-colors"
                            onClick={() => handleReject(initiate.id)}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pitched Ideas */}
        <div className="glass-card overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="font-semibold text-white">Startup Pitches (35% Equity)</h2>
          </div>
          
          <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
            {useStore.getState().pitchedIdeas.length === 0 ? (
              <div className="p-10 text-center text-fintech-gray-400">
                <Activity size={32} className="mx-auto mb-3 opacity-20" />
                <p>No new term sheets submitted.</p>
              </div>
            ) : (
              useStore.getState().pitchedIdeas.map((idea) => (
                <div key={idea.id} className="p-5 hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-lg">{idea.name}</h4>
                        <span className="text-[10px] bg-fintech-accent/10 text-fintech-accent px-2 py-0.5 rounded-sm uppercase tracking-widest">{idea.industry}</span>
                      </div>
                      <div className="text-xs text-fintech-gray-500 font-mono mt-1">{idea.id} • Submitted {idea.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-fintech-gray-400 mt-3 bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed">{idea.description}</p>
                  <div className="flex gap-3 mt-4">
                    <HapticButton variant="default" className="py-2.5 px-4 text-xs font-bold w-full sm:w-auto">Accept Deal (Take 35%)</HapticButton>
                    <HapticButton variant="ghost" className="py-2.5 px-4 text-xs">Reject</HapticButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, positive }: { icon: any, title: string, value: string, trend: string, positive?: boolean }) {
  return (
    <div className="glass-card p-6 border border-white/5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fintech-accent">
          <Icon size={20} />
        </div>
      </div>
      <div>
        <p className="text-fintech-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="font-bold text-3xl text-white tracking-tight">{value}</h3>
      </div>
      <div className={cn("text-xs font-medium mt-4", positive ? "text-fintech-success" : "text-fintech-gray-400")}>
        {trend}
      </div>
    </div>
  );
}
