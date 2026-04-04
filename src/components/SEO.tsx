import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageContext';
import { useEffect, useState } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
}

export const SEO = ({ title, description, keywords, children }: SEOProps) => {
  const { lang, t } = useLanguage();
  
  const siteTitle = title || t.seo.defaultTitle;
  const siteDesc = description || t.seo.defaultDesc;
  const siteKeywords = keywords || t.seo.keywords; // Page-specific or Global keywords
  
  // Use state for pathname to ensure it's available client-side without SSR hydration errors
  const [path, setPath] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
    setUrl(window.location.href);
  }, []);

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="Solution Detectives" />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en" href={`https://riyadhmarblepolish.com${path}`} />
      <link rel="alternate" hrefLang="ar" href={`https://riyadhmarblepolish.com${path}`} />
      <link rel="alternate" hrefLang="x-default" href="https://riyadhmarblepolish.com/" />
      
      {/* Canonical */}
      <link rel="canonical" href={`https://riyadhmarblepolish.com${path}`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content="https://riyadhmarblepolish.com/og-image.jpg" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'ar_SA'} />
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </Helmet>
  );
};
