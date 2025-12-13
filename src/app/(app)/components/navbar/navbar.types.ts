export interface NavigationItem {
  title: string
  href: string
  targetBlank: boolean
  items: NavigationSubItem[]
}

export interface NavigationSubItem {
  label: string
  href: string
  targetBlank: boolean
}

export type LocaleUppercase = 'EN' | 'HU'
export type LocaleLowercase = 'en' | 'hu'

export interface NavbarLogicReturn {
  lang: LocaleUppercase
  navigationItems: NavigationItem[]
  handleLangToggle: () => void
  handleNavigate: (href: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}
