import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
  SiCplusplus, SiPython, SiJavascript, SiReact, SiNodedotjs,
  SiMongodb, SiMysql, SiGit, SiGithub, SiFigma, SiCanva,
  SiTailwindcss, SiFirebase, SiVercel, SiExpress, SiHtml5, SiCss3,
  SiAdobephotoshop, SiAdobeaftereffects
} from 'react-icons/si';
import { FaJava, FaCode, FaCamera } from 'react-icons/fa';
import { SectionHeading, FadeUp, StaggerContainer, StaggerItem } from './MotionComponents';

const skillCategories = [
  {
    title: 'Programming',
    emoji: '⚡',
    color: '#6C63FF',
    skills: [
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'Python', icon: SiPython, color: '#FFD43B' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    ]
  },
  {
    title: 'Frontend',
    emoji: '🎨',
    color: '#A855F7',
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'ReactJS', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    ]
  },
  {
    title: 'Backend',
    emoji: '🔧',
    color: '#10B981',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#68A063' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
    ]
  },
  {
    title: 'Database',
    emoji: '🗄️',
    color: '#F59E0B',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ]
  },
  {
    title: 'Tools',
    emoji: '🛠️',
    color: '#06B6D4',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { name: 'VS Code', icon: FaCode, color: '#007ACC' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
    ]
  },
  {
    title: 'Creative',
    emoji: '✨',
    color: '#EC4899',
    skills: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
      { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
      { name: 'After Effects', icon: SiAdobeaftereffects, color: '#9999FF' },
      { name: 'Photography', icon: FaCamera, color: '#E879F9' },
    ]
  },
];

function SkillPill({ name, icon: Icon, color, delay }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
      }}
      whileHover={{
        scale: 1.08,
        backgroundColor: `${color}15`,
        borderColor: `${color}50`,
        boxShadow: `0 0 20px ${color}25`,
        transition: { duration: 0.2 }
      }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.25s ease'
      }}
    >
      <Icon size={18} color={color} />
      <span className="font-body text-white/70 text-sm">{name}</span>
    </motion.div>
  );
}

function CategoryCard({ title, emoji, color, skills, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="glass rounded-2xl p-6 border border-white/5 group hover:border-opacity-30 transition-all"
      style={{ '--cat-color': color }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          {emoji}
        </div>
        <h3 className="font-heading font-semibold text-white text-base">{title}</h3>
        <div className="ml-auto h-px flex-1 max-w-12"
          style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
      </div>

      {/* Skills grid */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: index * 0.08 + 0.2 } } }}
        className="flex flex-wrap gap-2"
      >
        {skills.map(skill => (
          <SkillPill key={skill.name} {...skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="blob w-80 h-80 bg-secondary opacity-5 bottom-0 left-0 absolute pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="✦ Technical Arsenal"
          title="Skills & Tools"
          subtitle="Technologies I work with to bring ideas to life."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.title} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
