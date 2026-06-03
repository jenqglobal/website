import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Zap, X } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky-cta-bar"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 9980,
        background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 100%)'
      }}
    >
      {!isMinimized ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: 'rgba(15, 15, 20, 0.98)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={22} style={{ color: 'white' }} />
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: 600, fontSize: 14, margin: 0 }}>
                Ready to transform your business?
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>
                Book a free technical audit
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a
              href="/free-audit"
              style={{
                padding: '12px 22px',
                background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                borderRadius: 10,
                color: 'white',
                fontWeight: 600,
                fontSize: 13,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 20px rgba(207,20,43,0.4)'
              }}
            >
              <Zap size={14} />
              Get Free Audit
            </a>
            <a
              href="https://wa.me/917699044864"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={20} />
            </a>
            <button
              onClick={() => setIsMinimized(true)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsMinimized(false)}
          style={{
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 30px rgba(207,20,43,0.5)'
          }}
        >
          <Zap size={18} />
          Get Free Audit
        </motion.button>
      )}
    </motion.div>
  );
}