import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Zap, Clock, ArrowRight, Star, BarChart2 } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    industry: 'Healthcare',
    title: 'Mitchell Dental Clinic',
    challenge: 'Website crashed monthly, losing 40% of online appointments',
    solution: 'Complete infrastructure overhaul with 24/7 monitoring',
    metrics: [
      { icon: TrendingUp, value: '300%', label: 'More Appointments' },
      { icon: Zap, value: '99.97%', label: 'Uptime' },
      { icon: Clock, value: '18+', label: 'Months No Issues' }
    ],
    quote: 'I finally have peace of mind knowing our patient booking system is reliable.',
    client: 'Dr. Sarah Mitchell, Owner'
  },
  {
    id: 2,
    industry: 'E-commerce',
    title: 'Elevate Retail',
    challenge: 'Slow page speeds causing cart abandonment',
    solution: 'Performance optimization and CDN implementation',
    metrics: [
      { icon: TrendingUp, value: '45%', label: 'Revenue Growth' },
      { icon: BarChart2, value: '3x', label: 'Conversion Rate' },
      { icon: Zap, value: '<1s', label: 'Load Time' }
    ],
    quote: 'Sales jumped from $50K to $150K monthly. The ROI is incredible.',
    client: 'James Rodriguez, Founder'
  },
  {
    id: 3,
    industry: 'Professional Services',
    title: 'TechVentures Inc',
    challenge: 'Outdated systems causing operational bottlenecks',
    solution: 'Modern tech stack and automation implementation',
    metrics: [
      { icon: Users, value: '40%', label: 'Efficiency Gain' },
      { icon: Clock, value: '25hrs', label: 'Saved Weekly' },
      { icon: Star, value: '4.9', label: 'Client Rating' }
    ],
    quote: 'They transformed our entire operations. We can now focus on growing the business.',
    client: 'Emily Chen, Operations Head'
  }
];

export default function CaseStudies() {
  return (
    <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.3)' }}>
      <div className="container-main">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
            Real Results, <span className="text-gradient">Real Businesses</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
            See how we've helped businesses like yours achieve their technology goals
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div style={{
                padding: '16px 24px',
                background: 'linear-gradient(135deg, rgba(207,20,43,0.15) 0%, rgba(1,33,105,0.1) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#CF142B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {study.industry}
                </span>
              </div>

              <div style={{ padding: 28 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
                  {study.title}
                </h3>
                
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                    <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Challenge:</strong> {study.challenge}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Solution:</strong> {study.solution}
                  </p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: 12, 
                  marginBottom: 24,
                  padding: 16,
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: 12
                }}>
                  {study.metrics.map((metric, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <metric.icon size={16} style={{ color: '#34D399', marginBottom: 6 }} />
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
                        {metric.value}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: 16,
                  background: 'rgba(52,211,153,0.08)',
                  borderRadius: 12,
                  borderLeft: '3px solid #34D399',
                  marginBottom: 16
                }}>
                  <p style={{ 
                    fontStyle: 'italic', 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    "{study.quote}"
                  </p>
                </div>

                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  — {study.client}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <Link 
            to="/contact" 
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            Get Similar Results <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}