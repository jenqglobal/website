import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <AlertTriangle size={14} /> Legal
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              Disclaimer
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
                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 0 }}>General Information Disclaimer</h2>
                <p style={{ marginBottom: 16 }}>
                  The information provided on this website is for general informational purposes only. JenQ Global Solutions makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained herein.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>No Professional Advice</h2>
                <p style={{ marginBottom: 16 }}>
                  The content on this website does not constitute professional advice. Users should consult with qualified professionals before making any business, legal, financial, or technical decisions. Our services are tailored to individual needs, and results may vary.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Service Results</h2>
                <p style={{ marginBottom: 16 }}>
                  Testimonials, case studies, and examples of past performance displayed on this website are real but represent individual results. Past performance is not indicative of future results. We cannot guarantee specific outcomes for your business.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Third-Party Links</h2>
                <p style={{ marginBottom: 16 }}>
                  Our website may contain links to third-party websites. These links are provided for convenience only. JenQ Global Solutions does not endorse, control, or assume responsibility for the content or practices of any linked websites.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Technical Information</h2>
                <p style={{ marginBottom: 16 }}>
                  While we strive to keep technical information accurate and up-to-date, technology and digital infrastructure evolve rapidly. Technical specifications and recommendations should be verified with current sources before implementation.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Limitation of Liability</h2>
                <p style={{ marginBottom: 16 }}>
                  To the fullest extent permitted by applicable law, JenQ Global Solutions shall not be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of or reliance on any information on this website.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Pricing Disclaimer</h2>
                <p style={{ marginBottom: 16 }}>
                  All pricing displayed on our website is subject to change without notice. Prices quoted are in USD and do not include applicable taxes unless otherwise stated. Final pricing is provided in individual service agreements.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Availability Disclaimer</h2>
                <p style={{ marginBottom: 16 }}>
                  Service availability may vary by location and is subject to our capacity and resource allocation. JenQ Global Solutions reserves the right to limit or discontinue services in certain areas.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Changes to Disclaimer</h2>
                <p style={{ marginBottom: 16 }}>
                  We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the updated disclaimer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}