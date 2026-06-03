import { motion } from 'framer-motion';
import { Target, Heart, Shield, Users, ArrowRight, CheckCircle, Award, Globe, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const values = [
  { icon: Heart, title: 'Your Success Comes First', description: 'We measure our success by yours. Every decision we make is guided by what helps your business grow—not our bottom line.' },
  { icon: Shield, title: 'Radical Transparency', description: 'No hidden fees, no surprise charges. You get detailed monthly reports showing exactly what we did and why. Full visibility, always.' },
  { icon: Target, title: 'We Own It', description: 'When something breaks, we fix it—no excuses, no blame-shifting. We take complete accountability for your technology stack.' },
  { icon: Users, title: 'Partnership, Not Vendor', description: 'We build relationships that span years, not contracts. You get a dedicated team who truly understands your business.' }
];

const milestones = [
  { year: '2018', title: 'Founded in New York', description: 'Started with a simple belief: businesses deserve reliable tech support without enterprise-level complexity or prices.' },
  { year: '2020', title: '100 Clients Milestone', description: 'Expanded to serve clients across the US and UK, with dedicated support teams in multiple time zones.' },
  { year: '2024', title: '500+ Active Clients', description: 'Today we serve over 500 businesses across healthcare, retail, professional services, and e-commerce in the US & UK.' }
];

const trustPoints = [
  { icon: Clock, stat: '<30 min', label: 'Average Response Time' },
  { icon: Shield, stat: '99.97%', label: 'Uptime Guaranteed' },
  { icon: Star, stat: '4.9/5', label: 'Client Satisfaction' },
  { icon: Globe, stat: '2 Countries', label: 'US & UK Coverage' }
];

const teamPrinciples = [
  'All engineers undergo background verification and security training',
  'Dedicated account managers for every client—no ticket systems',
  'Regular certifications in latest security and cloud technologies',
  '24/7 availability with guaranteed response SLA'
];

export default function About() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 100, position: 'relative' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, right: -100, background: 'radial-gradient(circle, rgba(207,20,43,0.4) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 400, height: 400, bottom: 0, left: -100, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}
          >
            <div className="badge" style={{ margin: '0 auto 32px', width: 'fit-content' }}>About JenQ</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: 24, lineHeight: 1.2 }}>
              Built for <span className="text-gradient">US & UK</span> Businesses
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 650, margin: '0 auto' }}>
              We started JenQ because we saw a gap: businesses deserved enterprise-grade technology support without the enterprise complexity or offshore delays. Today, we're proud to serve 500+ clients across the United States and United Kingdom.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 24, maxWidth: 900, margin: '0 auto' }}>
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', padding: 32 }}
              >
                <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: 16, background: 'rgba(207,20,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <point.icon style={{ color: 'var(--color-primary)', size: 24 }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>{point.stat}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{point.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto' }}>
              From a small team in Mumbai to serving 500+ clients across India.
            </p>
          </motion.div>

          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ display: 'flex', gap: 32, marginBottom: 40, alignItems: 'flex-start' }}
              >
                <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>{milestone.year}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{milestone.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              What Drives <span className="text-gradient">Everything We Do</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: 32 }}
              >
                <div style={{ width: 56, height: 56, marginBottom: 20, borderRadius: 16, background: 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <value.icon style={{ color: 'var(--color-primary)', size: 28 }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>{value.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: 15 }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white' }}>
              Why Choose <span className="text-gradient">JenQ Over Others?</span>
            </h2>
          </motion.div>

          <div style={{ maxWidth: 850, margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: 40, marginBottom: 24 }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 32 }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 20, textDecoration: 'line-through' }}>Traditional Agencies</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#EF4444' }}>✕</span> Project-based billing
                    </li>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#EF4444' }}>✕</span> Disappears after launch
                    </li>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#EF4444' }}>✕</span> Reactive problem-solving
                    </li>
                    <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#EF4444' }}>✕</span> Generic solutions
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34D399', marginBottom: 20 }}>The JenQ Difference</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle style={{ color: '#34D399', size: 18 }} /> Fixed monthly retainer
                    </li>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle style={{ color: '#34D399', size: 18 }} /> Always here, always
                    </li>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle style={{ color: '#34D399', size: 18 }} /> Proactive 24/7 monitoring
                    </li>
                    <li style={{ padding: '12px 0', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle style={{ color: '#34D399', size: 18 }} /> Tailored to your business
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Our Team <span className="text-gradient">Standards</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto' }}>
              Every engineer on our team meets these criteria before working on your systems.
            </p>
          </motion.div>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'grid', gap: 16 }}>
              {teamPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle style={{ color: '#34D399', size: 20 }} />
                  </div>
                  <span style={{ color: 'white', fontSize: 15 }}>{principle}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0 140px' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 64, textAlign: 'center', maxWidth: 650, margin: '0 auto', background: 'linear-gradient(135deg, rgba(207,20,43,0.15) 0%, rgba(1,33,105,0.1) 100%)' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Ready to Experience the Difference?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.7 }}>
              Book a free technical audit and see how we can transform your technology stack.
            </p>
            <Link to="/contact" className="btn-primary" style={{ padding: '16px 40px', fontSize: 16 }}>
              Book Free Audit <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}