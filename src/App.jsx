import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import CertificationsAndExtras from './components/CertificationsAndExtras';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => setEntered(true), 100);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Main site */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative min-h-screen"
            style={{ background: '#0A0A0F' }}
          >
            {/* Global particle canvas */}
            <ParticleBackground />

            {/* Navigation */}
            <Navbar />

            {/* Page content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <CertificationsAndExtras />
              <Contact />
            </main>

            <Footer />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
