import { useState, useEffect } from 'react';
import { CreditCard, User, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

interface Subscription {
  id: number;
  customer_email: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: string;
  status: string;
  created_at: string;
  updated_at: string;
}
const token = localStorage.getItem('token');

export default function SubscriptionsManager() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadSubscriptions(); }, []);

  const loadSubscriptions = async () => {
    try { const res = await axios.get('/api/subscriptions'); setSubscriptions(res.data); }
    catch (err) { console.error('Failed to load:', err); }
    finally { setLoading(false); }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const getPlanPrice = (plan: string) => plan === 'essential' ? '$199/mo' : plan === 'growth' ? '$399/mo' : plan === 'scale' ? '$599/mo' : plan;
  const getStatusColor = (status: string) => status === 'active' ? { bg: 'rgba(16,185,129,0.15)', color: '#10B981' } : { bg: 'rgba(239,68,68,0.15)', color: '#EF4444' };

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const monthlyRevenue = subscriptions.reduce((acc, s) => {
    if (s.status !== 'active') return acc;
    if (s.plan === 'essential') return acc + 199;
    if (s.plan === 'growth') return acc + 399;
    if (s.plan === 'scale') return acc + 599;
    return acc;
  }, 0);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Subscriptions</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Manage Stripe subscriptions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={24} color="#10B981" />
            </div>
            <div>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{activeCount}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Active Subscriptions</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={24} color="#60A5FA" />
            </div>
            <div>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{subscriptions.length}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Total Customers</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={24} color="#A78BFA" />
            </div>
            <div>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>${monthlyRevenue.toLocaleString()}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Monthly Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Customer</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Plan</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Start Date</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Stripe ID</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => {
              const statusStyle = getStatusColor(sub.status);
              return (
                <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'white' }}>{sub.customer_email}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, background: 'rgba(139,92,246,0.15)', color: '#A78BFA' }}>
                      {sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)} - {getPlanPrice(sub.plan)}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {sub.status === 'active' ? <CheckCircle size={18} color="#10B981" /> : <XCircle size={18} color="#EF4444" />}
                      <span style={{ fontWeight: 600, color: statusStyle.color, textTransform: 'capitalize' }}>{sub.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.5)' }}>{formatDate(sub.created_at)}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <code style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 4 }}>{sub.stripe_subscription_id?.substring(0, 20) || 'N/A'}...</code>
                  </td>
                </tr>
              );
            })}
            {subscriptions.length === 0 && <tr><td colSpan={5} style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No subscriptions yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}