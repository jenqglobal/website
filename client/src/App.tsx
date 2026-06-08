import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ApiProvider } from './context/ApiContext';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header';
import PopupModal from './components/PopupModal';
import CookieBanner from './components/CookieBanner';
import StickyCTA from './components/StickyCTA';
import ExitIntentPopup from './components/ExitIntentPopup';
import SocialProofCounter from './components/SocialProofCounter';
import TawkToWidget from './components/TawkToWidget';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import MedicalDental from './pages/industries/MedicalDental';
import RetailEcommerce from './pages/industries/RetailEcommerce';
import ConsultantsCoaches from './pages/industries/ConsultantsCoaches';
import ServiceBusinesses from './pages/industries/ServiceBusinesses';
import ProfessionalServices from './pages/industries/ProfessionalServices';
import Nonprofits from './pages/industries/Nonprofits';
import Problems from './pages/Problems';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import SettingsPage from './pages/admin/Settings';

import BlogManager from './pages/admin/BlogManager';
import PagesManager from './pages/admin/PagesManager';
import InquiriesManager from './pages/admin/InquiriesManager';
import SubscriptionsManager from './pages/admin/SubscriptionsManager';
import OrdersManager from './pages/admin/OrdersManager';
import AuditReportsManager from './pages/admin/AuditReportsManager';
import Visitors from './pages/admin/Visitors';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import GDPRCompliance from './pages/legal/GDPRCompliance';
import CookiePolicy from './pages/legal/CookiePolicy';
import Disclaimer from './pages/legal/Disclaimer';
import Sitemap from './pages/Sitemap';
import FreeAudit from './pages/FreeAudit';
import PaymentResult from './pages/PaymentResult';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/about" element={<AppLayout><About /></AppLayout>} />
      <Route path="/services" element={<AppLayout><Services /></AppLayout>} />
      <Route path="/services/:slug" element={<AppLayout><ServiceDetail /></AppLayout>} />
      <Route path="/industries" element={<AppLayout><Industries /></AppLayout>} />
      <Route path="/industry/medical-dental" element={<AppLayout><MedicalDental /></AppLayout>} />
      <Route path="/industry/retail-ecommerce" element={<AppLayout><RetailEcommerce /></AppLayout>} />
      <Route path="/industry/consultants-coaches" element={<AppLayout><ConsultantsCoaches /></AppLayout>} />
      <Route path="/industry/service-businesses" element={<AppLayout><ServiceBusinesses /></AppLayout>} />
      <Route path="/industry/professional-services" element={<AppLayout><ProfessionalServices /></AppLayout>} />
      <Route path="/industry/nonprofits" element={<AppLayout><Nonprofits /></AppLayout>} />
      <Route path="/problems" element={<AppLayout><Problems /></AppLayout>} />
      <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
      <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
      <Route path="/blog" element={<AppLayout><Blog /></AppLayout>} />
      <Route path="/blog/:slug" element={<AppLayout><Blog /></AppLayout>} />
      <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
      <Route path="/terms-and-conditions" element={<AppLayout><TermsAndConditions /></AppLayout>} />
      <Route path="/privacy-policy" element={<AppLayout><PrivacyPolicy /></AppLayout>} />
      <Route path="/gdpr-compliance" element={<AppLayout><GDPRCompliance /></AppLayout>} />
      <Route path="/cookie-policy" element={<AppLayout><CookiePolicy /></AppLayout>} />
      <Route path="/disclaimer" element={<AppLayout><Disclaimer /></AppLayout>} />
      <Route path="/sitemap" element={<AppLayout><Sitemap /></AppLayout>} />
      <Route path="/free-audit" element={<AppLayout><FreeAudit /></AppLayout>} />
      <Route path="/payment-result" element={<PaymentResult />} />

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="pages" element={<PagesManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="inquiries" element={<InquiriesManager />} />
        <Route path="subscriptions" element={<SubscriptionsManager />} />
        <Route path="orders" element={<OrdersManager />} />
        <Route path="audit-reports" element={<AuditReportsManager />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="settings" element={<SettingsPage />} />

      </Route>
    </Routes>
  );
}

export default function App() {
  // Track page views on route change
  useEffect(() => {
    let sessionId = localStorage.getItem('visitorSessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('visitorSessionId', sessionId);
    }

    // Get browser geolocation
    const getGeoData = () => {
      return new Promise((resolve) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                city: '',
                region: '',
                country: '',
                countryCode: ''
              });
            },
            () => resolve(null),
            { timeout: 3000, maximumAge: 600000 }
          );
        } else {
          resolve(null);
        }
      });
    };

    const trackPageView = async () => {
      const geoData = await getGeoData();

      fetch('/api/track/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageUrl: window.location.pathname,
          pageTitle: document.title,
          sessionId: sessionId,
          geoData: geoData
        })
      }).catch(err => console.error('Pageview tracking failed:', err));
    };

    trackPageView();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ApiProvider>
          <CurrencyProvider>
            <AppRoutes />
            <PopupModal />
            <CookieBanner />
            <StickyCTA />
            <ExitIntentPopup />
            <SocialProofCounter />
            <TawkToWidget />
          </CurrencyProvider>
        </ApiProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}