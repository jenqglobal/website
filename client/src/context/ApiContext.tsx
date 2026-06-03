import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Settings {
  site_name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  favicon: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  address: string;
  business_hours: string;
  facebook_url: string;
  linkedin_url: string;
  twitter_url: string;
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  cta_link: string;
}

interface ApiContextType {
  settings: Settings;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | null>(null);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    site_name: 'JenQ Global Solutions',
    primary_color: '#0F172A',
    secondary_color: '#3B82F6',
    accent_color: '#10B981',
    favicon: '',
    contact_email: 'hello@jenqglobal.com',
    contact_phone: '+1 (555) 123-4567',
    contact_whatsapp: '',
    address: '123 Business Ave, Suite 100, City, State 12345',
    business_hours: 'Mon-Fri: 9AM-6PM EST',
    facebook_url: 'https://facebook.com/jenqglobal',
    linkedin_url: 'https://linkedin.com/company/jenqglobal',
    twitter_url: 'https://twitter.com/jenqglobal',
    hero_title: 'Your Ongoing Tech & Growth Partner',
    hero_subtitle: 'We maintain, improve, and guide your systems every month—so you can focus on growing your business with confidence.',
    cta_text: 'Book a Free System Audit',
    cta_link: '/contact'
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (settings.primary_color && settings.secondary_color) {
      document.documentElement.style.setProperty('--color-primary', settings.primary_color);
      document.documentElement.style.setProperty('--color-secondary', settings.secondary_color);
      document.documentElement.style.setProperty('--color-accent', settings.accent_color || '#10B981');
    }
  }, [settings]);

  const loadSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      const newSettings = res.data;
      setSettings(prev => ({ ...prev, ...newSettings }));
      
      if (newSettings.favicon) {
        const favicon = document.getElementById('favicon-link');
        if (favicon) {
          favicon.setAttribute('href', newSettings.favicon);
        }
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const currentToken = localStorage.getItem('token');
    await axios.put('/api/settings', newSettings, {
      headers: { Authorization: `Bearer ${currentToken}` }
    });
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ApiContext.Provider value={{ settings, loading, token, login, logout, updateSettings }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context;
}