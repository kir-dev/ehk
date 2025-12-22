"use client"

import { RepresentativeCard } from '@/app/(app)/[lang]/kepviselok/components/RepresentativeCard';
import { RepresentativeModal } from '@/app/(app)/[lang]/kepviselok/components/RepresentativeModal';
import { Input } from "@/components/ui/input";
import { useTranslate } from "@/hooks/useTranslate";
import { Representative } from '@/payload-types';
import { normalizeString } from "@/utils/normalizeString";
import { Search, User } from "lucide-react";
import { useEffect, useState } from 'react';

export default function RepresentativesGridClient({ representatives }: { representatives: Representative[] }) {
    const { t, lang } = useTranslate()
    const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRepresentatives, setFilteredRepresentatives] = useState<Representative[]>(representatives);

    const facultyMap: Record<string, string[]> = {
        'ÉMK': ['építőmérnöki kar', 'émk', 'építő', 'emk', 'epito'],
        'GPK': ['gépészmérnöki kar', 'gpk', 'gépész', 'gepesz'],
        'ÉPK': ['építészmérnöki kar', 'épk', 'építész', 'epk', 'epitesz'],
        'VBK': ['vegyészmérnöki és biomérnöki kar', 'vbk', 'vegyész', 'biomérnök', 'vegyesz', 'biomernok'],
        'VIK': ['villamosmérnöki és informatikai kar', 'vik', 'kandó', 'kando'],
        'GTK': ['gazdaság- és társadalomtudományi kar', 'gtk', 'gazdaság', 'gazdasag'],
        'TTK': ['természettudományi kar', 'ttk', 'természettudomány', 'termeszettudomany'],
        'KJK': ['közlekedésmérnöki és járműmérnöki kar', 'kjk', 'közlekedés', 'jármű', 'kozlekedes', 'jarmu'],
    };

    useEffect(() => {
        const filtered = representatives.filter(rep => {
            const query = normalizeString(searchQuery.trim());
            if (query === '') return true;

            const facultyKeywords = rep.faculty ? facultyMap[rep.faculty] || [rep.faculty.toLowerCase()] : [];
            const matchesFaculty = facultyKeywords.some(keyword => normalizeString(keyword).includes(query));

            const matchesSearch = 
                normalizeString(rep.name).includes(query) ||
                matchesFaculty ||
                rep.position?.some(pos =>
                    (pos.position_hu && normalizeString(pos.position_hu).includes(query)) ||
                    (pos.position_en && normalizeString(pos.position_en).includes(query))
                );
            return matchesSearch;
        });
        setFilteredRepresentatives(filtered);
    }, [searchQuery, representatives]);

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder={t('representatives.search_placeholder')}
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {filteredRepresentatives.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredRepresentatives.map((representative) => (
                        <RepresentativeCard
                            key={representative.id}
                            representative={representative}
                            onClickAction={() => setSelectedRepresentative(representative)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {t('representatives.no_results')}
                    </h3>
                    <p className="text-gray-500">
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
    );
}
