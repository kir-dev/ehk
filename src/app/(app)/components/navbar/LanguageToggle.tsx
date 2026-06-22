"use client"

import { NAVBAR_STYLES, getNavbarI18n } from "./navbar.constants"

interface LanguageToggleProps {
  lang: 'EN' | 'HU'
  onToggle: () => void
}

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  const i18n = getNavbarI18n(lang)
  
  return (
    <button
      type="button"
      onClick={onToggle}
      className={NAVBAR_STYLES.actions.langToggle}
      aria-label={i18n.langToggle}
      aria-pressed={lang === 'EN'}
    >
      {lang}
    </button>
  )
}
