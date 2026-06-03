import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, CreditCard, BarChart, Truck, Zap, CheckCircle, ArrowRight, Globe, Settings, Megaphone, TrendingUp, Sparkles, TrendingUp as TrendingUpIcon, Rocket } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';

const planRecommendations = [
  { tier: 'Essential', price: 299, icon: Sparkles, color: 'rgba(255,255,255,0.3)', features: ['Store Maintenance', 'Security Updates', 'Payment Processing', 'Bug Fixes', 'Monthly Reports'] },
  { tier: 'Growth', price: 499, icon: TrendingUpIcon, color: 'rgba(207,20,43,0.4)', featured: true, features: ['Priority Support (4hr)', '10 Dev Hours/mo', 'E-commerce Optimization', 'Inventory Integration', 'Quarterly Strategy'] },
  { tier: 'Scale', price: 899, icon: Rocket, color: 'rgba(1,33,105,0.4)', features: ['24/7 Emergency Support', 'Dedicated Manager', 'Unlimited Dev Hours', 'Custom Integrations', 'Monthly Strategy Calls'] }
];

const challenges = [
  { icon: Package, title: 'Inventory Management', description: 'Track stock levels across multiple locations in real-time. Know what sells, what sits, and when to reorder.' },
  { icon: Globe, title: 'Multi-channel Selling', description: 'Seamlessly sync your online store with physical locations. One inventory system for all your sales channels.' },
  { icon: CreditCard, title: 'Payment Processing', description: 'Accept every payment type securely. Fast checkout means higher conversion rates and happy customers.' },
  { icon: Truck, title: 'Shipping & Fulfillment', description: 'Automate order fulfillment with integrated shipping solutions. From warehouse to doorstep, streamlined.' },
  { icon: BarChart, title: 'Sales Analytics', description: 'Understand your business like never before. Know your best sellers, peak times, and profit margins.' },
  { icon: Megaphone, title: 'Marketing Automation', description: 'Turn browsers into buyers with automated email campaigns, abandoned cart recovery, and loyalty programs.' }
];

const services = [
  { title: 'E-commerce Platform Management', description: 'Keep your online store running 24/7 with regular updates, performance optimization, and security patches.' },
  { title: 'POS System Integration', description: 'Connect your point-of-sale with your online inventory for real-time sync across all channels.' },
  { title: 'Payment Gateway Setup', description: 'Secure, fast payment processing that increases conversions and protects customer data.' },
  { title: 'Inventory Management Systems', description: 'Centralized stock control that updates across all platforms automatically.' },
  { title: 'Customer Loyalty Programs', description: 'Build repeat customers with automated loyalty rewards and personalized offers.' }
];

const caseStudies = [
  { metric: '40%', title: 'Increase in Online Sales', description: 'Platform optimization helped a boutique retailer triple their e-commerce revenue.' },
  { metric: '60%', title: 'Faster Checkout', description: 'Payment integration reduced cart abandonment by 35% and increased completed purchases.' },
  { metric: '200%', title: 'ROI on Marketing', description: 'Automated email campaigns delivered 5x return on their marketing investment.' }
];

export default function RetailEcommerce() {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 700 }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <ShoppingCart size={14} /> Commerce
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              <span className="text-gradient">Retail & E-commerce</span> Growth Solutions
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
              From your storefront to your customer's doorstep, we keep your retail operations running flawlessly. Sell more, stress less.
            </p>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
              Grow Your Sales <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
              Industry-Specific <span className="text-gradient">Challenges</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              Retail and e-commerce demand speed, reliability, and seamless experiences. We solve your biggest pain points.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {challenges.map((challenge, index) => (
              <motion.div key={challenge.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(168,85,247,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <challenge.icon size={24} style={{ color: '#8B5CF6' }} />
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
              Our <span className="text-gradient">Solutions</span> For You
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Complete technology support for retail businesses of all sizes.
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
              Real <span className="text-gradient">Results</span>
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
              Subscription <span className="text-gradient">Plans</span> for Retail
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
              Your store never closes, and neither do we. Choose a plan that keeps your retail operations running 24/7.
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
              Ready to Scale Your Retail?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Let's build a technology foundation that grows with your business.
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