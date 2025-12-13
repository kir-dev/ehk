import {getDecisions} from "@/lib/payload-cms";
import DecisionsArchiveClient from "@/app/(app)/hatarozatok-tara/components/DecisionsArchiveClient";

export async function DecisionsArchive() {
    const Decisions = await getDecisions();
    return <DecisionsArchiveClient decisions={Decisions} />
}