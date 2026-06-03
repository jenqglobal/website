import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
  country: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, country: 'United States' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, country: 'United Kingdom' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12, country: 'India' }
];

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('preferred_currency');
    if (saved) {
      const found = currencies.find(c => c.code === saved);
      if (found) setCurrency(found);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('preferred_currency', currency.code);
    }
  }, [currency, mounted]);

  const convertPrice = (usdPrice: number): number => {
    return Math.round(usdPrice * currency.rate * 100) / 100;
  };

  const formatPrice = (usdPrice: number): string => {
    const converted = convertPrice(usdPrice);
    if (currency.code === 'USD' || currency.code === 'GBP' || currency.code === 'EUR') {
      return `${currency.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `${currency.symbol}${converted.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
}

export { currencies };