import { useState, createContext, useContext, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export const themeStyles = {
  dark: {
    bg: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f18 100%)',
    bgSolid: '#0a0a0f',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
    cardBorder: 'rgba(255,255,255,0.1)',
    cardHover: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
    input: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.1)',
    navbar: 'rgba(10,10,15,0.85)',
    text: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.6)',
    textMuted: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.08)',
  },
  light: {
    bg: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    bgSolid: '#f8fafc',
    card: '#ffffff',
    cardBorder: '#e2e8f0',
    cardHover: '#f8fafc',
    input: '#f1f5f9',
    inputBorder: '#cbd5e1',
    navbar: 'rgba(255,255,255,0.9)',
    text: '#0f172a',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
  }
};