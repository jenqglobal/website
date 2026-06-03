import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  schemaType?: 'Service' | 'Product' | 'FAQ';
  serviceName?: string;
}

export default function FAQSection({ 
  faqs, 
  title = 'Frequently Asked Questions',
  schemaType = 'FAQ',
  serviceName
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': schemaType === 'FAQ' ? 'FAQPage' : 'Service',
    ...(schemaType === 'FAQ' && {
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }),
    ...(schemaType === 'Service' && serviceName && {
      name: serviceName,
      provider: {
        '@type': 'Organization',
        name: 'JenQ Global Solutions'
      }
    })
  };

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container-main">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: 'rgba(207,20,43,0.1)',
            borderRadius: 100,
            marginBottom: 16
          }}>
            <HelpCircle size={16} style={{ color: '#CF142B' }} />
            <span style={{ color: '#CF142B', fontSize: 14, fontWeight: 600 }}>Help</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>
            {title}
          </h2>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              style={{
                marginBottom: 12,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: 20,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16
                }}
              >
                <span style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: 'left'
                }}>
                  {faq.question}
                </span>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: openIndex === index ? 'rgba(207,20,43,0.2)' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s'
                }}>
                  {openIndex === index ? (
                    <ChevronUp size={18} style={{ color: '#CF142B' }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 20px 20px',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.7,
                      fontSize: 15
                    }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </section>
  );
}

// Common FAQ templates for services
export const commonServiceFAQs: Record<string, FAQItem[]> = {
  maintenance: [
    { question: 'What does website maintenance include?', answer: 'Our maintenance service includes security updates, plugin/theme updates, performance monitoring, uptime checks, backup management, and content changes. We handle everything to keep your website running smoothly.' },
    { question: 'How often are updates performed?', answer: 'We perform updates weekly for plugins and themes, daily backups, and continuous 24/7 monitoring. Critical security patches are applied immediately when discovered.' },
    { question: 'Can I request changes anytime?', answer: 'Yes! You can submit unlimited change requests through your dashboard. Most changes are completed within 24-48 hours, depending on complexity.' },
    { question: 'What happens if my site goes down?', answer: 'Our team monitors your site 24/7 and is notified immediately of any downtime. We typically restore services within 30 minutes, often before you even notice an issue.' }
  ],
  security: [
    { question: 'How do you protect against cyber attacks?', answer: 'We implement multi-layer security including firewalls, malware scanning, DDoS protection, SSL management, and real-time threat monitoring. Our team responds to threats within minutes.' },
    { question: 'Do you provide HIPAA/GDPR compliance?', answer: 'Yes, we offer compliance-specific packages that include documentation, secure hosting, access controls, and audit support for healthcare and EU-based businesses.' },
    { question: 'What happens if I get hacked?', answer: 'If your site is compromised, we immediately begin recovery: isolate affected areas, remove malware, restore from clean backup, implement fixes, and provide a detailed security report with recommendations.' },
    { question: 'How often are security audits performed?', answer: 'We conduct automated daily scans and manual quarterly audits. Enterprise clients receive monthly detailed security reports.' }
  ],
  support: [
    { question: 'What are your support hours?', answer: 'Standard support is available Mon-Fri 9AM-6PM EST with 30-minute response times. Premium clients get 24/7 support with guaranteed 15-minute response SLA.' },
    { question: 'How quickly can you fix issues?', answer: 'Critical issues are resolved within 1 hour. Standard requests typically take 4-8 hours. Complex projects are scoped and completed within agreed timelines.' },
    { question: 'Can I reach you by phone?', answer: 'Yes, all clients have access to our phone support line. Premium clients get a dedicated phone number that connects directly to their account team.' }
  ]
};