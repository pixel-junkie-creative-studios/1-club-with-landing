"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Float } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import { HapticButton } from './HapticButton';
import LiquidCore from './LiquidCore';

export default function Scrollytelling() {
  const { setActiveScreen, kUnits } = useStore();

  return (
    <div className="w-full h-[100vh] relative bg-[#020202] overflow-hidden font-sans">
      
      {/* GLOBAL HUD */}
      <div className="absolute top-8 left-8 z-[200] pointer-events-none flex flex-col gap-6">
        {/* Live Balance Integration */}
        <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-xl p-4 w-64 shadow-2xl">
          <p className="text-[10px] font-mono text-fintech-gray-400 mb-1 uppercase tracking-widest">Secured Ecosystem Value</p>
          <p className="text-2xl font-black tracking-tighter text-white font-mono">
            {kUnits.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-sm text-fintech-accent">1%</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full flex justify-center z-[200] pointer-events-none">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] font-mono tracking-widest text-white uppercase">Scroll to Experience</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

      {/* WEBGL 3D CANVAS */}
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        
        {/* Cinematic lighting for liquid material */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#007aff" />
        <Environment preset="city" />

        <ScrollControls pages={6} damping={0.15}>
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <LiquidCore />
          </Float>

          {/* MASSIVE TYPOGRAPHY OVERLAY */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            
            {/* Page 1 */}
            <div className="w-full h-[100vh] flex items-center justify-center pointer-events-none">
              <h1 className="text-[12vw] sm:text-[15vw] leading-none font-black tracking-tighter text-white/90 mix-blend-overlay">
                THE 1%
              </h1>
            </div>

            {/* Page 2 */}
            <div className="w-full h-[100vh] flex items-center justify-center pointer-events-none">
              <h1 className="text-[12vw] sm:text-[15vw] leading-none font-black tracking-tighter text-[#ffd700]/90 mix-blend-overlay drop-shadow-[0_0_50px_rgba(255,215,0,0.3)]">
                WEALTH
              </h1>
            </div>

            {/* Page 3 */}
            <div className="w-full h-[100vh] flex items-center justify-center pointer-events-none">
              <h1 className="text-[12vw] sm:text-[15vw] leading-none font-black tracking-tighter text-[#007aff]/90 mix-blend-overlay drop-shadow-[0_0_50px_rgba(0,122,255,0.5)]">
                NETWORK
              </h1>
            </div>

            {/* Page 4 */}
            <div className="w-full h-[100vh] flex items-center justify-center pointer-events-none">
              <h1 className="text-[12vw] sm:text-[15vw] leading-none font-black tracking-tighter text-[#ff0033]/90 mix-blend-overlay drop-shadow-[0_0_50px_rgba(255,0,51,0.3)]">
                POWER
              </h1>
            </div>

            {/* Page 5 */}
            <div className="w-full h-[100vh] flex items-center justify-center pointer-events-none">
              <h1 className="text-[12vw] sm:text-[15vw] leading-none font-black tracking-tighter text-white/10 drop-shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                LEGACY
              </h1>
            </div>

            {/* Page 6: The Final Portal */}
            <div className="w-full h-[100vh] flex items-center justify-center pointer-events-auto">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-fintech-accent to-white rounded-full blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <HapticButton 
                  onClick={() => setActiveScreen('wallet')}
                  className="relative px-12 py-6 sm:px-16 sm:py-8 bg-black rounded-full border border-white/20 text-white font-black tracking-[0.2em] uppercase text-lg sm:text-xl hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-4 overflow-hidden shadow-2xl"
                >
                  <span className="relative z-10">Enter Ecosystem</span>
                </HapticButton>
              </div>
            </div>

          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}