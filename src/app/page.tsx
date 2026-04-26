"use client";

import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { Navigation } from '@/components/Navigation';
import { Wallet } from '@/components/Wallet';
import { Ventures } from '@/components/Ventures';
import { Mining } from '@/components/Mining';
import { Concierge } from '@/components/Concierge';
import { NetworkAdmin } from '@/components/NetworkAdmin';
import { Profile } from '@/components/Profile';
import { GlobalTouch } from '@/components/GlobalTouch';
import { AISupport } from '@/components/AISupport';
import { AppLoader } from '@/components/AppLoader';
import Lenis from "lenis";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scrollytelling from '@/components/Scrollytelling';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { activeScreen, setActiveScreen } = useStore();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis only on the client
    if (typeof window !== 'undefined') {
      lenisRef.current = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1
      });

      // Sync lenis with ScrollTrigger
      lenisRef.current.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
    
    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return (
    <>
      <GlobalTouch />
      <main className="min-h-screen flex flex-col relative z-10">
        {activeScreen === 'loading' && <AppLoader onComplete={() => setActiveScreen('landing')} />}
        {activeScreen === 'landing' && <Scrollytelling />}
        
        {/* Main Application Navigation */}
        {!['loading', 'landing'].includes(activeScreen) && <Navigation />}

        {/* Other screens */}
        {activeScreen === 'wallet'   && <Wallet />}
        {activeScreen === 'ventures' && <Ventures />}
        {activeScreen === 'mining'   && <Mining />}
        {activeScreen === 'concierge'&& <Concierge />}
        {activeScreen === 'admin'    && <NetworkAdmin />}
        {activeScreen === 'profile'  && <Profile />}
        {activeScreen === 'goals'    && <Mining />}
        {activeScreen === 'vault'    && <Wallet />}
      </main>
      <AISupport />
    </>
  );
}