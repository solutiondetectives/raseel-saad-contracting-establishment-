import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Clock, Trophy, ThumbsUp, ShieldCheck } from "lucide-react";

const TrustBadges = () => {
  const { t, dir, lang } = useLanguage();
  const badges = [
    { icon: <Clock className="w-7 h-7 text-accent" />, label: lang === "en" ? "10+ Years Experience" : "خبرة +10 سنوات" },
    { icon: <Trophy className="w-7 h-7 text-accent" />, label: lang === "en" ? "500+ Projects Completed" : "أكثر من 500 مشروع مكتمل" },
    { icon: <ThumbsUp className="w-7 h-7 text-accent" />, label: lang === "en" ? "100% Satisfaction Guaranteed" : "ضمان الرضا 100%" },
    { icon: <ShieldCheck className="w-7 h-7 text-accent" />, label: lang === "en" ? "Licensed & Insured" : "مرخص ومؤمن" },
  ];

  return (
    <section dir={dir} className="bg-card py-8 shadow-premium relative z-10">
      <div className="container-narrow px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="flex items-center gap-3 justify-center text-center md:text-start md:justify-start"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <span className="text-sm md:text-base font-semibold text-foreground">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
