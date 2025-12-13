"use client"

import { useState } from 'react';
import { RepresentativeCard } from '@/components/RepresentativeCard';
import { RepresentativeModal } from '@/components/RepresentativeModal';
import { Representative } from '@/payload-types';

export default function RepresentativesGridClient({ representatives }: { representatives: Representative[] }) {
    const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | null>(null);
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {representatives.map((representative) => (
                    <RepresentativeCard
                        key={representative.id}
                        representative={representative}
                        onClickAction={() => setSelectedRepresentative(representative)}
                    />
                ))}
            </div>
            {selectedRepresentative && (
                <RepresentativeModal
                    representative={selectedRepresentative}
                    onCloseAction={() => setSelectedRepresentative(null)}
                />
            )}
        </>
    );
}
