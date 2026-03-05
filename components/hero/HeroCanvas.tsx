'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

function OrbitParticle({ index, radius, speed, phase, color }: {
  index: number;
  radius: number;
  speed: number;
  phase: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    const tiltAngle = (index / 8) * Math.PI * 0.5;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t) * radius * Math.sin(tiltAngle);
    const z = Math.sin(t) * radius * Math.cos(tiltAngle);
    if (ref.current) {
      ref.current.position.set(x, y, z);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

function ParticleOrbits() {
  const orbits = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    index: i,
    radius: 1.6 + (i % 3) * 0.25,
    speed: 0.4 + (i % 4) * 0.12,
    phase: (i / 12) * Math.PI * 2,
    color: i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? '#a855f7' : '#00a8ff',
  })), []);

  return (
    <group>
      {orbits.map((o) => (
        <OrbitParticle key={o.index} {...o} />
      ))}
    </group>
  );
}

function FloatingGeometry({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const lerpedMouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    lerpedMouse.current.x += (mouse.current.x - lerpedMouse.current.x) * 0.06;
    lerpedMouse.current.y += (mouse.current.y - lerpedMouse.current.y) * 0.06;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.07 + lerpedMouse.current.x * 0.35;
      groupRef.current.rotation.x = lerpedMouse.current.y * 0.2 + Math.sin(t * 0.2) * 0.05;
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.18 + Math.cos(t * 0.21) * 0.06;
      groupRef.current.position.x = Math.sin(t * 0.18) * 0.08;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.18 + Math.sin(t * 0.3) * 0.1;
      torusRef.current.rotation.z = t * 0.13;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.y = -t * 0.28;
      icosaRef.current.rotation.x = t * 0.14 + Math.cos(t * 0.2) * 0.08;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.09;
      ring1Ref.current.rotation.x = Math.PI / 3.5 + Math.sin(t * 0.15) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.07;
      ring2Ref.current.rotation.y = t * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 5 + t * 0.06;
      ring3Ref.current.rotation.z = -t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1.05, 0.32, 220, 20, 2, 3]} />
        <MeshDistortMaterial
          color="#003366"
          emissive="#001a44"
          emissiveIntensity={0.5}
          metalness={0.95}
          roughness={0.04}
          distort={0.2}
          speed={2}
          envMapIntensity={2}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshStandardMaterial
          color="#000e1a"
          emissive="#002244"
          emissiveIntensity={0.25}
          metalness={1}
          roughness={0}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.15, 0.012, 8, 140]} />
        <meshStandardMaterial
          color="#00a8ff"
          emissive="#00cfff"
          emissiveIntensity={2.5}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.82, 0.008, 8, 120]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={2.5}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.5, 0.006, 8, 100]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={1.5}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.4}
        />
      </mesh>

      <ParticleOrbits />
    </group>
  );
}

function SceneParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4488cc"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  const lerped = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    lerped.current.x += (mouse.current.x - lerped.current.x) * 0.04;
    lerped.current.y += (mouse.current.y - lerped.current.y) * 0.04;
    camera.position.x = lerped.current.x * 0.6 + Math.sin(t * 0.1) * 0.1;
    camera.position.y = -lerped.current.y * 0.4 + Math.cos(t * 0.08) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface HeroCanvasProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export default function HeroCanvas({ mouse }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} color="#0a1a2e" />
      <directionalLight position={[6, 8, 4]} intensity={2} color="#00cfff" castShadow={false} />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#a855f7" />
      <pointLight position={[3, 3, 4]} intensity={3} color="#00a8ff" distance={15} decay={2} />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#7c3aed" distance={12} decay={2} />
      <pointLight position={[0, -4, 2]} intensity={1} color="#00e5ff" distance={10} decay={2} />
      <spotLight
        position={[0, 8, 2]}
        angle={0.35}
        penumbra={0.8}
        intensity={2.5}
        color="#00e5ff"
        distance={20}
      />

      <Stars radius={70} depth={40} count={2000} factor={2.5} saturation={0.3} fade speed={0.4} />
      <SceneParticles />
      <FloatingGeometry mouse={mouse} />
      <CameraRig mouse={mouse} />

      <Environment preset="city" />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.5}
          height={512}
        />
        <DepthOfField
          focusDistance={0.005}
          focalLength={0.05}
          bokehScale={3}
          height={480}
        />
      </EffectComposer>
    </Canvas>
  );
}
