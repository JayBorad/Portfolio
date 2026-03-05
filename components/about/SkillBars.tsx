'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'React / Next.js', level: 96, color: '#00a8ff' },
  { name: 'TypeScript', level: 93, color: '#00cfff' },
  { name: 'Three.js / WebGL', level: 87, color: '#00e5ff' },
  { name: 'Node.js / Go', level: 89, color: '#60a5fa' },
  { name: 'AWS / DevOps', level: 82, color: '#a855f7' },
  { name: 'UI/UX Design', level: 85, color: '#c084fc' },
];

function SkillBar({ skill, delay }: { skill: typeof skills[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: '1.25rem' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
      }}>
        <span style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#c8d8f0',
          letterSpacing: '0.01em',
        }}>{skill.name}</span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: skill.color,
          fontWeight: 600,
        }}>{skill.level}%</span>
      </div>
      <div style={{
        height: 5,
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, delay: delay + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            height: '100%',
            borderRadius: 4,
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 5,
            height: '100%',
            background: skill.color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${skill.color}`,
          }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillBars() {
  return (
    <div>
      {skills.map((skill, i) => (
        <SkillBar key={skill.name} skill={skill} delay={i * 0.08} />
      ))}
    </div>
  );
}
