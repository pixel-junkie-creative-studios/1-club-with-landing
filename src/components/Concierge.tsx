"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Palette, Code2, Megaphone, Scale, Calculator, Search, Briefcase, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Concierge() {
  const { kUnits, burnKUnits } = useStore();
  const [bookingActive, setBookingActive] = useState(false);
  const [selectedService, setSelectedService] = useState('Product Development');
  const containerRef = useRef<HTMLDivElement>(null);

  const baseCost = 2500;
  const platformFee = 250;
  const totalCost = baseCost + platformFee;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleBooking = () => {
    if (kUnits >= totalCost) {
      burnKUnits(totalCost);
      setBookingActive(true);
      // Success animation
      gsap.fromTo(".booking-card", { scale: 0.95 }, { scale: 1, duration: 0.5, ease: "elastic.out" });
    } else {
      alert("Insufficient Capital");
    }
  };

  return (
    <div ref={containerRef} className="p-8 max-w-6xl mx-auto w-full h-full pt-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Ecosystem Services</h1>
        <p className="text-fintech-gray-400 font-medium text-sm">Professional B2B services to build, scale, and protect your venture.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Services List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-fintech-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search services (e.g. Branding, Legal, Audit)..." 
              className="w-full bg-glass border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard icon={Code2} name="Product Development" desc="MVP & Prototype Engineering" onClick={() => setSelectedService('Product Development')} active={selectedService === 'Product Development'} />
            <ServiceCard icon={Palette} name="Brand Identity" desc="Logos, UI/UX, Guidelines" onClick={() => setSelectedService('Brand Identity')} active={selectedService === 'Brand Identity'} />
            <ServiceCard icon={Megaphone} name="Growth Marketing" desc="GTM Strategy & Campaigns" onClick={() => setSelectedService('Growth Marketing')} active={selectedService === 'Growth Marketing'} />
            <ServiceCard icon={Briefcase} name="Business Consulting" desc="Valuation & Market Strategy" onClick={() => setSelectedService('Business Consulting')} active={selectedService === 'Business Consulting'} />
            <ServiceCard icon={Scale} name="Legal & Filing" desc="Incorporation & Licensing" onClick={() => setSelectedService('Legal & Filing')} active={selectedService === 'Legal & Filing'} />
            <ServiceCard icon={Calculator} name="Financial Auditing" desc="Taxes & Bookkeeping" onClick={() => setSelectedService('Financial Auditing')} active={selectedService === 'Financial Auditing'} />
          </div>
        </div>

        {/* Booking Interface */}
        <div className="glass-card p-6 flex flex-col h-fit sticky top-24 booking-card">
          <h2 className="text-lg font-semibold text-white mb-6">Allocate Agency Retainer</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-fintech-gray-400 mb-2 block">Selected Service</label>
              <div className="w-full bg-fintech-dark border border-white/10 rounded-xl px-4 py-3 text-white flex items-center justify-between">
                <span className="font-semibold">{selectedService}</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-fintech-gray-300">Retainer</span>
              </div>
            </div>

            <div className="bg-fintech-dark/50 rounded-xl p-5 border border-white/5 space-y-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-fintech-gray-400">Monthly Retainer</span>
                <span className="text-white font-medium">${baseCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-fintech-gray-400">Platform Escrow Fee</span>
                <span className="text-fintech-gray-400 font-medium">${platformFee.toLocaleString()}</span>
              </div>
              <div className="h-px w-full bg-white/5 my-1"></div>
              <div className="flex justify-between text-base font-bold">
                <span className="text-white">Total Capital Required</span>
                <span className="text-white">${totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {bookingActive ? (
              <div className="bg-fintech-success/10 border border-fintech-success/30 rounded-2xl p-6 text-center">
                <CheckCircle2 size={32} className="mx-auto text-fintech-success mb-3" />
                <h3 className="text-white font-bold mb-1">Contract Initiated</h3>
                <p className="text-xs text-fintech-gray-400">Your dedicated account manager will reach out within 24 hours to begin onboarding.</p>
              </div>
            ) : (
              <HapticButton className="w-full py-4 text-base" onClick={handleBooking}>
                Initiate Contract
              </HapticButton>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, name, desc, onClick, active }: { icon: any, name: string, desc: string, onClick: () => void, active?: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card p-5 cursor-pointer transition-all duration-300 group hover:border-fintech-accent/50",
        active ? "border-fintech-accent ring-1 ring-fintech-accent/50 bg-fintech-accent/5" : "border-white/5"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
          active ? "bg-fintech-accent text-white shadow-fintech-glow" : "bg-white/5 text-fintech-gray-400 group-hover:text-white"
        )}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className={cn("font-semibold", active ? "text-white" : "text-fintech-gray-200")}>{name}</h3>
          <p className="text-xs text-fintech-gray-400 font-medium mt-0.5">{desc}</p>
        </div>
      </div>
    </div>
  );
}

