'use client';

import HeroText from './HeroText';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-premium-bg"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 18% 28%, rgba(0, 168, 255, 0.16), transparent 28%), radial-gradient(circle at 74% 18%, rgba(168, 85, 247, 0.12), transparent 24%), linear-gradient(135deg, #02060d 0%, #04101d 46%, #020408 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(2, 4, 8, 0.12) 0%, rgba(2, 4, 8, 0.42) 52%, rgba(2, 4, 8, 0.88) 100%), linear-gradient(180deg, rgba(1, 6, 14, 0.5), rgba(1, 6, 14, 0.1) 46%, rgba(1, 6, 14, 0.72))',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0, 168, 255, 0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 168, 255, 0.075) 1px, transparent 1px)',
          backgroundSize: '92px 92px',
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 12%, black 68%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 12%, black 68%, transparent 100%)',
          opacity: 0.34,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '16%',
          right: '-10%',
          width: 'min(54vw, 820px)',
          height: 'min(54vw, 820px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, rgba(0, 168, 255, 0.08) 34%, transparent 68%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '28%',
          right: '5%',
          width: '42vw',
          maxWidth: 760,
          minWidth: 360,
          height: 360,
          transform: 'rotate(-18deg)',
          background:
            'linear-gradient(90deg, transparent, rgba(0, 168, 255, 0.13), rgba(168, 85, 247, 0.12), transparent)',
          filter: 'blur(34px)',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      <div
        className="hero-aurora hero-aurora-primary"
        style={{
          position: 'absolute',
          top: '9%',
          right: '-8%',
          width: 'min(62vw, 980px)',
          height: 'min(62vw, 980px)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      <div
        className="hero-aurora hero-aurora-secondary"
        style={{
          position: 'absolute',
          top: '24%',
          right: '4%',
          width: 'min(42vw, 680px)',
          height: 'min(42vw, 680px)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      <div
        className="hero-glass-panel"
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: 'min(37vw, 560px)',
          height: 'min(37vw, 560px)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      <div
        className="hero-orbit-lines"
        style={{
          position: 'absolute',
          top: '22%',
          right: '6%',
          width: 'min(48vw, 760px)',
          height: 'min(32vw, 500px)',
          pointerEvents: 'none',
          zIndex: 6,
        }}
      >
        <span />
        <span />
        <span />
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
