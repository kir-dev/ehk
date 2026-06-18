"use client"

import { RepresentativeCard } from '@/app/(app)/[lang]/kepviselok/components/RepresentativeCard';
import { RepresentativeModal } from '@/app/(app)/[lang]/kepviselok/components/RepresentativeModal';
import { Input } from "@/components/ui/input";
import { useTranslate } from "@/hooks/useTranslate";
import { Representative } from '@/payload-types';
import { normalizeString } from "@/utils/normalizeString";
import { ArrowLeft, Search, User } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RepresentativesGridClient({
    representatives,
    title,
    description,
}: {
    representatives: Representative[];
    title: string;
    description?: string;
}) {
    const { t } = useTranslate()
    const router = useRouter()
    const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRepresentatives, setFilteredRepresentatives] = useState<Representative[]>(representatives);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredRepresentatives(representatives);
            return;
        }

        const query = normalizeString(searchQuery);
        const results = representatives.filter(rep => {
            const facultyName = rep.faculty ? t(`faculties.${rep.faculty}`) : '';
            return normalizeString(rep.name).includes(query) ||
                (rep.faculty && (
                    normalizeString(rep.faculty).includes(query) ||
                    normalizeString(facultyName).includes(query)
                ));
        });
        setFilteredRepresentatives(results);
    }, [searchQuery, representatives, t]);

    return (
        <section className="overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#fffefc]">
            <div className="flex flex-col gap-4 border-x border-t border-[#e9e2d6] bg-[#fffefc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#e9e2d6] bg-[#862633] px-4 py-2 font-open-sans text-sm font-bold leading-none text-white shadow-sm transition-colors duration-200 hover:bg-[#9e2d3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#862633] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefc] active:scale-95"
                >
                    <ArrowLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                    <span>{t("Vissza", "Back")}</span>
                </button>

                <label className="relative w-full sm:w-[244px]">
                    <span className="sr-only">{t('representatives.search_placeholder')}</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-[#6e6660]" />
                    <Input
                        placeholder={t('representatives.search_placeholder')}
                        className="h-8 rounded-full border-[#e9e2d6] bg-[#fffefc] pl-8 pr-3 font-open-sans text-xs text-[#3d3d3d] shadow-none placeholder:text-[#6e6660] focus-visible:ring-[#862633] focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
            </div>

            <header className="border-x border-[#e9e2d6] bg-[#862633] px-4 py-6 text-white md:px-8 md:py-8">
                <h1 className="font-playfair text-3xl font-bold uppercase leading-[1.2] md:text-[32px]">
                    {title}
                </h1>
                {description && (
                    <p className="mt-3 max-w-3xl font-playfair text-[15px] font-semibold leading-[1.4] text-[#f9f4f0]/90 md:text-base">
                        {description}
                    </p>
                )}
            </header>

            <div className="bg-[#fffefc] px-4 py-8 md:px-8 md:py-10">
                {filteredRepresentatives.length > 0 ? (
                    <div className="mx-auto grid max-w-[1272px] grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 xl:grid-cols-3 xl:gap-x-[50px]">
                        {filteredRepresentatives.map((representative) => (
                            <RepresentativeCard
                                key={representative.id}
                                representative={representative}
                                onClickAction={() => setSelectedRepresentative(representative)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto flex max-w-[1272px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#e9e2d6] bg-[#fffefc] px-6 py-20 text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#e9e2d6] bg-[#f9f4f0]">
                            <User className="h-8 w-8 text-[#9a9a9a]" />
                        </div>
                        <h2 className="font-playfair text-[22px] font-bold leading-[1.3] text-[#1a1a1a]">
                            {t('representatives.no_results')}
                        </h2>
                        <p className="mt-2 max-w-md font-open-sans text-sm leading-[1.6] text-[#6e6660]">
                            {t('representatives.no_results_desc')}
                        </p>
                    </div>
                )}

                {selectedRepresentative && (
                    <RepresentativeModal
                        representative={selectedRepresentative}
                        onCloseAction={() => setSelectedRepresentative(null)}
                    />
                )}
            </div>
        </section>
    );
}
