import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { useApi } from '../context/ApiContext';
import { AuditModal } from './AuditModal';

const services = [
  { slug: 'website-maintenance', name: 'Website Maintenance', description: 'Updates, security, content changes', color: '#CF142B' },
  { slug: 'mobile-app-support', name: 'Mobile App Support', description: 'iOS & Android management', color: '#012169' },
  { slug: 'security-monitoring', name: 'Security Monitoring', description: '24/7 threat protection', color: '#CF142B' },
  { slug: 'technical-support', name: 'Technical Support', description: 'Expert help on demand', color: '#012169' },
  { slug: 'performance-monitoring', name: 'Performance Monitoring', description: 'Speed optimization', color: '#CF142B' },
  { slug: 'technical-advisory', name: 'Technical Advisory', description: 'Strategic guidance', color: '#012169' },
];

const industries = [
  { slug: 'medical-dental', name: 'Medical & Dental', description: 'HIPAA-compliant solutions', color: '#CF142B' },
  { slug: 'retail-ecommerce', name: 'Retail & E-commerce', description: 'Multi-channel retail', color: '#012169' },
  { slug: 'consultants-coaches', name: 'Consultants & Coaches', description: 'Scale your practice', color: '#CF142B' },
  { slug: 'service-businesses', name: 'Service Businesses', description: 'Field service solutions', color: '#012169' },
  { slug: 'professional-services', name: 'Professional Services', description: 'Compliance-ready', color: '#CF142B' },
  { slug: 'nonprofits', name: 'Non-profits', description: 'Donor management', color: '#012169' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services', hasDropdown: true, dropdownKey: 'services' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Industries', path: '/industries', hasDropdown: true, dropdownKey: 'industries' },
  { name: 'Problems', path: '/problems' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { settings } = useApi();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/services') return location.pathname.startsWith('/services');
    if (path === '/industries') return location.pathname.startsWith('/industries');
    return location.pathname === path;
  };

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled 
          ? 'rgba(10, 10, 15, 0.98)' 
          : 'rgba(10, 10, 15, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: activeDropdown 
          ? '1px solid rgba(207, 20, 43, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none'
      }}>
        <div style={{ 
          maxWidth: 1400, 
          margin: '0 auto', 
          padding: '0 40px',
          height: 72
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            height: '100%',
            gap: 32
          }}>
            {/* Logo */}
            <Link 
              to="/" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12, 
                textDecoration: 'none',
                flexShrink: 0
              }}
            >
              {settings.logo ? (
                <img 
                  src={settings.logo} 
                  alt="Logo" 
                  style={{ 
                    width: (settings as any).logo_width || 48,
                    height: (settings as any).logo_height || 48,
                    borderRadius: 12,
                    objectFit: 'contain'
                  }} 
                />
              ) : (
                <div style={{
                  width: (settings as any).logo_width || 42,
                  height: (settings as any).logo_height || 42,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(207, 20, 43, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span style={{ 
                    color: 'white', 
                    fontWeight: 800, 
                    fontSize: 18,
                    position: 'relative',
                    zIndex: 1 
                  }}>J</span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4,
              flex: 1, 
              justifyContent: 'center' 
            }}>
              {navLinks.map((link) => (
                <div key={link.path} style={{ position: 'relative' }}>
                  {link.hasDropdown ? (
                    <button
                      onMouseEnter={() => setActiveDropdown(link.dropdownKey || link.path)}
                      onClick={() => setActiveDropdown(activeDropdown === link.dropdownKey ? null : (link.dropdownKey || link.path))}
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: isActive(link.path) ? '#CF142B' : 'rgba(255,255,255,0.7)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 16px',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                      onMouseOut={(e) => e.currentTarget.style.color = isActive(link.path) ? '#CF142B' : 'rgba(255,255,255,0.7)'}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span style={{ 
                          width: 5, 
                          height: 5, 
                          borderRadius: '50%', 
                          background: '#CF142B' 
                        }} />
                      )}
                      <ChevronDown 
                        size={14} 
                        style={{ 
                          opacity: 0.6,
                          transform: activeDropdown === link.dropdownKey ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s'
                        }} 
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: isActive(link.path) ? '#CF142B' : 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        padding: '8px 16px',
                        borderRadius: 8,
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                      onMouseOut={(e) => e.currentTarget.style.color = isActive(link.path) ? '#CF142B' : 'rgba(255,255,255,0.7)'}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span style={{ 
                          width: 5, 
                          height: 5, 
                          borderRadius: '50%', 
                          background: '#CF142B' 
                        }} />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Link
                to="/free-audit"
                style={{
                  background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 16px rgba(207, 20, 43, 0.3)',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(207, 20, 43, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(207, 20, 43, 0.3)';
                }}
              >
                <Sparkles size={14} />
                Get Free Audit
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'none',
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Services Dropdown */}
        {activeDropdown === 'services' && (
          <div 
            ref={dropdownRef}
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(15, 15, 20, 0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(207,20,43,0.2)',
              padding: '32px 0',
              animation: 'slideDown 0.2s ease'
            }}
          >
            <style>{`
              @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 16 
              }}>
                {services.map((service, index) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 20px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(207,20,43,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(207,20,43,0.3)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${service.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: service.color
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: 14, 
                        fontWeight: 600, 
                        color: 'white',
                        marginBottom: 2
                      }}>{service.name}</div>
                      <div style={{ 
                        fontSize: 12, 
                        color: 'rgba(255,255,255,0.5)'
                      }}>{service.description}</div>
                    </div>
                    <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </Link>
                ))}
              </div>
              
              <div style={{ 
                marginTop: 24,
                paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Link
                  to="/services"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(207,20,43,0.3)'
                  }}
                >
                  View All Services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Industries Dropdown */}
        {activeDropdown === 'industries' && (
          <div 
            ref={dropdownRef}
            onMouseEnter={() => setActiveDropdown('industries')}
            onMouseLeave={() => setActiveDropdown(null)}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(15, 15, 20, 0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(1,33,105,0.2)',
              padding: '32px 0',
              animation: 'slideDown 0.2s ease'
            }}
          >
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 16 
              }}>
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    to={`/industry/${industry.slug}`}
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 20px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(1,33,105,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(1,33,105,0.3)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${industry.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: industry.color
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: 14, 
                        fontWeight: 600, 
                        color: 'white',
                        marginBottom: 2
                      }}>{industry.name}</div>
                      <div style={{ 
                        fontSize: 12, 
                        color: 'rgba(255,255,255,0.5)'
                      }}>{industry.description}</div>
                    </div>
                    <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </Link>
                ))}
              </div>
              
              <div style={{ 
                marginTop: 24,
                paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Link
                  to="/industries"
                  onClick={() => setActiveDropdown(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #012169 0%, #011550 100%)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(1,33,105,0.3)'
                  }}
                >
                  View All Industries <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuditModal isOpen={showAuditModal} onClose={() => setShowAuditModal(false)} />
      
      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 10, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 99,
          padding: '20px',
          overflowY: 'auto',
          animation: 'slideIn 0.2s ease'
        }}>
          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.hasDropdown ? (
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === link.dropdownKey ? null : link.dropdownKey)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: 16,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      cursor: 'pointer'
                    }}
                  >
                    {link.name}
                    <ChevronDown size={16} style={{ transform: mobileDropdown === link.dropdownKey ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 12,
                      background: isActive(link.path) ? 'rgba(207,20,43,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive(link.path) ? 'rgba(207,20,43,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      color: 'white',
                      fontWeight: 500,
                      fontSize: 16,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {link.name}
                  </Link>
                )}
                
                {/* Mobile Dropdown Content */}
                {link.hasDropdown && mobileDropdown === link.dropdownKey && (
                  <div style={{ paddingLeft: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {link.dropdownKey === 'services' && services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 8,
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 14,
                          textDecoration: 'none'
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                    {link.dropdownKey === 'industries' && industries.map((industry) => (
                      <Link
                        key={industry.slug}
                        to={`/industry/${industry.slug}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 8,
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 14,
                          textDecoration: 'none'
                        }}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                textAlign: 'center',
                marginTop: 16,
                boxShadow: '0 4px 16px rgba(207,20,43,0.3)'
              }}
            >
              Book Free Audit
            </Link>
          </nav>
        </div>
      )}
      
      <style>{`
        @media (max-width: 1024px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
          nav.desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}