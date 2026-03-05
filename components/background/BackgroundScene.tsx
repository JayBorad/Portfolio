'use client';

import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import GradientShader from './GradientShader';
import BackgroundParticles from './BackgroundParticles';
import { sceneState } from '@/lib/sceneState';

function BackgroundCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 4);
  }, [camera]);

  useFrame(() => {
    camera.position.x += (sceneState.mouse.x * 0.12 - camera.position.x) * 0.022;
    camera.position.y += (sceneState.mouse.y * 0.08 - camera.position.y) * 0.022;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function BackgroundScene() {
  return (
    <>
      <BackgroundCamera />
      <GradientShader />
      <BackgroundParticles />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.32}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.9}
          height={256}
        />
        <Vignette offset={0.25} darkness={0.68} />
      </EffectComposer>
    </>
  );
}
