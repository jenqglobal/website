import { motion } from 'framer-motion';
import { AlertTriangle, Headphones, Clock, TrendingUp, Shield, Wallet, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const problems = [
  { icon: AlertTriangle, problem: 'Unreliable Systems', description: 'Your systems go down at the worst moments, causing lost customers and revenue.', solution: 'Proactive Monitoring', result: '24/7 monitoring that catches issues before they affect your business.', gradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)' },
  { icon: Headphones, problem: 'No Reliable Support', description: 'When something breaks, you cannot get help fast enough—or at all.', solution: 'Dedicated Support Team', result: 'Fast, knowledgeable support from a team that knows your systems.', gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)' },
  { icon: Clock, problem: 'Wasted Time', description: 'Your team spends too much time on repetitive manual tasks.', solution: 'Automation Solutions', result: 'Streamlined workflows that save hours every week.', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' },
  { icon: TrendingUp, problem: 'Cannot Scale', description: 'Your systems cannot handle growth, limiting your potential.', solution: 'Scalable Infrastructure', result: 'Systems that grow with you, handling increased demand.', gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)' },
  { icon: Shield, problem: 'Security Concerns', description: 'You worry about data breaches, malware, and cyber threats.', solution: 'Enterprise Security', result: 'Bank-level security protocols protecting your business.', gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' },
  { icon: Wallet, problem: 'Unexpected Costs', description: 'Surprise invoices and unpredictable tech expenses strain your budget.', solution: 'Predictable Model', result: 'One monthly fee covers everything you need.', gradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)' }
];

export default function Problems() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative' }}>
        <div className="gradient-orb" style={{ width: 400, height: 400, top: 0, right: 0, background: 'radial-gradient(circle, rgba(207,20,43,0.4) 0%, transparent 70%)', opacity: 0.2 }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 32, width: 'fit-content', margin: '0 auto 32px' }}><Zap size={14} /> Problem Solvers</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>Problems We <span className="text-gradient">Solve</span></h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>The challenges keeping you up at night—and how we fix them.</p>
          </motion.div>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container-main">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {problems.map((item, index) => (
              <motion.div key={item.problem} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: item.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                    <item.icon style={{ color: 'white', size: 24 }} />
                  </div>
                  <div><h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>{item.problem}</h3></div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>{item.description}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><CheckCircle size={16} style={{ color: '#34D399' }} /><span style={{ fontWeight: 600, color: 'white' }}>{item.solution}</span></div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{item.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>The Solution: <span className="text-gradient">Monthly Partnership</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Instead of reactive fixes, get proactive partnership that prevents problems.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {[{ title: 'Peace of Mind', desc: 'Your systems are always protected, monitored, and maintained.', icon: Shield },{ title: 'Continuous Growth', desc: 'Your technology improves every month, helping your business grow.', icon: TrendingUp },{ title: 'Predictable Costs', desc: 'One monthly fee means no surprise bills or hidden costs.', icon: Wallet }].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, margin: '0 auto 20px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(16,185,129,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon style={{ color: '#60A5FA', size: 28 }} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}><Link to="/pricing" className="btn-primary">See Our Plans <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section style={{ padding: '100px 0 140px' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 48, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Ready to Solve These Problems?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>Let's discuss your challenges and find the right solution.</p>
            <Link to="/contact" className="btn-primary">Book a Free Consultation <ArrowRight size={18} /></Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}