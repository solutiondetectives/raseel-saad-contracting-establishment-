import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { useRef, useCallback } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  index: number;
}

const ServiceCard = ({ title, description, image, slug, index }: ServiceCardProps) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-premium hover:shadow-gold transition-all duration-300 border border-border hover:border-accent/40"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, box-shadow 0.5s" }}
      >
        {/* Shimmer line on hover */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
        <div className="overflow-hidden h-52 md:h-60">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={600}
            height={400}
          />
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
          <Link
            to={`/services/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group-hover:gap-2"
          >
            {t.services.learnMore}
            <ArrowRight className="w-4 h-4 transition-all rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
