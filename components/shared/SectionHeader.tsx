'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({ eyebrow, title, highlight, description, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: centered ? 'center' : 'left', marginBottom: '4rem' }}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.25rem',
      }}>
        <div style={{
          width: 24,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #00a8ff)',
        }} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#00a8ff',
          fontWeight: 500,
        }}>
          {eyebrow}
        </span>
        <div style={{
          width: 24,
          height: 1,
          background: 'linear-gradient(90deg, #00a8ff, transparent)',
        }} />
      </div>

      <h2 className="text-section-title" style={{ color: '#e8f0fe', marginBottom: description ? '1rem' : 0 }}>
        {title}{' '}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>

      {description && (
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(136, 153, 179, 0.9)',
          maxWidth: centered ? 560 : 480,
          margin: centered ? '0 auto' : undefined,
          lineHeight: 1.65,
          marginTop: '1rem',
        }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
