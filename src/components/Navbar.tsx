"use client"

import { Search, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

// Build navigation items based on current language
function getNavigationItems(lang: string) {
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
    return [
        {
            title: t("SZERVEZET", "ORGANIZATION"),
            href: "/szervezet/hirek",
            targetBlank: false,
            items: [
                { label: t("ADMIN", "ADMIN"), href: "/admin", targetBlank: false },
                { label: t("Képviselők", "Representatives"), href: "/kepviselok", targetBlank: false },
                { label: t("Emlékeztetők", "Reminders"), href: "/emlekeztetok", targetBlank: false },
                { label: t("Határozatok tára", "Decisions archive"), href: "/hatarozatok-tara", targetBlank: false },
                { label: t("ESZB honlap", "ESZB website"), href: "#", targetBlank: false },
                { label: t("EDK honlap", "EDK website"), href: "https://www.bmeedk.hu/page/1", targetBlank: true },
                { label: t("Engedélyek", "Permissions"), href: "/engedelyek", targetBlank: false },
            ],
        },
        {
            title: t("OKTATÁS", "EDUCATION"),
            href: "/oktatas/hirek",
            targetBlank: false,
            items: [
                { label: t("Szabályzatok", "Regulations"), href: "/szabalyzatok", targetBlank: false },
                { label: "OMHV", href: "https://ohv.bme.hu/hu", targetBlank: true },
                { label: "Neptun", href: "https://neptun.bme.hu/hallgatoi/login.aspx", targetBlank: true },
                { label: t("Nyelvoktatás", "Language courses"), href: "#", targetBlank: false },
                { label: t("Kisokosok/Segédletek", "Guides"), href: "#", targetBlank: false },
            ],
        },
        {
            title: t("JUTTATÁS", "GRANTS"),
            href: "/juttatas/hirek",
            targetBlank: false,
            items: [
                { label: t("Tanulmányi ösztöndíjak", "Academic scholarships"), href: "#", targetBlank: false },
                { label: t("Szociális alapú ösztöndíjak", "Need-based scholarships"), href: "#", targetBlank: false },
                { label: t("EHK ösztöndíjak", "EHK scholarships"), href: "#", targetBlank: false },
                { label: t("Szabályzatok", "Regulations"), href: "#", targetBlank: false },
                { label: "MŰEPER", href: "https://mueper.bme.hu", targetBlank: true },
                { label: t("Esélyegyenlőség", "Equal opportunities"), href: "#", targetBlank: false },
            ],
        },
        {
            title: t("KOLLÉGIUM", "DORMITORY"),
            href: "/kollegium/hirek",
            targetBlank: false,
            items: [
                { label: t("Bemutató", "Overview"), href: "#", targetBlank: false },
                { label: t("Szabályzatok", "Regulations"), href: "#", targetBlank: false },
                { label: "KEFIR", href: "https://kefir.bme.hu/login", targetBlank: true },
            ],
        },
        {
            title: t("SPORT", "SPORTS"),
            href: "/sport/hirek",
            targetBlank: false,
            items: [
                { label: t("Sportpálya támogatás pályázat", "Sports field subsidy application"), href: "#", targetBlank: false },
                { label: t("Sportterem igénylés", "Gym booking request"), href: "#", targetBlank: false },
                { label: t("Testnevelési Központ", "Department of Physical Education"), href: "https://testneveles.bme.hu", targetBlank: true },
                { label: t("Sportközpont", "Sports Center"), href: "https://bmesport.hu", targetBlank: true },
            ],
        },
        {
            title: t("KÜLÜGY", "INTERNATIONAL AFFAIRS"),
            href: "/kulugy/hirek",
            targetBlank: false,
            items: [
                { label: "Erasmus", href: "#", targetBlank: false },
                { label: "EELISA", href: "#", targetBlank: false },
                { label: "HKT", href: "#", targetBlank: false },
            ],
        },
        {
            title: "INTERNATIONAL",
            href: "/international/hirek",
            targetBlank: false,
            items: [
                { label: "", href: "", targetBlank: false },
            ],
        },
        {
            title: t("KÖZÉLET", "COMMUNITY LIFE"),
            href: "/kozelet/hirek",
            targetBlank: false,
            items: [
                { label: t("Versenycsapatok", "Competition teams"), href: "#", targetBlank: false },
                { label: t("Szakkollégiumok", "Specialized colleges"), href: "#", targetBlank: false },
                { label: t("Öntevékeny körök", "Student clubs"), href: "#", targetBlank: false },
                { label: t("Rendezvények", "Events"), href: "#", targetBlank: false },
                { label: t("Klubbok", "Clubs"), href: "#", targetBlank: false },
            ],
        },
        {
            title: t("GÓLYÁKNAK", "FOR FRESHMEN"),
            href: "/golyaknak/hirek",
            targetBlank: false,
            items: [],
        },
    ]
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { lang, toggleLang } = useLanguage()
    const navigationItems = getNavigationItems(lang)
    const router = useRouter()

    // Localized UI labels
    const ui = {
        langToggle: lang === 'EN' ? 'Language' : 'Nyelvváltás',
        search: lang === 'EN' ? 'Search' : 'Keresés',
        openMenu: lang === 'EN' ? 'Open menu' : 'Menü megnyitása',
    } as const

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="px-4 w-full">
                <div className="flex items-center h-20 w-full">
                    <Link href="/" className="flex items-center h-full mr-4 shrink-0">
                        <div className="relative h-full flex items-center shrink-0">
                            <Image
                                src={"/EHK_svg.svg"}
                                alt={"EHK Logo"}
                                width={240}
                                height={240}
                                className="object-contain h-16 w-auto max-h-20 shrink-0"
                                priority
                            />
                        </div>
                    </Link>
                    <div className="flex flex-1 items-center justify-end">
                        {/* Desktop Navigation */}
                        <NavigationMenu className="hidden lg:flex" viewport={false}>
                            <NavigationMenuList className="">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        {item.items.length > 0 ? (
                                            <>
                                                <NavigationMenuTrigger
                                                    className="text-gray-700 relative hover:text-ehk-dark-red font-medium text-sm px-3 py-2"
                                                    onClick={() => {
                                                        if (item.href) router.push(item.href)
                                                    }}
                                                >
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="z-50">
                                                    <div className="w-80 p-4">
                                                        <div className="grid gap-2">
                                                            {item.items.map((subItem) => (
                                                                <NavigationMenuLink className="" key={subItem.label} asChild>
                                                                    <Link
                                                                        href={subItem.href}
                                                                        target={subItem.targetBlank ? "_blank" : undefined}
                                                                        rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
                                                                        className="block px-3 py-2 text-sm text-gray-700 hover:text-ehk-dark-red hover:bg-gray-50 rounded-md transition-colors "
                                                                    >
                                                                        {subItem.label}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    target={item.targetBlank ? "_blank" : undefined}
                                                    rel={item.targetBlank ? "noopener noreferrer" : undefined}
                                                    className="text-gray-700 relative hover:text-ehk-dark-red font-medium text-sm px-3 py-2 block"
                                                >
                                                    {item.title}
                                                </Link>
                                            </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        {/* Search and Mobile Menu */}
                        <div className="flex items-center space-x-2 ml-2">
                            {/* Language toggle - placed to the left of Search */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleLang}
                                className="text-gray-600 hover:text-ehk-dark-red px-2 py-1 border border-gray-200 rounded-md"
                                aria-label={ui.langToggle}
                                aria-pressed={lang === 'EN'}
                            >
                                {lang}
                            </Button>

                            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-ehk-dark-red">
                                <Search className="h-5 w-5" />
                                <span className="sr-only">{ui.search}</span>
                            </Button>

                            {/* Mobile Menu */}
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden text-gray-600">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">{ui.openMenu}</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-80">
                                    <div className="flex items-center justify-between mb-6">
                                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-600">
                                        </Button>
                                    </div>

                                    <nav className="space-y-4">
                                        {navigationItems.map((item) => (
                                            <div key={item.title} className="space-y-2">
                                                <Link
                                                    href={item.href}
                                                    className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-2 block hover:text-ehk-dark-red"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.title}
                                                </Link>
                                                <div className="space-y-1 pl-4">
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.label}
                                                            href={subItem.href}
                                                            target={subItem.targetBlank ? "_blank" : undefined}
                                                            rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
                                                            className="block text-sm text-gray-600 hover:text-ehk-dark-red py-1"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
