'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'Vercel',
    period: '2023 — Present',
    description: 'Lead engineer on the Next.js framework team. Architected the App Router, improved cold start performance by 60%, and contributed to the edge computing infrastructure serving 100M+ requests daily.',
    tags: ['Next.js', 'Rust', 'Edge Computing', 'TypeScript'],
    color: '#e8f0fe',
  },
  {
    role: 'Full-Stack Engineer',
    company: 'Stripe',
    period: '2021 — 2023',
    description: 'Built core features for the Stripe Dashboard and Payment Links. Led the migration of legacy systems to a modern React architecture, achieving 40% reduction in bundle size and 2x faster page loads.',
    tags: ['React', 'Go', 'PostgreSQL', 'gRPC'],
    color: '#7c3aed',
  },
  {
    role: 'Frontend Lead',
    company: 'Figma',
    period: '2019 — 2021',
    description: 'Led development of the Figma Plugin API and developer tooling ecosystem. Built WebAssembly-based rendering engine features and improved canvas performance by 35%.',
    tags: ['WebAssembly', 'Canvas API', 'TypeScript', 'Rust'],
    color: '#f472b6',
  },
  {
    role: 'Software Engineer',
    company: 'Airbnb',
    period: '2017 — 2019',
    description: 'Built the guest and host experience features for Airbnb\'s core web app. Developed component library used across 12 product teams and improved Core Web Vitals scores to 95th percentile.',
    tags: ['React', 'Ruby on Rails', 'Redis', 'GraphQL'],
    color: '#fb923c',
  },
  {
    role: 'Junior Developer',
    company: 'Freelance',
    period: '2015 — 2017',
    description: 'Worked with early-stage startups to build their MVPs. Delivered 15+ projects including e-commerce platforms, SaaS dashboards, and mobile applications.',
    tags: ['React', 'Node.js', 'MongoDB', 'React Native'],
    color: '#4ade80',
  },
];

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        alignItems: 'center',
        gap: '0',
        marginBottom: '0',
        position: 'relative',
      }}
    >
      <div style={{
        gridColumn: isLeft ? '1' : '3',
        gridRow: 1,
        paddingRight: isLeft ? '2rem' : 0,
        paddingLeft: isLeft ? 0 : '2rem',
        textAlign: isLeft ? 'right' : 'left',
      }}>
        <motion.div
          whileHover={{
            borderColor: `${exp.color}40`,
            boxShadow: `0 8px 30px ${exp.color}15`,
            y: -4,
          }}
          style={{
            padding: '1.75rem',
            borderRadius: '1.25rem',
            background: `${exp.color}06`,
            border: `1px solid ${exp.color}15`,
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: exp.color,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            opacity: 0.8,
          }}>
            {exp.period}
          </div>
          <div style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#e8f0fe',
            marginBottom: '0.25rem',
            letterSpacing: '-0.01em',
          }}>
            {exp.role}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: exp.color,
            fontWeight: 600,
            marginBottom: '0.875rem',
          }}>
            @ {exp.company}
          </div>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(136, 153, 179, 0.8)',
            lineHeight: 1.65,
            marginBottom: '1rem',
          }}>
            {exp.description}
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: isLeft ? 'flex-end' : 'flex-start',
          }}>
            {exp.tags.map((tag) => (
              <span key={tag} style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '100px',
                background: `${exp.color}10`,
                border: `1px solid ${exp.color}25`,
                color: exp.color,
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
                opacity: 0.9,
              }}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{
        gridColumn: 2,
        gridRow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${exp.color}, #00a8ff)`,
            boxShadow: `0 0 16px ${exp.color}80, 0 0 30px ${exp.color}40`,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: `1px solid ${exp.color}30`,
          }} />
        </motion.div>
      </div>

      {isLeft ? (
        <div style={{ gridColumn: 3, gridRow: 1 }} />
      ) : (
        <div style={{ gridColumn: 1, gridRow: 1 }} />
      )}
    </motion.div>
  );
}

export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true });

  return (
    <section id="experience" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '-200px',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 168, 255, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <SectionHeader
          eyebrow="Experience"
          title="Professional"
          highlight="Journey"
          description="Building at the frontier of technology with some of the world's most innovative companies."
          centered
        />

        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              transform: 'translateX(-50%)',
              width: 1,
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={inView ? { height: '100%' } : { height: '0%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, #00a8ff, #a855f7, #00e5ff)',
                originY: 0,
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
