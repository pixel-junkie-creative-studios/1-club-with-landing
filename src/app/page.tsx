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
import Scrollytelling from '@/components/Scrollytelling';

export default function Home() {
  const { activeScreen, setActiveScreen } = useStore();

  return (
    <>
      <GlobalTouch />
      <main className="relative z-10 w-full">
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