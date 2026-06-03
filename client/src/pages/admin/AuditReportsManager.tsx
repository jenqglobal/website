import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Download, Search, CheckCircle, XCircle, Clock, ArrowLeft, Eye } from 'lucide-react';
import { useApi } from '../../context/ApiContext';

interface AuditReport {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  overall_score: number;
  is_paid: number;
  created_at: string;
}

export default function AuditReportsManager() {
  const { api } = useApi();
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${api}/audit-reports`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(res.data);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#3B82F6';
    return '#EF4444';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <Link 
          to="/admin" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 16 }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>Website Audit Reports</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
          View all website audit reports submitted by users
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Total Reports</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{reports.length}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Paid Reports</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#10B981' }}>{reports.filter(r => r.is_paid).length}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Pending Payment</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#F59E0B' }}>{reports.filter(r => !r.is_paid).length}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Avg Score</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#3B82F6' }}>
            {reports.length > 0 ? Math.round(reports.reduce((acc, r) => acc + r.overall_score, 0) / reports.length) : 0}
          </p>
        </div>
      </div>

      {/* Reports Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Date</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Name</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Email</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Website</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Score</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'right', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    Loading reports...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    No audit reports yet
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                      {formatDate(report.created_at)}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'white', fontSize: 14, fontWeight: 500 }}>
                      {report.name}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                      {report.email}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                      <a 
                        href={report.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#3B82F6', textDecoration: 'none' }}
                      >
                        {report.website.replace(/^https?:\/\//, '')}
                      </a>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        borderRadius: 20,
                        background: `${getScoreColor(report.overall_score)}20`,
                        color: getScoreColor(report.overall_score),
                        fontSize: 14,
                        fontWeight: 600
                      }}>
                        {report.overall_score}/100
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {report.is_paid ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#10B981', fontSize: 14 }}>
                          <CheckCircle size={16} /> Paid
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#F59E0B', fontSize: 14 }}>
                          <Clock size={16} /> Pending
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedReport(report)}
                        style={{
                          padding: '8px 16px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8,
                          color: 'white',
                          fontSize: 13,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div 
          onClick={() => setSelectedReport(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#1a1a2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: 32,
              maxWidth: 600,
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  Audit Report Details
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                  {formatDate(selectedReport.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontSize: 24
                }}
              >
                ×
              </button>
            </div>

            {/* User Info */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>USER INFORMATION</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Name</p>
                  <p style={{ color: 'white', fontSize: 14 }}>{selectedReport.name}</p>
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Email</p>
                  <p style={{ color: 'white', fontSize: 14 }}>{selectedReport.email}</p>
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Phone</p>
                  <p style={{ color: 'white', fontSize: 14 }}>{selectedReport.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Company</p>
                  <p style={{ color: 'white', fontSize: 14 }}>{selectedReport.company || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Website & Score */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Website</p>
                <a 
                  href={selectedReport.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#3B82F6', textDecoration: 'none', fontSize: 16 }}
                >
                  {selectedReport.website}
                </a>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Overall Score</p>
                <p style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: getScoreColor(selectedReport.overall_score),
                  lineHeight: 1
                }}>
                  {selectedReport.overall_score}
                  <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)' }}>/100</span>
                </p>
              </div>
            </div>

            {/* Payment Status */}
            <div style={{ 
              padding: 16, 
              borderRadius: 12, 
              background: selectedReport.is_paid ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
              border: `1px solid ${selectedReport.is_paid ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24
            }}>
              {selectedReport.is_paid ? (
                <>
                  <CheckCircle size={24} style={{ color: '#10B981' }} />
                  <span style={{ color: '#10B981', fontWeight: 500 }}>Payment Received</span>
                </>
              ) : (
                <>
                  <Clock size={24} style={{ color: '#F59E0B' }} />
                  <span style={{ color: '#F59E0B', fontWeight: 500 }}>Payment Pending</span>
                </>
              )}
            </div>

            <button
              onClick={() => setSelectedReport(null)}
              style={{
                width: '100%',
                padding: 14,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                color: 'white',
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}