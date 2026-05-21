import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/YOUR_GITHUB', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/YOUR_LINKEDIN', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:shreya@example.com', label: 'Email' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-10 border-t border-white/5 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(168,85,247,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-heading font-bold text-2xl mb-3">
                <span className="gradient-text-primary">SD</span>
                <span className="text-white/20 mx-2">·</span>
                <span className="text-white">Portfolio</span>
              </p>
              <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
                Computer Science Engineering Student building meaningful digital experiences at the intersection of code and creativity.
              </p>
            </motion.div>
          </div>

          {/* Nav */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-4">Navigation</p>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-white/50 hover:text-white text-sm text-left transition-colors animated-underline w-fit"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-4">Connect</p>
              <div className="flex gap-3 mb-5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/50 hover:text-primary border border-white/5 hover:border-primary/30 transition-colors"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
              <a
                href="mailto:shreya@example.com"
                className="font-body text-white/40 hover:text-primary transition-colors text-sm animated-underline"
              >
                shreya@example.com
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-3"
        >
          <p className="font-body text-white/25 text-xs text-center">
            © {new Date().getFullYear()} Shreya Desai. All rights reserved.
          </p>
          <p className="font-body text-white/25 text-xs flex items-center gap-1.5">
            Designed & Developed by{' '}
            <span className="gradient-text-primary font-medium">Shreya Desai</span>
            <span className="mx-0.5">with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaHeart size={11} className="text-primary" />
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
