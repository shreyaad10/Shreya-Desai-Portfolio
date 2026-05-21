import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: name, 1: tagline, 2: exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + 2;
      });
    }, 30);

    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => onComplete(), 3200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [onComplete]);

  const letterVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i) => ({
      y: 0, opacity: 1,
      transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }),
  };

  const name = "Shreya Desai".split('');
  const tagline = "Building Experiences...".split('');

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="loading-screen flex-col gap-8"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="blob w-96 h-96 bg-primary top-1/4 left-1/4" />
            <div className="blob w-80 h-80 bg-secondary bottom-1/4 right-1/4" style={{ animationDelay: '2s' }} />
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Name */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === 0 && (
                  <motion.div
                    key="name"
                    className="flex gap-0"
                    initial="hidden"
                    animate="visible"
                    exit={{ y: -60, opacity: 0, transition: { duration: 0.4 } }}
                  >
                    {name.map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        className={`font-heading text-5xl md:text-7xl font-bold ${char === ' ' ? 'w-6' : ''}`}
                        style={{ color: '#ffffff' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
                {phase === 1 && (
                  <motion.div
                    key="tagline"
                    className="flex gap-0"
                    initial="hidden"
                    animate="visible"
                  >
                    {tagline.map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        className={`font-display text-3xl md:text-5xl font-medium ${char === ' ' ? 'w-3' : ''}`}
                        style={{ color: i < 8 ? '#6C63FF' : '#A855F7' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-64 h-px bg-white/10 relative overflow-hidden rounded-full"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6C63FF, #A855F7)',
                  width: `${progress}%`,
                  transition: 'width 0.1s linear'
                }}
              />
            </motion.div>

            {/* Counter */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-sm text-white/30 font-mono"
            >
              {String(progress).padStart(3, '0')}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
