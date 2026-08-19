'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import SkillBars from './SkillBars';

const stats = [
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '+', label: 'Happy Clients' },
  { value: 25, suffix: '+', label: 'Production Deployments' },
];

const techIcons = [
  { name: 'React', color: '#00d4ff' },
  { name: 'Next.js', color: '#e8f0fe' },
  { name: 'TypeScript', color: '#3b82f6' },
  { name: 'JavaScript', color: '#facc15' },
  { name: 'Tailwind CSS', color: '#22d3ee' },
  { name: 'Supabase', color: '#4ade80' },
  { name: 'Express.js', color: '#93c5fd' },
  { name: 'MongoDB', color: '#34d399' },
  { name: 'MySQL', color: '#60a5fa' },
  { name: 'REST APIs', color: '#fb923c' },
  { name: 'Git', color: '#f87171' },
  { name: 'Google Cloud', color: '#a78bfa' },
];

function StatCard({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1800;
    const start = performance.now();
    const id = setTimeout(() => {
      const raf = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * stat.value));
        if (progress < 1) requestAnimationFrame(raf);
        else setCount(stat.value);
      };
      requestAnimationFrame(raf);
    }, delay * 1000);
    return () => clearTimeout(id);
  }, [inView, stat.value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        borderColor: 'rgba(0, 168, 255, 0.3)',
        boxShadow: '0 0 30px rgba(0, 168, 255, 0.1)',
        y: -4,
      }}
      style={{
        padding: '2rem',
        borderRadius: '1rem',
        background: 'rgba(0, 168, 255, 0.03)',
        border: '1px solid rgba(0, 168, 255, 0.1)',
        textAlign: 'center',
        cursor: 'default',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="stat-num">
        {count}{stat.suffix}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: 'rgba(136, 153, 179, 0.6)',
        marginTop: '0.5rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" style={{
      padding: '8rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '-200px',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 168, 255, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <SectionHeader
          eyebrow="About Me"
          title="Crafting Digital"
          highlight="Experiences"
          description="I'm a full-stack developer with a passion for creating immersive, high-performance web applications that blend engineering excellence with beautiful design."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem',
        }}>
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={i * 0.1} />
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#e8f0fe',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{
                width: 32,
                height: 2,
                background: 'linear-gradient(90deg, #00a8ff, #a855f7)',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              Technical Skills
            </h3>
            <SkillBars />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#e8f0fe',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{
                width: 32,
                height: 2,
                background: 'linear-gradient(90deg, #a855f7, #00a8ff)',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              Technologies
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {techIcons.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: `0 0 16px ${tech.color}44`,
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '100px',
                    background: `${tech.color}0d`,
                    border: `1px solid ${tech.color}22`,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: tech.color,
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'rgba(0, 168, 255, 0.03)',
                border: '1px solid rgba(0, 168, 255, 0.1)',
              }}
            >
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.75,
                color: 'rgba(136, 153, 179, 0.85)',
              }}>
                I focus on building reliable web products that are fast, scalable,
                and easy to maintain. From clean frontend experiences in React and
                Next.js to backend APIs and database workflows, I care about writing
                practical code that solves real business problems.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
