'use client';

import HeroText from './HeroText';
import TechPhysicsBox from './TechPhysicsBox';

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(1, 6, 14, 0.92), rgba(1, 6, 14, 0.86))',
          zIndex: 1,
        }}
      />

      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        width: '600px',
        height: '600px',
        transform: 'translateX(-10%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 168, 255, 0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
        }}
      >
        <TechPhysicsBox />
      </div>

      <div style={{
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
        padding: '0 2rem',
        paddingTop: '8rem',
        paddingBottom: '6rem',
        display: 'block',
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 640 }}>
          <HeroText />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(2, 8, 18, 0.24), rgba(2, 8, 18, 0.42))',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
    </section>
  );
}
