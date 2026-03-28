import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Clock, Trophy, Users, Star } from "lucide-react";

const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const StatsCounter = () => {
  const { dir, lang } = useLanguage();

  const stats = [
    { icon: <Clock className="w-8 h-8" />, value: 10, suffix: "+", label: lang === "en" ? "Years Experience" : "سنوات خبرة" },
    { icon: <Trophy className="w-8 h-8" />, value: 500, suffix: "+", label: lang === "en" ? "Projects Completed" : "مشروع مكتمل" },
    { icon: <Users className="w-8 h-8" />, value: 200, suffix: "+", label: lang === "en" ? "Happy Clients" : "عميل سعيد" },
    { icon: <Star className="w-8 h-8" />, value: 98, suffix: "%", label: lang === "en" ? "Satisfaction Rate" : "نسبة الرضا" },
  ];

  return (
    <section dir={dir} className="py-16 md:py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="container-narrow px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-accent mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-accent font-heading mb-2">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-primary-foreground/80 text-sm md:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
