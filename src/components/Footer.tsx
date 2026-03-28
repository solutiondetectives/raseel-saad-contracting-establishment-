import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const { t, dir } = useLanguage();

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <footer dir={dir} className="bg-primary text-primary-foreground">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="font-heading text-accent-foreground text-lg font-bold">SP</span>
              </div>
              <span className="font-heading text-xl font-bold">ShinePolish</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-accent">
              {t.footer.quickLinks}
            </h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-accent">
              {t.footer.contactInfo}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="tel:+966501921835" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> +966 50 192 1835
              </a>
              <a href="mailto:info@shinepolish.sa" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> talywankhan3344@gmail.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" /> PMGQ+PX6 Al Wurud, Riyadh Saudi Arabia
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} ShinePolish. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
