import { useEffect, useRef } from 'react';
import { useApi } from '../context/ApiContext';

export default function TawkToWidget() {
  const { settings } = useApi();
  const propertyId = settings.tawk_to_property_id;
  const initialized = useRef(false);

  useEffect(() => {
    if (!propertyId || initialized.current) return;

    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId}/default`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    const s0 = document.getElementsByTagName('script')[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    initialized.current = true;

    return () => {
      const tawkScripts = document.querySelectorAll(`script[src*="tawk.to"]`);
      tawkScripts.forEach(script => script.remove());
      const widget = document.getElementById('tawkto-widget');
      if (widget) widget.remove();
    };
  }, [propertyId]);

  return null;
}
