import DecisionsArchiveClient from "@/app/(app)/[lang]/hatarozatok-tara/components/DecisionsArchiveClient";
import { getDecisions } from "@/lib/payload-cms";

export async function DecisionsArchive() {
    const Decisions = await getDecisions();
    return <DecisionsArchiveClient decisions={Decisions} />
}