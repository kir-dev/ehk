import { HeroImage } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

export async function getHeroImages(locale?: 'hu' | 'en'){
    const payload = await getPayload({ config });
    const images = await payload.find({
        collection: "hero-images",
        limit: 1000,
        sort: "order",
        locale: locale as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    return images.docs as HeroImage[];
}
