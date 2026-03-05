'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const steps = [
      { target: 30, speed: 20 },
      { target: 60, speed: 30 },
      { target: 85, speed: 40 },
      { target: 100, speed: 25 },
    ];
    let stepIndex = 0;

    const tick = setInterval(() => {
      const step = steps[stepIndex];
      if (!step) {
        clearInterval(tick);
        return;
      }
      current += 1;
      setProgress(current);
      if (current >= step.target) {
        stepIndex++;
        if (current >= 100) {
          clearInterval(tick);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => setIsHidden(true), 800);
          }, 300);
        }
      }
    }, 18);

    return () => clearInterval(tick);
  }, []);

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#020408',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', marginBottom: '3rem' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '1px solid rgba(0, 168, 255, 0.15)',
                borderTopColor: '#00a8ff',
                borderRightColor: 'rgba(0, 229, 255, 0.6)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                border: '1px solid rgba(168, 85, 247, 0.15)',
                borderBottomColor: '#a855f7',
                borderLeftColor: 'rgba(168, 85, 247, 0.5)',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00a8ff, #a855f7)',
                boxShadow: '0 0 16px rgba(0, 168, 255, 0.8)',
              }} />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: 'rgba(0, 168, 255, 0.7)',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            Loading Experience
          </motion.p>

          <div style={{ width: 280, position: 'relative' }}>
            <div style={{
              height: 1,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00a8ff, #00e5ff, #a855f7)',
                  borderRadius: 2,
                  boxShadow: '0 0 8px rgba(0, 168, 255, 0.6)',
                  transition: 'width 0.1s ease',
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: 'rgba(136, 153, 179, 0.5)',
            }}>
              <span>INIT</span>
              <span style={{ color: 'rgba(0, 168, 255, 0.7)' }}>{progress}%</span>
              <span>READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
