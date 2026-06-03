import { useState, useEffect } from 'react';
import { Clock, Zap, Users, TrendingUp } from 'lucide-react';

interface UrgencyBannerProps {
  message?: string;
  variant?: 'top' | 'floating';
}

export function UrgencyBanner({ message, variant = 'floating' }: UrgencyBannerProps) {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #CF142B 0%, #a01025 50%, #CF142B 100%)',
      padding: '8px 16px',
      textAlign: 'center',
      fontSize: 13,
      fontWeight: 500,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }}>
      <Zap size={14} />
      {message || 'Limited Time: Get 30% off your first month - Offer ends soon!'}
    </div>
  );
}

export function CountdownTimer({ hours = 24 }: { hours?: number }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {[
        { value: timeLeft.hours, label: 'HRS' },
        { value: timeLeft.minutes, label: 'MIN' },
        { value: timeLeft.seconds, label: 'SEC' }
      ].map((item, i) => (
        <div key={item.label} style={{ textAlign: 'center' }}>
          <div style={{
            minWidth: 48,
            padding: '8px 12px',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 8,
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'white',
            fontFamily: 'monospace'
          }}>
            {formatNumber(item.value)}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScarcityBadge({ type = 'slots' }: { type?: 'slots' | 'spots' | 'urgent' }) {
  const messages = {
    slots: { text: 'Only 3 spots left this week', color: '#F97316' },
    spots: { text: 'Limited availability', color: '#EF4444' },
    urgent: { text: 'High demand - 15 people viewing', color: '#DC2626' }
  };

  const config = messages[type];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 16px',
      background: `${config.color}15`,
      border: `1px solid ${config.color}40`,
      borderRadius: 100,
      fontSize: 13,
      fontWeight: 600,
      color: config.color
    }}>
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: config.color,
        animation: 'pulse 1.5s infinite'
      }} />
      {config.text}
    </div>
  );
}

export function UrgencyStats() {
  const stats = [
    { icon: Users, value: '23', label: 'Signed up this week' },
    { icon: Clock, value: '<2hrs', label: 'Avg response time' },
    { icon: TrendingUp, value: '45%', label: 'Avg growth increase' }
  ];

  return (
    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
      {stats.map((stat) => (
        <div key={stat.label} style={{ textAlign: 'center' }}>
          <stat.icon size={20} style={{ color: '#34D399', marginBottom: 4 }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{stat.value}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}