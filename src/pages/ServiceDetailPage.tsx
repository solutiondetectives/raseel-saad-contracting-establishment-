import { useParams } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import beforeAfter1 from "@/assets/before-after-1.jpg";
import beforeAfter2 from "@/assets/before-after-2.jpg";
import { SERVICE_IMAGES } from "@/data/services";

const serviceData: Record<string, { en: { title: string; desc: string; steps: string[]; benefits: string[] }; ar: { title: string; desc: string; steps: string[]; benefits: string[] } }> = {
  "tile-polishing": {
    en: {
      title: "Professional Tile Polishing Services",
      desc: "Our expert tile polishing services restore your ceramic, porcelain, and natural stone tiles to their original brilliance. Using advanced diamond polishing techniques, we remove scratches, stains, and dullness to reveal a mirror-like finish that transforms your space.",
      steps: ["Surface inspection & assessment", "Deep cleaning & stain removal", "Diamond grinding & leveling", "Progressive polishing stages", "Sealing & protection coating", "Final quality inspection"],
      benefits: ["Restores original shine and color", "Eliminates deep scratches and stains", "Extends tile lifespan significantly", "Non-toxic, eco-friendly process", "Same-day service available", "Satisfaction guaranteed"],
    },
    ar: {
      title: "خدمات تلميع البلاط الاحترافية",
      desc: "تستعيد خدمات تلميع البلاط المتخصصة لدينا بريق بلاط السيراميك والبورسلين والحجر الطبيعي. باستخدام تقنيات التلميع الماسي المتقدمة، نزيل الخدوش والبقع والبهتان للكشف عن لمسة نهائية شبيهة بالمرآة.",
      steps: ["فحص وتقييم السطح", "تنظيف عميق وإزالة البقع", "طحن وتسوية ماسي", "مراحل تلميع تدريجية", "طبقة ختم وحماية", "فحص الجودة النهائي"],
      benefits: ["يستعيد اللمعان واللون الأصلي", "يزيل الخدوش والبقع العميقة", "يطيل عمر البلاط بشكل ملحوظ", "عملية غير سامة وصديقة للبيئة", "خدمة في نفس اليوم متاحة", "ضمان الرضا"],
    },
  },
  "marble-polishing": {
    en: {
      title: "Expert Marble Polishing & Restoration",
      desc: "Marble is a symbol of luxury, and our polishing services ensure your marble surfaces maintain their premium appearance. We specialize in restoring dull, etched, and damaged marble to its natural, lustrous beauty.",
      steps: ["Marble condition assessment", "Crack and chip repair", "Honing and grinding", "Multi-stage diamond polishing", "Crystallization treatment", "Protective sealant application"],
      benefits: ["Brings out natural marble veining", "Repairs etch marks and water stains", "Creates a glass-like mirror finish", "Protects against future damage", "Increases property value", "Expert handling of all marble types"],
    },
    ar: {
      title: "تلميع وترميم الرخام المتخصص",
      desc: "الرخام رمز للفخامة، وخدمات التلميع لدينا تضمن الحفاظ على المظهر الفاخر لأسطح الرخام. نتخصص في استعادة جمال الرخام الباهت والمتضرر إلى بريقه الطبيعي.",
      steps: ["تقييم حالة الرخام", "إصلاح الشقوق والرقائق", "صقل وطحن", "تلميع ماسي متعدد المراحل", "معالجة بالتبلور", "تطبيق مادة مانعة للتسرب"],
      benefits: ["يبرز العروق الطبيعية للرخام", "يصلح علامات التآكل وبقع الماء", "يخلق لمسة نهائية شبيهة بالزجاج", "يحمي من الأضرار المستقبلية", "يزيد من قيمة العقار", "التعامل المتخصص مع جميع أنواع الرخام"],
    },
  },
  "granite-polishing": {
    en: {
      title: "Premium Granite Polishing Services",
      desc: "Granite countertops and floors deserve expert care. Our granite polishing service restores the depth, clarity, and rich luster of your granite surfaces using professional-grade equipment and techniques.",
      steps: ["Surface evaluation", "Deep cleaning treatment", "Crack and seam repair", "Progressive diamond polishing", "Color enhancement treatment", "Sealant and protection"],
      benefits: ["Restores depth and clarity", "Removes surface scratches", "Enhanced stain resistance", "Long-lasting protection", "Suitable for all granite types", "Commercial and residential service"],
    },
    ar: {
      title: "خدمات تلميع الجرانيت المتميزة",
      desc: "أسطح وأرضيات الجرانيت تستحق العناية المتخصصة. تستعيد خدمة تلميع الجرانيت لدينا العمق والوضوح واللمعان الغني لأسطح الجرانيت باستخدام معدات وتقنيات احترافية.",
      steps: ["تقييم السطح", "معالجة التنظيف العميق", "إصلاح الشقوق والدرزات", "تلميع ماسي تدريجي", "معالجة تعزيز اللون", "مادة مانعة وحماية"],
      benefits: ["يستعيد العمق والوضوح", "يزيل خدوش السطح", "مقاومة محسنة للبقع", "حماية طويلة الأمد", "مناسب لجميع أنواع الجرانيت", "خدمة تجارية وسكنية"],
    },
  },
  "floor-cleaning": {
    en: {
      title: "Professional Floor Cleaning & Restoration",
      desc: "Comprehensive floor cleaning and restoration for all surface types. Our deep cleaning process removes years of embedded dirt, grime, and stains, breathing new life into your floors.",
      steps: ["Floor type identification", "Pre-treatment application", "Deep extraction cleaning", "Stain spot treatment", "Restoration polishing", "Protective coating"],
      benefits: ["Works on all floor types", "Removes deep-set stains", "Eco-friendly cleaning agents", "Quick drying time", "Improves indoor air quality", "Regular maintenance plans available"],
    },
    ar: {
      title: "تنظيف وترميم الأرضيات الاحترافي",
      desc: "تنظيف وترميم شامل للأرضيات لجميع أنواع الأسطح. تزيل عملية التنظيف العميق لدينا سنوات من الأوساخ والبقع المترسبة، لتبث حياة جديدة في أرضياتكم.",
      steps: ["تحديد نوع الأرضية", "تطبيق المعالجة المسبقة", "تنظيف الاستخراج العميق", "معالجة بقع البقع", "تلميع الترميم", "طبقة حماية"],
      benefits: ["يعمل على جميع أنواع الأرضيات", "يزيل البقع العميقة", "مواد تنظيف صديقة للبيئة", "وقت تجفيف سريع", "يحسن جودة الهواء الداخلي", "خطط صيانة دورية متاحة"],
    },
  },
  "scratch-removal": {
    en: {
      title: "Advanced Scratch Removal Services",
      desc: "Don't let scratches diminish the beauty of your surfaces. Our advanced scratch removal techniques effectively eliminate surface imperfections on marble, granite, tile, and other natural stones.",
      steps: ["Scratch depth assessment", "Surface preparation", "Progressive grinding", "Fine polishing stages", "Blending and matching", "Protective sealing"],
      benefits: ["Removes light and deep scratches", "Invisible repair results", "Works on multiple surface types", "Preserves original surface color", "Cost-effective vs replacement", "Fast turnaround time"],
    },
    ar: {
      title: "خدمات إزالة الخدوش المتقدمة",
      desc: "لا تدع الخدوش تقلل من جمال أسطحكم. تقنيات إزالة الخدوش المتقدمة لدينا تقضي بفعالية على عيوب السطح في الرخام والجرانيت والبلاط والأحجار الطبيعية الأخرى.",
      steps: ["تقييم عمق الخدش", "تحضير السطح", "طحن تدريجي", "مراحل تلميع دقيقة", "مزج ومطابقة", "ختم واقي"],
      benefits: ["يزيل الخدوش الخفيفة والعميقة", "نتائج إصلاح غير مرئية", "يعمل على أنواع أسطح متعددة", "يحافظ على لون السطح الأصلي", "اقتصادي مقارنة بالاستبدال", "وقت تنفيذ سريع"],
    },
  },
};

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, dir } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const data = slug ? serviceData[slug] : null;

  if (!data) return <div className="min-h-screen flex items-center justify-center text-foreground">Service not found</div>;

  const content = data[lang];
  const heroImage = slug ? SERVICE_IMAGES[slug as keyof typeof SERVICE_IMAGES] : null;

  return (
    <div dir={dir}>
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        {heroImage && <img src={heroImage} alt={content.title} className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-hero-gradient" />
        <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-primary-foreground font-heading text-center px-4">{content.title}</h1>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div ref={ref} className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">{content.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
                  {lang === "en" ? "Our Process" : "عمليتنا"}
                </h2>
                <div className="space-y-4">
                  {content.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-accent">{i + 1}</span>
                      </div>
                      <p className="text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
                  {lang === "en" ? "Benefits" : "الفوائد"}
                </h2>
                <div className="space-y-4">
                  {content.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">
              {lang === "en" ? "Results That Speak" : "نتائج تتحدث"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="rounded-xl overflow-hidden shadow-premium">
                <img src={beforeAfter1} alt="Before and after" className="w-full h-64 object-cover" loading="lazy" width={1024} height={768} />
              </div>
              <div className="rounded-xl overflow-hidden shadow-premium">
                <img src={beforeAfter2} alt="Before and after" className="w-full h-64 object-cover" loading="lazy" width={1024} height={768} />
              </div>
            </div>

            <div className="bg-muted rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
                {lang === "en" ? "Ready to Get Started?" : "هل أنتم مستعدون للبدء؟"}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://wa.me/966501921835" target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {lang === "en" ? "WhatsApp Us" : "واتساب"}
                  </Button>
                </a>
                <a href="tel:+966501921835">
                  <Button size="lg" className="gap-2">
                    <Phone className="w-5 h-5" />
                    {lang === "en" ? "Call Now" : "اتصل الآن"}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
