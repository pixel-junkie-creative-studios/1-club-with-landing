"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { MapPin, Crosshair, Wrench, Shield, Car } from 'lucide-react';

export function ShadowFleet() {
  const { kUnits, burnKUnits } = useStore();
  const [extractionActive, setExtractionActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const baseServiceCost = 500;
  const skimmingMargin = 0.20; // 20% Margin
  const totalCost = baseServiceCost * (1 + skimmingMargin);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (extractionActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && extractionActive) {
      setExtractionActive(false);
    }
    return () => clearInterval(interval);
  }, [extractionActive, countdown]);

  const handleExtraction = () => {
    if (kUnits >= totalCost) {
      burnKUnits(totalCost, 'Tactical Extraction Service', 'service');
      setExtractionActive(true);
      setCountdown(300); // 5 minutes (300 seconds)
    } else {
      alert("INSUFFICIENT K-UNITS FOR EXTRACTION.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto w-full h-full flex flex-col">
      <div className="mb-8 border-l-4 border-kult-amber pl-4">
        <h1 className="text-4xl font-mono font-black tracking-tighter uppercase">The Shadow Fleet</h1>
        <p className="text-kult-gray-300 font-mono text-sm mt-1">TACTICAL LOGISTICS // KOCHI SECTOR // 24/7 AVAILABILITY</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Tactical Map (Mockup) */}
        <div className="lg:col-span-2 border border-kult-gray-200 bg-kult-charcoal relative overflow-hidden min-h-[400px]">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(var(--color-kult-gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--color-kult-gray-200) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.2
          }}></div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <MapPin size={300} />
          </div>

          {/* Vetted Partners on Map */}
          <PartnerMarker x="20%" y="30%" icon={Wrench} label="MECHANIC // ALPHA" status="ONLINE" />
          <PartnerMarker x="60%" y="45%" icon={Shield} label="RECOVERY // BRAVO" status="DISPATCHED" active={extractionActive} />
          <PartnerMarker x="75%" y="70%" icon={Car} label="DRIVER // CHARLIE" status="STANDBY" />
          <PartnerMarker x="40%" y="80%" icon={Crosshair} label="SECURITY // DELTA" status="ONLINE" />
        </div>

        {/* Extraction Interface */}
        <div className="border border-kult-gray-200 bg-kult-charcoal/50 p-6 flex flex-col">
          <h2 className="text-kult-gray-300 font-mono text-xs mb-6">IMMEDIATE ASSET DEPLOYMENT</h2>
          
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-kult-gray-300">SERVICE CLASSIFICATION</label>
              <select className="w-full bg-kult-charcoal border border-kult-gray-200 p-3 font-mono text-white focus:outline-none focus:border-kult-amber">
                <option>EMERGENCY RECOVERY</option>
                <option>COVERT TRANSPORT</option>
                <option>TACTICAL MECHANIC</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-kult-gray-300">LOCATION COORDINATES</label>
              <input type="text" value="9.9312° N, 76.2673° E (KOCHI)" readOnly className="w-full bg-kult-charcoal/50 border border-kult-gray-200 p-3 font-mono text-kult-gray-300 outline-none" />
            </div>

            <div className="p-4 border border-kult-gray-200 bg-black/50 space-y-2">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-kult-gray-300">BASE SERVICE COST:</span>
                <span className="text-white">{baseServiceCost} K</span>
              </div>
              <div className="flex justify-between font-mono text-sm">
                <span className="text-kult-gray-300">FLEET MARGIN (20%):</span>
                <span className="text-kult-amber">+{baseServiceCost * skimmingMargin} K</span>
              </div>
              <div className="h-px w-full bg-kult-gray-200 my-2"></div>
              <div className="flex justify-between font-mono font-bold text-lg">
                <span className="text-white">TOTAL OP COST:</span>
                <span className="text-white">{totalCost} K</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {extractionActive ? (
              <div className="p-4 border border-kult-amber bg-kult-amber/10 text-center animate-pulse">
                <h3 className="font-mono text-kult-amber text-sm mb-2">ASSET DISPATCHED</h3>
                <div className="font-mono font-black text-4xl text-white">{formatTime(countdown)}</div>
                <p className="font-mono text-xs text-kult-gray-300 mt-2">ESTIMATED RESPONSE TIME</p>
              </div>
            ) : (
              <HapticButton className="w-full" onClick={handleExtraction}>
                REQUEST EXTRACTION
              </HapticButton>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function PartnerMarker({ x, y, icon: Icon, label, status, active }: { x: string, y: string, icon: any, label: string, status: string, active?: boolean }) {
  return (
    <div className="absolute flex flex-col items-center group cursor-pointer" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
      <div className={`p-2 border mb-2 transition-colors relative ${active ? 'bg-kult-amber border-kult-amber text-black' : 'bg-kult-charcoal border-kult-gray-200 text-kult-gray-300 group-hover:border-kult-amber group-hover:text-kult-amber'}`}>
        {active && (
          <div className="absolute inset-0 bg-kult-amber blur-md opacity-50"></div>
        )}
        <Icon size={20} className="relative z-10" />
      </div>
      <div className="bg-kult-charcoal border border-kult-gray-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
        <div className="font-mono text-xs font-bold text-white">{label}</div>
        <div className={`font-mono text-[10px] ${status === 'ONLINE' ? 'text-green-500' : 'text-kult-amber'}`}>[{status}]</div>
      </div>
    </div>
  );
}
