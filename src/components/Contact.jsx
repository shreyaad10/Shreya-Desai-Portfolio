import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaEnvelope,
  FaPaperPlane, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import { SectionHeading, FadeUp } from './MotionComponents';

const contactLinks = [
  {
    icon: FaGithub,
    label: 'GitHub',
    value: '@YOUR_GITHUB',
    href: 'https://github.com/YOUR_GITHUB',
    color: '#ffffff',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Shreya Desai',
    href: 'https://linkedin.com/in/YOUR_LINKEDIN',
    color: '#0A66C2',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'shreya@example.com',
    href: 'mailto:shreya@example.com',
    color: '#6C63FF',
  },
];

function ContactLink({ icon: Icon, label, value, href, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6, transition: { duration: 0.2 } }}
      className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-primary/20 transition-colors group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={20} color={color} />
      </div>
      <div>
        <p className="font-body text-white/40 text-xs mb-0.5">{label}</p>
        <p className="font-body text-white font-medium text-sm">{value}</p>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: `${color}20` }}>
          <span className="text-xs" style={{ color }}>↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');

    try {
      /**
       * ✅ EMAILJS INTEGRATION:
       * 1. npm install @emailjs/browser (already in package.json)
       * 2. Create account at emailjs.com
       * 3. Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
       *
       * import emailjs from '@emailjs/browser';
       * await emailjs.sendForm(
       *   'YOUR_SERVICE_ID',
       *   'YOUR_TEMPLATE_ID',
       *   formRef.current,
       *   'YOUR_PUBLIC_KEY'
       * );
       */

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1800));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-primary opacity-5 -bottom-24 -left-24 absolute pointer-events-none" />
      <div className="blob w-72 h-72 bg-secondary opacity-5 -top-24 right-0 absolute pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="✦ Get In Touch"
          title="Let's Connect"
          subtitle="Have an idea, opportunity, or just want to say hi? My inbox is always open."
        />

        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Left: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <FadeUp>
              <div className="glass rounded-2xl p-6 border border-white/5 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(108,99,255,0.12)' }}>
                  <span className="text-lg">✉️</span>
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">Open to opportunities</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  Currently looking for internships, collaborations, and freelance projects. Let's build something great together.
                </p>
              </div>
            </FadeUp>

            <div className="flex flex-col gap-3">
              {contactLinks.map((link, i) => (
                <ContactLink key={link.label} {...link} index={i} />
              ))}
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.08), transparent)' }} />

              <AnimatePresence mode="wait">
                {/* Success state */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl z-20"
                    style={{ background: 'rgba(10,10,15,0.95)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    >
                      <FaCheckCircle size={56} className="text-green-400 mb-4" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-heading font-bold text-white text-2xl mb-2"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="font-body text-white/50 text-sm text-center max-w-xs"
                    >
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </motion.p>
                  </motion.div>
                )}

                {/* Error state */}
                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 mb-4 p-4 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <FaExclamationCircle className="text-red-400 flex-shrink-0" />
                    <p className="font-body text-red-400 text-sm">Something went wrong. Please try again or email directly.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                <h3 className="font-heading font-bold text-white text-xl mb-1">Send a message</h3>

                {/* Name */}
                <div>
                  <label className="font-body text-white/50 text-xs mb-2 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Shreya Desai"
                    className="form-input"
                    autoComplete="name"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-body text-red-400 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <FaExclamationCircle size={10} /> {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="font-body text-white/50 text-xs mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="form-input"
                    autoComplete="email"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-body text-red-400 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <FaExclamationCircle size={10} /> {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div>
                  <label className="font-body text-white/50 text-xs mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    rows={5}
                    className="form-input resize-none"
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="font-body text-red-400 text-xs flex items-center gap-1"
                        >
                          <FaExclamationCircle size={10} /> {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span className={`font-body text-xs ml-auto ${form.message.length > 0 ? 'text-white/30' : 'text-transparent'}`}>
                      {form.message.length} chars
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02, boxShadow: '0 0 30px rgba(108,99,255,0.4)' }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  className="flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl font-body font-medium text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #A855F7)' }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
