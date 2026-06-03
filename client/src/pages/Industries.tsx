import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stethoscope, ShoppingCart, Briefcase, Users, Heart, Building2, ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const industries = [
  { slug: 'medical-dental', icon: Stethoscope, name: 'Medical & Dental', category: 'Healthcare', challenges: ['HIPAA compliance', 'Patient management', 'Appointment scheduling'], description: 'Critical healthcare technology that keeps your patients safe and your practice running.', gradient: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)' },
  { slug: 'retail-ecommerce', icon: ShoppingCart, name: 'Retail & E-commerce', category: 'Commerce', challenges: ['Inventory management', 'Online store optimization', 'POS integration'], description: 'Seamless sales channels from brick-and-mortar to online stores.', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' },
  { slug: 'consultants-coaches', icon: Briefcase, name: 'Consultants & Coaches', category: 'Professional Services', challenges: ['Client portals', 'Scheduling systems', 'CRM automation'], description: 'Focus on serving clients while we power your practice.', gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)' },
  { slug: 'service-businesses', icon: Users, name: 'Service Businesses', category: 'Home Services', challenges: ['Field service management', 'Customer communication', 'Job tracking'], description: 'Streamlined operations for home services and professional cleaning.', gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)' },
  { slug: 'professional-services', icon: Building2, name: 'Professional Services', category: 'Legal & Finance', challenges: ['Document management', 'Project tracking', 'Time billing'], description: 'Reliable systems for law firms, accountants, and consultants.', gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)' },
  { slug: 'nonprofits', icon: Heart, name: 'Non-profits', category: 'Organizations', challenges: ['Donor management', 'Event planning', 'Volunteer coordination'], description: 'Technology that amplifies your mission and impact.', gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)' }
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative' }}>
        <div className="gradient-orb orb-purple" style={{ width: 400, height: 400, top: 20, left: 0 }}></div>
        <div className="gradient-orb" style={{ width: 300, height: 300, bottom: 0, right: 0, background: 'radial-gradient(circle, rgba(207,20,43,0.4) 0%, transparent 70%)' }}></div>
        
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 32, width: 'fit-content', margin: '0 auto 32px' }}>
              <Sparkles size={14} /> Industry Expertise
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>
              Industries We <span className="text-gradient">Serve</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              We understand that every industry has unique challenges. That's why we tailor our solutions to your specific needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ paddingBottom: 140 }}>
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {industries.map((industry, index) => (
              <motion.div key={industry.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                <Link to={`/industry/${industry.slug}`} className="glass-card" style={{ display: 'block', padding: 32, textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: industry.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                      <industry.icon style={{ color: 'white', size: 28 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', padding: '6px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.05)' }}>{industry.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>{industry.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>{industry.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {industry.challenges.map((challenge) => (
                      <span key={challenge} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>{challenge}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0 140px', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 48, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Don't See Your Industry?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>We work with businesses across all sectors. Let's discuss how we can help.</p>
            <a href="/contact" className="btn-primary">Get in Touch <ArrowRight size={18} /></a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}