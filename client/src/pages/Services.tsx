import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Sparkles, TrendingUp, Rocket, Shield, Check, ArrowRight, 
  Globe, Smartphone, Code, Activity, Bug, Headphones, LineChart,
  Clock, Star, Zap, Award, Heart, LayoutDashboard, CheckSquare, 
  FileText, Book, Gauge, TrendingUp as TrendingUpIcon, BarChart, 
  Target, PieChart, Lightbulb, Package, Map, Layers, Calendar
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const iconMap: Record<string, any> = {
  Globe, Smartphone, Code, Activity, Shield, Bug, Zap, Heart, 
  Headphones, LayoutDashboard, CheckSquare, FileText, Book, Gauge,
  TrendingUp: TrendingUpIcon, BarChart, Target, PieChart, Lightbulb, Package, Map, Layers, Calendar, Star
};

const includedServices = [
  { icon: Shield, title: 'Security First', desc: 'Regular updates and vulnerability monitoring' },
  { icon: Clock, title: 'Proactive Care', desc: 'We prevent issues before they happen' },
  { icon: Headphones, title: 'Expert Team', desc: 'Qualified engineers who know your stack' },
  { icon: LineChart, title: 'Clear Reporting', desc: 'Monthly insights into system health' },
  { icon: Code, title: 'Code Quality', desc: 'Clean, maintainable, documented code' },
  { icon: Zap, title: 'Fast Resolution', desc: 'Quick response times guaranteed' }
];

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(207,20,43,0.3) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 400, height: 400, bottom: -100, right: -100, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <div className="badge" style={{ margin: '0 auto 24px', width: 'fit-content' }}>
              <Sparkles size={14} /> Subscription Plans
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              Your Complete Tech Partner, <span className="text-gradient">All-Inclusive</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 650, margin: '0 auto' }}>
              Three comprehensive subscription tiers designed to handle every aspect of your technology. No per-service pricing—everything included in your plan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included in Every Plan */}
      <section style={{ padding: '60px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Included in Every Plan</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Core benefits that form the foundation of our service</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {includedServices.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: 24,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(207,20,43,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <item.icon size={24} style={{ color: '#CF142B' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Our Services</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto' }}>
              Comprehensive technology solutions tailored to your business needs.
            </p>
          </motion.div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.5)' }}>Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24, maxWidth: 1200, margin: '0 auto' }}>
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Sparkles;
                const features = typeof service.features === 'string' ? JSON.parse(service.features) : service.features;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="glass-card"
                    style={{ padding: 28, display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)',
                      border: '1px solid rgba(207,20,43,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20
                    }}>
                      <IconComponent size={28} style={{ color: '#CF142B' }} />
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>{service.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{service.description}</p>

                    {features && features.length > 0 && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                        {features.slice(0, 4).map((feature: string, i: number) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Check size={14} style={{ color: '#34D399', flexShrink: 0 }} />
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{feature}</span>
                          </li>
                        ))}
                        {features.length > 4 && (
                          <li style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>+{features.length - 4} more features</li>
                        )}
                      </ul>
                    )}

                    <Link 
                      to="/pricing" 
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '12px 20px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 12,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        marginTop: 'auto'
                      }}
                    >
                      View Pricing <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Subscription Model */}
      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 48, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="badge" style={{ marginBottom: 16 }}>
                <Award size={14} /> Why Subscription?
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 24, lineHeight: 1.2 }}>
                Predictable Costs.<br/>Unlimited Support.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 24 }}>
                Our subscription model means you never have to worry about surprise bills. Need a bug fixed? It's included. Want to add a small feature? Check your plan hours. Our incentives align with yours—keeping your systems running smoothly benefits us both.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'No per-task billing surprises',
                  'Priority access based on your tier',
                  'Team that knows your business',
                  'Scalable as you grow'
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 8, background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} style={{ color: '#34D399' }} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{
                background: 'linear-gradient(180deg, rgba(207,20,43,0.1) 0%, rgba(1,33,105,0.05) 100%)',
                border: '1px solid rgba(207,20,43,0.2)',
                borderRadius: 24,
                padding: 40,
                textAlign: 'center'
              }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Star size={36} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>90-Day Guarantee</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24 }}>
                  Not satisfied in your first 90 days? We'll refund your subscription—no questions asked. That's how confident we are in the value we provide.
                </p>
                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0 140px' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Ready to Make Technology Simple?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 32px' }}>
              Book a free consultation and we'll help you choose the right plan for your business.
            </p>
            <Link to="/contact" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>
              Book Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}