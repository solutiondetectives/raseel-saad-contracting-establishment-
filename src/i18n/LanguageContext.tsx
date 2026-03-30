import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type Language, type TranslationKeys } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationKeys;
  dir: "ltr" | "rtl";
  toArabicNumerals: (n: string | number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const toArabicNumerals = (n: string | number) => {
  return n.toString().replace(/\d/g, (d) => arabicNumerals[parseInt(d)]);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" ? "en" : "ar") as Language;
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir, toArabicNumerals }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
