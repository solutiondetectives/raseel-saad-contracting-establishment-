import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = {
  en: [
    { q: "How long does marble polishing take?", a: "Most marble polishing jobs are completed within 1-2 days depending on the area size and condition of the surface." },
    { q: "Do you serve residential and commercial properties?", a: "Yes, we provide professional polishing and restoration services for both homes, villas, offices, and commercial spaces." },
    { q: "What areas in Saudi Arabia do you cover?", a: "We currently serve Riyadh, Jeddah, and Dammam with plans to expand to more cities soon." },
    { q: "How often should I polish my tiles or marble?", a: "We recommend professional polishing every 1-2 years for high-traffic areas and every 2-3 years for low-traffic spaces." },
    { q: "Is the polishing process safe for children and pets?", a: "Absolutely. We use eco-friendly, non-toxic products that are completely safe for your family and pets." },
    { q: "Do you offer any service warranty?", a: "Yes, all our services come with a satisfaction guarantee. If you're not happy, we'll return and fix it at no extra cost." },
  ],
  ar: [
    { q: "كم يستغرق تلميع الرخام؟", a: "تكتمل معظم أعمال تلميع الرخام خلال 1-2 يوم حسب حجم المنطقة وحالة السطح." },
    { q: "هل تخدمون العقارات السكنية والتجارية؟", a: "نعم، نقدم خدمات التلميع والترميم الاحترافية للمنازل والفلل والمكاتب والمساحات التجارية." },
    { q: "ما المناطق التي تغطونها في السعودية؟", a: "نخدم حالياً الرياض وجدة والدمام مع خطط للتوسع إلى مدن أخرى قريباً." },
    { q: "كم مرة يجب تلميع البلاط أو الرخام؟", a: "نوصي بالتلميع الاحترافي كل 1-2 سنة للمناطق ذات الحركة العالية وكل 2-3 سنوات للمناطق ذات الحركة المنخفضة." },
    { q: "هل عملية التلميع آمنة للأطفال والحيوانات الأليفة؟", a: "بالتأكيد. نستخدم منتجات صديقة للبيئة وغير سامة آمنة تماماً لعائلتكم وحيواناتكم الأليفة." },
    { q: "هل تقدمون ضمان على الخدمة؟", a: "نعم، جميع خدماتنا مع ضمان الرضا. إذا لم تكونوا سعداء، سنعود ونصلحها بدون تكلفة إضافية." },
  ],
};

const FAQSection = () => {
  const { dir, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = faqData[lang];

  return (
    <section dir={dir} className="section-padding bg-background">
      <div className="container-narrow max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-heading">
            {lang === "en" ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`rounded-xl border transition-colors ${openIndex === i ? "border-accent bg-card shadow-gold" : "border-border bg-card"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-start"
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-border/50 pt-4">
                      <div className="border-s-4 border-accent ps-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.en.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </section>
  );
};

export default FAQSection;
