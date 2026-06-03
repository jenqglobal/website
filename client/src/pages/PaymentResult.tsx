import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2, Download, ArrowRight } from 'lucide-react';

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [reportId, setReportId] = useState<number | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const reportIdParam = searchParams.get('reportId');
    
    // Get from sessionStorage if not in URL
    let storedReportId = sessionStorage.getItem('pendingAuditReportId');
    const storedOrderId = sessionStorage.getItem('pendingPaypalOrderId');
    
    if (reportIdParam) {
      setReportId(parseInt(reportIdParam));
    } else if (storedReportId) {
      setReportId(parseInt(storedReportId));
    }

    if (token || storedOrderId) {
      verifyPayment(token || storedOrderId, reportIdParam || storedReportId);
    } else {
      setStatus('failed');
    }
  }, [searchParams]);

  const verifyPayment = async (token: string, reportIdParam: string | null) => {
    try {
      const rid = reportIdParam || reportId;
      if (!rid) {
        setStatus('failed');
        return;
      }
      
      await axios.post('/api/audit-reports/payment/verify', {
        paypalOrderId: token,
        reportId: rid
      });
      
      setStatus('success');
    } catch (err) {
      console.error('Payment verification failed:', err);
      setStatus('failed');
    }
  };

  const downloadPDF = async () => {
    if (!reportId) return;
    
    try {
      const res = await axios.get(`/api/audit-reports/${reportId}`);
      const report = res.data;
      
      // Generate and download PDF
      const website = report.website;
      const logoUrl = '';
      const results = report.results;
      const score = report.overall_score;
      const name = report.name;
      const email = report.email;
      const phone = report.phone;
      const company = report.company;
      
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
    <div class="audit-info-item"><label>Website Audited</label><value>${website}</value></div>
    <div class="audit-info-item"><label>Report Generated</label><value>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</value></div>
    <div class="audit-info-item"><label>Client Name</label><value>${name}</value></div>
    <div class="audit-info-item"><label>Contact Email</label><value>${email}</value></div>
    <div class="audit-info-item"><label>Phone</label><value>${phone || 'Not provided'}</value></div>
    <div class="audit-info-item"><label>Company</label><value>${company || 'Not provided'}</value></div>
  </div>
  <div class="score-section">
    <div class="score">${score}<span style="font-size: 40px; opacity: 0.7">/100</span></div>
    <div class="label">Overall Website Score</div>
    <div class="status">${score >= 80 ? '🌟 Excellent Performance' : score >= 60 ? '⚠️ Needs Improvement' : '❌ Requires Attention'}</div>
  </div>
  ${results.map((result: any) => `
    <div class="category-section">
      <div class="category-header">
        <div class="category-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#CF142B" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
        <div class="category-title">${result.category}</div>
        <div class="category-score" style="background: ${result.status === 'excellent' ? '#10B98120' : result.status === 'good' ? '#3B82F620' : '#F59E0B20'}; color: ${result.status === 'excellent' ? '#10B981' : result.status === 'good' ? '#3B82F6' : '#F59E0B'}">${result.score}/100</div>
      </div>
      <table class="items-table">
        <thead><tr><th>Check Item</th><th>Status</th><th>Details</th></tr></thead>
        <tbody>
          ${result.items.map((item: any) => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td><span class="status-badge ${item.status === 'pass' ? 'status-pass' : item.status === 'warning' ? 'status-warning' : 'status-fail'}">${item.status === 'pass' ? '✓ Pass' : item.status === 'warning' ? '⚠ Warning' : '✗ Fail'}</span></td>
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
    <a href="https://jenqglobal.site/contact" class="cta">Get Free Consultation</a>
    <p style="margin-top: 25px; font-size: 12px; color: #aaa;">© ${new Date().getFullYear()} JenQ Global Solutions. All rights reserved.</p>
  </div>
</body>
</html>
      `;

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 500);
      }
    } catch (err) {
      console.error('Failed to download:', err);
      alert('Failed to download report. Please try again.');
    }
  };

  const getStatusColor = (s: string) => {
    if (s === 'success') return '#10B981';
    return '#EF4444';
  };

  const getStatusBg = (s: string) => {
    if (s === 'success') return 'rgba(16, 185, 129, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24,
        padding: 60,
        maxWidth: 500,
        width: '100%',
        textAlign: 'center'
      }}>
        {status === 'processing' && (
          <>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Loader2 size={40} style={{ color: '#3B82F6', animation: 'spin 1s linear infinite' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
              Processing Payment...
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>
              Please wait while we verify your payment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <CheckCircle size={40} style={{ color: '#10B981' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
              Payment Successful!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              Your payment has been verified. You can now download your complete audit report.
            </p>
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
          </>
        )}

        {status === 'failed' && (
          <>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <XCircle size={40} style={{ color: '#EF4444' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
              Payment Failed
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              There was an issue processing your payment. Please try again.
            </p>
            <Link
              to="/free-audit"
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                borderRadius: 12,
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              Try Again <ArrowRight size={18} />
            </Link>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}