import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveScreen } = useStore();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set an ID for ScrollTrigger consistency
    container.id = 'scrollytelling-container';

    // Create plates for transformation
    const plates: HTMLDivElement[] = [];
    for (let i = 0; i < 12; i++) {
      const plate = document.createElement('div');
      plate.className = 'plate';
      plate.style.backgroundImage = `radial-gradient(circle at ${i * 30}% ${i * 20}%, #00ff9f, transparent)`;
      container.appendChild(plate);
      plates.push(plate);
    }

    // Master timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=500vh',
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // HERO (The Seed): A glowing '1%' emblem
    // We'll represent this as the initial state of plates

    // SCROLL 1 (Wealth): The emblem fragments
    masterTl.to(plates.slice(0, 4), {
      rotateX: 90,
      z: -100,
      stagger: 0.1
    }, 0);
    masterTl.to(plates.slice(4, 8), {
      rotateY: 90,
      z: 100,
      stagger: 0.1
    }, 0.2);
    masterTl.to(plates.slice(8, 12), {
      rotateZ: 90,
      z: -50,
      stagger: 0.1
    }, 0.4);

    // SCROLL 2 (Supercars)
    masterTl.to(plates.slice(0, 4), {
      scaleX: 3,
      scaleY: 0.2,
      rotateX: 0,
      stagger: 0.05
    }, "-=0.5");
    masterTl.to(plates.slice(4, 8), {
      scaleX: 0.2,
      scaleY: 3,
      rotateY: 0,
      stagger: 0.05
    }, "-=0.5");
    masterTl.to(plates.slice(8, 12), {
      scale: 2,
      rotateZ: 0,
      stagger: 0.05
    }, "-=0.5");

    // Add radial elements for wheels
    const wheels = plates.slice(0, 4).map((_, i) => {
      const wheel = document.createElement('div');
      wheel.className = 'wheel';
      wheel.style.background = 'radial-gradient(circle, #00ff9f 20%, transparent 20%)';
      wheel.style.width = '80px';
      wheel.style.height = '80px';
      wheel.style.position = 'absolute';
      container.appendChild(wheel);
      return wheel;
    });

    masterTl.to(wheels, {
      x: (i) => [-150, -50, 50, 150][i],
      y: 200,
      stagger: 0.1
    }, "-=0.3");

    // SCROLL 3 (Aviation)
    masterTl.to(wheels, {
      y: 0,
      scale: 0,
      stagger: 0.05
    }, "-=0.2");
    masterTl.to(plates.slice(0, 2), {
      x: -150,
      stagger: 0.1
    }, "-=0.5");
    masterTl.to(plates.slice(2, 4), {
      x: 150,
      stagger: 0.1
    }, "-=0.5");
    masterTl.to(plates.slice(4, 6), {
      rotateX: 90,
      z: -100,
      stagger: 0.1
    }, "-=0.3");
    masterTl.to(plates.slice(6, 8), {
      rotateX: -90,
      z: 100,
      stagger: 0.1
    }, "-=0.3");

    // SCROLL 4 (Mansions)
    masterTl.to(plates, {
      rotateX: 90,
      z: (i) => (i % 2 === 0 ? -200 : 200),
      stagger: 0.05
    }, "-=0.5");
    
    const glassPanels = plates.slice(0, 6).map((_, i) => {
      const panel = document.createElement('div');
      panel.className = 'glass-panel';
      panel.style.background = 'rgba(255, 255, 255, 0.1)';
      panel.style.backdropFilter = 'blur(10px)'
      panel.style.border = '1px solid rgba(255, 255, 255, 0.2)'
      container.appendChild(panel);
      return panel;
    });
    masterTl.fromTo(glassPanels, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, stagger: 0.05 }
    , "-=0.3");

    // FINAL (The Portal)
    masterTl.to(plates, {
      scale: 0.1,
      rotateZ: 360,
      borderRadius: '50%',
      stagger: 0.01
    }, "-=0.5");
    masterTl.to(wheels, {
      scale: 0,
      stagger: 0.01
    }, "-=0.5");
    masterTl.to(glassPanels, {
      scale: 0,
      stagger: 0.01
    }, "-=0.5");

    // Create the final button
    const finalButton = document.createElement('button');
    finalButton.className = 'final-button';
    finalButton.textContent = 'ENTER ECOSYSTEM';
    finalButton.style.position = 'absolute';
    finalButton.style.top = '50%';
    finalButton.style.left = '50%';
    finalButton.style.transform = 'translate(-50%, -50%)';
    finalButton.style.padding = '1rem 2rem';
    finalButton.style.background = 'rgba(0, 255, 159, 0.2)';
    finalButton.style.border = '1px solid #00ff9f';
    finalButton.style.color = '#00ff9f';
    finalButton.style.fontFamily = 'inherit';
    finalButton.style.fontSize = '1.25rem';
    finalButton.style.cursor = 'pointer';
    finalButton.style.borderRadius = '50%';
    finalButton.style.width = '200px';
    finalButton.style.height = '200px';
    finalButton.style.display = 'flex';
    finalButton.style.alignItems = 'center';
    finalButton.style.justifyContent = 'center';
    finalButton.style.zIndex = '100';
    finalButton.style.opacity = '0';
    container.appendChild(finalButton);

    // Show button at the end of timeline
    masterTl.to(finalButton, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    const handleEnter = () => {
      setActiveScreen('wallet');
    };

    finalButton.addEventListener('click', handleEnter);

    // Cleanup
    return () => {
      finalButton.removeEventListener('click', handleEnter);
      gsap.killTweensOf(plates);
      gsap.killTweensOf(wheels);
      gsap.killTweensOf(glassPanels);
      gsap.killTweensOf(finalButton);
      masterTl.kill();
      ScrollTrigger.getById('scrollytelling-container')?.kill();
      
      // Remove elements
      plates.forEach(p => p.remove());
      wheels.forEach(w => w.remove());
      glassPanels.forEach(g => g.remove());
      finalButton.remove();
    };
  }, [setActiveScreen]);

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-fintech-dark">
      {/* Additional hero content can go here */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-5xl font-bold text-[#00ff9f] drop-shadow-[0_0_20px_rgba(0,255,159,0.5)]">
          1%
        </div>
      </div>
    </div>
  );
}