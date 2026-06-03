import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Calendar, Mail, Target, TrendingUp, CheckCircle, ArrowRight, DollarSign, Zap, Shield, Sparkles, TrendingUp as TrendingUpIcon, Rocket } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';

const planRecommendations = [
  { tier: 'Essential', price: 299, icon: Sparkles, color: 'rgba(255,255,255,0.3)', features: ['CRM Setup & Support', 'Scheduling Systems', 'Security Updates', 'Bug Fixes', 'Monthly Reports'] },
  { tier: 'Growth', price: 499, icon: TrendingUpIcon, color: 'rgba(207,20,43,0.4)', featured: true, features: ['Priority Support (4hr)', '10 Dev Hours/mo', 'Client Portal Setup', 'Marketing Automation', 'Quarterly Strategy'] },
  { tier: 'Scale', price: 899, icon: Rocket, color: 'rgba(1,33,105,0.4)', features: ['24/7 Emergency Support', 'Dedicated Manager', 'Unlimited Dev Hours', 'Custom Integrations', 'Monthly Strategy Calls'] }
];

const challenges = [
  { icon: Users, title: 'Client Portal Management', description: 'Give clients 24/7 access to documents, invoices, and project updates. No more email chains or lost files.' },
  { icon: Calendar, title: 'Scheduling & Booking', description: 'Let clients book time with you online. Automated reminders reduce no-shows and free up your calendar.' },
  { icon: Target, title: 'Lead Tracking & CRM', description: 'Turn prospects into paying clients with automated follow-ups, pipeline tracking, and conversion analytics.' },
  { icon: DollarSign, title: 'Invoicing & Payments', description: 'Get paid faster with professional invoices, automatic reminders, and online payment options.' },
  { icon: Mail, title: 'Email Marketing', description: 'Nurture leads and stay top-of-mind with automated email campaigns that deliver results.' },
  { icon: Shield, title: 'Client Data Security', description: 'Protect sensitive client information with enterprise-grade security that builds trust.' }
];

const services = [
  { title: 'CRM Implementation', description: 'Set up and customize CRM systems that fit your unique sales process and client management style.' },
  { title: 'Scheduling System Setup', description: 'Online booking that syncs with your calendar and sends automatic reminders to clients.' },
  { title: 'Client Portal Development', description: 'Secure client portals for document sharing, project tracking, and seamless communication.' },
  { title: 'Payment Integration', description: 'Accept payments online with professional invoicing that gets you paid faster.' },
  { title: 'Marketing Automation', description: 'Email campaigns that nurture leads and keep clients engaged without you doing it manually.' }
];

const caseStudies = [
  { metric: '3x', title: 'More Clients', description: 'Automated lead follow-up helped a business coach triple their consultation bookings.' },
  { metric: '85%', title: 'Faster Invoicing', description: 'Digital invoicing system reduced average payment time from 30 days to 5 days.' },
  { metric: '50+', title: 'Hours Saved Monthly', description: 'Marketing automation reclaimed 50+ hours per month for a team of 3 consultants.' }
];

export default function ConsultantsCoaches() {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, right: 0, background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 700 }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Briefcase size={14} /> Professional Services
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              <span className="text-gradient">Consultants & Coaches</span> Growth System
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
              Spend less time on operations and more time delivering value. We build the systems that scale your coaching practice.
            </p>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
              Build Your System <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
              What's <span className="text-gradient">Slowing You Down</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              As a consultant or coach, your time is your most valuable asset. We eliminate the friction.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {challenges.map((challenge, index) => (
              <motion.div key={challenge.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <challenge.icon size={24} style={{ color: '#3B82F6' }} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 12 }}>{challenge.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64, textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16 }}>
              How We <span className="text-gradient">Help</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Systems designed for consultants and coaches who want to scale without burning out.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={20} style={{ color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{service.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48, textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16 }}>
              Success <span className="text-gradient">Stories</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {caseStudies.map((study, index) => (
              <motion.div key={study.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 8, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{study.metric}</div>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>{study.title}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48, textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16 }}>
              Subscription <span className="text-gradient">Plans</span> for Consultants
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Your time is valuable. Get the tech support that lets you focus on clients while we handle the systems.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {planRecommendations.map((plan, index) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: plan.featured ? 'linear-gradient(180deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)' : 'rgba(255,255,255,0.05)',
                  border: plan.featured ? '1px solid rgba(207,20,43,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  padding: 28,
                  position: 'relative'
                }}
              >
                {plan.featured && (
                  <div style={{ position: 'absolute', top: 12, right: 16 }}>
                    <span style={{ background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)', color: 'white', padding: '4px 12px', borderRadius: 100, fontSize: 10, fontWeight: 700 }}>RECOMMENDED</span>
                  </div>
                )}
                <div style={{ width: 48, height: 48, borderRadius: 14, background: plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <plan.icon size={24} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>{plan.tier}</h3>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: plan.featured ? '#CF142B' : 'white', marginBottom: 20 }}>{formatPrice(plan.price)}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/mo</span></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                      <CheckCircle size={14} style={{ color: '#34D399', flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '10px 20px', background: plan.featured ? '#CF142B' : 'rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                  View Plan <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 64, textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16 }}>
              Ready to Scale Your Practice?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Let's build systems that give you back your time while growing your business.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Get Started <ArrowRight size={18} /></Link>
              <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.1)', color: 'white', transition: 'all 0.3s' }}>View Pricing</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}