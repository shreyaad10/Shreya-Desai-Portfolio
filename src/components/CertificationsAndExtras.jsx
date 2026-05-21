import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaAward, FaMedal } from 'react-icons/fa';
import { SectionHeading, FadeUp, StaggerContainer, StaggerItem } from './MotionComponents';

const certifications = [
  {
    title: 'Machine Learning Certification',
    issuer: 'IIT Bombay',
    year: '2023',
    color: '#6C63FF',
    emoji: '🧠',
    skills: ['Supervised Learning', 'Neural Networks', 'Python', 'Data Science'],
    verified: true,
  },
];

const extracurricular = [
  {
    emoji: '🤝',
    title: 'Volunteer',
    subtitle: 'Old Age Home Service',
    color: '#10B981',
    desc: 'Contributing to community welfare through regular volunteer work.',
  },
  {
    emoji: '🎤',
    title: 'MUN Delegate',
    subtitle: 'Model United Nations',
    color: '#F59E0B',
    desc: 'Represented nations and debated global issues on the international stage.',
  },
  {
    emoji: '💃',
    title: 'Bharatanatyam',
    subtitle: 'Classical Dance',
    color: '#EC4899',
    desc: 'Trained in the classical Indian dance form — discipline meets artistry.',
  },
  {
    emoji: '🎵',
    title: 'Classical Music',
    subtitle: 'Vocalist',
    color: '#8B5CF6',
    desc: 'Practice and performance of classical Indian music traditions.',
  },
  {
    emoji: '🏊',
    title: 'Swimming',
    subtitle: 'Competitive Sport',
    color: '#06B6D4',
    desc: 'Competitive swimmer with a love for the discipline and endurance training.',
  },
];

function CertCard({ cert }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-7 border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-colors"
    >
      {/* Glow BG */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(circle at 20% 20%, ${cert.color}08, transparent 60%)` }} />

      {/* Badge */}
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
          {cert.emoji}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {cert.verified && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body"
                style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
                <FaMedal size={9} /> Verified
              </span>
            )}
            <span className="text-white/30 text-xs font-body">{cert.year}</span>
          </div>
          <h3 className="font-heading font-bold text-white text-lg mb-1">{cert.title}</h3>
          <p className="font-body text-primary text-sm mb-4">{cert.issuer}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {cert.skills.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-body text-white/50"
                style={{ background: `${cert.color}10`, border: `1px solid ${cert.color}20` }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Award icon */}
        <FaAward size={24} className="text-primary/20 group-hover:text-primary/40 transition-colors flex-shrink-0" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)` }} />
    </motion.div>
  );
}

export default function CertificationsAndExtras() {
  return (
    <>
      {/* Certifications */}
      <section id="certifications" className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tag="✦ Certifications"
            title="Credentials"
            subtitle="Recognized learning from top institutions."
          />
          <div className="max-w-3xl mx-auto">
            {certifications.map(cert => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular */}
      <section id="extracurricular" className="relative py-20 overflow-hidden">
        <div className="blob w-72 h-72 bg-secondary opacity-5 bottom-0 right-0 absolute pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tag="✦ Beyond Code"
            title="Extracurriculars"
            subtitle="Life outside the screen — where character is built."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {extracurricular.map(({ emoji, title, subtitle, color, desc }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -6, borderColor: `${color}40`, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-5 border border-white/5 group cursor-default h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                    {emoji}
                  </div>
                  <h4 className="font-heading font-semibold text-white text-base mb-0.5">{title}</h4>
                  <p className="font-body text-xs mb-3" style={{ color }}>{subtitle}</p>
                  <p className="font-body text-white/40 text-xs leading-relaxed flex-1">{desc}</p>

                  {/* Bottom accent */}
                  <div className="mt-4 h-px w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }} />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
