import { getRepresentatives } from "@/lib/payload-cms";
import RepresentativesGridClient from './representatives-grid-client';

// Server component for data fetching
export default async function RepresentativesGrid() {
    const representatives = await getRepresentatives();
    return <RepresentativesGridClient representatives={representatives} />;
}
