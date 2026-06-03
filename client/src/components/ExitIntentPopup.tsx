import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight, Phone } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleExitIntent = useCallback(() => {
    const hasSeenExit = sessionStorage.getItem('exit_intent_shown');
    const hasSeenMain = sessionStorage.getItem('jenq_popup_seen');
    
    if (!hasSeenExit && hasSeenMain) {
      setIsVisible(true);
      sessionStorage.setItem('exit_intent_shown', 'true');
    }
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        handleExitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleExitIntent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 9998
            }}
          />
          
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: '100%',
                maxWidth: 480,
                background: 'linear-gradient(145deg, rgba(20, 20, 28, 0.99) 0%, rgba(10, 10, 15, 0.99) 100%)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 30px 100px rgba(207, 20, 43, 0.4), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #012169 0%, #001845 100%)',
                padding: '32px 32px 28px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)'
                }} />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 10px 40px rgba(207,20,43,0.5)'
                  }}
                >
                  <Gift size={32} style={{ color: 'white' }} />
                </motion.div>
                
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: 8,
                  lineHeight: 1.2
                }}>
                  Wait! Before You Go...
                </h2>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: 0
                }}>
                  Get our <strong style={{ color: '#CF142B' }}>FREE Website Security Checklist</strong><br />
                  worth $99 - Yours instantly
                </p>
              </div>

              <div style={{ padding: 32 }}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}>
                  {[
                    '47-point security audit checklist',
                    'Actionable fix recommendations',
                    'Industry-specific security tips',
                    'Free for forever - no spam'
                  ].map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: 14
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: 'rgba(52,211,153,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ color: '#34D399', fontSize: 14 }}>✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      color: 'white',
                      fontSize: 15,
                      outline: 'none',
                      marginBottom: 12,
                      boxSizing: 'border-box'
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                      border: 'none',
                      borderRadius: 12,
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    Send Me The Checklist <ArrowRight size={18} />
                  </motion.button>
                </form>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <a href="tel:+18885550123" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 13,
                    textDecoration: 'none'
                  }}>
                    <Phone size={14} />
                    Or call: +1 (888) 555-0123
                  </a>
                </div>
              </div>

              <button
                onClick={() => setIsVisible(false)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}