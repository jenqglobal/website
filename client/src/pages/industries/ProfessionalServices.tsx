import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, FileText, Clock, DollarSign, Shield, CheckCircle, ArrowRight, BarChart, Users, Briefcase, Sparkles, TrendingUp as TrendingUpIcon, Rocket } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';

const planRecommendations = [
  { tier: 'Essential', price: 299, icon: Sparkles, color: 'rgba(255,255,255,0.3)', features: ['Document Management', 'Practice Software', 'Security Updates', 'Bug Fixes', 'Monthly Reports'] },
  { tier: 'Growth', price: 499, icon: TrendingUpIcon, color: 'rgba(207,20,43,0.4)', featured: true, features: ['Priority Support (4hr)', '10 Dev Hours/mo', 'Client Portal Setup', 'Time & Billing Automation', 'Quarterly Strategy'] },
  { tier: 'Scale', price: 899, icon: Rocket, color: 'rgba(1,33,105,0.4)', features: ['24/7 Emergency Support', 'Dedicated Manager', 'Unlimited Dev Hours', 'Custom Integrations', 'Monthly Strategy Calls'] }
];

const challenges = [
  { icon: FileText, title: 'Document Management', description: 'Organize, store, and retrieve documents instantly. Version control that keeps everyone on the same page.' },
  { icon: Clock, title: 'Time Tracking & Billing', description: 'Track billable hours automatically. Generate invoices that get approved and paid faster.' },
  { icon: BarChart, title: 'Project Management', description: 'Keep projects on track with visual timelines, task delegation, and progress tracking.' },
  { icon: Users, title: 'Client Collaboration', description: 'Secure portals for sharing documents, collecting feedback, and keeping clients informed.' },
  { icon: DollarSign, title: 'Revenue Optimization', description: 'Analytics that reveal profit margins by client, project, and service type.' },
  { icon: Shield, title: 'Compliance & Security', description: 'Data protection that meets industry standards and gives you peace of mind.' }
];

const services = [
  { title: 'Practice Management Software', description: 'Centralized systems for managing clients, projects, and deliverables in one place.' },
  { title: 'Document Collaboration', description: 'Secure document sharing with version control and automated backup.' },
  { title: 'Time & Billing Automation', description: 'Automated time tracking that syncs with invoicing for accurate billing.' },
  { title: 'Client Portal Setup', description: 'Give clients secure access to documents, invoices, and project updates.' },
  { title: 'Analytics Dashboard', description: 'Real-time insights into project profitability and team productivity.' }
];

const caseStudies = [
  { metric: '60%', title: 'Faster Invoicing', description: 'Time tracking automation reduced billing time from hours to minutes for a consulting firm.' },
  { metric: '95%', title: 'On-Time Delivery', description: 'Project management system helped a team maintain 95% project delivery rate.' },
  { metric: '30%', title: 'Profit Margin Increase', description: 'Analytics revealed underpriced services, enabling a 30% margin improvement.' }
];

export default function ProfessionalServices() {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, right: 0, background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)' }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 700 }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Building2 size={14} /> Legal & Finance
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              <span className="text-gradient">Professional Services</span> Excellence System
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
              Law firms, accountants, consultants - we help you deliver exceptional service while staying organized and profitable.
            </p>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
              Optimize Your Practice <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
              Challenges <span className="text-gradient">We Address</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              Professional services demand precision, security, and efficiency. We deliver all three.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {challenges.map((challenge, index) => (
              <motion.div key={challenge.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(249,115,22,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <challenge.icon size={24} style={{ color: '#F59E0B' }} />
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
              Our <span className="text-gradient">Solutions</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Technology that enhances your professional reputation and operational efficiency.
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
              Proven <span className="text-gradient">Results</span>
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
              Subscription <span className="text-gradient">Plans</span> for Professional Services
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Secure, reliable technology that lets you focus on delivering exceptional client service.
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
              Ready to Elevate Your Practice?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Let's build systems that help you deliver exceptional service and grow profitability.
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