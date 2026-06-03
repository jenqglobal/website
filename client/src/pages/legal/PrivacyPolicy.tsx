import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Lock size={14} /> Legal
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              Privacy Policy
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32 }}>
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="container-main">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: 48 }}>
              <div style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>1. Introduction</h2>
                <p style={{ marginBottom: 16 }}>
                  JenQ Global Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website jenqglobal.com or use our services.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>2. Information We Collect</h2>
                <p style={{ marginBottom: 16 }}>We may collect information about you including:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Personal information (name, email, phone number) when you contact us or subscribe to our services</li>
                  <li>Payment information processed securely through our payment providers</li>
                  <li>Technical data including IP address, browser type, and usage analytics</li>
                  <li>Communication preferences and inquiry history</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>3. How We Use Your Information</h2>
                <p style={{ marginBottom: 16 }}>We use the information we collect to:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>4. Information Sharing</h2>
                <p style={{ marginBottom: 16 }}>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>5. Data Security</h2>
                <p style={{ marginBottom: 16 }}>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>6. Cookies and Tracking</h2>
                <p style={{ marginBottom: 16 }}>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>7. Your Rights</h2>
                <p style={{ marginBottom: 16 }}>Depending on your location, you may have the right to:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Data portability</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>8. Contact Us</h2>
                <p style={{ marginBottom: 16 }}>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p style={{ marginBottom: 8 }}><strong>Email:</strong> privacy@jenqglobal.com</p>
                <p style={{ marginBottom: 8 }}><strong>US Phone:</strong> +1 (888) 555-0123</p>
                <p><strong>UK Phone:</strong> +44 20 7946 0123</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}