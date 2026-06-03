import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Shield, BarChart2, X, ChevronDown, ChevronUp, Check, Save } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const cookieCategories = [
  {
    id: 'necessary' as keyof CookiePreferences,
    title: 'Strictly Necessary',
    description: 'Essential for the website to function properly. These cannot be disabled.',
    required: true,
    icon: Shield,
    color: '#34D399'
  },
  {
    id: 'functional' as keyof CookiePreferences,
    title: 'Functional Cookies',
    description: 'Enable enhanced features like remembering your preferences and settings.',
    required: false,
    icon: Settings,
    color: '#60A5FA'
  },
  {
    id: 'analytics' as keyof CookiePreferences,
    title: 'Analytics',
    description: 'Help us understand how visitors interact with our website by collecting anonymous data.',
    required: false,
    icon: BarChart2,
    color: '#A78BFA'
  },
  {
    id: 'marketing' as keyof CookiePreferences,
    title: 'Marketing',
    description: 'Used to deliver personalized advertisements and track campaign performance.',
    required: false,
    icon: Cookie,
    color: '#F472B6'
  }
];

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie_consent');
    if (!hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, functional: true, analytics: true, marketing: true };
    localStorage.setItem('cookie_consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = { necessary: true, functional: false, analytics: false, marketing: false };
    localStorage.setItem('cookie_consent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9990,
            background: 'linear-gradient(145deg, rgba(20, 20, 28, 0.99) 0%, rgba(10, 10, 15, 0.99) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 -10px 60px rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
            {!showSettings ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 280 }}>
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, rgba(207,20,43,0.25) 0%, rgba(1,33,105,0.25) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(207,20,43,0.3)'
                    }}
                  >
                    <Cookie size={26} style={{ color: '#CF142B' }} />
                  </motion.div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                        Your Privacy Matters
                      </h3>
                      <span style={{
                        padding: '4px 10px',
                        background: 'rgba(207,20,43,0.15)',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#CF142B'
                      }}>
                        GDPR Compliant
                      </span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 500 }}>
                      We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                      You can customize your preferences or accept all to continue.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <button
                    onClick={() => setShowSettings(true)}
                    style={{
                      padding: '12px 18px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      transition: 'all 0.2s'
                    }}
                  >
                    <Settings size={16} />
                    Customize
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    style={{
                      padding: '12px 18px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Decline All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                      border: 'none',
                      borderRadius: 10,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 20px rgba(207,20,43,0.4)'
                    }}
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div>
                    <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>
                      Cookie Preferences
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: 0 }}>
                      Manage which cookies you want to allow
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
                  {cookieCategories.map((category) => {
                    const Icon = category.icon;
                    const isEnabled = preferences[category.id];
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          padding: 20,
                          background: isEnabled ? `${category.color}10` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isEnabled ? category.color + '40' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 14,
                          opacity: category.required ? 0.7 : 1
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                              width: 40,
                              height: 40,
                              borderRadius: 10,
                              background: `${category.color}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Icon size={20} style={{ color: category.color }} />
                            </div>
                            <div>
                              <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600, marginBottom: 2 }}>
                                {category.title}
                              </h4>
                              {category.required && (
                                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  Always Active
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => togglePreference(category.id)}
                            disabled={category.required}
                            style={{
                              width: 48,
                              height: 28,
                              borderRadius: 14,
                              background: isEnabled ? '#34D399' : 'rgba(255,255,255,0.1)',
                              border: 'none',
                              cursor: category.required ? 'not-allowed' : 'pointer',
                              position: 'relative',
                              transition: 'all 0.2s',
                              opacity: category.required ? 0.6 : 1
                            }}
                          >
                            <div style={{
                              width: 22,
                              height: 22,
                              borderRadius: 11,
                              background: 'white',
                              position: 'absolute',
                              top: 3,
                              left: isEnabled ? 23 : 3,
                              transition: 'left 0.2s',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }} />
                          </button>
                        </div>
                        
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                          {category.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  <button
                    onClick={() => setShowSettings(false)}
                    style={{
                      padding: '12px 20px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                      border: 'none',
                      borderRadius: 10,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 20px rgba(207,20,43,0.4)'
                    }}
                  >
                    <Save size={16} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}