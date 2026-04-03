import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X } from "lucide-react";
import ba1 from "@/assets/gallery/ba-1.jpg";
import ba2 from "@/assets/gallery/ba-2.jpg";
import img1 from "@/assets/gallery/img-1.jpg";
import img2 from "@/assets/gallery/img-2.jpg";
import img3 from "@/assets/gallery/img-3.jpg";
import img4 from "@/assets/gallery/img-4.jpg";
import img5 from "@/assets/gallery/img-5.jpg";
import img6 from "@/assets/gallery/img-6.jpg";
import img7 from "@/assets/gallery/img-7.jpg";
import img8 from "@/assets/gallery/img-8.jpg";
import img9 from "@/assets/gallery/img-9.jpg";
import img10 from "@/assets/gallery/img-10.jpg";
import img11 from "@/assets/gallery/img-11.jpg";
import img12 from "@/assets/gallery/img-12.jpg";

const GalleryPage = () => {
  const { t, dir, lang } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const images = [
    { src: ba1, alt: "Floor restoration before", category: "beforeAfter" },
    { src: ba2, alt: "Floor restoration after", category: "beforeAfter" },
    { src: img1, alt: "Industrial polishing machine", category: "machines" },
    { src: img2, alt: "Professional floor cleaning equipment", category: "machines" },
    { src: img3, alt: "Tile restoration machinery", category: "machines" },
    { src: img4, alt: "Surface preparation tools", category: "machines" },
    { src: img5, alt: "Marble polishing in progress", category: "workInProgress" },
    { src: img6, alt: "Technician working on floor", category: "workInProgress" },
    { src: img7, alt: "Deep cleaning process", category: "workInProgress" },
    { src: img8, alt: "Surface restoration phase", category: "workInProgress" },
    { src: img9, alt: "Completed marble floor project", category: "completedProjects" },
    { src: img10, alt: "Finished tile installation", category: "completedProjects" },
    { src: img11, alt: "Restored granite surface", category: "completedProjects" },
    { src: img12, alt: "Luxury floor finishing", category: "completedProjects" },
  ];

  const categories = [
    { key: "all", label: t.gallery.categories.all },
    { key: "beforeAfter", label: t.gallery.categories.beforeAfter },
    { key: "machines", label: t.gallery.categories.machines },
    { key: "workInProgress", label: t.gallery.categories.workInProgress },
    { key: "completedProjects", label: t.gallery.categories.completedProjects },
  ];

  const filtered = activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory);

  return (
    <div dir={dir}>
      <SEO title={t.seo.galleryTitle} />
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
