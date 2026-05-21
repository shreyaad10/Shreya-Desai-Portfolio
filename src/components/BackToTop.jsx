import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setVisible(v > 0.15));
    return unsub;
  }, [scrollYProgress]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const circumference = 2 * Math.PI * 20; // r=20

  return (
    <>
      {/* Scroll progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[200] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #6C63FF, #A855F7)',
        }}
      />

      {/* Back to top button */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            onClick={scrollToTop}
            className="back-to-top group"
            aria-label="Back to top"
          >
            {/* SVG ring progress */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 48 48"
              >
                {/* Track */}
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="rgba(108,99,255,0.15)"
                  strokeWidth="2"
                />
                {/* Progress */}
                <motion.circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset: useSpring(
                    // map scrollYProgress 0→1 to circumference→0
                    scrollYProgress,
                    { stiffness: 100, damping: 30 }
                  ) }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6C63FF" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centre button */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center glass border border-white/10 group-hover:border-primary/40 transition-all"
                style={{ background: 'rgba(108,99,255,0.12)' }}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaArrowUp size={13} className="text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
