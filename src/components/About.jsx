import { motion } from 'framer-motion';
import { FaGraduationCap, FaStar, FaHeart } from 'react-icons/fa';
import { SectionHeading, FadeUp, StaggerContainer, StaggerItem, AnimatedCard } from './MotionComponents';

const interests = [
  { emoji: '💻', label: 'Full Stack Development' },
  { emoji: '🤖', label: 'AI-powered Projects' },
  { emoji: '🎨', label: 'Graphic Design' },
  { emoji: '📸', label: 'Photography' },
  { emoji: '🎬', label: 'Creative Media' },
  { emoji: '🧩', label: 'Problem Solving' },
];

const stats = [
  { value: '7.6', label: 'CGPA', icon: FaStar },
  { value: '3+', label: 'Projects', icon: FaHeart },
  { value: '2+', label: 'Leadership Roles', icon: FaGraduationCap },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* subtle blob */}
      <div className="blob w-96 h-96 bg-primary opacity-5 top-0 right-0 absolute pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="✦ About Me"
          title="Who I Am"
          subtitle="A blend of technology, creativity, and relentless curiosity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Profile card */}
          <FadeUp className="lg:col-span-2">
            <div className="glass rounded-3xl p-8 h-full border border-white/5 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full"
                style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), transparent)' }} />

              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-heading font-bold text-white mb-6"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF, #A855F7)',
                  boxShadow: '0 0 30px rgba(108,99,255,0.3)'
                }}>
                SD
                {/*
                  ✅ Replace with:
                  <img src="/profile.jpg" className="w-full h-full object-cover rounded-2xl" />
                */}
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-1">Shreya Desai</h3>
              <p className="font-body text-primary text-sm mb-6">CS Engineering Student</p>

              <p className="font-body text-white/55 leading-relaxed text-sm mb-8">
                I'm passionate about building meaningful digital experiences and transforming ideas into
                real-world solutions. Along with technology, I enjoy creativity, design, leadership,
                and continuous learning.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="text-center p-3 rounded-xl"
                    style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.12)' }}>
                    <div className="text-xl font-heading font-bold gradient-text-primary">{value}</div>
                    <div className="text-white/40 text-xs font-body mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right column */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Education card */}
            <FadeUp delay={0.1}>
              <div className="glass rounded-2xl p-7 border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ background: 'rgba(108,99,255,0.12)' }}>
                    <FaGraduationCap size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="section-tag mb-3 text-xs">Education</div>
                    <h4 className="font-heading font-bold text-white text-lg mb-1">
                      B.Tech — Computer Science Engineering
                    </h4>
                    <p className="font-body text-white/50 text-sm">
                      SVKM's NMIMS Mukesh Patel School of Technology and Management
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-primary font-heading font-bold text-2xl">7.6</span>
                      <span className="text-white/30 text-sm font-body">CGPA</span>
                    </div>
                  </div>
                </div>
                {/* glow accent on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: 'inset 0 0 30px rgba(108,99,255,0.04)' }}
                />
              </div>
            </FadeUp>

            {/* Interests */}
            <FadeUp delay={0.2}>
              <div className="glass rounded-2xl p-7 border border-white/5">
                <h4 className="font-heading font-semibold text-white text-base mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-primary to-secondary" />
                  Interests & Passions
                </h4>
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interests.map(({ emoji, label }) => (
                    <StaggerItem key={label}>
                      <motion.div
                        whileHover={{ scale: 1.04, borderColor: 'rgba(108,99,255,0.4)' }}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-default transition-colors"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span className="font-body text-white/60 text-xs leading-snug">{label}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeUp>

            {/* Personal note */}
            <FadeUp delay={0.3}>
              <div className="rounded-2xl p-7 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(168,85,247,0.08))', border: '1px solid rgba(108,99,255,0.2)' }}>
                <span className="font-heading text-6xl text-primary/20 absolute -top-2 left-4">"</span>
                <p className="font-body text-white/70 leading-relaxed text-sm relative z-10 pt-4">
                  Technology without creativity is just code. I strive to sit at the intersection of
                  both — where elegant solutions meet beautiful experiences.
                </p>
                <p className="font-body text-primary/60 text-xs mt-4">— Shreya Desai</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
