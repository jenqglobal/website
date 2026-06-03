import { Link } from 'react-router-dom';
import { Mail, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { useApi } from '../context/ApiContext';

export default function Footer() {
  const { settings } = useApi();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '40px 0 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 40 }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: 20 }}>
              {settings.logo ? (
                <img src={settings.logo} alt="Logo" style={{ width: 114, height: 114, objectFit: 'contain' }} />
              ) : (
                <div style={{ width: 114, height: 114, background: 'linear-gradient(135deg, #CF142B, #012169)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: 48 }}>J</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
              Your ongoing tech and growth partner. We maintain, improve, and guide your systems every month.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#CF142B', color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Book Free Audit <ArrowRight size={14} />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Industries', path: '/industries' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name} style={{ marginBottom: 10 }}>
                  <Link to={item.path} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, color: 'white' }}>Industries</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Medical & Dental', path: '/industry/medical-dental' },
                { name: 'Retail & E-commerce', path: '/industry/retail-ecommerce' },
                { name: 'Consultants & Coaches', path: '/industry/consultants-coaches' },
                { name: 'Service Businesses', path: '/industry/service-businesses' },
                { name: 'Professional Services', path: '/industry/professional-services' },
                { name: 'Non-profits', path: '/industry/nonprofits' },
              ].map((item) => (
                <li key={item.name} style={{ marginBottom: 10 }}>
                  <Link to={item.path} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, color: 'white' }}>Get in Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(207,20,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={16} style={{ color: '#CF142B' }} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{settings.contact_email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={16} style={{ color: '#25D366' }} />
                </div>
                <a href="https://wa.me/917699044864" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91 7699044864</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={16} style={{ color: '#8B5CF6' }} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{settings.business_hours}</span>
              </div>
            </div>

            <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 28, marginBottom: 16, color: 'white' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
              <li><Link to="/terms-and-conditions" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link to="/gdpr-compliance" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>GDPR</Link></li>
              <li><Link to="/cookie-policy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Cookies</Link></li>
              <li><Link to="/disclaimer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Disclaimer</Link></li>
              <li><Link to="/sitemap" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            © {currentYear} {settings.site_name || 'JenQ Global Solutions'}. All rights reserved.
          </p>
        </div>
      </div>
      <div style={{ height: 60 }} />
    </footer>
  );
}