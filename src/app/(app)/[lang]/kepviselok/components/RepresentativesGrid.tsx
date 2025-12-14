import { getRepresentatives } from "@/lib/payload-cms";
import RepresentativesGridClient from './RepresentativesGridClient';

// Server component for data fetching
export default async function RepresentativesGrid({ locale }: { locale?: 'hu' | 'en' }) {
    const representatives = await getRepresentatives();
    return <RepresentativesGridClient representatives={representatives} />;
}
