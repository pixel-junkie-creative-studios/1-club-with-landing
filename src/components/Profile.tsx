"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Shield, Settings, FileText, Bell, CreditCard, ChevronRight } from 'lucide-react';

export function Profile() {
  const { kUnits } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="p-8 max-w-5xl mx-auto w-full h-full pt-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Profile & Identity</h1>
        <p className="text-fintech-gray-400 font-medium text-sm">Manage your ecosystem identity, billing, and portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* Identity Card */}
          <div className="glass-card p-8 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-fintech-gray-200 border-4 border-fintech-dark flex items-center justify-center text-4xl font-bold text-fintech-gray-400 shadow-fintech">
              RK
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">Romy K.</h2>
              <p className="text-fintech-gray-400 text-sm mb-3">romy@1percent.club</p>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-fintech-accent/10 text-fintech-accent w-fit border border-fintech-accent/20">
                <Shield size={14} />
                <span>Founder / 1% Elite</span>
              </div>
            </div>
            <HapticButton variant="ghost" className="px-4">Edit Identity</HapticButton>
          </div>

          {/* Settings List */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <h3 className="font-semibold text-white">System Settings</h3>
            </div>
            <div className="divide-y divide-white/5">
              <SettingRow icon={CreditCard} title="1% Club Membership" value="Active ($499/mo)" />
              <SettingRow icon={FileText} title="Tax Documents" value="2 Available" />
              <SettingRow icon={Bell} title="Notifications" value="Push, Email" />
              <SettingRow icon={Settings} title="Security & API Keys" value="Configured" />
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="space-y-6">
          <div className="glass-card p-6 h-fit sticky top-24">
            <h3 className="font-semibold text-white mb-6">Investment Portfolio</h3>
            
            <div className="space-y-5">
              <div className="bg-fintech-dark/50 rounded-xl p-5 border border-white/5">
                <div className="text-xs text-fintech-gray-400 mb-1">Total Allocated Capital</div>
                <div className="text-2xl font-bold text-white">$12,450.00</div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-medium text-fintech-gray-400 uppercase tracking-wider">Active Stakes</h4>
                <PortfolioItem name="Aura Logistics AI" equity="0.45%" />
                <PortfolioItem name="Nexus Security" equity="0.12%" />
                <PortfolioItem name="OmniHealth Sync" equity="1.50%" />
              </div>

              <div className="pt-4 mt-2 border-t border-white/5">
                <HapticButton variant="glass" className="w-full text-sm py-2.5">
                  View Full Statements
                </HapticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, title, value }: { icon: any, title: string, value: string }) {
  return (
    <div className="p-5 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fintech-gray-400 group-hover:text-fintech-accent transition-colors">
          <Icon size={18} />
        </div>
        <span className="font-medium text-white">{title}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-fintech-gray-400">{value}</span>
        <ChevronRight size={16} className="text-fintech-gray-400" />
      </div>
    </div>
  );
}

function PortfolioItem({ name, equity }: { name: string, equity: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white font-medium">{name}</span>
      <span className="text-fintech-accent font-semibold">{equity}</span>
    </div>
  );
}
