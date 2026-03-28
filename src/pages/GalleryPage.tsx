import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X } from "lucide-react";
import beforeAfter1 from "@/assets/before-after-1.jpg";
import beforeAfter2 from "@/assets/before-after-2.jpg";
import serviceWork from "@/assets/service-work.jpg";
import heroMarble from "@/assets/hero-marble.jpg";

const GalleryPage = () => {
  const { t, dir, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const images = [
    { src: beforeAfter1, alt: "Tile polishing before and after", category: "beforeAfter" },
    { src: beforeAfter2, alt: "Marble restoration", category: "beforeAfter" },
    { src: serviceWork, alt: "Floor polishing equipment", category: "machines" },
    { src: heroMarble, alt: "Polished marble floor", category: "workInProgress" },
    { src: serviceWork, alt: "Professional cleaning in progress", category: "workInProgress" },
    { src: beforeAfter1, alt: "Granite polishing result", category: "beforeAfter" },
  ];

  const categories = [
    { key: "all", label: t.gallery.categories.all },
    { key: "beforeAfter", label: t.gallery.categories.beforeAfter },
    { key: "machines", label: t.gallery.categories.machines },
    { key: "workInProgress", label: t.gallery.categories.workInProgress },
  ];

  const filtered = activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory);

  return (
    <div dir={dir}>
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-hero-gradient" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-primary-foreground font-heading">{t.nav.gallery}</h1>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div ref={ref} className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">{t.gallery.title}</h2>
              <p className="text-muted-foreground text-lg">{t.gallery.subtitle}</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.key
                      ? "bg-accent text-accent-foreground shadow-gold"
                      : "bg-muted text-muted-foreground hover:bg-accent/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-premium cursor-pointer group"
                  onClick={() => setLightbox(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={1024}
                    height={768}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-background hover:text-accent transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
