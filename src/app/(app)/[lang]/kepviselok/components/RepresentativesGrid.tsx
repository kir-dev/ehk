import { getRepresentatives } from "@/lib/payload-cms";
import type { Representative } from '@/payload-types';
import RepresentativesGridClient from './RepresentativesGridClient';

// Server component for data fetching
export default async function RepresentativesGrid({
    loader = getRepresentatives,
    title,
    description,
}: {
    loader?: (locale?: 'hu' | 'en') => Promise<Representative[]>;
    title: string;
    description?: string;
}) {
    const representatives = await loader();
    return (
        <RepresentativesGridClient
            representatives={representatives}
            title={title}
            description={description}
        />
    );
}
