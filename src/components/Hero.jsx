import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaDownload, FaArrowRight,
  FaReact, FaNodeJs, FaPython, FaJs
} from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';

const roles = ['Full Stack Developer', 'Creative Designer', 'Problem Solver', 'Tech Enthusiast'];

const techIcons = [
  { icon: FaReact, color: '#61DAFB', label: 'React', delay: 0 },
  { icon: FaNodeJs, color: '#68A063', label: 'Node', delay: 0.3 },
  { icon: SiMongodb, color: '#47A248', label: 'MongoDB', delay: 0.6 },
  { icon: FaPython, color: '#FFD43B', label: 'Python', delay: 0.9 },
  { icon: FaJs, color: '#F7DF1E', label: 'JS', delay: 1.2 },
];

function FloatingTechIcon({ icon: Icon, color, label, delay, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1.5, duration: 0.5, type: 'spring' }}
      style={{ position: 'absolute', left: x, top: y }}
      className="flex flex-col items-center gap-1"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        className="glass rounded-xl p-3 shadow-lg"
        style={{ boxShadow: `0 0 20px ${color}22` }}
      >
        <Icon size={24} color={color} />
      </motion.div>
      <span className="text-white/40 text-xs font-body">{label}</span>
    </motion.div>
  );
}

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout;

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
    } else if (deleting) {
      timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 40);
    } else {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="gradient-text-primary font-heading font-bold">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-8 md:h-10 bg-primary ml-1 align-middle"
      />
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax mouse effect for the right panel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const letters = "Shreya Desai".split('');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-primary -top-32 -left-32" />
        <div className="blob w-[500px] h-[500px] bg-secondary bottom-0 right-0" style={{ animationDelay: '3s' }} />
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Content */}
          <div>
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="section-tag">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow inline-block" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Hi, I'm */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-white/50 text-xl mb-2"
            >
              Hi, I'm
            </motion.p>

            {/* Name with stagger reveal */}
            <div className="overflow-hidden mb-4">
              <div className="flex flex-wrap gap-x-4">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`font-heading font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${char === ' ' ? 'w-4' : 'text-white'}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Typing roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-2xl md:text-3xl lg:text-4xl mb-8 h-12 flex items-center"
            >
              <TypewriterText />
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="font-body text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-xl"
            >
              Creative and technically driven Computer Science Engineering student passionate about
              building impactful digital experiences through technology, creativity, and innovation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(108,99,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #A855F7)' }}
              >
                View Projects <FaArrowRight size={14} />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-white/80 text-sm glass border border-white/10 hover:border-primary/40 transition-colors"
              >
                <FaDownload size={14} /> Download Resume
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-white/80 text-sm glass border border-white/10 hover:border-primary/40 transition-colors"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex items-center gap-4"
            >
              <span className="text-white/30 text-xs font-body">Connect</span>
              <div className="h-px flex-1 max-w-8 bg-white/10" />
              {[
                { Icon: FaGithub, href: 'https://github.com/YOUR_GITHUB', label: 'GitHub' },
                { Icon: FaLinkedin, href: 'https://linkedin.com/in/YOUR_LINKEDIN', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#6C63FF' }}
                  className="text-white/40 hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Animated profile / illustration area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center h-[480px] hidden lg:flex"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-80 h-80 rounded-full"
              style={{
                border: '1px dashed rgba(108,99,255,0.2)',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 rounded-full"
              style={{
                border: '1px dashed rgba(168,85,247,0.15)',
              }}
            />

            {/* Profile image container with 3D tilt */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative w-56 h-56 rounded-full overflow-hidden z-10"
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white/20 font-heading text-6xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(168,85,247,0.2))',
                  border: '2px solid rgba(108,99,255,0.3)',
                  boxShadow: '0 0 60px rgba(108,99,255,0.2), inset 0 0 60px rgba(108,99,255,0.05)'
                }}
              >
                {/* 
                  ✅ REPLACE THIS WITH YOUR PROFILE IMAGE:
                  <img src="/profile.jpg" alt="Shreya Desai" className="w-full h-full object-cover" />
                */}
                SD
              </div>
            </motion.div>

            {/* Floating tech icons */}
            <FloatingTechIcon {...techIcons[0]} x="5%" y="10%" />
            <FloatingTechIcon {...techIcons[1]} x="72%" y="5%" />
            <FloatingTechIcon {...techIcons[2]} x="80%" y="55%" />
            <FloatingTechIcon {...techIcons[3]} x="5%" y="65%" />
            <FloatingTechIcon {...techIcons[4]} x="38%" y="82%" />

            {/* Glow orb */}
            <div
              className="absolute w-56 h-56 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
