import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";

const videos = [
  {
    id: "marble",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    embedId: "https://drive.google.com/file/d/1Q-yEPbgRFTWETgL2A4FCnNhPibRDW0GS/preview",
    en: { title: "Marble Polishing", desc: "Watch our experts restore a dull marble floor to a mirror-like finish using diamond polishing techniques." },
    ar: { title: "تلميع الرخام", desc: "شاهد خبراءنا وهم يعيدون لأرضية رخامية باهتة لمعانها المرآوي باستخدام تقنيات التلميع الماسي." },
  },
  {
    id: "tile",
    thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    embedId: "dQw4w9WgXcQ",
    en: { title: "Tile Polishing", desc: "See the dramatic transformation as we polish and restore ceramic tiles to their original brilliance." },
    ar: { title: "تلميع البلاط", desc: "شاهد التحول المذهل عند تلميع وترميم بلاط السيراميك لاستعادة بريقه الأصلي." },
  },
  {
    id: "floor",
    thumbnail: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    embedId: "dQw4w9WgXcQ",
    en: { title: "Floor Cleaning & Machine Work", desc: "Our industrial-grade machines deep clean and restore floors to pristine condition in hours." },
    ar: { title: "تنظيف الأرضيات بالمعدات", desc: "آلاتنا الصناعية تنظف الأرضيات بعمق وتعيدها إلى حالتها الأصلية في ساعات." },
  },
];

const VideoGallery = () => {
  const { lang, dir } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const t = lang === "en"
    ? { label: "✦ OUR WORK IN ACTION", title: "Watch Our Floor Transformation Process", subtitle: "See how we restore shine and perfection to every surface" }
    : { label: "✦ أعمالنا على أرض الواقع", title: "شاهد عملية تحويل الأرضيات", subtitle: "شاهد كيف نعيد اللمعان والكمال لكل سطح" };

  return (
    <>
      <section dir={dir} className="section-padding bg-muted">
        <div className="container-narrow">
          <div ref={ref} className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-3 block">{t.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">{t.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => {
              const content = video[lang];
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-premium bg-card"
                  onClick={() => setActiveVideo(video.embedId)}
                >
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={content.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 text-accent-foreground fill-accent-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{content.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{content.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo.startsWith('http') ? activeVideo : `https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGallery;
