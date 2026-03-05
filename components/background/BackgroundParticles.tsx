'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '@/lib/sceneState';

const PARTICLE_COUNT = 900;

export default function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { viewport } = useThree();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const spread = 18;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      speeds[i] = 0.02 + Math.random() * 0.04;
    }
    return { positions, speeds };
  }, []);

  const originalPositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    const t = state.clock.getElapsedTime();

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const speed = speeds[i];
      posArr[ix + 1] = originalPositions[ix + 1] + Math.sin(t * speed + i * 0.1) * 0.4;
      posArr[ix + 0] = originalPositions[ix] + Math.cos(t * speed * 0.7 + i * 0.05) * 0.25;
    }

    geo.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.y = t * 0.008 + sceneState.mouse.x * 0.12;
    pointsRef.current.rotation.x = t * 0.004 + sceneState.mouse.y * 0.08;

    const targetOpacity = sceneState.liveParticleOpacity;
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.04;
    materialRef.current.color.lerp(sceneState.liveAccent, 0.01);
    materialRef.current.color.lerp(new THREE.Color('#88ccff'), 0.003);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.02}
        color="#00a8ff"
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
