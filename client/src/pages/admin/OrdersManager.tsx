import { useState, useEffect } from 'react';
import { Trash2, Eye, CheckCircle, Clock, XCircle, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  preferred_contact: string;
  plan: string;
  plan_price: number;
  plan_tier: string;
  status: string;
  payment_method: string;
  payment_id: string;
  payment_status: string;
  notes: string;
  created_at: string;
}

export default function OrdersManager() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const deleteOrder = async (id: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setOrders(orders.filter(o => o.id !== id));
      if (selectedOrder?.id === id) {
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' },
      completed: { bg: 'rgba(52,211,153,0.15)', color: '#34D399' },
      cancelled: { bg: 'rgba(239,68,68,0.15)', color: '#EF4444' },
      processing: { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6' }
    };
    
    const style = styles[status as keyof typeof styles] || styles.pending;
    
    return (
      <span style={{ 
        padding: '4px 12px', 
        borderRadius: 100, 
        fontSize: 12, 
        fontWeight: 600,
        background: style.bg,
        color: style.color
      }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.plan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => o.status === 'completed' ? sum + o.plan_price : 0, 0);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>Loading orders...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>Orders</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage subscription orders and payments</p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ 
            padding: '12px 24px', 
            background: 'rgba(52,211,153,0.1)', 
            border: '1px solid rgba(52,211,153,0.2)',
            borderRadius: 12 
          }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Total Revenue</span>
            <div style={{ color: '#34D399', fontSize: '1.5rem', fontWeight: 700 }}>${totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: 'white',
              fontSize: 14,
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'pending', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '10px 20px',
                background: statusFilter === status 
                  ? 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: statusFilter === status ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: 'white',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: 16, 
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Order</th>
              <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Plan</th>
              <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Date</th>
              <th style={{ padding: '16px', textAlign: 'right', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'white' }}>{order.order_number}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{order.payment_method || 'Pending'}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: 'white' }}>{order.customer_name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{order.customer_email}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ color: 'white' }}>{order.plan}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{order.plan_tier}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: '#CF142B', fontWeight: 700, fontSize: '1.1rem' }}>${order.plan_price}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>/mo</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {getStatusBadge(order.status)}
                  </td>
                  <td style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'rgba(255,255,255,0.5)'
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#EF4444'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20
        }} onClick={() => setSelectedOrder(null)}>
          <div style={{
            background: '#1a1a2e',
            borderRadius: 20,
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem', marginBottom: 4 }}>{selectedOrder.order_number}</h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Order Details</p>
              </div>
              {getStatusBadge(selectedOrder.status)}
            </div>
            
            <div style={{ padding: 28 }}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 12, textTransform: 'uppercase' }}>Customer Information</h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Name</span>
                    <span style={{ color: 'white' }}>{selectedOrder.customer_name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Email</span>
                    <span style={{ color: 'white' }}>{selectedOrder.customer_email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Phone</span>
                    <span style={{ color: 'white' }}>{selectedOrder.customer_phone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Preferred Contact</span>
                    <span style={{ color: 'white', textTransform: 'capitalize' }}>{selectedOrder.preferred_contact}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 12, textTransform: 'uppercase' }}>Subscription Details</h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Plan</span>
                    <span style={{ color: 'white' }}>{selectedOrder.plan}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Tier</span>
                    <span style={{ color: 'white' }}>{selectedOrder.plan_tier}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Price</span>
                    <span style={{ color: '#CF142B', fontWeight: 700 }}>${selectedOrder.plan_price}/month</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 12, textTransform: 'uppercase' }}>Payment Information</h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Payment Method</span>
                    <span style={{ color: 'white', textTransform: 'capitalize' }}>{selectedOrder.payment_method || 'Pending'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Payment ID</span>
                    <span style={{ color: 'white', fontSize: 13 }}>{selectedOrder.payment_id || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Date</span>
                    <span style={{ color: 'white' }}>{new Date(selectedOrder.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 12, textTransform: 'uppercase' }}>Notes</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{selectedOrder.notes}</p>
                </div>
              )}

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                      border: 'none',
                      borderRadius: 10,
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle size={16} style={{ marginRight: 8 }} />
                    Mark as Completed
                  </button>
                )}
                {selectedOrder.status === 'completed' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 10,
                      color: '#EF4444',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <XCircle size={16} style={{ marginRight: 8 }} />
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}