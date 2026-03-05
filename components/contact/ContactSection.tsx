'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

const socials = [
  { label: 'GitHub', href: 'https://github.com/JayBorad', color: '#e8f0fe', icon: 'GH' },
  { label: 'Twitter/X', href: 'https://x.com/Jay__Borad', color: '#00a8ff', icon: 'X' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jay-borad', color: '#0077b5', icon: 'in' },
  // { label: 'Dribbble', href: 'https://dribbble.com/jayborad15', color: '#ea4c89', icon: 'Dr' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  return (
    <section id="contact" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 800,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0, 168, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <SectionHeader
          eyebrow="Contact"
          title="Let's Build"
          highlight="Together"
          description="Have a project in mind or want to collaborate? I'd love to hear from you."
          centered
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          maxWidth: 960,
          margin: '0 auto',
          alignItems: 'start',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#e8f0fe',
                marginBottom: '1rem',
              }}>Let's start a conversation</h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(136, 153, 179, 0.8)',
                lineHeight: 1.7,
              }}>
                Whether you have a new project, a job opportunity, or just want to say hi —
                my inbox is always open. I try to respond within 24 hours.
              </p>
            </div>

            {[
              { label: 'Email', value: 'jayborad15@gmail.com', color: '#00a8ff' },
              { label: 'Location', value: 'Gujarat, India', color: '#00e5ff' },
              { label: 'Status', value: 'Open to opportunities', color: '#4ade80' },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.25rem',
                padding: '1rem 1.25rem',
                borderRadius: '0.875rem',
                background: `${item.color}06`,
                border: `1px solid ${item.color}15`,
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                  flexShrink: 0,
                  ...(item.label === 'Status' ? { animation: 'pulseGlow 2s ease-in-out infinite' } : {}),
                }} />
                <div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'rgba(136, 153, 179, 0.5)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginBottom: '0.1rem',
                  }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: '#e8f0fe', fontWeight: 500 }}>{item.value}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '2rem' }}>
              <div style={{
                fontSize: '0.75rem',
                color: 'rgba(136, 153, 179, 0.5)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '1rem',
              }}>Find me on</div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.08, y: -3, boxShadow: `0 8px 20px ${social.color}30` }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '100px',
                      background: `${social.color}0d`,
                      border: `1px solid ${social.color}25`,
                      color: social.color,
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      fontFamily: 'JetBrains Mono, monospace',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{social.icon}</span>
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '2.5rem',
              borderRadius: '1.5rem',
              background: 'rgba(4, 12, 28, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 168, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 168, 255, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  {[
                    { field: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { field: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                    { field: 'subject', label: 'Subject', type: 'text', placeholder: "Let's work together" },
                  ].map(({ field, label, type, placeholder }) => (
                    <FloatingInput
                      key={field}
                      field={field}
                      label={label}
                      type={type}
                      placeholder={placeholder}
                      value={form[field as keyof typeof form]}
                      onChange={(v) => handleChange(field, v)}
                      error={errors[field]}
                      focused={focused === field}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                    />
                  ))}

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      color: focused === 'message' ? '#00a8ff' : 'rgba(136, 153, 179, 0.6)',
                      marginBottom: '0.5rem',
                      transition: 'color 0.2s ease',
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '0.05em',
                    }}>
                      Message
                    </label>
                    <textarea
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: '0.75rem',
                        fontSize: '0.9rem',
                        resize: 'none',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    />
                    {errors.message && (
                      <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.25rem' }}>{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 30px rgba(0, 168, 255, 0.4)' } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.875rem',
                      background: loading
                        ? 'rgba(0, 168, 255, 0.1)'
                        : 'linear-gradient(135deg, #00a8ff, #0060aa)',
                      border: loading ? '1px solid rgba(0, 168, 255, 0.2)' : 'none',
                      color: loading ? 'rgba(0, 168, 255, 0.6)' : '#fff',
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.03em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: '2px solid rgba(0, 168, 255, 0.3)',
                            borderTopColor: '#00a8ff',
                          }}
                        />
                        Sending...
                      </>
                    ) : 'Send Message →'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.25rem',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0, 168, 255, 0.2), rgba(74, 222, 128, 0.2))',
                      border: '1px solid rgba(74, 222, 128, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 0 30px rgba(74, 222, 128, 0.2)',
                    }}
                  >
                    ✓
                  </motion.div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e8f0fe', marginBottom: '0.5rem' }}>
                      Message Sent!
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(136, 153, 179, 0.7)', lineHeight: 1.6 }}>
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <motion.button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    whileHover={{ scale: 1.03 }}
                    style={{
                      padding: '0.6rem 1.25rem',
                      borderRadius: '100px',
                      background: 'rgba(0, 168, 255, 0.1)',
                      border: '1px solid rgba(0, 168, 255, 0.2)',
                      color: '#00a8ff',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({ field, label, type, placeholder, value, onChange, error, focused, onFocus, onBlur }: {
  field: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '0.8rem',
        color: focused ? '#00a8ff' : error ? '#f87171' : 'rgba(136, 153, 179, 0.6)',
        marginBottom: '0.5rem',
        transition: 'color 0.2s ease',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.05em',
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: '100%',
          padding: '0.875rem 1rem',
          borderRadius: '0.75rem',
          fontSize: '0.9rem',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.25rem' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
