import { getRepresentatives } from "@/lib/payload-cms";
import type { Representative } from '@/payload-types';
import RepresentativesGridClient from './RepresentativesGridClient';

// Server component for data fetching
export default async function RepresentativesGrid({ loader = getRepresentatives }: { loader?: (locale?: 'hu' | 'en') => Promise<Representative[]> }) {
    // The original line 'const representatives = await getRepresentatives();' was replaced by 'await getRepresentatives();'
    // in the provided edit. This means 'representatives' is no longer defined.
    // To make the code syntactically correct and functional based on the new 'loader' prop,
    // we should call the loader and assign its result to 'representatives'.
    // Assuming the intent was to use the new 'loader' prop:
    const representatives = await loader();
    return <RepresentativesGridClient representatives={representatives} />;
}
