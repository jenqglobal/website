import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Settings, FileText, CreditCard, MessageSquare, 
  LogOut, Package, Search, Bell, X, MessageCircle, Mail, AlertCircle, ArrowRight, Globe
} from 'lucide-react';
import axios from 'axios';

const adminNav = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Pages', path: '/admin/pages', icon: FileText },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
  { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },

  { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
  { name: 'Orders', path: '/admin/orders', icon: Package },
  { name: 'Visitors', path: '/admin/visitors', icon: Globe },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

interface Notification {
  id: string;
  type: 'inquiry' | 'chat' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link: string;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const inquiriesRes = await axios.get('/api/inquiries', { headers: { Authorization: `Bearer ${token}` } });

      const newInquiries = inquiriesRes.data
        .filter((i: any) => i.status === 'new')
        .slice(0, 5)
        .map((i: any) => ({
          id: `inquiry-${i.id}`,
          type: 'inquiry' as const,
          title: 'New Inquiry',
          message: `${i.name}: ${i.message.substring(0, 50)}...`,
          time: new Date(i.created_at).toLocaleString(),
          read: false,
          link: '/admin/inquiries'
        }));

      setNotifications(newInquiries);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f14', display: 'flex', justifyContent: 'center' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: 'linear-gradient(180deg, #12121a 0%, #0f0f14 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh'
        }}
      >
        {/* Logo */}
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minHeight: 72
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>J</span>
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 18, color: 'white', display: 'block', lineHeight: 1.2 }}>JenQ</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>ADMIN PANEL</span>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px', overflow: 'auto' }}>
          {adminNav.map((item) => {
            const isActive = location.pathname === item.path;
            const notifCount = item.path === '/admin/inquiries' ? notifications.filter(n => n.type === 'inquiry').length : 
                               item.path === '/admin/chat' ? notifications.filter(n => n.type === 'chat').length : 0;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 12,
                  marginBottom: 6,
                  textDecoration: 'none',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(16,185,129,0.08) 100%)' 
                    : 'transparent',
                  border: isActive 
                    ? '1px solid rgba(59,130,246,0.2)' 
                    : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <item.icon size={20} style={{ 
                  color: isActive ? '#60A5FA' : 'rgba(255,255,255,0.4)',
                  flexShrink: 0
                }} />
                <span style={{ 
                  fontSize: 14, 
                  fontWeight: 500, 
                  color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                  whiteSpace: 'nowrap',
                  flex: 1
                }}>
                  {item.name}
                </span>
                {notifCount > 0 && (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 10,
                    background: '#EF4444',
                    color: 'white'
                  }}>
                    {notifCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 16px',
              borderRadius: 12,
              marginBottom: 8,
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s ease',
              background: 'rgba(255,255,255,0.03)'
            }}
          >
            <Package size={20} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>View Website</span>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 16px',
              borderRadius: 12,
              width: '100%',
              textAlign: 'left',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
              color: '#EF4444',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={20} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ 
        flex: 1, 
        marginLeft: 260,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'calc(100vw - 260px)'
      }}>
        {/* Header */}
        <header style={{
          height: 72,
          background: 'rgba(15,15,20,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}>
          {/* Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '10px 16px',
            width: '100%',
            maxWidth: 360
          }}>
            <Search size={18} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: 14,
                width: '100%'
              }}
            />
            <span style={{ 
              fontSize: 11, 
              color: 'rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.05)',
              padding: '4px 8px',
              borderRadius: 6
            }}>⌘K</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  position: 'relative',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: showNotifications ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#EF4444',
                    border: '2px solid #0f0f14'
                  }}></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    width: 400,
                    background: 'linear-gradient(180deg, #1e1e2a 0%, #151520 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)',
                    zIndex: 100,
                    overflow: 'hidden'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Bell size={16} style={{ color: 'white' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Notifications</span>
                        {unreadCount > 0 && (
                          <span style={{
                            marginLeft: 8,
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: 'rgba(207,20,43,0.2)',
                            color: '#CF142B'
                          }}>
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        style={{ 
                          fontSize: 12, 
                          color: '#60A5FA', 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: 8,
                          transition: 'all 0.2s'
                        }}
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div style={{ maxHeight: 420, overflow: 'auto' }}>
                    {notifications.length > 0 ? notifications.map((notif, index) => (
                      <Link
                        key={notif.id}
                        to={notif.link}
                        onClick={() => setShowNotifications(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 14,
                          padding: '16px 20px',
                          textDecoration: 'none',
                          borderBottom: index < notifications.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                          background: notif.read ? 'transparent' : 'rgba(59,130,246,0.08)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!notif.read) return;
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                        }}
                        onMouseLeave={(e) => {
                          if (!notif.read) return;
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <div style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: notif.type === 'chat' 
                            ? 'rgba(37,211,102,0.15)' 
                            : notif.type === 'payment' 
                            ? 'rgba(16,185,129,0.15)' 
                            : 'rgba(59,130,246,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: notif.type === 'chat' 
                            ? '1px solid rgba(37,211,102,0.2)' 
                            : notif.type === 'payment' 
                            ? '1px solid rgba(16,185,129,0.2)' 
                            : '1px solid rgba(59,130,246,0.2)'
                        }}>
                          {notif.type === 'chat' ? (
                            <MessageCircle size={20} style={{ color: '#25D366' }} />
                          ) : notif.type === 'payment' ? (
                            <CreditCard size={20} style={{ color: '#10B981' }} />
                          ) : (
                            <Mail size={20} style={{ color: '#60A5FA' }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: 'white', margin: 0 }}>{notif.title}</p>
                            {!notif.read && (
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CF142B', flexShrink: 0 }} />
                            )}
                          </div>
                          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6, lineHeight: 1.5 }}>{notif.message}</p>
                          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{notif.time}</p>
                        </div>
                        <div style={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: 8, 
                          background: 'rgba(255,255,255,0.05)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                        </div>
                      </Link>
                    )) : (
                      <div style={{ padding: 48, textAlign: 'center' }}>
                        <div style={{
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          background: 'rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px'
                        }}>
                          <Bell size={28} style={{ color: 'rgba(255,255,255,0.2)' }} />
                        </div>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>No new notifications</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>You're all caught up!</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div style={{
                      padding: '12px 20px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)',
                      textAlign: 'center'
                    }}>
                      <Link
                        to="/admin/inquiries"
                        onClick={() => setShowNotifications(false)}
                        style={{
                          fontSize: 13,
                          color: '#60A5FA',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                      >
                        View all activity →
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* User */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
                color: 'white'
              }}>
                A
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>Admin</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24, background: '#0f0f14' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}