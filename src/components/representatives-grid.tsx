import { RepresentativeCard } from '@/components/representative-card'
import { RepresentativeModal } from '@/components/representative-modal'
import { Representative } from "@/payload-types";
import { getRepresentatives } from "@/lib/payload-cms";
import RepresentativesGridClient from './representatives-grid-client';

// Server component for data fetching
export default async function RepresentativesGrid() {
    const representatives = await getRepresentatives();
    return <RepresentativesGridClient representatives={representatives} />;
}
