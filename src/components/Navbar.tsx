"use client"

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { getNavigationItems } from "@/components/navbar/navigationItems";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { lang, toggleLang } = useLanguage()
    const navigationItems = getNavigationItems(lang)
    const router = useRouter()
    const mobileMenuTitle = lang === 'EN' ? 'Menu' : 'Menü'

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
                                                    className="text-gray-700 relative hover:text-ehk-dark-red font-semibold text-base px-3 py-2.5 transition-all duration-200 hover:scale-105"
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
                                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-ehk-dark-red hover:bg-gray-50 rounded-lg transition-all duration-200 hover:pl-5 font-medium"
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
                                                    className="text-gray-700 relative hover:text-ehk-dark-red font-semibold text-base px-3 py-2.5 block transition-all duration-200 hover:scale-105"
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
                                {/* Add padding to SheetContent and ensure scrollability */}
                                <SheetContent side="right" className="w-80 px-0 py-0 sm:px-2 sm:py-2">
                                    <div className="flex h-full flex-col min-h-0">
                                        <SheetHeader className="px-4 py-4 border-b">
                                            <SheetTitle className="text-base font-medium">{mobileMenuTitle}</SheetTitle>
                                        </SheetHeader>
                                        {/* Ensure nav is always scrollable and doesn't touch edges */}
                                        <div className="flex-1 min-h-0 overflow-y-auto">
                                            <nav className="space-y-4 p-4 pt-2 pb-6">
                                                {navigationItems.map((item) => (
                                                    <div key={item.title} className="space-y-2">
                                                        <Link
                                                            href={item.href}
                                                            className="font-semibold text-gray-900 text-base border-b-2 border-gray-200 pb-2 block hover:text-ehk-dark-red hover:border-ehk-dark-red transition-all duration-200"
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
                                                                    className="block text-sm text-gray-600 hover:text-ehk-dark-red py-1.5 transition-all duration-200 hover:pl-2 font-medium"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
