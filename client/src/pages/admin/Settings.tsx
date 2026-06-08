import { useState, useEffect } from 'react';
import { Save, Upload, Image, Palette, Mail, Phone, Check, Loader2, FileImage, CreditCard, Sparkles, MessageCircle } from 'lucide-react';
import { useApi } from '../../context/ApiContext';

export default function SettingsPage() {
  const { settings: contextSettings, loading, updateSettings } = useApi();
  const [settings, setSettings] = useState(contextSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [faviconPreview, setFaviconPreview] = useState<string>('');

  useEffect(() => {
    setSettings(contextSettings);
    if (contextSettings.logo) setLogoPreview(contextSettings.logo);
    if (contextSettings.favicon) setFaviconPreview(contextSettings.favicon);
  }, [contextSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) { 
      console.error('Failed to save:', err.response?.status, err.response?.data);
      alert('Failed to save: ' + (err.response?.data?.message || err.message));
    }
    finally { setSaving(false); }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first');
        return;
      }
      const res = await fetch('/api/settings/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Upload failed');
      }
      const data = await res.json();
      setLogoPreview(data.url);
      setSettings(prev => ({ ...prev, logo: data.url }));
      setSaved(false);
    } catch (err: any) { 
      console.error('Upload failed:', err);
      alert('Upload failed: ' + err.message);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first');
        return;
      }
      const res = await fetch('/api/settings/favicon', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Upload failed');
      }
      const data = await res.json();
      setFaviconPreview(data.url);
      setSettings(prev => ({ ...prev, favicon: data.url }));
      setSaved(false);
    } catch (err: any) { 
      console.error('Upload failed:', err);
      alert('Upload failed: ' + err.message);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: 'white',
    fontSize: 14,
    outline: 'none'
  };

  const labelStyle = { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 };

  if (loading) {
    return <div style={{ color: 'white', padding: 40, textAlign: 'center' }}>Loading settings...</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Site Settings</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Manage your website configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{
          background: saved ? '#10B981' : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          color: 'white', padding: '12px 24px', borderRadius: 12, fontWeight: 600,
          border: 'none', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex',
          alignItems: 'center', gap: 8, opacity: saving ? 0.7 : 1
        }}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : saved ? <Check size={18} /> : <Save size={18} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>
        {/* Branding Section */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image size={20} style={{ color: '#60A5FA' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Branding</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div>
              <label style={labelStyle}>Site Name</label>
              <input type="text" name="site_name" value={settings.site_name || ''} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 20 }}>
            <div>
              <label style={labelStyle}>Logo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {logoPreview ? <img src={logoPreview} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <Image size={24} style={{ color: 'rgba(255,255,255,0.3)' }} />}
                </div>
                <label style={{ padding: '12px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Upload size={16} /> Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div>
                  <label style={{ ...labelStyle, marginBottom: 4 }}>Width (px)</label>
                  <input type="number" name="logo_width" value={(settings as any).logo_width || 48} onChange={handleChange} style={{ ...inputStyle, padding: '10px 12px' }} min="20" max="200" />
                </div>
                <div>
                  <label style={{ ...labelStyle, marginBottom: 4 }}>Height (px)</label>
                  <input type="number" name="logo_height" value={(settings as any).logo_height || 48} onChange={handleChange} style={{ ...inputStyle, padding: '10px 12px' }} min="20" max="200" />
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Favicon</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {faviconPreview ? <img src={faviconPreview} alt="Favicon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <FileImage size={24} style={{ color: 'rgba(255,255,255,0.3)' }} />}
                </div>
                <label style={{ padding: '12px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Upload size={16} /> Upload Favicon
                  <input type="file" accept="image/*" onChange={handleFaviconUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Colors Section */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Palette size={20} style={{ color: '#34D399' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Colors</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { name: 'primary_color', label: 'Primary Color', value: settings.primary_color },
              { name: 'secondary_color', label: 'Secondary Color', value: settings.secondary_color },
              { name: 'accent_color', label: 'Accent Color', value: settings.accent_color }
            ].map((color) => (
              <div key={color.name}>
                <label style={labelStyle}>{color.label}</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input type="color" name={color.name} value={color.value || '#3B82F6'} onChange={handleChange} style={{ width: 48, height: 48, borderRadius: 10, border: 'none', cursor: 'pointer' }} />
                  <input type="text" name={color.name} value={color.value || ''} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} style={{ color: '#A78BFA' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Contact Information</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div>
              <label style={labelStyle}>Contact Email</label>
              <input type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Contact Phone</label>
              <input type="text" name="contact_phone" value={settings.contact_phone || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp Number</label>
              <input type="text" name="contact_whatsapp" value={settings.contact_whatsapp || ''} onChange={handleChange} style={inputStyle} placeholder="1234567890" />
            </div>
            <div>
              <label style={labelStyle}>Business Hours</label>
              <input type="text" name="business_hours" value={settings.business_hours || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Address</label>
              <input type="text" name="address" value={settings.address || ''} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(207,20,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} style={{ color: '#CF142B' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Email Settings</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div>
              <label style={labelStyle}>SMTP Host</label>
              <input type="text" name="smtp_host" value={(settings as any).smtp_host || ''} onChange={handleChange} style={inputStyle} placeholder="smtp.gmail.com" />
            </div>
            <div>
              <label style={labelStyle}>SMTP Port</label>
              <input type="text" name="smtp_port" value={(settings as any).smtp_port || '587'} onChange={handleChange} style={inputStyle} placeholder="587" />
            </div>
            <div>
              <label style={labelStyle}>SMTP User (Email)</label>
              <input type="email" name="smtp_user" value={(settings as any).smtp_user || ''} onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
            </div>
            <div>
              <label style={labelStyle}>SMTP Password</label>
              <input type="password" name="smtp_password" value={(settings as any).smtp_password || ''} onChange={handleChange} style={inputStyle} placeholder="App Password" />
            </div>
            <div>
              <label style={labelStyle}>From Email</label>
              <input type="email" name="smtp_from_email" value={(settings as any).smtp_from_email || ''} onChange={handleChange} style={inputStyle} placeholder="noreply@jenqglobal.com" />
            </div>
            <div>
              <label style={labelStyle}>From Name</label>
              <input type="text" name="smtp_from_name" value={(settings as any).smtp_from_name || 'JenQ Global Solutions'} onChange={handleChange} style={inputStyle} placeholder="JenQ Global Solutions" />
            </div>
            <div>
              <label style={labelStyle}>Notification Email</label>
              <input type="email" name="notification_email" value={(settings as any).notification_email || ''} onChange={handleChange} style={inputStyle} placeholder="admin@jenqglobal.com" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="checkbox" name="smtp_secure" checked={(settings as any).smtp_secure === 'true'} onChange={(e) => {
                const newSettings = { ...settings, smtp_secure: e.target.checked ? 'true' : 'false' };
                setSettings(newSettings);
              }} style={{ width: 18, height: 18 }} />
              <label style={{ ...labelStyle, marginBottom: 0 }}>Use SSL/TLS (Port 465)</label>
            </div>
          </div>
        </div>

        {/* Popup Settings */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} style={{ color: '#FBBF24' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Popup Settings</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" name="enable_popup" checked={(settings as any).enable_popup !== 'false'} onChange={(e) => {
              const newSettings = { ...settings, enable_popup: e.target.checked ? 'true' : 'false' };
              setSettings(newSettings);
            }} style={{ width: 18, height: 18 }} />
            <label style={{ ...labelStyle, marginBottom: 0 }}>Enable Offer Popup (30% Off)</label>
          </div>
        </div>

        {/* Tawk.to Chat */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={20} style={{ color: '#25D366' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Tawk.to Live Chat</h2>
          </div>
          <div>
            <label style={labelStyle}>Tawk.to Property ID</label>
            <input type="text" name="tawk_to_property_id" value={(settings as any).tawk_to_property_id || ''} onChange={handleChange} style={inputStyle} placeholder="e.g. 1234567890abc123def456789" />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
              Get your Property ID from Tawk.to Dashboard → Settings → Property Settings → Property ID. Leave empty to disable.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image size={20} style={{ color: '#60A5FA' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Social Links</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div>
              <label style={labelStyle}>Facebook URL</label>
              <input type="url" name="facebook_url" value={settings.facebook_url || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>LinkedIn URL</label>
              <input type="url" name="linkedin_url" value={settings.linkedin_url || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Twitter URL</label>
              <input type="url" name="twitter_url" value={settings.twitter_url || ''} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image size={20} style={{ color: '#FBBF24' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Call to Action</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div>
              <label style={labelStyle}>Hero Title</label>
              <input type="text" name="hero_title" value={settings.hero_title || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Hero Subtitle</label>
              <input type="text" name="hero_subtitle" value={settings.hero_subtitle || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>CTA Text</label>
              <input type="text" name="cta_text" value={settings.cta_text || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>CTA Link</label>
              <input type="text" name="cta_link" value={settings.cta_link || ''} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Payment Gateways Section */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} style={{ color: '#34D399' }} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Payment Gateways</h2>
          </div>
          
          {/* Razorpay */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 16 }}>Razorpay</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              <div>
                <label style={labelStyle}>Razorpay Key ID</label>
                <input type="text" name="razorpay_key_id" value={(settings as any).razorpay_key_id || ''} onChange={handleChange} style={inputStyle} placeholder="rzp_test_xxxxx" />
              </div>
              <div>
                <label style={labelStyle}>Razorpay Key Secret</label>
                <input type="password" name="razorpay_key_secret" value={(settings as any).razorpay_key_secret || ''} onChange={handleChange} style={inputStyle} placeholder="xxxxxxxxxxxxxx" />
              </div>
            </div>
          </div>

          {/* PayPal */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 16 }}>PayPal</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              <div>
                <label style={labelStyle}>PayPal Client ID</label>
                <input type="text" name="paypal_client_id" value={(settings as any).paypal_client_id || ''} onChange={handleChange} style={inputStyle} placeholder="Client ID from PayPal Developer" />
              </div>
              <div>
                <label style={labelStyle}>PayPal Client Secret</label>
                <input type="password" name="paypal_client_secret" value={(settings as any).paypal_client_secret || ''} onChange={handleChange} style={inputStyle} placeholder="Client Secret from PayPal" />
              </div>
              <div>
                <label style={labelStyle}>PayPal Mode</label>
                <select name="paypal_mode" value={(settings as any).paypal_mode || 'sandbox'} onChange={handleChange as any} style={inputStyle}>
                  <option value="sandbox">Sandbox (Testing)</option>
                  <option value="live">Live (Production)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}