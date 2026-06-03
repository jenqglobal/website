import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stethoscope, Shield, Zap, Clock, CheckCircle, ArrowRight, Phone, Mail, Users, TrendingUp, Lock, Database, AlertCircle, Building, Sparkles, TrendingUp as TrendingUpIcon, Rocket } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';

const planPrices = { Essential: 997, Growth: 1997, Scale: 3997 };

const planRecommendations = [
  { tier: 'Essential', price: 299, icon: Sparkles, color: 'rgba(255,255,255,0.3)', features: ['24/7 Monitoring', 'Security Updates', 'HIPAA Compliance', 'Bug Fixes', 'Monthly Reports'] },
  { tier: 'Growth', price: 499, icon: TrendingUpIcon, color: 'rgba(207,20,43,0.4)', featured: true, features: ['Priority Support (4hr)', '10 Dev Hours/mo', 'EHR Integration', 'Performance Optimization', 'Quarterly Strategy'] },
  { tier: 'Scale', price: 899, icon: Rocket, color: 'rgba(1,33,105,0.4)', features: ['24/7 Emergency Support', 'Dedicated Manager', 'Unlimited Dev Hours', 'Custom Integrations', 'Monthly Strategy Calls'] }
];

const challenges = [
  { icon: Lock, title: 'HIPAA Compliance', description: 'Stay compliant with healthcare regulations while protecting patient data with enterprise-grade security measures.' },
  { icon: Database, title: 'Patient Data Management', description: 'Centralize patient records, medical history, and treatment plans for seamless access and better care.' },
  { icon: Clock, title: 'Appointment Scheduling', description: 'Smart scheduling systems that reduce no-shows and optimize your calendar for maximum efficiency.' },
  { icon: Users, title: 'Telemedicine Integration', description: 'Expand your reach with secure video consultations that integrate seamlessly with your existing systems.' },
  { icon: Shield, title: 'Data Security', description: 'Multi-layer security protocols to protect sensitive patient information from breaches and cyber threats.' },
  { icon: TrendingUp, title: 'Practice Growth', description: 'Data-driven insights to help you understand patient trends and grow your practice profitability.' }
];

const services = [
  { title: '24/7 System Monitoring', description: 'Your systems never sleep, and neither do we. Continuous monitoring ensures patient data is always accessible.' },
  { title: 'HIPAA-Compliant Hosting', description: 'Secure cloud infrastructure designed specifically for healthcare providers with full compliance coverage.' },
  { title: 'EHR/EMR Integration', description: 'Seamless integration with major EHR systems including Epic, Cerner, and Allscripts.' },
  { title: 'Backup & Disaster Recovery', description: 'Automatic backups with quick recovery capabilities ensure you never lose critical patient information.' },
  { title: 'Staff Training & Support', description: 'Comprehensive training programs to ensure your team uses technology effectively and securely.' }
];

const caseStudies = [
  { title: 'Reduced No-Shows by 40%', description: 'Smart scheduling system helped a multi-location dental practice save $120K annually.' },
  { title: 'Zero Security Breaches', description: 'Enterprise security implementation protecting 50,000+ patient records for 5+ years.' },
  { title: '45% Faster Patient Intake', description: 'Digital intake process reduced average check-in time from 12 minutes to under 5 minutes.' }
];

export default function MedicalDental() {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, right: -100, background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)' }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 700 }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Stethoscope size={14} /> Healthcare
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              <span className="text-gradient">Medical & Dental</span> Technology Solutions
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
              Focus on patient care while we handle your technology. From HIPAA compliance to seamless patient management, we keep your practice running smoothly.
            </p>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
              Get Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
              Your <span className="text-gradient">Challenges</span> Are Our Priority
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              Healthcare technology comes with unique challenges. We understand them and have solutions ready.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {challenges.map((challenge, index) => (
              <motion.div key={challenge.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(236,72,153,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <challenge.icon size={24} style={{ color: '#EF4444' }} />
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
              How We <span className="text-gradient">Help You Succeed</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Comprehensive technology support designed specifically for medical and dental practices.
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
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{study.title.split(' ')[0]} {study.title.split(' ')[1]}</div>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48, textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16 }}>
              Subscription <span className="text-gradient">Plans</span> for Healthcare
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Choose the support level that matches your practice size. All plans include HIPAA-compliant infrastructure and patient data protection.
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
              Ready to Transform Your Practice?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Let's discuss how we can help you provide better patient care while reducing technology stress.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Schedule Consultation <ArrowRight size={18} /></Link>
              <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.1)', color: 'white', transition: 'all 0.3s' }}>View Pricing</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}