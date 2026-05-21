import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCamera, FaCode, FaUsers, FaLightbulb, FaTasks, FaCog } from 'react-icons/fa';
import { SectionHeading, FadeUp } from './MotionComponents';

const experiences = [
  {
    role: 'Student In-Charge',
    org: 'RAW Vision Media Club',
    period: '2023 — Present',
    type: 'Leadership',
    color: '#6C63FF',
    icon: FaCamera,
    emoji: '📷',
    responsibilities: [
      { icon: FaUsers, text: 'Supervising content and media operations across teams' },
      { icon: FaTasks, text: 'Managing and coordinating cross-functional creative teams' },
      { icon: FaLightbulb, text: 'Leading innovative creative initiatives and campaigns' },
    ],
    tags: ['Media', 'Leadership', 'Content'],
  },
  {
    role: 'Tech Convenor',
    org: 'Ambiora Techfest',
    period: '2023',
    type: 'Technical',
    color: '#A855F7',
    icon: FaCode,
    emoji: '🚀',
    responsibilities: [
      { icon: FaCog, text: 'End-to-end technical planning and infrastructure setup' },
      { icon: FaUsers, text: 'Coordinating technical teams and delegating responsibilities' },
      { icon: FaTasks, text: 'Overseeing complete event execution and delivery' },
    ],
    tags: ['Techfest', 'Planning', 'Execution'],
  },
];

function TimelineCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector (desktop) */}
      <div className="hidden lg:block absolute top-10 w-full">
        {index % 2 === 0 ? (
          <div className="absolute right-0 -mr-px top-0 h-px w-16"
            style={{ background: `linear-gradient(90deg, transparent, ${exp.color}40)` }} />
        ) : (
          <div className="absolute left-0 -ml-px top-0 h-px w-16"
            style={{ background: `linear-gradient(90deg, ${exp.color}40, transparent)` }} />
        )}
      </div>

      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className="glass rounded-2xl p-7 border border-white/5 group hover:border-primary/20 transition-colors relative overflow-hidden"
      >
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${exp.color}20, transparent)` }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
              {exp.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-body px-2.5 py-1 rounded-full"
                  style={{ background: `${exp.color}12`, color: exp.color, border: `1px solid ${exp.color}25` }}>
                  {exp.type}
                </span>
                <span className="text-white/30 text-xs font-body">{exp.period}</span>
              </div>
              <h3 className="font-heading font-bold text-white text-xl">{exp.role}</h3>
              <p className="font-body text-white/50 text-sm">{exp.org}</p>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="space-y-3 mb-6">
          {exp.responsibilities.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + i * 0.1 + 0.3, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${exp.color}12` }}>
                <Icon size={11} style={{ color: exp.color }} />
              </div>
              <p className="font-body text-white/60 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-lg text-xs font-body text-white/40"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${exp.color}60, transparent)` }} />
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      <div className="blob w-80 h-80 bg-primary opacity-5 top-1/2 right-0 absolute pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="✦ Experience"
          title="Leadership & Impact"
          subtitle="Roles where I've led teams, driven initiatives, and created impact."
        />

        {/* Timeline center line */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.3), transparent)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiences.map((exp, i) => (
              <div key={exp.role} className={i % 2 === 1 ? 'lg:mt-16' : ''}>
                <TimelineCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
