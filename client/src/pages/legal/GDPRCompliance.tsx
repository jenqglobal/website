import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function GDPRCompliance() {
  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="badge" style={{ marginBottom: 24 }}>
              <Shield size={14} /> Legal
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
              GDPR Compliance
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32 }}>
              How we comply with EU General Data Protection Regulation
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="container-main">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: 48 }}>
              <div style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 0 }}>Our Commitment</h2>
                <p style={{ marginBottom: 16 }}>
                  JenQ Global Solutions is committed to complying with the EU General Data Protection Regulation (GDPR). We process personal data lawfully, fairly, and transparently, respecting the rights of EU residents.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Data We Collect</h2>
                <p style={{ marginBottom: 16 }}>We collect and process the following categories of personal data:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li>Identity data: name, email address, phone number</li>
                  <li>Technical data: IP address, browser type, device information</li>
                  <li>Usage data: pages visited, features used, timestamps</li>
                  <li>Communication data: inquiry history, chat transcripts</li>
                  <li>Financial data: payment information (processed securely via providers)</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Lawful Basis for Processing</h2>
                <p style={{ marginBottom: 16 }}>We process personal data under the following lawful bases:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li><strong>Contract:</strong> Processing necessary to fulfill our service contract with you</li>
                  <li><strong>Legitimate Interest:</strong> For security, analytics, and service improvement</li>
                  <li><strong>Consent:</strong> Where you have given explicit consent for specific processing</li>
                  <li><strong>Legal Obligation:</strong> Where required by applicable law</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Your Rights Under GDPR</h2>
                <p style={{ marginBottom: 16 }}>As an EU resident, you have the following rights:</p>
                <ul style={{ marginLeft: 24, marginBottom: 16 }}>
                  <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Rights Related to Automated Decision Making:</strong> Request human intervention in automated decisions</li>
                </ul>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Data Retention</h2>
                <p style={{ marginBottom: 16 }}>
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying legal, accounting, or reporting requirements.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>International Transfers</h2>
                <p style={{ marginBottom: 16 }}>
                  Where we transfer personal data outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Data Protection Officer</h2>
                <p style={{ marginBottom: 16 }}>
                  For GDPR-related inquiries, please contact our Data Protection Officer:
                </p>
                <p style={{ marginBottom: 8 }}><strong>Email:</strong> dpo@jenqglobal.com</p>
                <p style={{ marginBottom: 16 }}><strong>Post:</strong> Data Protection Officer, JenQ Global Solutions, [Address]</p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Right to Lodge a Complaint</h2>
                <p style={{ marginBottom: 16 }}>
                  You have the right to lodge a complaint with your local data protection supervisory authority (e.g., ICO in the UK, or your country's equivalent) if you believe we have violated your data protection rights.
                </p>

                <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 16, marginTop: 32 }}>Security Measures</h2>
                <p style={{ marginBottom: 16 }}>
                  We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption, access controls, and regular security assessments.
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