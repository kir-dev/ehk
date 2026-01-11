
"use client";

import { useLanguage } from "@/components/common/LanguageProvider";
import { useCallback } from "react";

export function useTranslate() {
  const { lang, dictionary } = useLanguage();

  const t = useCallback((keyOrHu: string, en?: string) => {
    if (typeof keyOrHu !== 'string') return '';

    // 1. Try dictionary lookup regardless of arguments
    const keys = keyOrHu.split('.');
    let result: unknown = dictionary;
    let found = true;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        found = false;
        break;
      }
    }

    if (found && typeof result === 'string') {
        return result;
    }

    // 2. Legacy support: if lookup failed and 'en' is provided, behave like old t(hu, en)
    if (en !== undefined) {
      return lang === "EN" ? en : keyOrHu;
    }
    
    // 3. Fallback: Lookup failed, no legacy params -> return key
    return keyOrHu;
  }, [dictionary, lang]);

  return { t, lang };
}
