import { getRepresentatives } from "@/lib/payload-cms";
import type { Representative } from '@/payload-types';
import RepresentativesGridClient from './RepresentativesGridClient';

// Server component for data fetching
export default async function RepresentativesGrid({ loader = getRepresentatives }: { loader?: (locale?: 'hu' | 'en') => Promise<Representative[]> }) {
    const representatives = await loader();
    return <RepresentativesGridClient representatives={representatives} />;
}
