import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Star, Shield, Award, Clock } from "lucide-react";
import { SERVICE_IMAGES } from "@/data/services";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-marble.jpg";
import beforeAfter1 from "@/assets/before-after-1.jpg";
import beforeAfter2 from "@/assets/before-after-2.jpg";
import serviceWork from "@/assets/service-work.jpg";
import GoldParticles from "@/components/GoldParticles";
import TrustBadges from "@/components/TrustBadges";
import BeforeAfterSection from "@/components/BeforeAfterSlider";
import StatsCounter from "@/components/StatsCounter";
import FAQSection from "@/components/FAQSection";
import VideoGallery from "@/components/VideoGallery";

const HeroSection = () => {
  const { t, dir } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={heroRef} dir={dir} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={heroImage} alt="Premium marble polishing" className="w-full h-full object-cover scale-110" width={1920} height={1080} />
        <div className="absolute inset-0 bg-hero-gradient opacity-85" />
      </motion.div>
      <GoldParticles />
      <div className="relative z-10 container-narrow px-4 py-32">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">★★★★★ Rated Excellence</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground dark:text-white leading-tight mb-6 font-heading hero-shimmer">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 dark:text-white/80 mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/966501921835" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="gap-2 text-base">
                <MessageCircle className="w-5 h-5" />
                {t.hero.cta1}
              </Button>
            </a>
            <a href="tel:+966501921835">
              <Button variant="heroOutline" size="lg" className="gap-2 text-base">
                <Phone className="w-5 h-5" />
                {t.hero.cta2}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { t, dir } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const services = [
    { title: t.services.tilePolishing.title, desc: t.services.tilePolishing.desc, image: SERVICE_IMAGES["tile-polishing"], slug: "tile-polishing" },
    { title: t.services.marblePolishing.title, desc: t.services.marblePolishing.desc, image: SERVICE_IMAGES["marble-polishing"], slug: "marble-polishing" },
    { title: t.services.granitePolishing.title, desc: t.services.granitePolishing.desc, image: SERVICE_IMAGES["granite-polishing"], slug: "granite-polishing" },
    { title: t.services.floorCleaning.title, desc: t.services.floorCleaning.desc, image: SERVICE_IMAGES["floor-cleaning"], slug: "floor-cleaning" },
    { title: t.services.scratchRemoval.title, desc: t.services.scratchRemoval.desc, image: SERVICE_IMAGES["scratch-removal"], slug: "scratch-removal" },
  ];

  return (
    <section dir={dir} className="section-padding bg-background">
      <div className="container-narrow">
        <div ref={ref} className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} title={s.title} description={s.desc} image={s.image} slug={s.slug} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPreview = () => {
  const { t, dir } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const items = [
    { title: t.about.experience, desc: t.about.experienceDesc, icon: <Clock className="w-6 h-6 text-accent" /> },
    { title: t.about.quality, desc: t.about.qualityDesc, icon: <Award className="w-6 h-6 text-accent" /> },
    { title: t.about.satisfaction, desc: t.about.satisfactionDesc, icon: <Star className="w-6 h-6 text-accent" /> },
    { title: t.about.certified, desc: t.about.certifiedDesc, icon: <Shield className="w-6 h-6 text-accent" /> },
  ];

  return (
    <section dir={dir} className="section-padding bg-muted">
      <div className="container-narrow">
        <div ref={ref} className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">{t.about.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className={`bg-card rounded-xl p-6 text-center shadow-premium ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">{item.icon}</div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryPreview = () => {
  const { t, dir } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const images = [
    { src: beforeAfter1, alt: "Tile polishing before and after" },
    { src: beforeAfter2, alt: "Marble restoration before and after" },
    { src: serviceWork, alt: "Professional floor polishing" },
  ];

  return (
    <section dir={dir} className="section-padding bg-background">
      <div className="container-narrow">
        <div ref={ref} className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">{t.gallery.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.gallery.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {images.map((img, i) => (
            <div key={i} className={`rounded-xl overflow-hidden shadow-premium group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${i * 150}ms` }}>
              <img src={img.src} alt={img.alt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={1024} height={768} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/gallery">
            <Button variant="outline" size="lg">{t.gallery.viewAll}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { t, dir, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const testimonials = lang === "en" ? [
    { name: "Ahmed Al-Rashid", text: "Absolutely stunning results! Our marble floors look brand new. The team was professional and thorough.", rating: 5 },
    { name: "Sarah Williams", text: "Best tile polishing service we've ever used. They transformed our entire villa's flooring.", rating: 5 },
    { name: "Mohammed Al-Faisal", text: "Exceptional quality and attention to detail. Highly recommend for any marble or granite work.", rating: 5 },
  ] : [
    { name: "أحمد الراشد", text: "نتائج مذهلة حقاً! أرضيات الرخام لدينا تبدو كالجديدة. الفريق كان محترفاً ودقيقاً.", rating: 5 },
    { name: "سارة وليامز", text: "أفضل خدمة تلميع بلاط استخدمناها على الإطلاق. لقد حولوا أرضيات فيلتنا بالكامل.", rating: 5 },
    { name: "محمد الفيصل", text: "جودة استثنائية واهتمام بالتفاصيل. أنصح بشدة لأي عمل رخام أو جرانيت.", rating: 5 },
  ];

  return (
    <section dir={dir} className="section-padding bg-muted">
      <div className="container-narrow">
        <div ref={ref} className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">{t.testimonials.title}</h2>
          <p className="text-muted-foreground text-lg">{t.testimonials.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div key={i} className={`bg-card rounded-xl p-6 shadow-premium ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">"{item.text}"</p>
              <p className="font-heading font-semibold text-foreground">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const { t, dir } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section dir={dir} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div ref={ref} className={`relative z-10 container-narrow px-4 text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-heading">{t.cta.title}</h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">{t.cta.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/966501921835" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg" className="gap-2 text-base">
              <MessageCircle className="w-5 h-5" />
              {t.cta.button}
            </Button>
          </a>
          <a href="tel:+966501921835">
            <Button variant="heroOutline" size="lg" className="gap-2 text-base">
              <Phone className="w-5 h-5" />
              {t.hero.cta2}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <BeforeAfterSection />
      <ServicesSection />
      <VideoGallery />
      <StatsCounter />
      <AboutPreview />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default Index;
