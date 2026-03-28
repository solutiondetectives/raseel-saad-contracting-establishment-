import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Mail, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(20),
  message: z.string().trim().min(1).max(1000),
});

const ContactPage = () => {
  const { t, dir, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) return;

    const encoded = `Name: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/966501921835?text=${encoded}`, "_blank");
    setSubmitted(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div dir={dir}>
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-hero-gradient" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-primary-foreground font-heading">{t.nav.contact}</h1>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">{t.contact.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.contact.subtitle}</p>
          </div>

          <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="bg-card rounded-xl p-8 shadow-premium">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact.name}</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required maxLength={100} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact.phone}</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required maxLength={20} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact.message}</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" required maxLength={1000} />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  {t.contact.send}
                </Button>
                {submitted && <p className="text-emerald text-sm text-center font-medium">{t.contact.success}</p>}
              </form>
            </div>

            <div className="space-y-6">
              <a href="https://wa.me/966501921835" target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-card rounded-xl p-6 shadow-premium hover:shadow-gold transition-shadow flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{t.contact.whatsapp}</h3>
                    <p className="text-muted-foreground text-sm">+966 50 192 1835</p>
                  </div>
                </div>
              </a>

              <a href="tel:+966501921835" className="block">
                <div className="bg-card rounded-xl p-6 shadow-premium hover:shadow-gold transition-shadow flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{t.contact.callUs}</h3>
                    <p className="text-muted-foreground text-sm">+966 50 192 1835</p>
                  </div>
                </div>
              </a>

              <a href="mailto:info@shinepolish.sa" className="block">
                <div className="bg-card rounded-xl p-6 shadow-premium hover:shadow-gold transition-shadow flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm">info@shinepolish.sa</p>
                  </div>
                </div>
              </a>

              <div className="bg-card rounded-xl p-6 shadow-premium flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{t.contact.address}</h3>
                  <p className="text-muted-foreground text-sm">Al Olaya District, Riyadh, Saudi Arabia</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-premium h-64">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463876.0134738786!2d46.54271!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh!5e0!3m2!1sen!2ssa!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
