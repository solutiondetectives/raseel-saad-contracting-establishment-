import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Award, Star, Shield, Target, Eye } from "lucide-react";
import serviceWork from "@/assets/service-work.jpg";

const AboutPage = () => {
  const { t, dir, lang } = useLanguage();
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();

  const whyUs = [
    { icon: <Clock className="w-6 h-6 text-accent" />, title: t.about.experience, desc: t.about.experienceDesc },
    { icon: <Award className="w-6 h-6 text-accent" />, title: t.about.quality, desc: t.about.qualityDesc },
    { icon: <Star className="w-6 h-6 text-accent" />, title: t.about.satisfaction, desc: t.about.satisfactionDesc },
    { icon: <Shield className="w-6 h-6 text-accent" />, title: t.about.certified, desc: t.about.certifiedDesc },
  ];

  return (
    <div dir={dir}>
      <SEO 
        title={t.seo.about.title} 
        description={t.seo.about.desc}
        keywords={t.seo.about.keywords}
      />
      {/* Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-heading mb-4">
            {t.seo.about.h1}
          </h1>
          <h2 className="text-xl md:text-2xl text-accent font-semibold">
            {t.seo.about.h2}
          </h2>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div ref={storyRef} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${storyVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 font-heading">
                {lang === "en" ? "Our Story" : "قصتنا"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "en"
                  ? "With over a decade of dedicated service in surface restoration, ShinePolish has grown from a small local operation into a trusted name in premium tile, marble, and granite care. Our journey began with a simple commitment: to deliver results that exceed expectations."
                  : "مع أكثر من عقد من الخدمة المتفانية في ترميم الأسطح، نمت شاين بوليش من عملية محلية صغيرة إلى اسم موثوق في العناية الفاخرة بالبلاط والرخام والجرانيت. بدأت رحلتنا بالتزام بسيط: تقديم نتائج تفوق التوقعات."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "Today, we serve residential and commercial clients across the region, bringing the latest techniques and equipment to every project. Our certified team combines technical expertise with genuine care for your property."
                  : "اليوم، نخدم العملاء السكنيين والتجاريين في جميع أنحاء المنطقة، ونجلب أحدث التقنيات والمعدات لكل مشروع. يجمع فريقنا المعتمد بين الخبرة التقنية والاهتمام الحقيقي بممتلكاتكم."}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-premium">
              <img src={serviceWork} alt="Our team at work" className="w-full h-80 object-cover" loading="lazy" width={1024} height={768} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <div ref={missionRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${missionVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="bg-card rounded-xl p-8 shadow-premium">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {lang === "en" ? "Our Mission" : "مهمتنا"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "To provide the highest quality surface restoration and polishing services, using advanced techniques and eco-friendly products that protect both your investment and the environment."
                  : "تقديم أعلى جودة في خدمات ترميم وتلميع الأسطح، باستخدام تقنيات متقدمة ومنتجات صديقة للبيئة تحمي استثماركم والبيئة معاً."}
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-premium">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {lang === "en" ? "Our Vision" : "رؤيتنا"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "To be the region's most trusted and innovative surface care company, setting new standards for quality, reliability, and customer satisfaction in every project we undertake."
                  : "أن نكون شركة العناية بالأسطح الأكثر ثقة وابتكاراً في المنطقة، ونضع معايير جديدة للجودة والموثوقية ورضا العملاء في كل مشروع نقوم به."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center font-heading">{t.about.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="bg-card rounded-xl p-6 text-center shadow-premium hover:shadow-gold transition-shadow">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
