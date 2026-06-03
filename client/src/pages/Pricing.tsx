import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, HelpCircle, Zap, Sparkles, TrendingUp, Rocket, Shield, Clock, Code, LineChart, Headphones, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCurrency, currencies } from '../context/CurrencyContext';

const plans = [
  {
    name: 'Essential',
    icon: Sparkles,
    price: 199,
    description: 'Complete tech care for businesses ready to establish reliable systems. Everything you need to keep running smoothly.',
    features: [
      'Website Maintenance & Management',
      'Mobile App Support',
      'Performance Monitoring',
      'Security Updates & Patches',
      'Bug Fixes & Stability',
      'Email Support (24hr response)',
      'Monthly Health Reports',
      'Cloud Backup Monitoring'
    ],
    notIncluded: [
      'Priority Support (4hr response)',
      'Custom Development Hours',
      'Dedicated Account Manager',
      '24/7 Emergency Support'
    ],
    cta: 'Start Essential',
    highlight: ''
  },
  {
    name: 'Growth',
    icon: TrendingUp,
    price: 399,
    description: 'Accelerate your business with priority support and development hours. Ideal for growing companies scaling fast.',
    featured: true,
    features: [
      'Everything in Essential',
      'Priority Support (4hr response)',
      'Performance Optimization',
      'Development Hours (10 hrs/month)',
      'Quarterly Strategy Calls',
      'Advanced Security Monitoring',
      'Uptime Monitoring',
      'Software License Management',
      'SEO & Analytics Setup',
      'Monthly Reporting'
    ],
    notIncluded: [
      '24/7 Emergency Support',
      'Dedicated Account Manager',
      'Unlimited Development'
    ],
    cta: 'Start Growth',
    highlight: 'MOST POPULAR'
  },
  {
    name: 'Scale',
    icon: Rocket,
    price: 599,
    description: 'Full-service tech partnership for enterprises demanding excellence. Dedicated support with unlimited capabilities.',
    features: [
      'Everything in Growth',
      '24/7 Emergency Support',
      'Dedicated Account Manager',
      'Unlimited Development Hours',
      'Monthly Strategy Calls',
      'Custom Integrations',
      'Advanced Analytics Dashboard',
      'Disaster Recovery Planning',
      'Priority Feature Development',
      'White-Label Support Options'
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    highlight: ''
  }
];

const planFeatures = {
  Essential: [
    { icon: Headphones, title: 'Standard Support', desc: '24-hour response time during business hours' },
    { icon: Shield, title: 'Security First', desc: 'Regular security updates and vulnerability monitoring' },
    { icon: Clock, title: 'Scheduled Maintenance', desc: 'Proactive updates during low-traffic windows' },
    { icon: Code, title: 'Code Maintenance', desc: 'Bug fixes, patches, and stability improvements' }
  ],
  Growth: [
    { icon: TrendingUp, title: 'Faster Response', desc: '4-hour priority support during extended hours' },
    { icon: Code, title: 'Development Time', desc: '10 hours monthly for enhancements and features' },
    { icon: LineChart, title: 'Growth Analytics', desc: 'Monthly reports with actionable insights' },
    { icon: Sparkles, title: 'Strategy Sessions', desc: 'Quarterly calls to align tech with business goals' }
  ],
  Scale: [
    { icon: Shield, title: 'Always-On Support', desc: '24/7 emergency response with 1-hour SLA' },
    { icon: Rocket, title: 'Unlimited Development', desc: 'No cap on development hours or tasks' },
    { icon: Headphones, title: 'Dedicated Manager', desc: 'Your personal account manager on call' },
    { icon: Zap, title: 'Custom Everything', desc: 'Tailored integrations and white-label options' }
  ]
};

const faqs = [
  { q: 'Can I upgrade or downgrade my plan?', a: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at the start of your next billing cycle.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise clients can arrange invoicing with NET-30 terms.' },
  { q: 'Is there a minimum contract period?', a: 'No long-term contracts required. All plans are month-to-month. However, annual billing gives you 2 months free. Cancel anytime with 30 days notice.' },
  { q: 'What happens if I exceed my development hours?', a: 'Growth plan includes 10 hours monthly. Additional hours are billed at $75/hour. We always discuss scope before exceeding your allocation.' },
  { q: 'How do I request support?', a: 'All plans include access to our support portal where you can submit tickets, track progress, and communicate directly with your support team.' }
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const { currency, setCurrency, formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      {/* Hero Section */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'visible' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, right: -100, background: 'radial-gradient(circle, rgba(207,20,43,0.3) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 400, height: 400, bottom: -100, left: -100, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        <div className="container-main" style={{ position: 'relative', zIndex: 50, transform: 'translateZ(0)' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 50 }}>
            <div className="badge" style={{ margin: '0 auto 24px', width: 'fit-content' }}>
              <Zap size={14} /> Premium Subscriptions
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>
              Your Tech Partner, <span className="text-gradient">Ready to Scale</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Three tiers of ongoing support designed to keep your systems running, your team productive, and your business growing.
            </p>
            
            {/* Currency Selector */}
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 200 }}>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 20px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: 'white',
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    zIndex: 200
                  }}
                >
                  <Globe size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <span>{currency.symbol} {currency.code}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>({currency.country})</span>
                  <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.4)', transform: showCurrencyDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                
                {showCurrencyDropdown && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: 280,
                      background: 'linear-gradient(180deg, #1e1e2a 0%, #151520 100%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 16,
                      padding: 8,
                      zIndex: 99999,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      isolation: 'isolate'
                    }}
                  >
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          setShowCurrencyDropdown(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          background: currency.code === curr.code ? 'rgba(207,20,43,0.2)' : 'transparent',
                          border: 'none',
                          borderRadius: 10,
                          color: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (currency.code !== curr.code) {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currency.code !== curr.code) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                          }
                        }}
                      >
                        <span style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 8, 
                          background: 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: 14
                        }}>
                          {curr.symbol}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{curr.name}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{curr.country}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{curr.code}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                            {curr.code === 'USD' ? '1.00' : `1 USD = ${curr.rate} ${curr.code}`}
                          </div>
                        </div>
                        {currency.code === curr.code && (
                          <Check size={18} style={{ color: '#34D399' }} />
                        )}
                      </button>
                    ))}
                  </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 12 }}>All prices shown in your preferred currency</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ paddingBottom: 100 }}>
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24, maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  background: plan.featured 
                    ? 'linear-gradient(180deg, rgba(207,20,43,0.15) 0%, rgba(1,33,105,0.1) 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: plan.featured 
                    ? '1px solid rgba(207,20,43,0.4)' 
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24,
                  padding: 32,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredPlan === plan.name ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredPlan === plan.name 
                    ? '0 25px 50px rgba(207,20,43,0.2)' 
                    : '0 10px 40px rgba(0,0,0,0.2)',
                  zIndex: 1
                }}
              >
                {/* Popular Badge */}
                {plan.featured && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16 
                  }}>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)', 
                      color: 'white', 
                      padding: '6px 14px', 
                      borderRadius: 100, 
                      fontSize: 11, 
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {plan.highlight}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: 16, 
                  background: plan.featured 
                    ? 'linear-gradient(135deg, #CF142B 0%, #012169 100%)'
                    : 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}>
                  <plan.icon size={28} style={{ color: 'white' }} />
                </div>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>{plan.description}</p>

                {/* Price */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>{formatPrice(plan.price)}</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>/month</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 4 }}>Billed monthly. Cancel anytime.</p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 4 }}>USD ${plan.price}/mo equivalent</p>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: 'rgba(52,211,153,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        <Check size={12} style={{ color: '#34D399' }} />
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.5 }}>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, opacity: 0.35 }}>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        <X size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.5 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a 
                  href={`/checkout?plan=${plan.name.toLowerCase()}`} 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '14px 24px',
                    background: plan.featured 
                      ? 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)'
                      : 'rgba(255,255,255,0.08)',
                    border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {plan.cta} <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: '60px 0 80px', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>Plan <span className="text-gradient">Comparison</span></h2>
          </motion.div>

          <div style={{ maxWidth: 1000, margin: '0 auto', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 20px', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase' }}>Feature</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', textAlign: 'center' }}>Essential</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', textAlign: 'center', background: 'rgba(207,20,43,0.1)' }}>Growth</th>
                  <th style={{ padding: '16px', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', textAlign: 'center' }}>Scale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Website Maintenance', essential: true, growth: true, scale: true },
                  { feature: 'Mobile App Support', essential: true, growth: true, scale: true },
                  { feature: 'Security Updates', essential: true, growth: true, scale: true },
                  { feature: 'Performance Monitoring', essential: true, growth: true, scale: true },
                  { feature: 'Monthly Health Reports', essential: true, growth: true, scale: true },
                  { feature: 'Email Support (24hr)', essential: true, growth: true, scale: true },
                  { feature: 'Priority Support (4hr)', essential: false, growth: true, scale: true },
                  { feature: 'Development Hours', essential: false, growth: '10/mo', scale: 'Unlimited' },
                  { feature: 'Quarterly Strategy Calls', essential: false, growth: true, scale: true },
                  { feature: 'Advanced Security', essential: false, growth: true, scale: true },
                  { feature: 'Uptime Monitoring', essential: false, growth: true, scale: true },
                  { feature: 'SEO & Analytics', essential: false, growth: true, scale: true },
                  { feature: '24/7 Emergency Support', essential: false, growth: false, scale: true },
                  { feature: 'Dedicated Account Manager', essential: false, growth: false, scale: true },
                  { feature: 'Monthly Strategy Calls', essential: false, growth: false, scale: true },
                  { feature: 'Custom Integrations', essential: false, growth: false, scale: true },
                  { feature: 'Disaster Recovery Planning', essential: false, growth: false, scale: true },
                  { feature: 'White-Label Support', essential: false, growth: false, scale: true }
                ].map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 20px', color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{row.feature}</td>
                    {[row.essential, row.growth, row.scale].map((val, idx) => (
                      <td key={idx} style={{ padding: '14px', textAlign: 'center', background: idx === 1 ? 'rgba(207,20,43,0.05)' : 'transparent' }}>
                        {val === true ? (
                          <Check size={18} style={{ color: '#34D399', margin: '0 auto' }} />
                        ) : val === false ? (
                          <X size={18} style={{ color: 'rgba(255,255,255,0.2)', margin: '0 auto' }} />
                        ) : (
                          <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="badge" style={{ margin: '0 auto 16px', width: 'fit-content' }}>
              <Zap size={14} /> Included in Every Plan
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Foundation Features</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto' }}>No matter which plan you choose, you get these core benefits built in.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {[
              { icon: Shield, title: 'Security First', desc: 'Regular security updates, vulnerability scanning, and protection against threats.' },
              { icon: Clock, title: 'Proactive Monitoring', desc: 'We catch issues before they become problems with 24/7 system monitoring.' },
              { icon: LineChart, title: 'Performance Tracking', desc: 'Monthly reports showing system health, uptime, and optimization opportunities.' },
              { icon: Code, title: 'Code Maintenance', desc: 'Bug fixes, patches, and stability improvements included in every plan.' },
              { icon: Headphones, title: 'Expert Support', desc: 'Access to qualified engineers who understand your stack.' },
              { icon: Zap, title: 'Fast Response', desc: 'Ticket system with guaranteed response times on all plans.' }
            ].map((item, index) => (
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
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(207,20,43,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <item.icon size={22} style={{ color: '#CF142B' }} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>Frequently Asked <span className="text-gradient">Questions</span></h2>
          </motion.div>

          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  marginBottom: 12,
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'white', textAlign: 'left', fontSize: 15 }}>{faq.q}</span>
                  <HelpCircle size={20} style={{ color: 'rgba(255,255,255,0.4)', transform: openFaq === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {openFaq === index && (
                  <div style={{ padding: '0 24px 20px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: 14 }}>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}