'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

const projects = [
  {
    id: 1,
    title: 'NeuralSpace Platform',
    category: 'Full-Stack SaaS',
    description: 'An AI-powered 3D visualization platform for neural network training and monitoring. Real-time WebGL rendering with live data streams.',
    longDesc: 'Built with React Three Fiber and WebGL for real-time 3D visualization. Features live training metrics, interactive neural network graphs, and WebSocket-powered live data streaming. Handles 100k+ concurrent users with Kubernetes orchestration.',
    tags: ['React', 'Three.js', 'WebSocket', 'Go', 'Kubernetes'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    live: '#',
    color: '#00a8ff',
  },
  {
    id: 2,
    title: 'QuantumFlow CMS',
    category: 'Content Platform',
    description: 'Next-generation headless CMS with real-time collaboration, AI content generation, and a no-code visual editor with drag-and-drop blocks.',
    longDesc: 'A headless CMS platform with real-time collaborative editing powered by CRDTs. Features AI-powered content generation, SEO optimization, and a visual page builder. Serves 500+ enterprise clients.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tiptap', 'AI/ML'],
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    live: '#',
    color: '#a855f7',
  },
  {
    id: 3,
    title: 'DeepScan Analytics',
    category: 'Data Visualization',
    description: 'Enterprise-grade analytics dashboard with D3.js-powered interactive charts, real-time KPI tracking, and AI-driven anomaly detection.',
    longDesc: 'Complex data visualization platform processing 10M+ events per day. Features custom D3.js charts, real-time WebSocket updates, and machine learning anomaly detection. Reduced client reporting time by 80%.',
    tags: ['React', 'D3.js', 'Python', 'ML', 'AWS'],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    live: '#',
    color: '#00e5ff',
  },
  {
    id: 4,
    title: 'Luminary Design System',
    category: 'Design System',
    description: 'A comprehensive, accessible design system with 80+ components, dark/light themes, and full TypeScript support used by 20+ product teams.',
    longDesc: 'Enterprise design system with 80+ accessible components, Storybook documentation, automated visual regression testing, and comprehensive TypeScript types. Adopted by 20+ internal teams with 98% satisfaction score.',
    tags: ['React', 'TypeScript', 'Storybook', 'Radix UI', 'Figma'],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    live: '#',
    color: '#f472b6',
  },
  {
    id: 5,
    title: 'ChainVault DeFi',
    category: 'Web3 Application',
    description: 'Decentralized finance protocol with liquidity pools, yield farming, and a real-time on-chain analytics dashboard.',
    longDesc: 'A DeFi protocol with automated market making, yield farming strategies, and cross-chain bridging. Smart contracts audited and managing $50M+ TVL. Built with Solidity, React, and ethers.js.',
    tags: ['Solidity', 'React', 'ethers.js', 'Node.js', 'The Graph'],
    image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    live: '#',
    color: '#4ade80',
  },
  {
    id: 6,
    title: 'Spectral Commerce',
    category: 'E-Commerce',
    description: 'High-performance headless e-commerce solution with AI-powered recommendations, AR product preview, and sub-100ms page loads.',
    longDesc: 'Headless e-commerce platform with AR product visualization, AI-powered recommendation engine, and edge-deployed storefront achieving sub-100ms TTFB globally. Processes $2M+ in monthly transactions.',
    tags: ['Next.js', 'Shopify API', 'AR.js', 'Redis', 'Vercel Edge'],
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: '#',
    live: '#',
    color: '#fb923c',
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 4, 8, 0.85)',
        backdropFilter: 'blur(20px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 720,
          width: '100%',
          borderRadius: '1.5rem',
          background: 'rgba(4, 12, 28, 0.95)',
          border: '1px solid rgba(0, 168, 255, 0.15)',
          overflow: 'hidden',
          boxShadow: `0 40px 80px rgba(0, 0, 0, 0.6), 0 0 60px ${project.color}15`,
        }}
      >
        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(4, 12, 28, 1) 100%)`,
          }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(2, 4, 8, 0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e8f0fe',
              cursor: 'pointer',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '100px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {project.category}
            </span>
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#e8f0fe',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>{project.title}</h3>
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(136, 153, 179, 0.85)',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}>{project.longDesc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: '0.3rem 0.75rem',
                borderRadius: '100px',
                background: 'rgba(0, 168, 255, 0.06)',
                border: '1px solid rgba(0, 168, 255, 0.15)',
                color: 'rgba(0, 168, 255, 0.9)',
                fontSize: '0.75rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 168, 255, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                background: 'rgba(0, 168, 255, 0.1)',
                border: '1px solid rgba(0, 168, 255, 0.3)',
                color: '#00a8ff',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              GitHub
            </motion.a>
            <motion.a
              href={project.live}
              whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${project.color}40` }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                background: `linear-gradient(135deg, ${project.color}30, ${project.color}20)`,
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Live Demo →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotY(x * 12);
    setRotX(-y * 12);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => { setIsHovered(false); setRotX(0); setRotY(0); }}
        onMouseMove={handleMouseMove}
        onClick={() => setSelectedProject(project)}
        style={{
          borderRadius: '1.25rem',
          overflow: 'hidden',
          background: 'rgba(4, 12, 28, 0.8)',
          border: `1px solid ${isHovered ? project.color + '40' : 'rgba(0, 168, 255, 0.08)'}`,
          cursor: 'pointer',
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered
            ? 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease'
            : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease',
          boxShadow: isHovered
            ? `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${project.color}15`
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? `linear-gradient(to bottom, ${project.color}15, rgba(4, 12, 28, 0.8))`
              : 'linear-gradient(to bottom, transparent, rgba(4, 12, 28, 0.9))',
            transition: 'background 0.4s ease',
          }} />
          <span style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '0.25rem 0.75rem',
            borderRadius: '100px',
            background: `${project.color}20`,
            border: `1px solid ${project.color}40`,
            color: project.color,
            fontSize: '0.7rem',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {project.category}
          </span>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#e8f0fe',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}>{project.title}</h3>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(136, 153, 179, 0.75)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
          }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '100px',
                background: 'rgba(0, 168, 255, 0.06)',
                border: '1px solid rgba(0, 168, 255, 0.12)',
                color: 'rgba(0, 168, 255, 0.7)',
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}>{tag}</span>
            ))}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: '0.8rem',
              color: project.color,
              fontWeight: 500,
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }}>
              View Details →
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[{ label: 'GH', href: project.github }, { label: 'Live', href: project.live }].map((btn) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(136, 153, 179, 0.7)',
                    fontSize: '0.7rem',
                    textDecoration: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {btn.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: '8rem 0', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-100px',
        width: 350,
        height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 168, 255, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected"
          highlight="Projects"
          description="A collection of products and experiments that showcase my approach to building digital experiences."
          centered
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
