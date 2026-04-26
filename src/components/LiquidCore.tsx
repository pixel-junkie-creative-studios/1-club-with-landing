"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function LiquidCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const offset = scroll.offset;

    // Organic rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + offset * Math.PI * 2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + offset * Math.PI;
    meshRef.current.rotation.z = offset * Math.PI * 0.5;

    // Morph the shape and material
    let targetDistort = 0.2;
    let targetSpeed = 1;
    let targetColor = new THREE.Color("#ffffff");
    let targetMetalness = 0.3;
    let targetRoughness = 0.1;
    let targetScale = 1;

    if (offset < 0.15) {
      // 1. THE 1% - Pure, clean, glass-like
      targetDistort = 0.1;
      targetSpeed = 1;
      targetColor.set("#ffffff");
      targetMetalness = 0.2;
      targetRoughness = 0.05;
      targetScale = 1;
    } else if (offset < 0.35) {
      // 2. WEALTH - Liquid Gold
      targetDistort = 0.4;
      targetSpeed = 2;
      targetColor.set("#ffd700");
      targetMetalness = 1.0;
      targetRoughness = 0.2;
      targetScale = 1.2;
    } else if (offset < 0.55) {
      // 3. NETWORK - High-energy neon blue
      targetDistort = 0.8;
      targetSpeed = 4;
      targetColor.set("#007aff");
      targetMetalness = 0.8;
      targetRoughness = 0.3;
      targetScale = 1.5;
    } else if (offset < 0.75) {
      // 4. POWER - Aggressive Crimson Red
      targetDistort = 0.5;
      targetSpeed = 3;
      targetColor.set("#ff0033");
      targetMetalness = 0.9;
      targetRoughness = 0.4;
      targetScale = 1.3;
    } else {
      // 5. LEGACY - Obsidian Singularity
      targetDistort = 0.05;
      targetSpeed = 0.5;
      targetColor.set("#0a0a0a");
      targetMetalness = 1.0;
      targetRoughness = 0.1;
      targetScale = 0.8;
    }

    // Smooth interpolation (delta-time independent lerping)
    const lerpFactor = 0.05;
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, lerpFactor);
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, lerpFactor);
    materialRef.current.color.lerp(targetColor, lerpFactor);
    materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, targetMetalness, lerpFactor);
    materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, targetRoughness, lerpFactor);
    
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), lerpFactor);

    // Camera zooms dynamically
    state.camera.position.z = THREE.MathUtils.lerp(12, 16, offset);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[3, 1.2, 256, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#ffffff"
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.2}
        roughness={0.1}
        distort={0.2}
        speed={1}
      />
    </mesh>
  );
}
