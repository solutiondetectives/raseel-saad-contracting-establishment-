import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import { SERVICE_IMAGES } from "@/data/services";

const ServicesPage = () => {
  const { t, dir } = useLanguage();

  const services = [
    { title: t.services.tilePolishing.title, desc: t.services.tilePolishing.desc, image: SERVICE_IMAGES["tile-polishing"], slug: "tile-polishing" },
    { title: t.services.marblePolishing.title, desc: t.services.marblePolishing.desc, image: SERVICE_IMAGES["marble-polishing"], slug: "marble-polishing" },
    { title: t.services.granitePolishing.title, desc: t.services.granitePolishing.desc, image: SERVICE_IMAGES["granite-polishing"], slug: "granite-polishing" },
    { title: t.services.floorCleaning.title, desc: t.services.floorCleaning.desc, image: SERVICE_IMAGES["floor-cleaning"], slug: "floor-cleaning" },
    { title: t.services.scratchRemoval.title, desc: t.services.scratchRemoval.desc, image: SERVICE_IMAGES["scratch-removal"], slug: "scratch-removal" },
  ];

  return (
    <div dir={dir}>
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-hero-gradient" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-primary-foreground font-heading">{t.nav.services}</h1>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">{t.services.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} title={s.title} description={s.desc} image={s.image} slug={s.slug} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
