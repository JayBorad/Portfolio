'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState, lerpSceneState } from '@/lib/sceneState';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uAccent;
  uniform float uAspect;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
      val += noise(p * freq) * amp;
      amp *= 0.5;
      freq *= 2.0;
    }
    return val;
  }

  void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5);
    vec2 mouseInfluence = uMouse * 0.04;

    // Base gradient from bottom (colorA) to top (colorB)
    float gradientY = uv.y + sin(uTime * 0.18) * 0.04 + mouseInfluence.y * 0.5;
    vec3 baseColor = mix(uColorA, uColorB, clamp(gradientY, 0.0, 1.0));

    // Animated radial glow from off-center
    vec2 glowCenter = vec2(0.5 + mouseInfluence.x * 0.8, 0.3 + sin(uTime * 0.12) * 0.08);
    float dist = length((uv - glowCenter) * vec2(uAspect, 1.0));
    float radialGlow = exp(-dist * dist * 2.5);
    baseColor += uAccent * radialGlow * 0.055;

    // Secondary glow (opposite side)
    vec2 glowCenter2 = vec2(0.5 - mouseInfluence.x * 0.5, 0.75 + cos(uTime * 0.09) * 0.06);
    float dist2 = length((uv - glowCenter2) * vec2(uAspect, 1.0));
    float radialGlow2 = exp(-dist2 * dist2 * 4.0);
    baseColor += uAccent * radialGlow2 * 0.03;

    // Animated diagonal light band
    float band = sin((uv.x * uAspect - uv.y) * 1.5 + uTime * 0.08) * 0.5 + 0.5;
    band = smoothstep(0.7, 1.0, band) * 0.012;
    baseColor += uAccent * band;

    // Subtle FBM noise texture
    float n = fbm(uv * 3.5 + vec2(uTime * 0.04, uTime * 0.025));
    baseColor += (n - 0.5) * 0.01;

    // Fine grain noise
    float grain = hash(uv * vec2(1920.0, 1080.0) + uTime * 0.7) * 0.014 - 0.007;
    baseColor += grain;

    // Vignette
    float vignette = 1.0 - smoothstep(0.3, 1.1, length((uv - 0.5) * vec2(uAspect * 0.7, 1.0)));
    baseColor *= mix(0.54, 0.9, vignette);

    // Corner darkening
    float cornerDark = smoothstep(0.0, 0.5, min(uv.x, min(1.0 - uv.x, min(uv.y, 1.0 - uv.y))));
    baseColor *= mix(0.58, 0.9, cornerDark);

    gl_FragColor = vec4(baseColor, 1.0);
  }
`;

export default function GradientShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color('#020412') },
    uColorB: { value: new THREE.Color('#001235') },
    uAccent: { value: new THREE.Color('#00a8ff') },
    uAspect: { value: viewport.width / viewport.height },
  }), []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    depthWrite: false,
    depthTest: false,
  }), [uniforms]);

  useFrame((state, delta) => {
    lerpSceneState(0.025);

    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.x += (sceneState.mouse.x - uniforms.uMouse.value.x) * 0.06;
    uniforms.uMouse.value.y += (sceneState.mouse.y - uniforms.uMouse.value.y) * 0.06;
    uniforms.uColorA.value.copy(sceneState.liveColorA);
    uniforms.uColorB.value.copy(sceneState.liveColorB);
    uniforms.uAccent.value.copy(sceneState.liveAccent);
    uniforms.uAspect.value = state.viewport.width / state.viewport.height;
  });

  return (
    <mesh ref={meshRef} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
