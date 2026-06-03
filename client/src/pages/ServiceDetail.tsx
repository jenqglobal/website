import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Check, Star, Shield, ArrowRight,
  Globe, Smartphone, Code, Activity, Bug, Zap, Heart, 
  Headphones, LayoutDashboard, CheckSquare, FileText, Book, Gauge,
  TrendingUp, BarChart, Target, PieChart, Lightbulb, Package, Map, Layers, Calendar,
  ChevronRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const iconMap: Record<string, any> = {
  Globe, Smartphone, Code, Activity, Shield, Bug, Zap, Heart, 
  Headphones, LayoutDashboard, CheckSquare, FileText, Book, Gauge,
  TrendingUp, BarChart, Target, PieChart, Lightbulb, Package, Map, Layers, Calendar, Shield, Star
};

const allServices = [
  { id: 1, slug: 'website-maintenance', title: 'Website Maintenance & Management', description: 'Ongoing website updates, content changes, plugin management, and technical maintenance to keep your site running smoothly.', features: ['Content Updates', 'Plugin Management', 'Performance Monitoring', 'Security Updates', 'Backup Management'], icon: 'Globe', category: 'maintenance', featured: 1 },
  { id: 2, slug: 'mobile-app-support', title: 'Mobile App Maintenance & Support', description: 'Comprehensive mobile app support including updates, bug fixes, and performance optimization for iOS and Android platforms.', features: ['App Store Updates', 'Bug Fixes', 'Performance Optimization', 'OS Compatibility', 'User Feedback Implementation'], icon: 'Smartphone', category: 'maintenance', featured: 1 },
  { id: 3, slug: 'software-maintenance', title: 'Custom Software Maintenance', description: 'Keep your custom software running at peak performance with regular updates, enhancements, and technical support.', features: ['Code Reviews', 'Performance Optimization', 'Feature Enhancements', 'Bug Fixes', 'Documentation Updates'], icon: 'Code', category: 'maintenance', featured: 0 },
  { id: 4, slug: 'performance-monitoring', title: 'Performance Monitoring', description: 'Real-time monitoring and optimization to ensure your systems run at peak performance at all times.', features: ['Real-time Monitoring', 'Speed Optimization', 'Load Testing', 'Resource Analysis', 'Performance Reports'], icon: 'Activity', category: 'monitoring', featured: 0 },
  { id: 5, slug: 'security-monitoring', title: 'Security Monitoring', description: '24/7 security monitoring, threat detection, and patch management to protect your systems from vulnerabilities.', features: ['Threat Detection', 'Security Patches', 'Vulnerability Scanning', 'Firewall Management', 'Security Audits'], icon: 'Shield', category: 'security', featured: 1 },
  { id: 6, slug: 'bug-fixes', title: 'Bug Fixes & Stability', description: 'Rapid bug identification and resolution to maintain system stability and user satisfaction.', features: ['Bug Identification', 'Quick Fixes', 'Regression Testing', 'Stability Monitoring', 'Issue Documentation'], icon: 'Bug', category: 'maintenance', featured: 0 },
  { id: 7, slug: 'feature-enhancements', title: 'Feature Enhancements', description: 'Small feature additions and improvements to enhance your existing systems and user experience.', features: ['Feature Development', 'UI Improvements', 'UX Enhancements', 'User Feedback Implementation', 'Rapid Deployment'], icon: 'Zap', category: 'development', featured: 0 },
  { id: 8, slug: 'system-health', title: 'System Health Monitoring', description: 'Comprehensive health monitoring with detailed reporting on system status and performance metrics.', features: ['Health Checks', 'Status Reporting', 'Alert Systems', 'Trend Analysis', 'Dashboard Access'], icon: 'Heart', category: 'monitoring', featured: 0 },
  { id: 9, slug: 'technical-support', title: 'Technical Support', description: 'Dedicated technical support team available to help with any technology-related issues or questions.', features: ['Priority Support', 'Expert Team', 'Multiple Channels', 'Quick Response', 'Technical Consulting'], icon: 'Headphones', category: 'support', featured: 0 },
  { id: 10, slug: 'operations-dashboard', title: 'Operations Dashboard', description: 'Access to a centralized dashboard for tracking all your systems, tasks, and performance metrics in one place.', features: ['Real-time Dashboard', 'Task Tracking', 'System Status', 'Performance Metrics', 'Activity Logs'], icon: 'LayoutDashboard', category: 'management', featured: 0 },
  { id: 11, slug: 'task-tracking', title: 'Task Request & Tracking', description: 'Easy task submission and tracking system to manage all your ongoing work and requests efficiently.', features: ['Easy Submission', 'Progress Tracking', 'Priority Management', 'Deadline Tracking', 'Communication Hub'], icon: 'CheckSquare', category: 'management', featured: 0 },
  { id: 12, slug: 'performance-reports', title: 'Performance Reports', description: 'Monthly performance reports with detailed insights into system health, improvements, and recommendations.', features: ['Monthly Reports', 'Performance Analysis', 'Recommendations', 'Trend Reports', 'Executive Summaries'], icon: 'FileText', category: 'reporting', featured: 0 },
  { id: 13, slug: 'documentation', title: 'Documentation & Communication', description: 'Centralized documentation and communication tools for seamless collaboration and knowledge sharing.', features: ['Knowledge Base', 'Document Management', 'Communication Hub', 'Version Control', 'Search Functionality'], icon: 'Book', category: 'management', featured: 0 },
  { id: 14, slug: 'website-optimization', title: 'Website Optimization', description: 'Continuous website performance optimization to improve load times, user experience, and conversion rates.', features: ['Speed Optimization', 'Image Optimization', 'Code Optimization', 'Core Web Vitals', 'User Experience'], icon: 'Gauge', category: 'optimization', featured: 0 },
  { id: 15, slug: 'conversion-optimization', title: 'Conversion & UX Improvements', description: 'Data-driven improvements to increase conversions and enhance user experience across your platforms.', features: ['A/B Testing', 'UX Analysis', 'Conversion Optimization', 'Heatmaps & Analytics', 'User Journey Mapping'], icon: 'TrendingUp', category: 'optimization', featured: 0 },
  { id: 16, slug: 'analytics-setup', title: 'Analytics Setup & Review', description: 'Comprehensive analytics setup and regular reviews to track performance and make data-driven decisions.', features: ['Analytics Setup', 'Goal Tracking', 'Regular Reviews', 'Custom Reports', 'Data Visualization'], icon: 'BarChart', category: 'analytics', featured: 0 },
  { id: 17, slug: 'marketing-automation', title: 'Marketing Integration & Automation', description: 'Integration of marketing tools and automation to streamline your marketing workflows.', features: ['Tool Integration', 'Workflow Automation', 'Email Automation', 'CRM Integration', 'Campaign Setup'], icon: 'Target', category: 'marketing', featured: 0 },
  { id: 18, slug: 'campaign-monitoring', title: 'Campaign Monitoring', description: 'Ongoing monitoring and optimization of your marketing campaigns for maximum ROI.', features: ['Campaign Tracking', 'ROI Analysis', 'Performance Optimization', 'A/B Testing', 'Weekly Reports'], icon: 'PieChart', category: 'marketing', featured: 0 },
  { id: 19, slug: 'technical-advisory', title: 'Technical Advisory', description: 'Expert technical guidance and consulting to help you make informed technology decisions.', features: ['Technology Consulting', 'Best Practices', 'Architecture Review', 'Risk Assessment', 'Strategic Planning'], icon: 'Lightbulb', category: 'advisory', featured: 0 },
  { id: 20, slug: 'product-improvement', title: 'Product Improvement', description: 'Ongoing recommendations and implementation support for product improvements and innovations.', features: ['Product Analysis', 'User Research', 'Improvement Roadmap', 'Implementation Support', 'Competitive Analysis'], icon: 'Package', category: 'advisory', featured: 0 },
  { id: 21, slug: 'roadmap-guidance', title: 'Roadmap & Priority Guidance', description: 'Strategic planning support to help you prioritize features and plan your product roadmap effectively.', features: ['Roadmap Planning', 'Priority Matrix', 'Resource Planning', 'Timeline Development', 'Milestone Tracking'], icon: 'Map', category: 'advisory', featured: 0 },
  { id: 22, slug: 'tech-stack-review', title: 'Technology Stack Review', description: 'Regular reviews of your technology stack to ensure you are using the best tools for your needs.', features: ['Tech Audit', 'Best Fit Analysis', 'Cost Optimization', 'Scalability Review', 'Modernization Plan'], icon: 'Layers', category: 'advisory', featured: 0 },
  { id: 23, slug: 'strategy-reviews', title: 'Quarterly Strategy Reviews', description: 'Quarterly business and technology strategy reviews to align your tech investments with business goals.', features: ['Quarterly Meetings', 'Business Alignment', 'Goal Review', 'Strategy Updates', 'Executive Reports'], icon: 'Calendar', category: 'advisory', featured: 1 },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [slug]);

  const loadService = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/services/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setService(data);
      } else {
        const fallback = allServices.find(s => s.slug === slug);
        if (fallback) {
          setService(fallback);
        } else {
          navigate('/services');
        }
      }
    } catch (err) {
      const fallback = allServices.find(s => s.slug === slug);
      if (fallback) {
        setService(fallback);
      } else {
        navigate('/services');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-animated">
        <Header />
        <div style={{ paddingTop: 140, textAlign: 'center', color: 'white' }}>Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-animated">
        <Header />
        <div style={{ paddingTop: 140, textAlign: 'center', color: 'white' }}>
          <h1>Service not found</h1>
          <Link to="/services" className="btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
            Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Star;
  
  const relatedServices = allServices
    .filter(s => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 80, position: 'relative' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(207,20,43,0.4) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 400, height: 400, top: '30%', right: -100, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: 32 }}>
              <ArrowLeft size={20} /> Back to Services
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 48, alignItems: 'start' }}>
            {/* Main Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={36} style={{ color: '#CF142B' }} />
                </div>
                {service.featured === 1 && (
                  <span style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)', borderRadius: 100, fontSize: 12, fontWeight: 600, color: 'white' }}>
                    POPULAR SERVICE
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
                {service.title}
              </h1>

              <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 48 }}>
                {service.description}
              </p>

              {/* Features */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 32 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, color: 'white' }}>What's Included</h2>
                <div style={{ display: 'grid', gap: 16 }}>
                  {service.features.map((feature: string, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={18} style={{ color: '#34D399' }} />
                      </div>
                      <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div style={{ marginTop: 48 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, color: 'white' }}>Related Services</h2>
                  <div style={{ display: 'grid', gap: 16 }}>
                    {relatedServices.map(related => {
                      const RelatedIcon = iconMap[related.icon] || Star;
                      return (
                        <Link
                          key={related.id}
                          to={`/services/${related.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            padding: '20px 24px',
                            borderRadius: 16,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            textDecoration: 'none',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(207,20,43,0.1)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(207,20,43,0.3)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                          }}
                        >
                          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(207,20,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <RelatedIcon size={24} style={{ color: '#CF142B' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: 4 }}>{related.title}</div>
                            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{related.description?.slice(0, 80)}...</div>
                          </div>
                          <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.3)' }} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* CTA Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div style={{ position: 'sticky', top: 120, background: 'linear-gradient(180deg, rgba(207,20,43,0.15) 0%, rgba(1,33,105,0.08) 100%)', border: '1px solid rgba(207,20,43,0.3)', borderRadius: 24, padding: 32 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <Icon size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>Get Started Today</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
                    This service is included in our subscription plans. View pricing to choose the plan that works for you.
                  </p>
                </div>

                <Link
                  to="/pricing"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                    borderRadius: 12,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(207,20,43,0.4)',
                    marginBottom: 16
                  }}
                >
                  View Pricing <ArrowRight size={18} />
                </Link>

                <Link
                  to="/contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '14px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: 'none'
                  }}
                >
                  Contact Sales
                </Link>

                <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                    <Shield size={16} style={{ color: '#34D399' }} />
                    Enterprise-grade security
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                    <Check size={16} style={{ color: '#34D399' }} />
                    Cancel anytime
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                    <Headphones size={16} style={{ color: '#34D399' }} />
                    Expert support team
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}