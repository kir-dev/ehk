export const NAVBAR_STYLES = {
  header: 'w-full bg-[#862633] border-b border-[#e9e2d6]/20 relative z-[100] overflow-x-clip',
  container: 'px-4 w-full',
  innerContainer: 'flex items-center h-20 w-full',
  
  logo: {
    wrapper: 'flex items-center h-full mr-4 shrink-0',
    imageContainer: 'relative h-full flex items-center shrink-0',
    image: 'object-contain h-16 w-auto max-h-20 shrink-0'
  },
  
  desktop: {
    nav: 'hidden xlg:flex items-center',
    menuTrigger: 'group text-white font-semibold text-[13px] tracking-wide px-4 py-2.5 rounded-2xl bg-transparent border border-transparent hover:bg-white/20 hover:border-white/10 data-[state=open]:bg-white/30 data-[state=open]:border-[#e9e2d6] transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
    menuViewport: '!w-[calc(100vw-4rem)] max-w-[1336px] mx-auto bg-[#fffefc] border border-[#e9e2d6] border-t-0 rounded-b-2xl shadow-lg z-[100] !mt-0',
    menuContent: 'w-full p-8 focus:outline-none',
    menuContentInner: 'w-full',
    menuLink: 'text-white font-semibold text-[13px] tracking-wide px-4 py-2.5 rounded-2xl bg-transparent border border-transparent hover:bg-white/20 hover:border-white/10 transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
    subMenuItem: 'group flex flex-col p-4 rounded-xl hover:bg-[#f9f4f0] transition-all duration-200'
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
    langToggle: 'bg-transparent text-white hover:bg-white/10 px-2.5 py-[5px] border-[0.5px] border-[#f9f4f0] rounded-[10px] font-semibold text-sm transition-all duration-200',
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
