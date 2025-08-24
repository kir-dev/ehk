import {getDecisions} from "@/lib/payload-cms";
import DecisionsArchiveClient from "./decisions-archive-client";

export async function DecisionsArchive() {
    const Decisions = await getDecisions();
    return <DecisionsArchiveClient decisions={Decisions} />
}
