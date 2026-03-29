import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const initGA = () => {
  // Try to use environment variable, fallback to placeholder if not set
  const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const trackPhoneClick = () => {
  ReactGA.event({
    category: 'Contact',
    action: 'Phone_Click',
  });
};

export const trackWhatsAppClick = () => {
  ReactGA.event({
    category: 'Contact',
    action: 'WhatsApp_Click',
  });
};
