import { useEffect } from 'react';

export default function LiveChat() {
  useEffect(() => {
    // Tawk.to Live Chat Widget
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/DEFAULT';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    const s0 = document.getElementsByTagName('script')[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    // Initialize Tawk.to
    const Tawk_API = (window as any).Tawk_API || {};
    const Tawk_LoadStart = new Date();
    
    (function() {
      const s2 = document.createElement('script');
      s2.async = true;
      s2.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
      s2.setAttribute('crossorigin', 'anonymous');
      const s3 = document.getElementsByTagName('script')[0];
      if (s3 && s3.parentNode) {
        s3.parentNode.insertBefore(s2, s3);
      }
    })();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}

// Alternative: If not using Tawk.to, you can use Crisp.im
export function CrispChat() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'YOUR_WEBSITE_ID';
    
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = 1;
    d.getElementsByTagName('head')[0]?.appendChild(s);

    return () => {
      // Cleanup
      const crispScripts = document.querySelectorAll('script[src*="crisp.chat"]');
      crispScripts.forEach(script => script.remove());
    };
  }, []);

  return null;
}

// Alternative: Use Intercom
export function IntercomChat() {
  useEffect(() => {
    (function(){
      const w = window;
      const ic = w.Intercom;
      if (typeof ic === 'function') {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        const d = document;
        const i = function() { i.c(arguments); };
        i.q = [];
        i.c = function(args) { i.q.push(args); };
        w.Intercom = i;
        
        const l = function() {
          const s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://widget.intercom.io/widget/YOUR_APP_ID';
          const x = d.getElementsByTagName('script')[0];
          if (x && x.parentNode) {
            x.parentNode.insertBefore(s, x);
          }
        };
        
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();
  }, []);

  return null;
}