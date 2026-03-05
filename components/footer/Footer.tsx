'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      padding: '3rem 0',
      borderTop: '1px solid rgba(0, 168, 255, 0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600,
            fontSize: '0.9rem',
            background: 'linear-gradient(135deg, #00a8ff, #00e5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>JB</span>
          <span style={{
            fontSize: '0.8rem',
            color: 'rgba(136, 153, 179, 0.4)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            © {new Date().getFullYear()} Jay Borad. Crafted with precision.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: 'rgba(136, 153, 179, 0.35)',
            letterSpacing: '0.1em',
          }}>
            BUILT WITH NEXT.JS + THREE.JS
          </span>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </footer>
  );
}
