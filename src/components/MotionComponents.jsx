import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Fade up reveal on scroll
export function FadeUp({ children, delay = 0, className = '', once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children
export function StaggerContainer({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { y: 30, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Section heading
export function SectionHeading({ tag, title, subtitle }) {
  return (
    <div className="mb-16 text-center">
      <FadeUp>
        <div className="flex justify-center mb-4">
          <span className="section-tag">{tag}</span>
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h2>
      </FadeUp>
      {subtitle && (
        <FadeUp delay={0.2}>
          <p className="font-body text-white/50 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </FadeUp>
      )}
    </div>
  );
}

// Animated card wrapper with tilt on hover
export function AnimatedCard({ children, className = '', glowColor = 'primary' }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      className={`glass glass-hover rounded-2xl p-6 ${className}`}
      data-cursor
    >
      {children}
    </motion.div>
  );
}
