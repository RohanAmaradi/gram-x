import { createContext, useContext, useState, useCallback } from "react";
import translations, { type Language, type TranslationKeys } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("gramx-lang");
      if (stored && stored in translations) return stored as Language;
    } catch {}
    return "en";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem("gramx-lang", lang); } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
