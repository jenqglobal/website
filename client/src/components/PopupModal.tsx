import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-react';
import { useApi } from '../context/ApiContext';

interface PopupModalProps {
  onClose?: () => void;
}

const benefits = [
  { icon: Zap, text: 'Free Technical Audit (Worth $299)' },
  { icon: Shield, text: '90-Day Satisfaction Guarantee' },
  { icon: Clock, text: 'Setup Within 48 Hours' }
];

export default function PopupModal({ onClose }: PopupModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { settings } = useApi();

  useEffect(() => {
    const popupEnabled = (settings as any).enable_popup;
    if (popupEnabled === false) return;

    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('jenq_popup_seen');
      if (!hasSeenPopup) {
        setIsVisible(true);
        sessionStorage.setItem('jenq_popup_seen', 'true');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [settings]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(handleClose, 2000);
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
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
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
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: '100%',
                maxWidth: 480,
                background: 'linear-gradient(145deg, rgba(20, 20, 28, 0.99) 0%, rgba(10, 10, 15, 0.99) 100%)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 25px 80px rgba(207, 20, 43, 0.3), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
              padding: '40px 40px 30px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)'
              }} />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 20px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 100,
                  marginBottom: 20,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                <Sparkles size={16} />
                Limited Time Offer
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: 12,
                  lineHeight: 1.2
                }}
              >
                Get 30% Off Your First Month
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: 0
                }}
              >
                Plus get a FREE technical audit worth $299
              </motion.p>
            </div>

            <div style={{ padding: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
                    }}
                  >
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(52,211,153,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <benefit.icon size={14} style={{ color: '#34D399' }} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: 24,
                    background: 'rgba(52,211,153,0.1)',
                    borderRadius: 16,
                    border: '1px solid rgba(52,211,153,0.3)'
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(52,211,153,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Zap size={28} style={{ color: '#34D399' }} />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>You're All Set!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Check your email for your exclusive offer code.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 16 }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#CF142B';
                        e.target.style.background = 'rgba(207,20,43,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                      border: 'none',
                      borderRadius: 12,
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      boxShadow: '0 8px 24px rgba(207,20,43,0.4)'
                    }}
                  >
                    Claim Your Offer <ArrowRight size={18} />
                  </motion.button>
                </form>
              )}

              <p style={{
                textAlign: 'center',
                marginTop: 20,
                color: 'rgba(255,255,255,0.4)',
                fontSize: 12
              }}>
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>

            <div style={{
              padding: '16px 32px 24px',
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              <button
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: '8px 16px'
                }}
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}