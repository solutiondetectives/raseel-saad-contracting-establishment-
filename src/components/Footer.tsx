import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const { t, dir, lang } = useLanguage();

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <footer dir={dir} className="bg-primary text-primary-foreground" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Raseel Saad Contracting Logo"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="font-heading text-xl font-bold" itemProp="alternateName">
                {lang === "ar" ? "مؤسسه رسيل سعد للمقاولات" : "Marble & Tile Polish"}
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed" itemProp="description">
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
              <a href="tel:+966501921835" itemProp="telephone" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> +966 50 192 1835
              </a>
              <a href="mailto:talywankhan3344@gmail.com" itemProp="email" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> talywankhan3344@gmail.com
              </a>
              <div className="flex items-center gap-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <MapPin className="w-4 h-4 shrink-0" /> 
                <span itemProp="streetAddress">Al Wurud District</span>, <span itemProp="addressLocality">Riyadh</span> <span itemProp="addressCountry">SA</span>
              </div>
              {/* Google Maps Embed — inside Contact Info column */}
              <div className="mt-3 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3624.002702839459!2d46.68731127536655!3d24.72678747801676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDQzJzM2LjQiTiA0NsKwNDEnMjMuNiJF!5e0!3m2!1sen!2s!4v1774768169398!5m2!1sen!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="mt-6 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50 flex flex-col gap-2">
          <span>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://solutiondetectives.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              Solution Detectives
            </a>
            . {t.footer.rights}.
          </span>
          <span className="font-medium text-primary-foreground/70">
            <span itemProp="name">مؤسسة رسيل سعد للمقاولات</span> | Al Wurud, Riyadh, Saudi Arabia | <a href="tel:+966501921835">+966 50 192 1835</a> | riyadhmarblepolish.com
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
