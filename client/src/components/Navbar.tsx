import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useApi } from '../context/ApiContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Problems', path: '/problems' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useApi();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>J</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: 'white' }}>{settings.site_name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={settings.cta_link || '/contact'}
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              {settings.cta_text}
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden" style={{ padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  fontSize: 14,
                  fontWeight: 500,
                  color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={settings.cta_link || '/contact'}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 16,
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: 'white',
                padding: '14px 24px',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none'
              }}
            >
              {settings.cta_text}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}