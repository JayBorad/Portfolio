'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
          transition: 'padding 0.4s ease, background 0.4s ease',
          background: scrolled
            ? 'rgba(2, 4, 8, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 168, 255, 0.08)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #00a8ff, #00e5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.01em',
            }}>JB</span>
            <span style={{
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(232, 240, 254, 0.5)',
              marginLeft: 8,
              letterSpacing: '0.05em',
              fontFamily: 'JetBrains Mono, monospace',
            }}>dev</span>
          </motion.div>

          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} onNav={handleNav} />
            ))}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 168, 255, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav('#contact')}
              style={{
                marginLeft: '1rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, rgba(0, 168, 255, 0.15), rgba(168, 85, 247, 0.15))',
                border: '1px solid rgba(0, 168, 255, 0.3)',
                color: '#00e5ff',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
              }}
            >
              Hire Me
            </motion.button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={menuOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 9 : i === 2 ? -9 : 0,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                style={{
                  width: 22,
                  height: 1.5,
                  background: '#00a8ff',
                  borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(2, 4, 8, 0.97)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          pointerEvents: menuOpen ? 'all' : 'none',
          backdropFilter: 'blur(24px)',
        }}
        className="md:hidden"
      >
        {navLinks.map((link, i) => (
          <motion.button
            key={link.href}
            initial={false}
            animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: menuOpen ? i * 0.07 : 0 }}
            onClick={() => handleNav(link.href)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#e8f0fe',
              letterSpacing: '-0.02em',
            }}
          >
            {link.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}

function NavLink({ link, onNav }: { link: { label: string; href: string }; onNav: (href: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onNav(link.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem 0.875rem',
        fontSize: '0.875rem',
        fontWeight: 400,
        color: hovered ? '#e8f0fe' : 'rgba(136, 153, 179, 0.8)',
        transition: 'color 0.2s ease',
        position: 'relative',
        letterSpacing: '0.01em',
      }}
    >
      {link.label}
      <motion.div
        animate={{ width: hovered ? '100%' : '0%', opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 1,
          background: 'linear-gradient(90deg, #00a8ff, #a855f7)',
        }}
      />
    </button>
  );
}
