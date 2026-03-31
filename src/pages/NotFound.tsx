import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const { t, dir, lang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div dir={dir} className="flex min-h-screen items-center justify-center bg-muted">
      <SEO title={`404 - ${lang === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'} | ${t.seo.defaultTitle}`} />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {lang === 'en' ? 'Oops! Page not found' : 'عذراً! الصفحة غير موجودة'}
        </p>
        <Link to="/" className="text-accent underline font-semibold hover:text-accent/80">
          {lang === 'en' ? 'Return to Home' : 'العودة للرئيسية'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
