"use client"

import { Search, Menu, X } from "lucide-react"
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

const navigationItems = [
    {
        title: "OKTATÁS",
        items: [
            "Tanulmányi és Vizsga Szabályzat",
            "OHV honlap",
            "Neptun",
            "Nyelvoktatás",
            "Tanulmányi Tanácsadás",
            "Oktatással Kapcsolatos Szabályzatok",
            "Műegyetem Kiváló Oktatója",
        ],
    },
    {
        title: "JUTTATÁS",
        items: ["Ösztöndíjak", "Szociális támogatások", "Hallgatói kedvezmények", "Pályázatok"],
    },
    {
        title: "KOLLÉGIUM",
        items: ["Kollégiumi elhelyezés", "Kollégiumi szabályzat", "Kollégiumi programok"],
    },
    {
        title: "PÁLYÁZAT",
        items: ["Aktuális pályázatok", "Pályázati eredmények", "Pályázati szabályzat"],
    },
    {
        title: "SPORT",
        items: ["Sportprogramok", "Sportlétesítmények", "Versenyek"],
    },
    {
        title: "ESÉLYEGYENLŐSÉG",
        items: ["Esélyegyenlőségi terv", "Támogatási lehetőségek", "Kapcsolattartás"],
    },
    {
        title: "SZABÁLYZATOK",
        items: ["Hallgatói szabályzatok", "Szervezeti szabályzatok", "Eljárási szabályzatok"],
    },
    {
        title: "SZERVEZET",
        items: ["Szervezeti felépítés", "Tisztségviselők", "Kapcsolat"],
    },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center h-20">
                    <Link href="/" className="flex items-center space-x-4 flex-1 -ml-3">
                        {/* Logo - keep width/height ratio consistent */}
                        <div className="relative w-16 h-16">
                            <Image
                                src={"/ehk_logo.gif"}
                                alt={"EHK Logo"}
                                width={500}
                                height={500}
                                className="object-contain"
                                priority
                            />
                        </div>
                        {/* Text - increased height to match logo's visual weight */}
                        <div className="hidden md:block">
                            <Image
                                src={"/ehk_text.gif"}
                                alt={"EHK Text"}
                                width={500}
                                height={250}
                                className="h-12 w-auto"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex flex-grow-0">
                        <NavigationMenuList className="space-x-1">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuTrigger className="text-gray-700 hover:text-red-700 font-medium text-sm px-3 py-2">
                                        {item.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-80 p-4">
                                            <div className="grid gap-2">
                                                {item.items.map((subItem) => (
                                                    <NavigationMenuLink key={subItem} asChild>
                                                        <Link
                                                            href="#"
                                                            className="block px-3 py-2 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-colors"
                                                        >
                                                            {subItem}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                ))}
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="#"
                                        className="text-gray-700 hover:text-red-700 font-medium text-sm px-3 py-2 inline-flex items-center"
                                    >
                                        ÜVEGZSEB
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Search and Mobile Menu */}
                    <div className="flex items-center space-x-2 ml-auto">
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
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8">
                                            <svg viewBox="0 0 48 48" className="w-full h-full">
                                                <path
                                                    d="M8 8L16 16L8 24L16 32L8 40L24 24L40 40L32 32L40 24L32 16L40 8L24 24L8 8Z"
                                                    fill="#B91C1C"
                                                    stroke="#B91C1C"
                                                    strokeWidth="1"
                                                />
                                                <circle cx="24" cy="24" r="6" fill="none" stroke="#B91C1C" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">EHK</span>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-600">
                                        <X className="h-5 w-5" />
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
                                                        key={subItem}
                                                        href="#"
                                                        className="block text-sm text-gray-600 hover:text-red-700 py-1"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subItem}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <Link
                                        href="#"
                                        className="block font-medium text-gray-900 text-sm py-2 border-t border-gray-200 pt-4"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        ÜVEGZSEB
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
