'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Tools'];

const techs = [
  { name: 'React', cat: 'Frontend', color: '#00d4ff', icon: '⚛', desc: 'Component-based UI library' },
  { name: 'Next.js', cat: 'Frontend', color: '#e8f0fe', icon: 'N', desc: 'Full-stack React framework' },
  { name: 'TypeScript', cat: 'Frontend', color: '#3b82f6', icon: 'TS', desc: 'Typed JavaScript superset' },
  { name: 'JavaScript', cat: 'Frontend', color: '#facc15', icon: 'JS', desc: 'Core language for modern web apps' },
  { name: 'Tailwind', cat: 'Frontend', color: '#38bdf8', icon: '◈', desc: 'Utility-first CSS framework' },
  { name: 'Shadcn UI', cat: 'Frontend', color: '#c4b5fd', icon: '◍', desc: 'Accessible component system for React' },
  { name: 'Node.js', cat: 'Backend', color: '#4ade80', icon: '⬡', desc: 'JS runtime environment' },
  { name: 'Express.js', cat: 'Backend', color: '#22d3ee', icon: 'EX', desc: 'Backend framework for REST APIs' },
  { name: 'MongoDB', cat: 'Backend', color: '#34d399', icon: '🍃', desc: 'Document database for flexible schemas' },
  { name: 'MySQL', cat: 'Backend', color: '#60a5fa', icon: '🛢', desc: 'Relational database for structured data' },
  { name: 'Supabase', cat: 'Backend', color: '#3ecf8e', icon: '⚡', desc: 'Auth, database, and realtime backend' },
  { name: 'REST API', cat: 'Backend', color: '#f97316', icon: '⇄', desc: 'Scalable service integration patterns' },
  { name: 'Google Cloud', cat: 'DevOps', color: '#a78bfa', icon: '☁', desc: 'Cloud services and deployment workflows' },
  { name: 'Vercel', cat: 'DevOps', color: '#e8f0fe', icon: '▲', desc: 'Frontend deployment and edge hosting' },
  { name: 'GitHub Actions', cat: 'DevOps', color: '#93c5fd', icon: '⟳', desc: 'CI/CD automation for delivery pipelines' },
  { name: 'Postman', cat: 'Tools', color: '#fb923c', icon: '◠', desc: 'API testing and collaboration workspace' },
  { name: 'Git', cat: 'Tools', color: '#f97316', icon: '⎇', desc: 'Version control system' },
  { name: 'VS Code', cat: 'Tools', color: '#38bdf8', icon: '⌘', desc: 'Primary editor for full-stack development' },
  { name: 'npm', cat: 'Tools', color: '#f87171', icon: '⬢', desc: 'Package management and build scripts' },
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? techs : techs.filter((t) => t.cat === activeCategory);

  return (
    <section id="stack" style={{
      padding: '8rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-150px',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        transform: 'translateY(-50%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <SectionHeader
          eyebrow="Tech Stack"
          title="Tools &"
          highlight="Technologies"
          description="A curated arsenal of modern technologies I use to build fast, scalable, and beautiful applications."
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '100px',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, rgba(0, 168, 255, 0.2), rgba(168, 85, 247, 0.2))'
                  : 'transparent',
                border: activeCategory === cat
                  ? '1px solid rgba(0, 168, 255, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: activeCategory === cat ? '#e8f0fe' : 'rgba(136, 153, 179, 0.7)',
                fontSize: '0.85rem',
                fontWeight: activeCategory === cat ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                whileHover={{
                  scale: 1.04,
                  y: -6,
                  boxShadow: `0 8px 30px ${tech.color}22, 0 0 0 1px ${tech.color}33`,
                }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: `${tech.color}08`,
                  border: `1px solid ${tech.color}18`,
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  fontSize: '1.75rem',
                  marginBottom: '0.75rem',
                  filter: `drop-shadow(0 0 8px ${tech.color}80)`,
                }}>
                  {tech.icon}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: tech.color,
                  marginBottom: '0.25rem',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {tech.name}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(136, 153, 179, 0.6)',
                  lineHeight: 1.5,
                }}>
                  {tech.desc}
                </div>

                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '100px',
                  background: `${tech.color}15`,
                  fontSize: '0.6rem',
                  color: `${tech.color}cc`,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {tech.cat}
                </div>

                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: tech.color,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
