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

// Update your navigationItems array to include hrefs
const navigationItems = [
    {
        title: "SZERVEZET",
        href: "/szervezet",
        items: [
            "Képviselők",
            "Emlékeztetők",
            "Határozatok tára",
            "ESZB honlap",
            "EDK honlap",
            "Engedélyek",
        ],
    },
    {
        title: "OKTATÁS",
        href: "/oktatas",
        items: [
            "Szabályzatok",
            "OMHV",
            "Neptun",
            "Nyelvoktatás",
            "Kisokosok/Segédletek",
        ],
    },
    {
        title: "JUTTATÁS",
        href: "/juttatas",
        items: [
            "Tanulmányi ösztöndíjak",
            "Szociális alapú ösztöndíjak",
            "EHK ösztöndíjak",
            "Szabályzatok",
            "MŰEPER",
            "Esélyegyenlőség",
        ],
    },
    {
        title: "KOLLÉGIUM",
        href: "/kollegium",
        items: [
            "Bemutató",
            "Szabályzatok",
            "KEFIR",
        ],
    },
    {
        title: "SPORT",
        href: "/sport",
        items: [
            "Sportpálya támogatás pályázat",
            "Sportterem igénylés",
            "Testnevelési Központ",
            "Sportközpont"
        ],
    },
    {
        title: "KÜLÜGY",
        href: "/kulugy",
        items: [
            "Erasmus",
            "EELISA",
            "HKT",
        ],
    },
    {
        title: "INTERNATIONAL",
        href: "/international",
        items: [
            ""
        ],
    },
    {
        title: "KÖZÉLET",
        href: "/kozelet",
        items: [
            "Versenycsapatok",
            "Szakkollégiumok",
            "Öntevékeny körök",
            "Rendezvények",
            "Klubbok",
        ],
    },
    {
        title: "GÓLYÁKNAK",
        href: "/golyaknak",
        items: [],
    },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

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
                                        <NavigationMenuTrigger className="text-gray-700 relative hover:text-red-700 font-medium text-sm px-3 py-2">
                                            {item.title}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="z-50">
                                            <div className="w-80 p-4">
                                                <div className="grid gap-2">
                                                    {item.items.map((subItem) => (
                                                        <NavigationMenuLink className="" key={subItem} asChild>
                                                            <Link
                                                                href={`${item?.href}/${subItem?.toLowerCase().replace(/\s+/g, '-')}`}
                                                                className="block px-3 py-2 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-colors "
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
                            </NavigationMenuList>
                        </NavigationMenu>
                        {/* Search and Mobile Menu */}
                        <div className="flex items-center space-x-2 ml-2">
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
