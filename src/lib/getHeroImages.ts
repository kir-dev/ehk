import {HeroImage} from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";

export async function getHeroImages(){
    const payload = await getPayload({ config });
    const images = await payload.find({
        collection: "hero-images",
        limit: 1000,
        sort: "order",
    });

    return images.docs as HeroImage[];
}
