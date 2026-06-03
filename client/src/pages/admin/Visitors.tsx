import { useState, useEffect } from 'react';
import { Globe, Monitor, ArrowUpRight, Clock, Users, Eye, MapPin, Search, Calendar } from 'lucide-react';
import axios from 'axios';

interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  todayUnique: number;
  thisWeek: number;
  thisMonth: number;
}

interface LocationData {
  country: string;
  country_code: string;
  visits: number;
  unique_visitors: number;
}

interface PageData {
  page_url: string;
  page_title: string;
  views: number;
  unique_views: number;
}

interface DeviceData {
  device_type: string;
  browser: string;
  os: string;
  visits: number;
  unique_visitors: number;
}

interface TrendData {
  date: string;
  visits: number;
  unique_visitors: number;
}

interface RecentVisitor {
  id: number;
  session_id: string;
  page_url: string;
  page_title: string;
  country: string;
  country_code: string;
  city: string;
  device_type: string;
  browser: string;
  os: string;
  referrer: string;
  created_at: string;
}

type TabType = 'overview' | 'locations' | 'pages' | 'devices' | 'trends' | 'recent';

export default function Visitors() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [recent, setRecent] = useState<RecentVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, locationsRes, pagesRes, devicesRes, trendsRes, recentRes] = await Promise.all([
        axios.get('/api/visitors/stats', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/visitors/locations', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/visitors/pages', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/visitors/devices', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/visitors/trends', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/visitors/recent?limit=100', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setStats(statsRes.data);
      setLocations(locationsRes.data);
      setPages(pagesRes.data);
      setDevices(devicesRes.data);
      setTrends(trendsRes.data);
      setRecent(recentRes.data);
    } catch (err) {
      console.error('Failed to load visitor data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getCountryFlag = (code: string) => {
    if (!code || code === 'Unknown') return '🌍';
    return code.toUpperCase().split('').map(c => String.fromCodePoint(127397 + c.charCodeAt(0))).join('');
  };

  const filteredRecent = recent.filter(v =>
    !searchTerm ||
    v.page_url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.browser?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'pages', label: 'Pages', icon: Globe },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'trends', label: 'Trends', icon: ArrowUpRight },
    { id: 'recent', label: 'Recent Visitors', icon: Users }
  ];

  const statCards = stats ? [
    { name: 'Total Visits', value: formatNumber(stats.totalVisits), icon: Eye, color: '#3B82F6' },
    { name: 'Unique Visitors', value: formatNumber(stats.uniqueVisitors), icon: Users, color: '#8B5CF6' },
    { name: 'Today', value: formatNumber(stats.todayVisits), icon: Clock, color: '#10B981' },
    { name: 'This Week', value: formatNumber(stats.thisWeek), icon: ArrowUpRight, color: '#F59E0B' },
    { name: 'This Month', value: formatNumber(stats.thisMonth), icon: Calendar, color: '#EF4444' }
  ] : [];

  return (
    <div>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Visitor Analytics</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Track your website visitors and their behavior</p>
        </div>
        <button
          onClick={loadData}
          style={{
            padding: '10px 20px',
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 10,
            color: '#60A5FA',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        overflowX: 'auto',
        paddingBottom: 1
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            style={{
              padding: '12px 20px',
              background: activeTab === tab.id ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
              color: activeTab === tab.id ? '#60A5FA' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.5)' }}>Loading...</div>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 20,
                marginBottom: 32
              }}>
                {statCards.map(stat => (
                  <div
                    key={stat.name}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 16,
                      padding: 24
                    }}
                  >
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16
                    }}>
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{stat.name}</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
                {/* Top Pages */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 24
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Top Pages</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {pages.slice(0, 5).map((page, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, color: 'white', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {page.page_url || '/'}
                          </p>
                          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{page.page_title || 'Untitled'}</p>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#60A5FA', marginLeft: 16 }}>
                          {formatNumber(page.views)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Locations */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 24
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Top Locations</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {locations.slice(0, 5).map((loc, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 20 }}>{getCountryFlag(loc.country_code)}</span>
                          <span style={{ fontSize: 13, color: 'white' }}>{loc.country || 'Unknown'}</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#60A5FA' }}>
                          {formatNumber(loc.visits)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 24
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Visitors by Location</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {locations.map((loc, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 16,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 24 }}>{getCountryFlag(loc.country_code)}</span>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{loc.country || 'Unknown'}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{loc.unique_visitors} unique visitors</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 18, fontWeight: 700, color: '#60A5FA' }}>{formatNumber(loc.visits)}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>visits</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === 'pages' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 24
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Page Views</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pages.map((page, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 16,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 4 }}>{page.page_url || '/'}</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{page.page_title || 'Untitled'}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 24, textAlign: 'right' }}>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: '#60A5FA' }}>{formatNumber(page.views)}</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>views</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: '#10B981' }}>{formatNumber(page.unique_views)}</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>unique</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Devices Tab */}
          {activeTab === 'devices' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 24
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Device Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {devices.map((dev, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 16,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: dev.device_type === 'mobile' ? 'rgba(16,185,129,0.15)' :
                          dev.device_type === 'tablet' ? 'rgba(139,92,246,0.15)' : 'rgba(59,130,246,0.15)',
                        color: dev.device_type === 'mobile' ? '#10B981' :
                          dev.device_type === 'tablet' ? '#8B5CF6' : '#3B82F6',
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}>
                        {dev.device_type}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 4 }}>{dev.browser} on {dev.os}</p>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{dev.visits} visits</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{dev.unique_visitors} unique</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 24
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Visitor Trends (Last 30 Days)</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                maxHeight: 500,
                overflowY: 'auto'
              }}>
                {trends.map((day, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 12,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <div style={{ display: 'flex', gap: 24 }}>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#60A5FA' }}>{day.visits}</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>visits</span>
                      </div>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>{day.unique_visitors}</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>unique</span>
                      </div>
                    </div>
                  </div>
                ))}
                {trends.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.4)' }}>
                    No data available yet
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Visitors Tab */}
          {activeTab === 'recent' && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 24
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>Recent Visitors</h3>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                  <input
                    type="text"
                    placeholder="Search visitors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '8px 12px 8px 36px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: 'white',
                      fontSize: 13,
                      width: 250
                    }}
                  />
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                maxHeight: 600,
                overflowY: 'auto'
              }}>
                {filteredRecent.map((visitor, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 12,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 14 }}>{getCountryFlag(visitor.country_code)}</span>
                          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                            {visitor.city || visitor.country || 'Unknown Location'}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: 'white', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {visitor.page_url || '/'}
                        </p>
                        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                          <span>{visitor.browser} on {visitor.os}</span>
                          <span>•</span>
                          <span style={{ textTransform: 'capitalize' }}>{visitor.device_type}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{formatDate(visitor.created_at)}</p>
                        {visitor.referrer && (
                          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            From: {visitor.referrer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredRecent.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 32, color: 'rgba(255,255,255,0.4)' }}>
                    {searchTerm ? 'No visitors match your search' : 'No visitor data available yet'}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}