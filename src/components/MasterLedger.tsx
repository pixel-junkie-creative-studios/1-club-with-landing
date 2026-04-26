"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import { Check, X, Terminal } from 'lucide-react';

export function MasterLedger() {
  const { members, monthlyFee } = useStore();
  const [initiates, setInitiates] = useState([
    { id: 'INT-001', alias: 'NIGHTHAWK', status: 'PENDING', capital: '25,000' },
    { id: 'INT-002', alias: 'VIPER', status: 'PENDING', capital: '10,000' },
    { id: 'INT-003', alias: 'GHOST', status: 'PENDING', capital: '50,000' },
  ]);

  const handleApprove = (id: string) => {
    setInitiates(initiates.filter(i => i.id !== id));
  };

  const handleReject = (id: string) => {
    setInitiates(initiates.filter(i => i.id !== id));
  };

  const monthlyRevenue = members * monthlyFee;

  return (
    <div className="p-8 max-w-6xl mx-auto w-full h-full">
      <div className="mb-8 border-l-4 border-white pl-4">
        <h1 className="text-4xl font-mono font-black tracking-tighter uppercase text-white">The Master Ledger</h1>
        <p className="text-kult-gray-300 font-mono text-sm mt-1 flex items-center gap-2">
          <Terminal size={14} /> OPERATOR COMMAND // LEVEL 5 CLEARANCE REQUIRED
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Revenue Logic Stats */}
        <StatCard title="ACTIVE MEMBERS" value={`${members}/50`} label="HARD CAP ACTIVE" />
        <StatCard title="MONTHLY TAX (₹499)" value={`₹${monthlyRevenue.toLocaleString()}`} label="AUTOMATIC BILLING" />
        <StatCard title="NETWORK VALUATION" value="₹12.5M" label="ESTIMATED K-UNIT LIQUIDITY" />
      </div>

      <div className="border border-kult-gray-200 bg-kult-charcoal/80 overflow-hidden">
        <div className="border-b border-kult-gray-200 p-4 bg-kult-gray-100 flex justify-between items-center">
          <h2 className="font-mono text-sm font-bold text-white">INITIATE VETTING QUEUE</h2>
          <span className="font-mono text-xs px-2 py-1 bg-kult-amber/20 text-kult-amber border border-kult-amber/30">
            {initiates.length} PENDING
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-kult-gray-200 text-kult-gray-300 bg-kult-charcoal">
                <th className="p-4 font-normal">ID</th>
                <th className="p-4 font-normal">ALIAS</th>
                <th className="p-4 font-normal">EXTERNAL CAPITAL</th>
                <th className="p-4 font-normal">STATUS</th>
                <th className="p-4 font-normal text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {initiates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-kult-gray-300 italic">QUEUE EMPTY.</td>
                </tr>
              ) : (
                initiates.map((initiate) => (
                  <tr key={initiate.id} className="border-b border-kult-gray-200 hover:bg-kult-gray-100/50 transition-colors">
                    <td className="p-4 text-kult-gray-300">{initiate.id}</td>
                    <td className="p-4 text-white font-bold">{initiate.alias}</td>
                    <td className="p-4 text-kult-amber">₹{initiate.capital}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 border border-kult-gray-300 text-kult-gray-300 text-xs">
                        {initiate.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <HapticButton variant="ghost" className="!p-2 !border-none text-green-500 hover:text-green-400 hover:bg-green-500/10" onClick={() => handleApprove(initiate.id)}>
                          <Check size={18} />
                        </HapticButton>
                        <HapticButton variant="ghost" className="!p-2 !border-none text-kult-red hover:text-red-400 hover:bg-kult-red/10" onClick={() => handleReject(initiate.id)}>
                          <X size={18} />
                        </HapticButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, label }: { title: string, value: string, label: string }) {
  return (
    <div className="border border-kult-gray-200 p-6 bg-black/40">
      <h3 className="text-kult-gray-300 font-mono text-xs mb-2">{title}</h3>
      <div className="font-mono font-black text-3xl text-white mb-2">{value}</div>
      <div className="font-mono text-[10px] text-kult-amber">[{label}]</div>
    </div>
  );
}
