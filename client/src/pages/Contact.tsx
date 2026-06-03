import { motion } from 'framer-motion';
import { Mail, Clock, Send, CheckCircle, MapPin, Zap, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApi } from '../context/ApiContext';

export default function Contact() {
  const { settings } = useApi();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '', preferred_contact: 'email' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await axios.post('/api/inquiries', formData); setSubmitted(true); } 
    catch (err) { console.error('Failed to submit:', err); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="gradient-orb" style={{ width: 400, height: 400, top: 0, left: 0, background: 'radial-gradient(circle, rgba(207,20,43,0.4) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 300, height: 300, bottom: 0, right: 0, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="badge" style={{ margin: '0 auto 32px', width: 'fit-content' }}>
              <Zap size={14} /> Free Technical Audit
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>
              Let's Solve Your <span className="text-gradient">Tech Challenges</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Tell us about your technology needs. We'll review within 2 hours and get back to you with honest advice—no sales pressure.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '60px 0 140px' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 32 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 40 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ width: 80, height: 80, margin: '0 auto 24px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={40} style={{ color: '#34D399' }} /></div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Message Received!</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.6 }}>
                    Thank you for reaching out. Our team will review your message and get back to you within 2 hours during business hours.
                  </p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>For urgent issues, connect with us on WhatsApp</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: 24 }}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>Request Free Audit</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontSize: 14 }}>No commitment required. Just honest feedback on your tech setup.</p>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
                      <div><label style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Full Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-glass" placeholder="Your name" /></div>
                      <div><label style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Email Address *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-glass" placeholder="you@company.com" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
                      <div><label style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-glass" placeholder="+91 98765 43210" /></div>
                      <div><label style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Company / Business Name</label><input type="text" name="company" value={formData.company} onChange={handleChange} className="input-glass" placeholder="Your company name" /></div>
                    </div>
                    <div><label style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>How should we reach you?</label><select name="preferred_contact" value={formData.preferred_contact} onChange={handleChange} className="input-glass"><option value="email">Email (Preferred)</option><option value="phone">Phone / WhatsApp</option></select></div>
                    <div><label style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Tell us about your tech challenges *</label><textarea name="message" required value={formData.message} onChange={handleChange} className="input-glass" style={{ minHeight: 120 }} placeholder="E.g., Our website crashes during peak hours, we need better security, our e-commerce store needs optimization..." /></div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 32px' }}>
                      {loading ? 'Sending...' : 'Submit Request'} <Send size={18} />
                    </button>
                    <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>We respond within 2 hours during business hours</p>
                  </form>
                </>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="glass-card" style={{ padding: 32 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 24 }}>Get in Touch</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(207,20,43,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={22} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Email</p>
                      <p style={{ fontWeight: 600, color: 'white' }}>{settings.contact_email}</p>
                    </div>
                  </div>
                  {settings.contact_whatsapp && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(37,211,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageCircle size={22} style={{ color: '#25D366' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>WhatsApp</p>
                        <a href={`https://wa.me/${settings.contact_whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'white', textDecoration: 'none' }}>{settings.contact_phone || settings.contact_whatsapp}</a>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={22} style={{ color: '#A78BFA' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Business Hours</p>
                      <p style={{ fontWeight: 600, color: 'white' }}>{settings.business_hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: 32, background: 'linear-gradient(135deg, rgba(207,20,43,0.1) 0%, rgba(1,33,105,0.05) 100%)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 24 }}>What Happens After You Submit?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[{ step: 1, title: 'Quick Review', desc: 'Our team reviews your message within 2 hours during business hours.' },
                    { step: 2, title: 'Expert Call', desc: 'A senior engineer calls to understand your challenges in detail.' },
                    { step: 3, title: 'Free Audit Report', desc: 'Receive a detailed technical audit with prioritized recommendations.' },
                    { step: 4, title: 'Your Decision', desc: 'Get a custom proposal with transparent pricing. No pressure, ever.' }
                  ].map((item) => (
                    <div key={item.step} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0, color: 'white' }}>{item.step}</div>
                      <div><h4 style={{ fontWeight: 600, color: 'white', marginBottom: 4 }}>{item.title}</h4><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}