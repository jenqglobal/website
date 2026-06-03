import { Shield, Lock, Clock, Award, CreditCard, CheckCircle, Star, Users } from 'lucide-react';

const trustBadges = [
  { icon: Shield, label: 'SSL Secured', color: '#34D399' },
  { icon: Lock, label: 'GDPR Compliant', color: '#60A5FA' },
  { icon: Clock, label: '24/7 Support', color: '#A78BFA' },
  { icon: CreditCard, label: 'Secure Payments', color: '#34D399' },
  { icon: CheckCircle, label: '90-Day Guarantee', color: '#60A5FA' }
];

const clientLogos = [
  'TechVentures Inc',
  'Elevate Consulting',
  'Mitchell Dental',
  'Sunrise Retail',
  'Metro Logistics',
  'Bloom & Co'
];

export default function TrustBadges({ variant = 'full' }: { variant?: 'full' | 'compact' | 'logos' }) {
  if (variant === 'logos') {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {clientLogos.map((logo, i) => (
          <div
            key={logo}
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            {logo}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        {trustBadges.slice(0, 4).map((badge) => (
          <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <badge.icon size={18} style={{ color: badge.color }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section style={{
      padding: '60px 0',
      background: 'rgba(0,0,0,0.3)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div className="container-main">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12,
                padding: 24,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${badge.color}15`,
                border: `1px solid ${badge.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <badge.icon size={26} style={{ color: badge.color }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24
          }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
            ))}
            <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 8 }}>
              Rated 4.9/5 by 500+ clients
            </span>
          </div>
          
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
            Trusted by businesses across the United States and United Kingdom
          </p>
        </div>
      </div>
    </section>
  );
}