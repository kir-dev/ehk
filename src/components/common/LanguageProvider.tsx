"use client";

import { usePathname, useRouter } from "next/navigation";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type Lang = "HU" | "EN";

type Dictionary = Record<string, unknown>; // Basic type, can be refined

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  dictionary: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

type Props = {
  defaultLang: Lang;
  dictionary: Dictionary;
  children: React.ReactNode;
};

export function LanguageProvider({ defaultLang, dictionary, children }: Props) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const pathname = usePathname();
  const router = useRouter();

  // initialize from localStorage if present - simplified to trust server/url primarily
  useEffect(() => {
    // Sync state with prop if it changes (navigation)
    setLangState(defaultLang);
    document.documentElement.lang = defaultLang.toLowerCase();
  }, [defaultLang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", next);
        document.cookie = `lang=${next.toLowerCase()}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
    } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    const nextLang = lang === "HU" ? "EN" : "HU";
    const nextLangLower = nextLang.toLowerCase();
    
    // Logic to replace locale in path
    const segments = pathname.split('/');
    // segments[1] should be the locale 'hu' or 'en'
    if (segments.length > 1 && (segments[1] === 'hu' || segments[1] === 'en')) {
        segments[1] = nextLangLower;
        const newPath = segments.join('/');
        
        // Optimize: set cookie before navigation so middleware is happy
        setLang(nextLang); 
        router.push(newPath);
    } else {
        // Fallback if path doesn't have locale
        setLang(nextLang);
        router.refresh();
    }
  }, [lang, pathname, router, setLang]);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, dictionary }),
    [lang, setLang, toggleLang, dictionary]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
