import { useState } from 'react';
import { X, CheckCircle, Loader2, Mail, Phone, User, Building, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: 'I would like to book a free system audit.'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const styles = theme === 'dark' ? {
    bg: '#0f0f18',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    border: 'rgba(255,255,255,0.15)',
    text: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.6)',
    inputBg: 'rgba(255,255,255,0.08)',
    inputBorder: 'rgba(255,255,255,0.15)',
    inputText: '#ffffff',
    placeholder: 'rgba(255,255,255,0.4)',
    overlay: 'rgba(0,0,0,0.8)'
  } : {
    bg: '#ffffff',
    card: '#ffffff',
    border: '#e2e8f0',
    text: '#0f172a',
    textSecondary: '#64748b',
    inputBg: '#f8fafc',
    inputBorder: '#cbd5e1',
    inputText: '#0f172a',
    placeholder: '#94a3b8',
    overlay: 'rgba(0,0,0,0.5)'
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/inquiries', formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: styles.overlay,
          backdropFilter: 'blur(8px)'
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: styles.card,
        border: `1px solid ${styles.border}`,
        borderRadius: 24,
        width: '100%',
        maxWidth: 500,
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 24px 0',
        }}>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: styles.text,
              marginBottom: 4
            }}>
              Book Free System Audit
            </h2>
            <p style={{ color: styles.textSecondary, fontSize: 14 }}>
              Get a comprehensive analysis of your tech infrastructure
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: styles.inputBg,
              border: `1px solid ${styles.inputBorder}`,
              color: styles.textSecondary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: 80,
                height: 80,
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={40} style={{ color: '#10B981' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: styles.text, marginBottom: 8 }}>
                Request Submitted!
              </h3>
              <p style={{ color: styles.textSecondary, marginBottom: 24 }}>
                We'll be in touch within 24 hours to schedule your audit.
              </p>
              <button
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: 12,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="audit-form" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: styles.textSecondary, marginBottom: 8 }}>
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.placeholder }} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: styles.inputBg,
                        border: `1px solid ${styles.inputBorder}`,
                        borderRadius: 12,
                        color: styles.inputText,
                        fontSize: 14,
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: styles.textSecondary, marginBottom: 8 }}>
                    Email *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.placeholder }} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: styles.inputBg,
                        border: `1px solid ${styles.inputBorder}`,
                        borderRadius: 12,
                        color: styles.inputText,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: styles.textSecondary, marginBottom: 8 }}>
                    Phone
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.placeholder }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: styles.inputBg,
                        border: `1px solid ${styles.inputBorder}`,
                        borderRadius: 12,
                        color: styles.inputText,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: styles.textSecondary, marginBottom: 8 }}>
                    Company
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: styles.placeholder }} />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: styles.inputBg,
                        border: `1px solid ${styles.inputBorder}`,
                        borderRadius: 12,
                        color: styles.inputText,
                        fontSize: 14,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: styles.textSecondary, marginBottom: 8 }}>
                  Message
                </label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={16} style={{ position: 'absolute', left: 14, top: 14, color: styles.placeholder }} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 44px',
                      background: styles.inputBg,
                      border: `1px solid ${styles.inputBorder}`,
                      borderRadius: 12,
                      color: styles.inputText,
                      fontSize: 14,
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: 14,
                  fontWeight: 600,
                  fontSize: 15,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0 24px 24px',
          borderTop: `1px solid ${styles.border}`,
          paddingTop: 16
        }}>
          <p style={{ fontSize: 12, color: styles.textSecondary, textAlign: 'center' }}>
            By submitting, you agree to our terms. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}