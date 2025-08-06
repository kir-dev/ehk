import {getPayload} from "payload";
import config from "@payload-config";

export default async function getMuszakPapers(){
    const payload = await getPayload({ config });
    const images = await payload.find({
        collection: "muszak-paper",
        limit: 3,
        sort: "date",
    });

    return images.docs;
}