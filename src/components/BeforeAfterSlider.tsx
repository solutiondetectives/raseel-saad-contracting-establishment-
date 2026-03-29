import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import marbleBefore from "@/assets/marble-before.jpg";
import marbleAfter from "@/assets/marble-after.jpg";
import tileBefore from "@/assets/tile-before.jpg";
import tileAfter from "@/assets/tile-after.jpg";
import graniteBefore from "@/assets/granite-before.jpg";
import graniteAfter from "@/assets/granite-after.jpg";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
  label: string;
}

const CompareSlider = ({ beforeImage, afterImage, label }: SliderProps) => {
  const { lang } = useLanguage();
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground font-heading text-center">{label}</h3>
      <div
        ref={containerRef}
        className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden cursor-col-resize select-none shadow-premium"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        {/* After (full) */}
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        {/* Before (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={beforeImage} alt="Before" className="w-full h-full object-cover" loading="lazy" />
        </div>
        {/* Divider */}
        <div className="absolute top-0 bottom-0 w-1 bg-accent z-10" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-gold">
            <GripVertical className="w-5 h-5 text-accent-foreground" />
          </div>
        </div>
        {/* Labels */}
        <span className="absolute top-3 left-3 bg-foreground/70 text-background text-xs font-semibold px-2 py-1 rounded z-20">
          {lang === "en" ? "Before" : "قبل"}
        </span>
        <span className="absolute top-3 right-3 bg-accent/90 text-accent-foreground text-xs font-semibold px-2 py-1 rounded z-20">
          {lang === "en" ? "After" : "بعد"}
        </span>
      </div>
    </div>
  );
};

const BeforeAfterSection = () => {
  const { dir, lang } = useLanguage();

  const sliders = [
    {
      before: marbleBefore,
      after: marbleAfter,
      label: lang === "en" ? "Marble Polishing" : "تلميع الرخام",
    },
    {
      before: tileBefore,
      after: tileAfter,
      label: lang === "en" ? "Tile Polishing" : "تلميع البلاط",
    },
    {
      before: graniteBefore,
      after: graniteAfter,
      label: lang === "en" ? "Machine Work" : "العمل بالمعدات",
    },
  ];

  return (
    <section dir={dir} className="section-padding bg-muted">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-heading">
            {lang === "en" ? "See The Difference" : "شاهد الفرق"}
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg">
            {lang === "en" ? "Drag the slider to compare before and after results" : "اسحب المؤشر لمقارنة النتائج قبل وبعد"}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sliders.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <CompareSlider beforeImage={s.before} afterImage={s.after} label={s.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
