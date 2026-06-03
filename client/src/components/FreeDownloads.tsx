import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Check, FileText, Lock, AlertTriangle, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const downloadables = [
  {
    id: 'security-checklist',
    icon: Shield,
    title: 'Website Security Checklist',
    description: '47-point comprehensive audit covering all security aspects',
    value: '$99',
    color: '#CF142B',
    items: [
      'SSL & encryption verification',
      'Plugin vulnerability scan',
      'Password policy audit',
      'Backup verification',
      'Firewall configuration check',
      'Malware scan checklist'
    ]
  },
  {
    id: 'performance-guide',
    icon: Server,
    title: 'Website Speed Optimization Guide',
    description: 'Step-by-step guide to make your site load under 2 seconds',
    value: '$79',
    color: '#012169',
    items: [
      'Image optimization techniques',
      'Caching strategies',
      'CDN setup guide',
      'Code minimization tips',
      'Core Web Vitals checklist',
      'Mobile optimization guide'
    ]
  },
  {
    id: 'seo-checklist',
    icon: AlertTriangle,
    title: 'SEO Audit Checklist',
    description: 'Complete on-page and technical SEO checklist for 2024',
    value: '$89',
    color: '#34D399',
    items: [
      'Meta tag optimization',
      'Content structure audit',
      'Mobile-friendliness check',
      'Page speed analysis',
      'Internal linking audit',
      'Schema markup checklist'
    ]
  }
];

export default function FreeDownloads() {
  const [downloaded, setDownloaded] = useState<string[]>([]);

  const handleDownload = (id: string) => {
    setDownloaded(prev => [...prev, id]);
  };

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container-main">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
            Free Resources <span className="text-gradient">For Your Business</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
            Download our expert guides and checklists to improve your online presence
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {downloadables.map((item, index) => {
            const Icon = item.icon;
            const isDownloaded = downloaded.includes(item.id);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: 28 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={28} style={{ color: item.color }} />
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 8,
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'line-through'
                  }}>
                    {item.value}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20, lineHeight: 1.5 }}>
                  {item.description}
                </p>

                <div style={{ marginBottom: 20 }}>
                  {item.items.map((listItem, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: i < item.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                    }}>
                      <Check size={14} style={{ color: '#34D399', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{listItem}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleDownload(item.id)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    background: isDownloaded ? 'rgba(52,211,153,0.15)' : `linear-gradient(135deg, ${item.color} 0%, ${item.color}99 100%)`,
                    border: 'none',
                    borderRadius: 12,
                    color: isDownloaded ? '#34D399' : 'white',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  {isDownloaded ? (
                    <>
                      <Check size={16} />
                      Downloaded
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Get Free Download
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: 48,
            padding: 32,
            background: 'linear-gradient(135deg, rgba(207,20,43,0.1) 0%, rgba(1,33,105,0.05) 100%)',
            borderRadius: 16,
            border: '1px solid rgba(207,20,43,0.2)'
          }}
        >
          <FileText size={24} style={{ color: '#CF142B', marginBottom: 12 }} />
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>
            Want a custom solution for your business?
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Get a free technical audit and we'll create a personalized action plan for you.
          </p>
          <Link 
            to="/contact" 
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px' }}
          >
            Request Free Audit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}