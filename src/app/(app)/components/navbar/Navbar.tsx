"use client"

import { DesktopNavigation } from "./DesktopNavigation"
import { LanguageToggle } from "./LanguageToggle"
import { MobileNavigation } from "./MobileNavigation"
import { NAVBAR_STYLES } from "./navbar.constants"
import { NavbarLogo } from "./NavbarLogo"

import { useNavbarLogic } from "./useNavbarLogic"

export default function Navbar() {
  const {
    lang,
    navigationItems,
    handleLangToggle,
    handleNavigate,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useNavbarLogic()
  
  return (
    <header className={NAVBAR_STYLES.header}>
      <div className={NAVBAR_STYLES.container}>
        <div className={NAVBAR_STYLES.innerContainer}>
          <NavbarLogo lang={lang} />
          
          <div className="flex flex-1 items-center justify-end">
            <DesktopNavigation 
              items={navigationItems}
              onNavigate={handleNavigate}
            />
            
            <div className={NAVBAR_STYLES.actions.container}>
              <LanguageToggle 
                lang={lang}
                onToggle={handleLangToggle}
              />

              <MobileNavigation 
                items={navigationItems}
                lang={lang}
                isOpen={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
