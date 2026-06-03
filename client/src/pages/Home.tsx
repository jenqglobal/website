import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp, Headphones, ArrowRight, Star, ChevronRight, CheckCircle, Globe, Users, Clock } from 'lucide-react';
import { ScarcityBadge } from '../components/UrgencyElements';
import TrustBadges from '../components/TrustBadges';
import CaseStudies from '../components/CaseStudies';
import FAQSection, { commonServiceFAQs } from '../components/FAQSection';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  { icon: Shield, title: 'Enterprise-Grade Security', description: 'Your business data protected by military-level encryption and 24/7 threat monitoring. We proactively block attacks before they happen.' },
  { icon: Zap, title: 'Lightning-Fast Response', description: 'Average response time under 30 minutes. Our dedicated team fixes issues before your customers even notice.' },
  { icon: TrendingUp, title: 'Proven Growth Engine', description: '45% average increase in online revenue for our clients within 90 days. We dont just maintain—we grow your business.' },
  { icon: Headphones, title: 'Dedicated Team, Zero Call Centers', description: 'You get a named team who knows your business inside out. No tickets, no runaround—just real people who care.' }
];

const stats = [
  { value: '500+', label: 'Active Clients', suffix: '' },
  { value: '99.97', label: 'Uptime SLA', suffix: '%' },
  { value: '<30min', label: 'Avg Response Time', suffix: '' },
  { value: '5★', label: 'Client Rating', suffix: '' }
];

const trustBadges = [
  { icon: Shield, label: 'GDPR Compliant' },
  { icon: Globe, label: 'SLA Guaranteed' },
  { icon: Users, label: 'US & UK Based Teams' }
];

const steps = [
  { number: '01', title: 'Free Technical Audit', description: 'We analyze your entire tech stack—servers, websites, apps, security gaps—and document everything. You get a detailed report with prioritized action items.' },
  { number: '02', title: 'Custom Roadmap', description: 'Based on your goals and budget, we create a 12-month technology roadmap. Milestones, investments, and expected outcomes—all documented.' },
  { number: '03', title: 'Seamless Onboarding', description: 'We integrate with your team in 2 weeks—connect tools, train staff, establish workflows. Zero disruption to your daily operations.' },
  { number: '04', title: 'Ongoing Partnership', description: 'Monthly retainer, dedicated team, continuous optimization. Quarterly reviews to ensure we stay aligned with your growth.' }
];

const testimonials = [
  { name: 'Dr. Sarah Mitchell', role: 'Owner', company: 'Mitchell Dental, New York', content: 'Before JenQ, our website crashed every month. Now its been 18 months without a single issue. Our online appointments increased 300%. I finally have peace of mind.', image: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5 },
  { name: 'James Rodriguez', role: 'Founder', company: 'Elevate Consulting, London', content: 'They transformed our e-commerce platform. Sales grew from $50K to $150K monthly in just 6 months. The ROI is incredible—easily 10x what we pay them.', image: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5 },
  { name: 'Emily Chen', role: 'Operations Head', company: 'TechVentures Inc, Chicago', content: 'Our fleet management system used to fail during peak hours. JenQ not only fixed it—they redesigned it. Efficiency improved 40% within the first quarter.', image: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5 }
];

const commonProblems = [
  { icon: Clock, problem: 'Tech issues that consume your time', solution: 'We handle everything—you focus on your business' },
  { icon: Shield, problem: 'Security vulnerabilities you cant see', solution: 'Proactive monitoring blocks threats 24/7' },
  { icon: TrendingUp, problem: 'Website that drags your growth', solution: 'Optimization that increases conversions 40%+' },
  { icon: Headphones, problem: 'Vendors who disappear after sale', solution: 'Dedicated team for life—not a project vendor' }
];

const faqs = [
  { q: 'How quickly can you start?', a: 'We begin with a free audit within 48 hours of your inquiry. Most clients are fully onboarded within 2 weeks.' },
  { q: 'What if Im not satisfied?', a: 'We offer a 90-day satisfaction guarantee. If youre not happy, you can cancel anytime. No lock-in contracts.' },
  { q: 'Do you work with small businesses?', a: 'Absolutely. We have packages starting at ₹7,999/month for startups and small businesses.' },
  { q: 'What industries do you serve?', a: 'Healthcare, retail, logistics, professional services, e-commerce, and more. We have specialized expertise in regulated industries.' }
];

const technologies = ['AWS', 'Google Cloud', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Stripe', 'Shopify', 'WordPress', 'Custom APIs'];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Header />

      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 100, overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(207,20,43,0.4) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 400, height: 400, top: '30%', right: -100, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        
        <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="badge" style={{ marginBottom: 32 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }}></span>
                Trusted by 500+ US & UK Businesses
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
                Your Business Deserves <span className="text-gradient">Reliable Technology</span>—Not Constant Headaches
              </h1>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', marginBottom: 40, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                We provide complete technology management for growing businesses. Your website, apps, servers, and security—all handled by a dedicated team that treats your success as their own.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="/contact" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>
                  Get Free Technical Audit <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn-secondary" style={{ fontSize: 16, padding: '16px 32px' }}>
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 20, marginTop: 80, maxWidth: 1000, margin: '80px auto 0' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="stats-card">
                <div className="stats-number" style={{ marginBottom: 8, fontSize: stat.value.includes('+') || stat.value.includes('<') || stat.value.includes('★') ? '2rem' : undefined }}>{stat.value}{stat.suffix}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, var(--color-background), transparent)' }}></div>
      </section>

      <section style={{ padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container-main">
          <p style={{ textAlign: 'center', fontSize: 12, marginBottom: 24, letterSpacing: '0.15em', color: 'var(--color-text-secondary)' }}>TRUSTED CERTIFICATIONS & PARTNERSHIPS</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {trustBadges.map((badge) => (
              <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <badge.icon style={{ color: 'var(--color-primary)', size: 20 }} />
                <span style={{ fontWeight: 600, fontSize: 14 }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
              Sound Familiar? <span className="text-gradient">These Problems</span>
            </h2>
            <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto' }}>
              Most businesses struggle with the same technology challenges. We solve them all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
            {commonProblems.map((item, index) => (
              <motion.div key={item.problem} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12, 
                padding: 20, 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: 12, 
                border: '1px solid rgba(255,255,255,0.06)',
                borderLeft: '3px solid var(--color-primary)'
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(207,20,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon style={{ color: 'var(--color-primary)', size: 18 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontSize: 13, lineHeight: 1.3 }}>{item.problem}</p>
                  <p style={{ color: 'rgba(52,211,153,0.9)', fontSize: 12, lineHeight: 1.3 }}>{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py section-dark">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>Why 500+ Businesses <span className="text-gradient">Choose JenQ</span></h2>
            <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto' }}>We dont just fix problems—we prevent them and drive growth.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div className="feature-icon" style={{ marginBottom: 24 }}>
                  <feature.icon style={{ color: 'var(--color-primary)', size: 28 }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12 }}>{feature.title}</h3>
                <p style={{ lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>How It <span className="text-gradient">Works</span></h2>
            <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto' }}>Four simple steps to have your technology handled forever.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 24, maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            {steps.map((step, index) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }} viewport={{ once: true }} style={{ position: 'relative', textAlign: 'center' }}>
                <div className="glass-card" style={{ padding: 32, height: '100%', textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 800, 
                    color: 'var(--color-primary)',
                    textShadow: '0 0 40px rgba(207, 20, 43, 0.5)',
                    marginBottom: 16 
                  }}>{step.number}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div style={{ position: 'absolute', top: '50%', right: -16, transform: 'translateY(-50%)', zIndex: 10, display: { sm: 'none' } }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronRight style={{ color: 'white', size: 16 }} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py section-dark">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>Real Results from <span className="text-gradient">Real Clients</span></h2>
            <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto' }}>Join 500+ businesses who transformed their technology.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} style={{ color: '#FBBF24', fill: '#FBBF24', size: 18 }} />
                  ))}
                </div>
                <p style={{ fontSize: '1.1rem', marginBottom: 24, fontStyle: 'italic', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>"{testimonial.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{testimonial.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />

      <TrustBadges />

      <FAQSection faqs={commonServiceFAQs.maintenance} title="Frequently Asked Questions" />

      <section className="section-py">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 16 }}>Technologies We Work With</h2>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', opacity: 0.6 }}>
            {technologies.map((tech) => (
              <span key={tech} style={{ fontWeight: 500, fontSize: 15, padding: '8px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0 140px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(1,33,105,0.3) 0%, transparent 70%)', opacity: 0.15 }}></div>
        <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 64, textAlign: 'center', maxWidth: 800, margin: '0 auto', background: 'linear-gradient(135deg, rgba(207,20,43,0.15) 0%, rgba(1,33,105,0.1) 100%)' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: 24 }}>Ready to Have Your Technology Handled?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: 40, maxWidth: 550, margin: '0 auto 40px', lineHeight: 1.7 }}>Book your free technical audit today. No commitment, no pressure—just honest advice on how we can help your business.</p>
            <Link to="/contact" className="btn-primary" style={{ fontSize: 16, padding: '18px 40px' }}>Book Free Audit Now <ArrowRight size={20} /></Link>
            <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Response within 24 hours • No spam, ever</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}