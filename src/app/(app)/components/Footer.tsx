"use client"

import { useTranslate } from "@/hooks/useTranslate";
import { UniversityPage } from "@/payload-types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  universityPages?: UniversityPage[];
}

export default function Footer({ universityPages = [] }: FooterProps) {
    const { t, lang } = useTranslate();

    const representativeCards = [
        { name: "ÉMK", url: "https://emkhk.bme.hu/" },
        { name: "GPK", url: "https://ghk.bme.hu/" },
        { name: "ÉPK", url: "http://epiteszhk.bme.hu/" },
        { name: "VBK", url: "https://vegyeszhk.hu/" },
        { name: "VIK", url: "https://vik.hk/" },
        { name: "KJK", url: "http://kozlekhk.hu/" },
        { name: "TTK", url: "https://ttkhk.bme.hu/" },
        { name: "GTK", url: "http://gtkhk.hu/" },
    ];

    return (
        <footer className="bg-[#fbf9f6] text-[#1a1a1a] border-t border-[#e9e2d6] py-8 font-open-sans">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                    
                    {/* KAPCSOLAT Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <p className="font-open-sans font-bold text-xs text-[#9a9a9a] uppercase tracking-wider">
                            {t('footer.contact.title')}
                        </p>
                        <div className="font-playfair font-bold text-[22px] text-[#1a1a1a] leading-tight mt-2">
                            <p>{t('footer.contact.university')}</p>
                            <p>{t('footer.contact.ehk')}</p>
                        </div>
                        <div className="font-open-sans text-sm text-[#1a1a1a] mt-2 space-y-1">
                            <p>{t('footer.contact.address_value') || "1111 Budapest, Műegyetem rkp. 7-9. R. ép. 2.07."}</p>
                            <p>+36-1-463-3836</p>
                        </div>
                        <ul className="space-y-1.5 mt-2">
                            {[
                                "info@bmeehk.hu",
                                "palyazat@bmeehk.hu",
                                "kollegium@bmeehk.hu",
                                "oktatas@bmeehk.hu",
                                "szoc@bmeehk.hu"
                            ].map((email) => (
                                <li key={email} className="flex items-center gap-2 text-sm">
                                    <span className="text-[#B2293B] font-bold text-lg leading-none select-none">•</span>
                                    <Link
                                        href={`mailto:${email}`}
                                        className="text-[#1a1a1a] hover:text-[#B2293B] hover:underline transition-colors duration-150"
                                    >
                                        {email}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider 1 */}
                    <div className="hidden lg:block w-px bg-[#e9e2d6] self-stretch" />
                    <div className="lg:hidden h-px bg-[#e9e2d6] my-2" />

                    {/* KARI HALLGATÓI KÉPVISELETEK Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <p className="font-open-sans font-bold text-xs text-[#9a9a9a] uppercase tracking-wider">
                            {t('footer.faculty_representation.title')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-2">
                            {representativeCards.map((card) => (
                                <Link
                                    key={card.name}
                                    href={card.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#f9f4f0] border border-[#e9e2d6] rounded-lg p-4 flex flex-col justify-between hover:bg-[#f2eae1] hover:border-[#dfd6c8] transition-all duration-200"
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <span className="font-open-sans font-bold text-base text-[#1a1a1a] tracking-tight">{card.name}</span>
                                        <ExternalLink className="w-4 h-4 text-[#6e6660] shrink-0" />
                                    </div>
                                    <span className="font-open-sans text-xs text-[#6e6660] mt-1">
                                        {t("Kari Hallgatói Képviselet", "Faculty Student Representation")}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Divider 2 */}
                    <div className="hidden lg:block w-px bg-[#e9e2d6] self-stretch" />
                    <div className="lg:hidden h-px bg-[#e9e2d6] my-2" />

                    {/* EGYETEMI OLDALAK Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <p className="font-open-sans font-bold text-xs text-[#9a9a9a] uppercase tracking-wider">
                            {t('footer.university_pages.title')}
                        </p>
                        <div className="flex flex-col gap-3 font-open-sans text-base text-[#1a1a1a] mt-2">
                            {universityPages.map((page) => {
                                const title = lang === "EN" ? page.title_en : page.title_hu;
                                return (
                                    <Link
                                        key={page.id}
                                        href={page.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline hover:text-[#B2293B] transition-colors duration-150"
                                    >
                                        {title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Bottom section with Logo and Credits */}
                <div className="flex flex-col justify-center items-center pt-8 border-t border-[#e9e2d6] mt-16 gap-4">
                    <p className="text-xs text-[#6e6660]">
                        Made with 🤍 by <a href="https://kir-dev.hu" className="underline hover:text-[#1a1a1a] transition-colors" target="_blank" rel="noopener noreferrer">Kir-Dev</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
