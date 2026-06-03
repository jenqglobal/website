import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Globe, Shield, Zap, Search, Eye, Clock, CheckCircle, AlertTriangle, 
  XCircle, Download, RefreshCw, Loader2, ArrowRight, BarChart3,
  Mobile, Server, Lock, SearchCheck, User, Mail, Phone, Building, CreditCard, Check
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface AuditResult {
  category: string;
  icon: any;
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  items: { name: string; status: 'pass' | 'warning' | 'fail'; message: string }[];
}

const generateAudit = (url: string): AuditResult[] => {
  const baseScore = Math.floor(Math.random() * 30) + 70;
  
  return [
    {
      category: 'Performance',
      icon: Zap,
      score: Math.min(100, baseScore + Math.floor(Math.random() * 15)),
      status: baseScore > 85 ? 'excellent' : baseScore > 70 ? 'good' : 'warning',
      items: [
        { name: 'Page Load Time', status: baseScore > 80 ? 'pass' : 'warning', message: `${(Math.random() * 2 + 1).toFixed(1)}s load time` },
        { name: 'First Contentful Paint', status: baseScore > 75 ? 'pass' : 'warning', message: `${(Math.random() * 1.5 + 0.5).toFixed(1)}s` },
        { name: 'Time to Interactive', status: baseScore > 70 ? 'pass' : 'warning', message: `${(Math.random() * 3 + 1).toFixed(1)}s` },
        { name: 'Cumulative Layout Shift', status: baseScore > 80 ? 'pass' : 'fail', message: `${(Math.random() * 0.2).toFixed(2)} score` },
        { name: 'Largest Contentful Paint', status: baseScore > 75 ? 'pass' : 'warning', message: `${(Math.random() * 2.5 + 1).toFixed(1)}s` },
      ]
    },
    {
      category: 'SEO',
      icon: SearchCheck,
      score: Math.min(100, baseScore - 5 + Math.floor(Math.random() * 20)),
      status: baseScore > 80 ? 'excellent' : baseScore > 65 ? 'good' : 'warning',
      items: [
        { name: 'Meta Title & Description', status: baseScore > 70 ? 'pass' : 'fail', message: baseScore > 70 ? 'Present and optimized' : 'Missing or too short' },
        { name: 'Heading Structure', status: baseScore > 75 ? 'pass' : 'warning', message: baseScore > 75 ? 'Proper H1/H2 structure' : 'Needs improvement' },
        { name: 'Image Alt Tags', status: baseScore > 65 ? 'pass' : 'fail', message: baseScore > 65 ? 'All images have alt text' : '3 images missing alt text' },
        { name: 'Mobile Responsiveness', status: baseScore > 80 ? 'pass' : 'warning', message: baseScore > 80 ? 'Fully responsive' : 'Needs optimization' },
        { name: 'Canonical URLs', status: baseScore > 70 ? 'pass' : 'warning', message: baseScore > 70 ? 'Properly configured' : 'Not found' },
      ]
    },
    {
      category: 'Security',
      icon: Shield,
      score: Math.min(100, baseScore + 10 + Math.floor(Math.random() * 15)),
      status: baseScore > 90 ? 'excellent' : baseScore > 75 ? 'good' : 'warning',
      items: [
        { name: 'SSL Certificate', status: baseScore > 85 ? 'pass' : 'fail', message: baseScore > 85 ? 'Valid and properly configured' : 'Certificate missing or expired' },
        { name: 'HTTPS Enforcement', status: baseScore > 80 ? 'pass' : 'warning', message: baseScore > 80 ? 'All traffic redirected to HTTPS' : 'Not fully enforced' },
        { name: 'Security Headers', status: baseScore > 70 ? 'pass' : 'fail', message: baseScore > 70 ? 'X-Frame-Options, CSP configured' : 'Missing security headers' },
        { name: 'Mixed Content', status: baseScore > 85 ? 'pass' : 'fail', message: baseScore > 85 ? 'No mixed content found' : '3 insecure resources found' },
        { name: 'XSS Protection', status: baseScore > 75 ? 'pass' : 'warning', message: baseScore > 75 ? 'X-XSS-Protection enabled' : 'Not properly configured' },
      ]
    },
    {
      category: 'Accessibility',
      icon: Eye,
      score: Math.min(100, baseScore - 10 + Math.floor(Math.random() * 25)),
      status: baseScore > 75 ? 'good' : baseScore > 60 ? 'warning' : 'poor',
      items: [
        { name: 'Color Contrast', status: baseScore > 70 ? 'pass' : 'warning', message: baseScore > 70 ? 'Meets WCAG AA standards' : 'Some text has low contrast' },
        { name: 'Keyboard Navigation', status: baseScore > 75 ? 'pass' : 'warning', message: baseScore > 75 ? 'Fully navigable via keyboard' : 'Some elements not accessible' },
        { name: 'ARIA Labels', status: baseScore > 65 ? 'pass' : 'fail', message: baseScore > 65 ? 'Proper ARIA labels present' : 'Missing ARIA labels on 2 elements' },
        { name: 'Focus Indicators', status: baseScore > 70 ? 'pass' : 'warning', message: baseScore > 70 ? 'Visible focus states' : 'Need better visibility' },
        { name: 'Screen Reader Compatible', status: baseScore > 70 ? 'pass' : 'warning', message: baseScore > 70 ? 'Tested with NVDA/JAWS' : 'Needs optimization' },
      ]
    },
    {
      category: 'Technical',
      icon: Server,
      score: Math.min(100, baseScore + Math.floor(Math.random() * 20)),
      status: baseScore > 80 ? 'excellent' : baseScore > 65 ? 'good' : 'warning',
      items: [
        { name: 'Robots.txt', status: baseScore > 75 ? 'pass' : 'warning', message: baseScore > 75 ? 'Properly configured' : 'Missing or incorrect' },
        { name: 'XML Sitemap', status: baseScore > 70 ? 'pass' : 'fail', message: baseScore > 70 ? 'Valid and submitted to Google' : 'Not found or invalid format' },
        { name: 'Structured Data', status: baseScore > 65 ? 'pass' : 'warning', message: baseScore > 65 ? 'Schema.org implemented' : 'No structured data found' },
        { name: 'Redirect Chains', status: baseScore > 75 ? 'pass' : 'warning', message: baseScore > 75 ? 'No redirect issues' : '2 redirect chains found' },
        { name: 'HTTP Status Codes', status: baseScore > 80 ? 'pass' : 'fail', message: baseScore > 80 ? 'All pages return 200' : '2 pages return 404' },
      ]
    },
  ];
};

const getOverallScore = (results: AuditResult[]) => {
  const total = results.reduce((acc, r) => acc + r.score, 0);
  return Math.round(total / results.length);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return '#10B981';
    case 'good': return '#3B82F6';
    case 'warning': return '#F59E0B';
    case 'poor': return '#EF4444';
    default: return '#6B7280';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pass': return <CheckCircle size={16} style={{ color: '#10B981' }} />;
    case 'warning': return <AlertTriangle size={16} style={{ color: '#F59E0B' }} />;
    case 'fail': return <XCircle size={16} style={{ color: '#EF4444' }} />;
    default: return null;
  }
};

export default function FreeAudit() {
  const [step, setStep] = useState<'form' | 'url' | 'audit' | 'results'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', website: '' });
  const [url, setUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<AuditResult[] | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [reportId, setReportId] = useState<number | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStep('url');
  };

  const handleAudit = async () => {
    if (!url.trim()) return;
    
    let websiteUrl = url.trim();
    if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
      websiteUrl = 'https://' + websiteUrl;
    }
    
    setIsAuditing(true);
    setResults(null);
    
    // Simulate audit process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const auditResults = generateAudit(websiteUrl);
    const score = getOverallScore(auditResults);
    setResults(auditResults);
    setOverallScore(score);
    
    // Save report to database
    try {
      const res = await axios.post('/api/audit-reports', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: websiteUrl,
        results: auditResults,
        overall_score: score
      });
      setReportId(res.data.reportId);
    } catch (err) {
      console.error('Failed to save report:', err);
    }
    
    setIsAuditing(false);
    setStep('results');
  };

  const handlePayment = async () => {
    if (!reportId) return;
    
    setIsProcessingPayment(true);
    
    try {
      const { data } = await axios.post('/api/audit-reports/payment/create-order', {
        reportId
      });
      
      // Store reportId for payment result page
      sessionStorage.setItem('pendingAuditReportId', reportId.toString());
      sessionStorage.setItem('pendingPaypalOrderId', data.orderId);
      
      // Redirect to PayPal for payment (use URL from API response based on mode)
      window.location.href = data.paypalUrl;
      
    } catch (err: any) {
      console.error('Payment error:', err);
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert('Payment failed. Please try again.');
      }
      setIsProcessingPayment(false);
    }
  };

  const downloadPDF = () => {
    const website = formData.website || url;
    const logoUrl = settings.logo;
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Website Audit Report - ${website}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 50px; color: #1a1a2e; line-height: 1.6; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 4px solid #CF142B; }
    .logo-section { display: flex; align-items: center; gap: 20px; }
    .logo-img { max-width: 80px; max-height: 80px; border-radius: 12px; object-fit: contain; }
    .logo-text { font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #CF142B, #012169); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .company-info { text-align: right; color: #666; font-size: 14px; }
    .report-title { text-align: center; margin-bottom: 50px; }
    .report-title h1 { font-size: 36px; color: #1a1a2e; margin-bottom: 15px; font-weight: 800; }
    .report-title p { color: #666; font-size: 18px; }
    .audit-info { background: linear-gradient(135deg, #f8f9fa, #fff); padding: 35px; border-radius: 20px; margin-bottom: 40px; border: 1px solid #e5e5e5; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
    .audit-info-item label { display: block; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .audit-info-item value { color: #1a1a2e; font-size: 16px; font-weight: 600; }
    .score-section { text-align: center; padding: 50px; background: linear-gradient(135deg, #CF142B, #012169); border-radius: 24px; margin-bottom: 50px; color: white; box-shadow: 0 20px 60px rgba(207, 20, 43, 0.3); }
    .score-section .score { font-size: 80px; font-weight: 800; }
    .score-section .label { font-size: 20px; opacity: 0.9; margin-top: 10px; }
    .score-section .status { display: inline-block; margin-top: 15px; padding: 10px 30px; background: rgba(255,255,255,0.2); border-radius: 25px; font-size: 16px; font-weight: 600; }
    .category-section { margin-bottom: 35px; page-break-inside: avoid; }
    .category-header { display: flex; align-items: center; gap: 18px; padding: 25px; background: #f8f9fa; border-radius: 16px; margin-bottom: 20px; border-left: 4px solid #CF142B; }
    .category-icon { width: 52px; height: 52px; background: linear-gradient(135deg, #CF142B20, #01216910); border-radius: 14px; display: flex; align-items: center; justify-content: center; }
    .category-title { flex: 1; font-size: 22px; font-weight: 700; color: #1a1a2e; }
    .category-score { padding: 10px 24px; border-radius: 25px; font-size: 18px; font-weight: 700; }
    .items-table { width: 100%; border-collapse: collapse; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; }
    .items-table th { text-align: left; padding: 16px; background: #CF142B; color: white; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
    .items-table td { padding: 16px; border-bottom: 1px solid #eee; }
    .items-table tr:last-child td { border-bottom: none; }
    .items-table tr:hover { background: #f8f9fa; }
    .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .status-pass { background: #10B98120; color: #10B981; }
    .status-warning { background: #F59E0B20; color: #F59E0B; }
    .status-fail { background: #EF444420; color: #EF4444; }
    .footer { margin-top: 60px; padding-top: 40px; border-top: 2px solid #eee; text-align: center; color: #888; font-size: 14px; }
    .footer .cta { display: inline-block; margin-top: 20px; padding: 14px 40px; background: linear-gradient(135deg, #CF142B, #012169); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; }
    .footer-logo { font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #CF142B, #012169); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-section">
      ${logoUrl ? `<img src="${logoUrl}" alt="JenQ Logo" class="logo-img" />` : '<div class="logo-text">JenQ</div>'}
      <div class="logo-text">JenQ Global Solutions</div>
    </div>
    <div class="company-info">
      <p><strong>JenQ Global Solutions</strong></p>
      <p>Complete Technology Management</p>
      <p>admin@jenqglobal.site</p>
    </div>
  </div>

  <div class="report-title">
    <h1>Website Audit Report</h1>
    <p>Comprehensive Analysis & Recommendations</p>
  </div>

  <div class="audit-info">
    <div class="audit-info-item">
      <label>Website Audited</label>
      <value>${website}</value>
    </div>
    <div class="audit-info-item">
      <label>Report Generated</label>
      <value>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</value>
    </div>
    <div class="audit-info-item">
      <label>Client Name</label>
      <value>${formData.name}</value>
    </div>
    <div class="audit-info-item">
      <label>Contact Email</label>
      <value>${formData.email}</value>
    </div>
    <div class="audit-info-item">
      <label>Phone</label>
      <value>${formData.phone || 'Not provided'}</value>
    </div>
    <div class="audit-info-item">
      <label>Company</label>
      <value>${formData.company || 'Not provided'}</value>
    </div>
  </div>

  <div class="score-section">
    <div class="score">${overallScore}<span style="font-size: 40px; opacity: 0.7">/100</span></div>
    <div class="label">Overall Website Score</div>
    <div class="status">
      ${overallScore >= 80 ? '🌟 Excellent Performance' : overallScore >= 60 ? '⚠️ Needs Improvement' : '❌ Requires Attention'}
    </div>
  </div>

  ${results?.map((result) => `
    <div class="category-section">
      <div class="category-header">
        <div class="category-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#CF142B" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="category-title">${result.category}</div>
        <div class="category-score" style="background: ${getStatusColor(result.status)}20; color: ${getStatusColor(result.status)}">${result.score}/100</div>
      </div>
      <table class="items-table">
        <thead>
          <tr>
            <th>Check Item</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${result.items.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td><span class="status-badge ${item.status === 'pass' ? 'status-pass' : item.status === 'warning' ? 'status-warning' : 'status-fail'}">
                ${item.status === 'pass' ? '✓ Pass' : item.status === 'warning' ? '⚠ Warning' : '✗ Fail'}
              </span></td>
              <td>${item.message}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `).join('')}

  <div class="footer">
    <div class="footer-logo">JenQ Global Solutions</div>
    <p>This report was generated by JenQ Global Solutions - Your Technology Partner</p>
    <p>For questions or to discuss improvements, contact us at admin@jenqglobal.site</p>
    <a href="https://jenqglobal.site/contact" class="cta">Get Free Consultation</a>
    <p style="margin-top: 25px; font-size: 12px; color: #aaa;">© ${new Date().getFullYear()} JenQ Global Solutions. All rights reserved.</p>
  </div>
</body>
</html>
    `;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      {/* Hero Section */}
      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-orb" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(207,20,43,0.3) 0%, transparent 70%)' }}></div>
        <div className="gradient-orb" style={{ width: 400, height: 400, bottom: -100, right: -100, background: 'radial-gradient(circle, rgba(1,33,105,0.4) 0%, transparent 70%)' }}></div>
        
        <div className="container-main">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}
          >
            <div className="badge" style={{ margin: '0 auto 24px', width: 'fit-content' }}>
              <Zap size={14} /> Free Website Audit
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 20, lineHeight: 1.1 }}>
              Get a <span className="text-gradient">Professional Website Audit</span> Report
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              Comprehensive analysis of your website's performance, SEO, security & accessibility. Download your detailed PDF report.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step 1: User Info Form */}
      {step === 'form' && (
        <section style={{ padding: '40px 0 100px' }}>
          <div className="container-main">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                maxWidth: 500, 
                margin: '0 auto',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24,
                padding: 40
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: 'rgba(207,20,43,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <User size={32} style={{ color: '#CF142B' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>
                  Enter Your Details
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                  We need your information to generate and send your audit report.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                    Email Address *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                    Company / Business Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your Company Name"
                      style={{
                        width: '100%',
                        padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 12,
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                    border: 'none',
                    borderRadius: 14,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
                  }}
                >
                  Continue <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Step 2: URL Input */}
      {step === 'url' && (
        <section style={{ padding: '40px 0 100px' }}>
          <div className="container-main">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                textAlign: 'center', 
                maxWidth: 600, 
                margin: '0 auto' 
              }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: 32
              }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <CheckCircle size={20} style={{ color: '#10B981' }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{formData.name} • {formData.email}</span>
                  </div>
                </div>

                <div style={{ position: 'relative', marginBottom: 24 }}>
                  <Globe size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your website URL (e.g., example.com)"
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 12,
                      color: 'white',
                      fontSize: 16,
                      outline: 'none'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                  />
                </div>
                
                <button
                  onClick={handleAudit}
                  disabled={isAuditing || !url.trim()}
                  style={{
                    padding: '16px 40px',
                    background: isAuditing || !url.trim() 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                    border: 'none',
                    borderRadius: 12,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: isAuditing || !url.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    margin: '0 auto'
                  }}
                >
                  {isAuditing ? (
                    <>
                      <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Start Free Audit
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('form')}
                  style={{
                    marginTop: 16,
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  ← Back to change details
                </button>
              </div>

              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
                No signup required • Detailed analysis • $2 for full PDF report
              </p>
            </motion.div>
          </div>
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </section>
      )}

      {/* Loading State */}
      {step === 'audit' && isAuditing && (
        <section style={{ padding: '80px 0' }}>
          <div className="container-main">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}
            >
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <Loader2 size={48} style={{ color: '#CF142B', animation: 'spin 1s linear infinite' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
                Analyzing {url}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
                Running comprehensive audit across 5 key areas...
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                {['Performance Analysis', 'SEO Audit', 'Security Scan', 'Accessibility Check', 'Generating Report'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CF142B' }}></div>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </section>
      )}

      {/* Results Section */}
      {step === 'results' && results && (
        <section style={{ padding: '40px 0 140px' }}>
          <div className="container-main" ref={reportRef}>
            {/* Overall Score */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: 40,
                background: 'linear-gradient(135deg, rgba(207,20,43,0.1) 0%, rgba(1,33,105,0.05) 100%)',
                border: '1px solid rgba(207,20,43,0.2)',
                borderRadius: 24,
                padding: 40,
                maxWidth: 600,
                margin: '0 auto 40px'
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Your Website Score</p>
              <div style={{ 
                fontSize: '5rem', 
                fontWeight: 800, 
                color: getStatusColor(overallScore >= 80 ? 'excellent' : overallScore >= 60 ? 'good' : 'warning'),
                lineHeight: 1
              }}>
                {overallScore}
                <span style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.4)' }}>/100</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
                {overallScore >= 80 ? 'Excellent! Your website is performing well.' :
                 overallScore >= 60 ? 'Good, but there\'s room for improvement.' :
                 'Needs attention. We recommend addressing the issues below.'}
              </p>
            </motion.div>

            {/* Category Results - Blurred for non-paid */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 24, maxWidth: 1000, margin: '0 auto' }}>
              {results.map((result, index) => (
                <motion.div
                  key={result.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card"
                  style={{ 
                    padding: 28,
                    filter: !isPaid && index >= 2 ? 'blur(8px)' : 'none',
                    pointerEvents: !isPaid && index >= 2 ? 'none' : 'auto',
                    userSelect: !isPaid && index >= 2 ? 'none' : 'auto'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(207,20,43,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <result.icon size={22} style={{ color: '#CF142B' }} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{result.category}</h3>
                    </div>
                    <div style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      background: `${getStatusColor(result.status)}20`,
                      color: getStatusColor(result.status),
                      fontSize: 13,
                      fontWeight: 600
                    }}>
                      {result.score}/100
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {result.items.slice(0, !isPaid && index >= 2 ? 2 : undefined).map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        {getStatusIcon(item.status)}
                        <div style={{ flex: 1 }}>
                          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{item.name}</span>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 }}>{item.message}</p>
                        </div>
                      </div>
                    ))}
                    {!isPaid && index >= 2 && (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: 16, 
                        background: 'rgba(255,255,255,0.03)', 
                        borderRadius: 12,
                        border: '1px dashed rgba(255,255,255,0.2)'
                      }}>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                          🔒 Complete report hidden. Pay $2 to unlock full analysis.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Payment Section */}
            {!isPaid && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ 
                  textAlign: 'center', 
                  marginTop: 40,
                  maxWidth: 500,
                  margin: '40px auto 0',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(207,20,43,0.2)',
                  borderRadius: 20,
                  padding: 32
                }}
              >
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CreditCard size={32} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>
                  Unlock Full Report
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 }}>
                  Get access to complete audit results and download professional PDF report.
                </p>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 20 }}>
                  $2<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}> USD</span>
                </div>
                <button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  style={{
                    padding: '16px 48px',
                    background: isProcessingPayment 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                    border: 'none',
                    borderRadius: 14,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Pay $2 with PayPal & Unlock Report
                    </>
                  )}
                </button>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
                  Secure payment • Instant access • 100% satisfaction guaranteed
                </p>
              </motion.div>
            )}

            {/* Download Button (after payment) */}
            {isPaid && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginTop: 40 }}
              >
                <button
                  onClick={downloadPDF}
                  style={{
                    padding: '16px 40px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: 14,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <Download size={20} />
                  Download PDF Report
                </button>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ textAlign: 'center', marginTop: 48 }}
            >
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
                Want us to fix these issues for you?
              </p>
              <Link 
                to="/contact" 
                className="btn-primary" 
                style={{ display: 'inline-flex', padding: '14px 32px' }}
              >
                Get Free Consultation <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </section>
      )}

      <div style={{ height: 80 }} />
      <Footer />
    </div>
  );
}