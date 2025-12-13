export const NAVBAR_STYLES = {
  header: 'w-full bg-ehk-navbar border-b border-ehk-navbar/30',
  container: 'px-4 w-full',
  innerContainer: 'flex items-center h-20 w-full',
  
  logo: {
    wrapper: 'flex items-center h-full mr-4 shrink-0',
    imageContainer: 'relative h-full flex items-center shrink-0',
    image: 'object-contain h-16 w-auto max-h-20 shrink-0'
  },
  
  desktop: {
    nav: 'hidden xlg:flex',
    menuTrigger: 'text-white relative bg-ehk-navbar hover:text-gray-200 font-semibold text-base px-3 py-2.5 transition-all duration-200 hover:scale-105',
    menuContent: 'z-50 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg',
    menuContentInner: 'w-80 p-4',
    menuLink: 'text-white relative hover:text-gray-200 font-semibold text-base px-3 py-2.5 block transition-all duration-200 hover:scale-105',
    subMenuItem: 'block px-4 py-2.5 text-sm text-gray-800 hover:text-ehk-navbar hover:bg-gray-100 rounded-lg transition-all duration-200 hover:pl-5 font-medium'
  },
  
  mobile: {
    trigger: 'xlg:hidden text-white hover:text-gray-200 transition-colors duration-200',
    sheet: 'w-80 px-0 py-0 sm:px-2 sm:py-2',
    container: 'flex h-full flex-col min-h-0',
    header: 'px-4 py-4 border-b',
    nav: 'space-y-4 p-4 pt-2 pb-6',
    menuItem: 'font-semibold text-gray-900 text-base border-b-2 border-gray-200 pb-2 block hover:text-ehk-navbar hover:border-ehk-navbar transition-all duration-200',
    subItemsContainer: 'space-y-1 pl-4',
    subMenuItem: 'block text-sm text-gray-600 hover:text-ehk-navbar py-1.5 transition-all duration-200 hover:pl-2 font-medium'
  },
  
  actions: {
    container: 'flex items-center space-x-2 ml-2',
    langToggle: 'bg-ehk-button text-white hover:bg-ehk-button/90 px-2 py-1 border border-ehk-button rounded-md font-semibold transition-all duration-200',
    searchButton: 'text-white hover:text-gray-200 transition-colors duration-200'
  }
} as const

export const NAVBAR_CONFIG = {
  logo: {
    src: '/EHK_felirat_feher.svg',
    alt: 'EHK Logo',
    width: 240,
    height: 240
  }
} as const

export const getNavbarI18n = (lang: 'EN' | 'HU') => ({
  langToggle: lang === 'EN' ? 'Language' : 'Nyelvváltás',
  search: lang === 'EN' ? 'Search' : 'Keresés',
  openMenu: lang === 'EN' ? 'Open menu' : 'Menü megnyitása',
  mobileMenuTitle: lang === 'EN' ? 'Menu' : 'Menü'
})
