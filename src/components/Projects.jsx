import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiPython, SiMysql, SiJavascript } from 'react-icons/si';
import { SectionHeading, FadeUp } from './MotionComponents';

const techIconMap = {
  'ReactJS': SiReact,
  'Node.js': SiNodedotjs,
  'MongoDB': SiMongodb,
  'Python': SiPython,
  'MySQL': SiMysql,
  'JavaScript': SiJavascript,
};

const projects = [
  {
    id: 1,
    featured: true,
    title: 'RAW Vision Media',
    subtitle: 'Web Application',
    description: 'Developing a media platform for photography event management with authentication, admin dashboard, and role-based access control. A full-featured platform for creative communities.',
    tech: ['ReactJS', 'Node.js', 'MongoDB'],
    github: 'https://github.com/YOUR_GITHUB/raw-vision',
    live: '#',
    color: '#6C63FF',
    gradient: 'from-[#6C63FF]/20 to-[#A855F7]/10',
    tags: ['Full Stack', 'Media', 'Auth'],
    emoji: '📷',
  },
  {
    id: 2,
    featured: false,
    title: 'OTT Platform Manager',
    subtitle: 'Management System',
    description: 'Management system handling OTT operations and user-related data with full CRUD functionality and robust database integration.',
    tech: ['Python', 'MySQL'],
    github: 'https://github.com/YOUR_GITHUB/ott-platform',
    live: null,
    color: '#10B981',
    gradient: 'from-[#10B981]/20 to-[#06B6D4]/10',
    tags: ['Backend', 'Database', 'CRUD'],
    emoji: '📺',
  },
  {
    id: 3,
    featured: false,
    title: 'Mafia Game',
    subtitle: 'Interactive App',
    description: 'Offline Mafia game management application with lobby creation, player management, and automated role assignment functionality for party gaming.',
    tech: ['JavaScript'],
    github: 'https://github.com/YOUR_GITHUB/mafia-game',
    live: '#',
    color: '#A855F7',
    gradient: 'from-[#A855F7]/20 to-[#EC4899]/10',
    tags: ['Game', 'Offline', 'Interactive'],
    emoji: '🎭',
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

  if (project.featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-full"
      >
        <motion.div
          onMouseMove={handleMouse}
          onMouseLeave={resetMouse}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1200px' }}
          className="glass rounded-3xl overflow-hidden border border-white/5 relative group"
        >
          {/* Featured badge */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium text-yellow-400"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <FaStar size={10} /> Featured Project
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Visual panel */}
            <div className={`relative h-64 md:h-auto bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(108,99,255,0.15) 0%, transparent 60%)' }} />

              {/* Decorative circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-48 h-48 rounded-full border border-dashed border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute w-32 h-32 rounded-full border border-dashed border-secondary/20"
              />

              <div className="relative z-10 text-8xl">{project.emoji}</div>

              {/* Image slot — replace emoji with:
                  <img src="/projects/raw-vision.jpg" alt="RAW Vision" className="w-full h-full object-cover absolute inset-0" />
              */}
            </div>

            {/* Content panel */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-body"
                    style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-body text-white/30 text-sm mb-1">{project.subtitle}</p>
              <h3 className="font-heading font-bold text-white text-3xl mb-4">{project.title}</h3>
              <p className="font-body text-white/55 leading-relaxed mb-8">{project.description}</p>

              {/* Tech stack */}
              <div className="flex items-center gap-3 mb-8">
                {project.tech.map(t => {
                  const Icon = techIconMap[t];
                  return Icon ? (
                    <div key={t} className="flex items-center gap-2 text-white/50 text-sm font-body">
                      <Icon size={16} /> {t}
                    </div>
                  ) : (
                    <span key={t} className="text-white/50 text-sm font-body">{t}</span>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${project.color}40` }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium text-white"
                  style={{ background: `linear-gradient(135deg, ${project.color}, #A855F7)` }}
                >
                  <FaGithub size={15} /> GitHub
                </motion.a>
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium text-white/70 glass border border-white/10 hover:border-primary/30 transition-colors"
                  >
                    <FaExternalLinkAlt size={13} /> Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Regular card
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className="glass rounded-2xl overflow-hidden border border-white/5 group hover:border-primary/20 transition-colors h-full flex flex-col"
      >
        {/* Visual */}
        <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
          <div className="text-6xl">{project.emoji}</div>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}15, transparent)` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs font-body"
                style={{ background: `${project.color}12`, color: project.color }}>
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-heading font-bold text-white text-xl mb-2">{project.title}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

          {/* Tech */}
          <div className="flex items-center gap-3 mb-5 text-white/40">
            {project.tech.map(t => {
              const Icon = techIconMap[t];
              return Icon ? <Icon key={t} size={16} title={t} /> : <span key={t} className="text-xs">{t}</span>;
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs font-medium text-white/80 glass border border-white/10 hover:border-primary/30 hover:text-white transition-all">
              <FaGithub size={12} /> GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs font-medium text-white/80 glass border border-white/10 hover:border-primary/30 hover:text-white transition-all">
                <FaExternalLinkAlt size={11} /> Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="blob w-96 h-96 bg-primary opacity-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="✦ My Work"
          title="Projects"
          subtitle="Things I've built that I'm proud of."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
