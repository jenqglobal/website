import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, Users, CreditCard, TrendingUp, ArrowRight, 
  BarChart3, FileText, Clock, CheckCircle, AlertCircle, Eye,
  DollarSign, Activity, Zap
} from 'lucide-react';
import axios from 'axios';

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
}

interface RecentInquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadStats();
    loadRecentInquiries();
  }, []);

  const loadStats = async () => {
    try {
      const res = await axios.get('/api/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) { console.error('Failed to load stats:', err); }
  };

  const loadRecentInquiries = async () => {
    try {
      const res = await axios.get('/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentInquiries(res.data.slice(0, 5));
    } catch (err) { console.error('Failed to load inquiries:', err); }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const statCards = [
    { 
      name: 'Total Inquiries', 
      value: stats.totalInquiries, 
      icon: MessageSquare, 
      color: '#3B82F6', 
      bg: 'rgba(59,130,246,0.15)',
      border: 'rgba(59,130,246,0.2)',
      change: '+12%',
      positive: true
    },
    { 
      name: 'New Inquiries', 
      value: stats.newInquiries, 
      icon: AlertCircle, 
      color: '#F59E0B', 
      bg: 'rgba(245,158,11,0.15)',
      border: 'rgba(245,158,11,0.2)',
      change: '+5%',
      positive: true
    },
    { 
      name: 'Total Subscribers', 
      value: stats.totalSubscriptions, 
      icon: Users, 
      color: '#8B5CF6', 
      bg: 'rgba(139,92,246,0.15)',
      border: 'rgba(139,92,246,0.2)',
      change: '+8%',
      positive: true
    },
    { 
      name: 'Monthly Revenue', 
      value: `$${(stats.activeSubscriptions * 399).toLocaleString()}`, 
      icon: DollarSign, 
      color: '#10B981', 
      bg: 'rgba(16,185,129,0.15)',
      border: 'rgba(16,185,129,0.2)',
      change: '+15%',
      positive: true
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Welcome back! Here's what's happening with your site.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: 20, 
        marginBottom: 32 
      }}>
        {statCards.map((stat) => (
          <div
            key={stat.name}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: `1px solid ${stat.border}`,
              borderRadius: 16,
              padding: 24,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 100,
              height: 100,
              background: stat.bg,
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
              opacity: 0.5
            }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 20,
                background: stat.positive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                color: stat.positive ? '#10B981' : '#EF4444'
              }}>
                {stat.change}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{stat.name}</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Inquiries */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: { gridTemplateColumns: '1fr 1.2fr' }, gap: 24 }}>
        {/* Quick Actions */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 24
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { title: 'Add Blog Post', desc: 'Create new content', path: '/admin/blog', icon: FileText, color: '#3B82F6' },
              { title: 'Edit Pages', desc: 'Update site content', path: '/admin/pages', icon: BarChart3, color: '#10B981' },
              { title: 'View Inquiries', desc: 'Check new messages', path: '/admin/inquiries', icon: MessageSquare, color: '#F59E0B' },
              { title: 'Settings', desc: 'Configure site', path: '/admin/settings', icon: Clock, color: '#8B5CF6' },
            ].map((action) => (
              <Link 
                key={action.title}
                to={action.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: 16,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none'
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${action.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 2 }}>{action.title}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 24
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Recent Inquiries</h2>
            <Link to="/admin/inquiries" style={{ fontSize: 13, color: '#60A5FA', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentInquiries.length > 0 ? recentInquiries.map((inquiry) => (
              <div 
                key={inquiry.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: 14,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: inquiry.status === 'new' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {inquiry.status === 'new' ? (
                    <AlertCircle size={18} style={{ color: '#F59E0B' }} />
                  ) : (
                    <CheckCircle size={18} style={{ color: '#10B981' }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inquiry.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inquiry.message}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    fontSize: 11, 
                    padding: '4px 10px', 
                    borderRadius: 20,
                    background: inquiry.status === 'new' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                    color: inquiry.status === 'new' ? '#F59E0B' : '#10B981',
                    textTransform: 'capitalize'
                  }}>
                    {inquiry.status}
                  </span>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.4)' }}>
                No inquiries yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div style={{
        marginTop: 24,
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.04) 100%)',
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: 16,
        padding: 24
      }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Getting Started</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            'Configure your site settings (logo, colors, contact info)',
            'Customize your pages content',
            'Start publishing blog posts',
            'Monitor inquiries and subscriptions'
          ].map((tip, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'rgba(59,130,246,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#60A5FA',
                flexShrink: 0
              }}>
                {index + 1}
              </div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}