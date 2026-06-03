import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Sitemap() {
  const sections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Industries', path: '/industries' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
        { name: 'Problems We Solve', path: '/problems' },
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Medical & Dental', path: '/industry/medical-dental' },
        { name: 'Retail & E-commerce', path: '/industry/retail-ecommerce' },
        { name: 'Consultants & Coaches', path: '/industry/consultants-coaches' },
        { name: 'Service Businesses', path: '/industry/service-businesses' },
        { name: 'Professional Services', path: '/industry/professional-services' },
        { name: 'Non-profits', path: '/industry/nonprofits' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', path: '/terms-and-conditions' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'GDPR Compliance', path: '/gdpr-compliance' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
        { name: 'Disclaimer', path: '/disclaimer' },
      ]
    },
    {
      title: 'Admin',
      links: [
        { name: 'Login', path: '/admin/login' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <FileText size={14} /> Site Map
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              Sitemap
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
              Navigate all pages on JenQ Global Solutions
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="container-main">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
              {sections.map((section) => (
                <div key={section.title} className="glass-card" style={{ padding: 32 }}>
                  <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 600, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                    {section.title}
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {section.links.map((link) => (
                      <li key={link.path} style={{ marginBottom: 14 }}>
                        <Link to={link.path} style={{
                          textDecoration: 'none',
                          fontSize: 15,
                          color: 'rgba(255,255,255,0.7)',
                          transition: 'color 0.2s',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}