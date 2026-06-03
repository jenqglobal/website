import { useState, useEffect } from 'react';
import { MessageSquare, Check, X, Trash2, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';

interface Inquiry { id: number; name: string; email: string; phone: string; company: string; message: string; preferred_contact: string; status: string; created_at: string; }
const token = localStorage.getItem('token');

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadInquiries(); }, []);

  const loadInquiries = async () => {
    try { const res = await axios.get('/api/inquiries', { headers: { Authorization: `Bearer ${token}` } }); setInquiries(res.data); }
    catch (err) { console.error('Failed to load:', err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id: number, status: string) => {
    try { await axios.put(`/api/inquiries/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } }); loadInquiries(); }
    catch (err) { console.error('Failed to update:', err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    try { await axios.delete(`/api/inquiries/${id}`, { headers: { Authorization: `Bearer ${token}` } }); loadInquiries(); }
    catch (err) { console.error('Failed to delete:', err); }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const getStatusColor = (status: string) => status === 'new' ? { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' } : status === 'contacted' ? { bg: 'rgba(59,130,246,0.15)', color: '#60A5FA' } : { bg: 'rgba(16,185,129,0.15)', color: '#10B981' };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Inquiries</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Manage contact form submissions</p>
      </div>

      <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Contact</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Company</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Message</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => {
              const statusStyle = getStatusColor(inquiry.status);
              return (
                <tr key={inquiry.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'white' }}>{inquiry.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{inquiry.email}</div>
                    {inquiry.phone && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{inquiry.phone}</div>}
                  </td>
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.6)' }}>{inquiry.company || '-'}</td>
                  <td style={{ padding: '16px 20px' }}><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inquiry.message}</p></td>
                  <td style={{ padding: '16px 20px' }}><span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, background: statusStyle.bg, color: statusStyle.color, textTransform: 'capitalize' }}>{inquiry.status}</span></td>
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{formatDate(inquiry.created_at)}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      {inquiry.status === 'new' && <button onClick={() => updateStatus(inquiry.id, 'contacted')} style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}><Check size={14} /> Mark</button>}
                      {inquiry.status !== 'closed' && <button onClick={() => updateStatus(inquiry.id, 'closed')} style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}><X size={14} /> Close</button>}
                      <button onClick={() => handleDelete(inquiry.id)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {inquiries.length === 0 && <tr><td colSpan={6} style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No inquiries yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}