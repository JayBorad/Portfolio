import * as THREE from 'three';

export interface SectionTheme {
  colorA: THREE.Color;
  colorB: THREE.Color;
  accent: THREE.Color;
  bloomIntensity: number;
  particleOpacity: number;
  cameraZ: number;
  fogDensity: number;
}

export const sectionThemes: Record<string, SectionTheme> = {
  hero: {
    colorA: new THREE.Color('#020412'),
    colorB: new THREE.Color('#001235'),
    accent: new THREE.Color('#00a8ff'),
    bloomIntensity: 1.4,
    particleOpacity: 0.55,
    cameraZ: 4.0,
    fogDensity: 0.015,
  },
  about: {
    colorA: new THREE.Color('#01080f'),
    colorB: new THREE.Color('#001820'),
    accent: new THREE.Color('#00e5ff'),
    bloomIntensity: 1.0,
    particleOpacity: 0.4,
    cameraZ: 4.5,
    fogDensity: 0.02,
  },
  stack: {
    colorA: new THREE.Color('#080110'),
    colorB: new THREE.Color('#130025'),
    accent: new THREE.Color('#a855f7'),
    bloomIntensity: 1.2,
    particleOpacity: 0.5,
    cameraZ: 5.0,
    fogDensity: 0.018,
  },
  projects: {
    colorA: new THREE.Color('#030010'),
    colorB: new THREE.Color('#08001e'),
    accent: new THREE.Color('#7c3aed'),
    bloomIntensity: 1.1,
    particleOpacity: 0.45,
    cameraZ: 4.8,
    fogDensity: 0.02,
  },
  experience: {
    colorA: new THREE.Color('#010305'),
    colorB: new THREE.Color('#02070e'),
    accent: new THREE.Color('#1a4a7a'),
    bloomIntensity: 0.7,
    particleOpacity: 0.25,
    cameraZ: 5.5,
    fogDensity: 0.025,
  },
  contact: {
    colorA: new THREE.Color('#010c0c'),
    colorB: new THREE.Color('#001e1e'),
    accent: new THREE.Color('#00e5ff'),
    bloomIntensity: 1.0,
    particleOpacity: 0.4,
    cameraZ: 4.5,
    fogDensity: 0.018,
  },
};

export const sceneState = {
  currentSection: 'hero' as string,
  progress: 0,
  mouse: { x: 0, y: 0 },
  targetColorA: new THREE.Color('#020412'),
  targetColorB: new THREE.Color('#001235'),
  targetAccent: new THREE.Color('#00a8ff'),
  targetBloom: 1.4,
  targetParticleOpacity: 0.55,
  targetCameraZ: 4.0,
  liveColorA: new THREE.Color('#020412'),
  liveColorB: new THREE.Color('#001235'),
  liveAccent: new THREE.Color('#00a8ff'),
  liveBloom: 1.4,
  liveParticleOpacity: 0.55,
};

export function setSection(section: string) {
  const theme = sectionThemes[section];
  if (!theme) return;
  sceneState.currentSection = section;
  sceneState.targetColorA.copy(theme.colorA);
  sceneState.targetColorB.copy(theme.colorB);
  sceneState.targetAccent.copy(theme.accent);
  sceneState.targetBloom = theme.bloomIntensity;
  sceneState.targetParticleOpacity = theme.particleOpacity;
  sceneState.targetCameraZ = theme.cameraZ;
}

export function updateMouseState(x: number, y: number) {
  sceneState.mouse.x = x;
  sceneState.mouse.y = y;
}

export function lerpSceneState(alpha: number) {
  sceneState.liveColorA.lerp(sceneState.targetColorA, alpha);
  sceneState.liveColorB.lerp(sceneState.targetColorB, alpha);
  sceneState.liveAccent.lerp(sceneState.targetAccent, alpha);
  sceneState.liveBloom += (sceneState.targetBloom - sceneState.liveBloom) * alpha;
  sceneState.liveParticleOpacity += (sceneState.targetParticleOpacity - sceneState.liveParticleOpacity) * alpha;
}
