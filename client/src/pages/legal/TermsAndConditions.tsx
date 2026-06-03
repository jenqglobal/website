import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, FileText, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Scale size={14} /> Legal
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              Terms & Conditions
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
                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 0 }}>1. Agreement to Terms</h2>
                <p style={{ marginBottom: 16 }}>
                  By accessing and using JenQ Global Solutions' website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>2. Services Description</h2>
                <p style={{ marginBottom: 16 }}>
                  JenQ Global Solutions provides ongoing technology management, digital infrastructure maintenance, and business growth consulting services. We offer monthly retainer plans designed to be your ongoing tech and growth partner.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>3. Subscription and Payment</h2>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Subscriptions are billed monthly in advance unless otherwise agreed</li>
                  <li>All prices are in USD and subject to applicable taxes</li>
                  <li>You authorize us to charge your designated payment method for recurring fees</li>
                  <li>Cancellations require 30 days written notice</li>
                  <li>Refunds are provided at our discretion for pro-rated unused services</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>4. Acceptable Use</h2>
                <p style={{ marginBottom: 16 }}>You agree not to:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Use our services for any illegal or unauthorized purpose</li>
                  <li>Violate any laws in your jurisdiction regarding online conduct</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our servers or networks</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>5. Intellectual Property</h2>
                <p style={{ marginBottom: 16 }}>
                  All content, trademarks, and material on our website are property of JenQ Global Solutions. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>6. Limitation of Liability</h2>
                <p style={{ marginBottom: 16 }}>
                  To the fullest extent permitted by law, JenQ Global Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>7. Service Availability</h2>
                <p style={{ marginBottom: 16 }}>
                  We strive to maintain high availability of our services but do not guarantee uninterrupted access. Scheduled maintenance will be communicated in advance when possible.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>8. Termination</h2>
                <p style={{ marginBottom: 16 }}>
                  We reserve the right to terminate or suspend your access to our services at any time for violation of these terms or for any reason we deem necessary.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>9. Governing Law</h2>
                <p style={{ marginBottom: 16 }}>
                  These Terms shall be governed by the laws of England and Wales for UK clients and applicable US federal law for US clients. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales or the US courts as applicable.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>10. Contact</h2>
                <p style={{ marginBottom: 8 }}>For questions about these Terms, contact us:</p>
                <p style={{ marginBottom: 8 }}><strong>Email:</strong> legal@jenqglobal.com</p>
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