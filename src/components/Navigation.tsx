"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { Wallet, TrendingUp, Map, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const { activeScreen, setActiveScreen, kUnits } = useStore();

  const navItems = [
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'ventures', label: 'Market', icon: TrendingUp },
    { id: 'mining', label: 'Mining', icon: Cpu },
    { id: 'concierge', label: 'Services', icon: Map },
    // Admin is deliberately omitted from standard navigation
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 glass z-50 flex items-center justify-between px-8">
      {/* Hidden Admin Trigger on Logo Click */}
      <div 
        className="flex items-center space-x-3 cursor-pointer group" 
        onClick={() => setActiveScreen('admin')}
        onDoubleClick={() => setActiveScreen('wallet')}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fintech-accent to-blue-400 shadow-lg shadow-blue-500/30 flex items-center justify-center transition-transform group-hover:scale-105">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">1% <span className="text-fintech-gray-400 font-normal">Club</span></span>
      </div>
      
      <div className="hidden md:flex space-x-2 bg-fintech-dark/50 p-1.5 rounded-2xl border border-white/5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={cn(
              "flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              activeScreen === item.id 
                ? "bg-white/10 text-white shadow-sm" 
                : "text-fintech-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} className={activeScreen === item.id ? "text-fintech-accent" : ""} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-fintech-gray-400 text-xs font-medium">Available Balance</span>
          <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1">
            {kUnits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
            <span className="text-xs text-fintech-accent ml-0.5">1%</span>
          </span>
        </div>
        <button 
          onClick={() => setActiveScreen('profile')}
          className={cn(
            "w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-105",
            activeScreen === 'profile' 
              ? "bg-fintech-accent text-white border-fintech-accent shadow-fintech-glow" 
              : "bg-fintech-gray-200 border-white/10 text-fintech-gray-400 hover:bg-fintech-gray-300"
          )}
        >
          RK
        </button>
      </div>
    </nav>
  );
}


