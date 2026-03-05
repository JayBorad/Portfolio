'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setSection, updateMouseState } from '@/lib/sceneState';

gsap.registerPlugin(ScrollTrigger);

const sectionMap = [
  { id: 'hero', section: 'hero' },
  { id: 'about', section: 'about' },
  { id: 'stack', section: 'stack' },
  { id: 'projects', section: 'projects' },
  { id: 'experience', section: 'experience' },
  { id: 'contact', section: 'contact' },
];

export default function ScrollTriggerSync() {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const rafId = requestAnimationFrame(() => {
      sectionMap.forEach(({ id, section }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setSection(section),
          onEnterBack: () => setSection(section),
        });
        triggers.push(trigger);
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      updateMouseState(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      triggers.forEach((t) => t.kill());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
