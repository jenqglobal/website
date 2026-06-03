import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Cookie size={14} /> Legal
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              Cookie Policy
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
                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 0 }}>What Are Cookies?</h2>
                <p style={{ marginBottom: 16 }}>
                  Cookies are small text files placed on your device when you visit our website. They help us provide you with a better experience and understand how you use our site.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Types of Cookies We Use</h2>
                
                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: 12, marginTop: 24 }}>Essential Cookies</h3>
                <p style={{ marginBottom: 16 }}>
                  These cookies are necessary for the website to function correctly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.
                </p>

                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: 12, marginTop: 24 }}>Analytics Cookies</h3>
                <p style={{ marginBottom: 16 }}>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve our website and services.
                </p>

                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: 12, marginTop: 24 }}>Marketing Cookies</h3>
                <p style={{ marginBottom: 16 }}>
                  These cookies are used to track visitors across websites for advertising purposes. They may be set by us or by third-party advertising partners to build a profile of your interests.
                </p>

                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: 12, marginTop: 24 }}>Functional Cookies</h3>
                <p style={{ marginBottom: 16 }}>
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Third-Party Cookies</h2>
                <p style={{ marginBottom: 16 }}>
                  Some cookies are placed by third-party services that appear on our pages, such as analytics providers and social media platforms. These third parties may use cookies to track your browsing behavior.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Managing Your Cookie Preferences</h2>
                <p style={{ marginBottom: 16 }}>
                  When you first visit our website, you will see a cookie consent banner where you can accept or customize your preferences. You can change your preferences at any time by clicking on the "Cookie Settings" link in our footer.
                </p>
                <p style={{ marginBottom: 16 }}>You can also manage cookies through your browser settings:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Firefox: Options → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies</li>
                  <li>Edge: Settings → Privacy & Security → Cookies</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Impact of Disabling Cookies</h2>
                <p style={{ marginBottom: 16 }}>
                  If you choose to disable cookies, some features of our website may not work properly, and your user experience may be affected.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Updates to This Policy</h2>
                <p style={{ marginBottom: 16 }}>
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Contact</h2>
                <p style={{ marginBottom: 8 }}>For questions about our use of cookies, contact us:</p>
                <p style={{ marginBottom: 8 }}><strong>Email:</strong> privacy@jenqglobal.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}