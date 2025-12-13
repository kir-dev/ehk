import Image from "next/image"
import Link from "next/link"
import { NAVBAR_CONFIG, NAVBAR_STYLES } from "./navbar.constants"

interface NavbarLogoProps {
  lang: string
}

export function NavbarLogo({ lang }: NavbarLogoProps) {
  return (
    <Link 
      href={`/${lang.toLowerCase()}`} 
      className={NAVBAR_STYLES.logo.wrapper}
    >
      <div className={NAVBAR_STYLES.logo.imageContainer}>
        <Image
          src={NAVBAR_CONFIG.logo.src}
          alt={NAVBAR_CONFIG.logo.alt}
          width={NAVBAR_CONFIG.logo.width}
          height={NAVBAR_CONFIG.logo.height}
          className={NAVBAR_STYLES.logo.image}
          priority
        />
      </div>
    </Link>
  )
}
