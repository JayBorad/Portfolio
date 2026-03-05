'use client';

import dynamic from 'next/dynamic';
import PageLoader from '@/components/loader/PageLoader';
import CustomCursor from '@/components/cursor/CustomCursor';
import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import TechStackSection from '@/components/techstack/TechStackSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/footer/Footer';

const GlobalBackground = dynamic(
  () => import('@/components/background/GlobalBackground'),
  { ssr: false }
);

const ScrollTriggerSync = dynamic(
  () => import('@/components/background/ScrollTriggerSync'),
  { ssr: false }
);

function SectionDivider() {
  return (
    <div style={{
      margin: '0 2rem',
      height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(0, 168, 255, 0.12), rgba(168, 85, 247, 0.08), transparent)',
    }} />
  );
}

export default function Home() {
  return (
    <>
      <GlobalBackground />
      <ScrollTriggerSync />
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <HeroSection />
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(1, 6, 14, 0.3), rgba(1, 6, 14, 0.5))',
          }}
        >
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <TechStackSection />
          <SectionDivider />
          <ProjectsSection />
          <SectionDivider />
          <ExperienceSection />
          <SectionDivider />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
