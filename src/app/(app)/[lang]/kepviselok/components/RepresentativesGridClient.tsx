"use client"

import { RepresentativeCard } from '@/app/(app)/[lang]/kepviselok/components/RepresentativeCard';
import { RepresentativeModal } from '@/app/(app)/[lang]/kepviselok/components/RepresentativeModal';
import { Input } from "@/components/ui/input";
import { useTranslate } from "@/hooks/useTranslate";
import { Representative } from '@/payload-types';
import { normalizeString } from "@/utils/normalizeString";
import { Search, User } from "lucide-react";
import { useEffect, useState } from 'react';

const facultyMap: Record<string, string[]> = {
    'ÉMK': ['építőmérnöki kar', 'émk', 'építő'],
    'GPK': ['gépészmérnöki kar', 'gpk', 'gépész'],
    'ÉPK': ['építészmérnöki kar', 'épk', 'építész'],
    'VBK': ['vegyészmérnöki és biomérnöki kar', 'vbk', 'vegyész', 'biomérnök'],
    'VIK': ['villamosmérnöki és informatikai kar', 'vik', 'kandó'],
    'GTK': ['gazdaság- és társadalomtudományi kar', 'gtk', 'gazdaság'],
    'TTK': ['természettudományi kar', 'ttk', 'természettudomány'],
    'KJK': ['közlekedésmérnöki és járműmérnöki kar', 'kjk', 'közlekedés', 'jármű'],
};

export default function RepresentativesGridClient({ representatives }: { representatives: Representative[] }) {
    const { t } = useTranslate()
    const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRepresentatives, setFilteredRepresentatives] = useState<Representative[]>(representatives);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredRepresentatives(representatives);
            return;
        }

        const query = normalizeString(searchQuery);
        const results = representatives.filter(rep =>
            normalizeString(rep.name).includes(query) ||
            (rep.faculty && facultyMap[rep.faculty as keyof typeof facultyMap]?.some(keyword => normalizeString(keyword).includes(query)))
        );
        setFilteredRepresentatives(results);
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
