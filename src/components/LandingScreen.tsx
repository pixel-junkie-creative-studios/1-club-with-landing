"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LandingScreenProps {
  onEnter: () => void;
}

export function LandingScreen({ onEnter }: LandingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const animFrameRef = useRef<number>(0);

  // Particle canvas (Optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ['#007AFF', '#34C759', '#BF5AF2'];

    // Reduced particle count for performance
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // GSAP hero entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1 })
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    gsap.to(logoRef.current, { y: -8, repeat: -1, yoyo: true, duration: 2.5, ease: 'sine.inOut' });

    return () => { tl.kill(); };
  }, []);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    
    const fallback = setTimeout(() => onEnter(), 1500);

    gsap.to(containerRef.current, {
      opacity: 0, scale: 1.05, duration: 0.6, ease: 'power3.in',
      onComplete: () => {
        clearTimeout(fallback);
        onEnter();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: '#000',
        overflow: 'hidden', // No scrolling allowed
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at 50% 50%, rgba(0,122,255,0.1) 0%, transparent 60%)`
      }} />

      <section
        ref={heroRef}
        style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center', padding: '0 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}
      >
        <div ref={logoRef} style={{ marginBottom: 40 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #BF5AF2 100%)',
            boxShadow: '0 0 50px rgba(0,122,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: '#fff',
              boxShadow: '0 0 15px rgba(255,255,255,0.8)',
            }} />
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 8vw, 80px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#fff',
            marginBottom: 16
          }}>
            1% CLUB
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Exclusive Ecosystem
          </p>
        </div>

        <div ref={ctaRef}>
          <button
            onClick={handleEnter}
            disabled={entered}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '18px 40px',
              borderRadius: 100,
              border: 'none',
              cursor: entered ? 'default' : 'pointer',
              background: 'linear-gradient(135deg, #007AFF 0%, #BF5AF2 100%)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: '0 0 30px rgba(0,122,255,0.3)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {entered ? 'INITIALIZING...' : 'ENTER ECOSYSTEM'}
            {!entered && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
