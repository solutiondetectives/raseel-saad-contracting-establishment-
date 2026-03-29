import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { trackPhoneClick } from "@/lib/analytics";

const Navbar = () => {
  const { t, lang, setLang, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <nav
      dir={dir}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-premium"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Raseel Saad Contracting Logo"
            className="w-10 h-10 rounded-lg object-contain"
          />
          <span className={`font-heading text-xl font-bold ${isScrolled ? "text-foreground dark:text-white" : "text-primary-foreground dark:text-white"}`}>
            {lang === "ar" ? "مؤسسه رسيل سعد للمقاولات" : "Marble & Tile Polish"}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-foreground dark:text-white" : "text-primary-foreground dark:text-white"
              } ${location.pathname === link.to ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors dark:text-white dark:border-white/30 ${
              isScrolled
                ? "border-border text-foreground hover:bg-muted"
                : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            {lang === "en" ? "العربية" : "English"}
          </button>

          <a href="tel:+966501921835" onClick={trackPhoneClick}>
            <Button variant="hero" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              {t.nav.callNow}
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? "text-foreground dark:text-white" : "text-primary-foreground dark:text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground dark:text-white" : "text-primary-foreground dark:text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors hover:bg-muted ${
                  location.pathname === link.to ? "text-accent bg-muted" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-3 py-2">
              <ThemeToggle />
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="text-base font-semibold py-2 px-3 rounded-lg border border-border text-foreground hover:bg-muted"
              >
                {lang === "en" ? "العربية" : "English"}
              </button>
            </div>
            <a href="tel:+966501921835" onClick={trackPhoneClick}>
              <Button variant="hero" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                {t.nav.callNow}
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
