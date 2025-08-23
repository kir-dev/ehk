"use client"

import { Search, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";

// Update your navigationItems array to include hrefs
const navigationItems = [
    {
        title: "ADMIN",
        href: "/admin",
        targetBlank: false,
        items: [],
    },
    {
        title: "SZERVEZET",
        href: "/szervezet",
        targetBlank: false,
        items: [
            { label: "Képviselők", href: "kepviselok", targetBlank: false },
            { label: "Emlékeztetők", href: "emlekeztetok", targetBlank: false },
            { label: "Határozatok tára", href: "hatarozatok-tara", targetBlank: false },
            { label: "ESZB honlap", href: "#", targetBlank: false },
            { label: "EDK honlap", href: "https://www.bmeedk.hu/page/1", targetBlank: true },
            { label: "Engedélyek", href: "#", targetBlank: false },
        ],
    },
    {
        title: "OKTATÁS",
        href: "/oktatas",
        targetBlank: false,
        items: [
            { label: "Szabályzatok", href: "#", targetBlank: false },
            { label: "OMHV", href: "#", targetBlank: false },
            { label: "Neptun", href: "https://neptun.bme.hu/hallgatoi/login.aspx", targetBlank: true },
            { label: "Nyelvoktatás", href: "#", targetBlank: false },
            { label: "Kisokosok/Segédletek", href: "#", targetBlank: false },
        ],
    },
    {
        title: "JUTTATÁS",
        href: "/juttatas",
        targetBlank: false,
        items: [
            { label: "Tanulmányi ösztöndíjak", href: "#", targetBlank: false },
            { label: "Szociális alapú ösztöndíjak", href: "#", targetBlank: false },
            { label: "EHK ösztöndíjak", href: "#", targetBlank: false },
            { label: "Szabályzatok", href: "#", targetBlank: false },
            { label: "MŰEPER", href: "https://mueper.bme.hu", targetBlank: true },
            { label: "Esélyegyenlőség", href: "#", targetBlank: false },
        ],
    },
    {
        title: "KOLLÉGIUM",
        href: "/kollegium",
        targetBlank: false,
        items: [
            { label: "Bemutató", href: "#", targetBlank: false },
            { label: "Szabályzatok", href: "#", targetBlank: false },
            { label: "KEFIR", href: "https://kefir.bme.hu/login", targetBlank: true },
        ],
    },
    {
        title: "SPORT",
        href: "/sport",
        targetBlank: false,
        items: [
            { label: "Sportpálya támogatás pályázat", href: "#", targetBlank: false },
            { label: "Sportterem igénylés", href: "#", targetBlank: false },
            { label: "Testnevelési Központ", href: "https://testneveles.bme.hu", targetBlank: true },
            { label: "Sportközpont", href: "https://bmesport.hu", targetBlank: true },
        ],
    },
    {
        title: "KÜLÜGY",
        href: "/kulugy",
        targetBlank: false,
        items: [
            { label: "Erasmus", href: "#", targetBlank: false },
            { label: "EELISA", href: "#", targetBlank: false },
            { label: "HKT", href: "#", targetBlank: false },
        ],
    },
    {
        title: "INTERNATIONAL",
        href: "/international",
        targetBlank: false,
        items: [
            { label: "", href: "", targetBlank: false },
        ],
    },
    {
        title: "KÖZÉLET",
        href: "/kozelet",
        targetBlank: false,
        items: [
            { label: "Versenycsapatok", href: "#", targetBlank: false },
            { label: "Szakkollégiumok", href: "#", targetBlank: false },
            { label: "Öntevékeny körök", href: "#", targetBlank: false },
            { label: "Rendezvények", href: "#", targetBlank: false },
            { label: "Klubbok", href: "#", targetBlank: false },
        ],
    },
    {
        title: "GÓLYÁKNAK",
        href: "/golyaknak",
        targetBlank: false,
        items: [],
    },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { lang, toggleLang } = useLanguage()

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="px-4 w-full"> {/* Removed 'container mx-auto' to allow full width */}
                <div className="flex items-center h-20 w-full"> {/* Added w-full */}
                    <Link href="/" className="flex items-center h-full mr-4"> {/* Added mr-4 for spacing after logo */}
                        <div className="relative h-full flex items-center">
                            <Image
                                src={"/EHK_svg.svg"}
                                alt={"EHK Logo"}
                                width={240}
                                height={240}
                                className="object-contain h-16 w-auto max-h-20"
                                priority
                            />
                        </div>
                    </Link>
                    <div className="flex flex-1 items-center justify-end"> {/* Menus and search aligned to the right */}
                        {/* Desktop Navigation */}
                        <NavigationMenu className="hidden lg:flex" viewport={false}>
                            <NavigationMenuList className="space-x-1">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        {item.items.length > 0 ? (
                                            <>
                                                <NavigationMenuTrigger className="text-gray-700 relative hover:text-red-700 font-medium text-sm px-3 py-2">
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
                                                                        className="block px-3 py-2 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-colors "
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
                                                    className="text-gray-700 relative hover:text-red-700 font-medium text-sm px-3 py-2 block"
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
                                className="text-gray-600 hover:text-red-700 px-2 py-1 border border-gray-200 rounded-md"
                                aria-label="Nyelvváltás"
                                aria-pressed={lang === 'EN'}
                            >
                                {lang}
                            </Button>

                            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-700">
                                <Search className="h-5 w-5" />
                                <span className="sr-only">Keresés</span>
                            </Button>

                            {/* Mobile Menu */}
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden text-gray-600">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Menü megnyitása</span>
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
                                                <div className="font-medium text-gray-900 text-sm border-b border-gray-200 pb-2">
                                                    {item.title}
                                                </div>
                                                <div className="space-y-1 pl-4">
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.label}
                                                            href={subItem.href}
                                                            target={subItem.targetBlank ? "_blank" : undefined}
                                                            rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
                                                            className="block text-sm text-gray-600 hover:text-red-700 py-1"
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
