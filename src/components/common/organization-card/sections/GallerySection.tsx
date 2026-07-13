import Image from "next/image";

import type { OrganizationGalleryImage } from "../types";
import {
  getImageAlt,
  resolveImageSrc,
} from "../utils";
import { Section } from "./Section";

export function GallerySection({
  title,
  images,
  imageBasePath,
  organizationName,
}: Readonly<{
  title: string;
  images?: readonly OrganizationGalleryImage[];
  imageBasePath: string;
  organizationName: string;
}>) {
  if (!images?.length) {
    return null;
  }

  return (
    <Section title={title}>
      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:px-7 md:-mx-8 md:px-8">
        {images.map((image, index) => (
          <div
            key={`${resolveImageSrc(image, imageBasePath)}-${index}`}
            className="relative aspect-[4/3] w-[min(78vw,320px)] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-muted sm:w-80"
          >
            <Image
              src={resolveImageSrc(image, imageBasePath)}
              alt={getImageAlt(image, organizationName, index)}
              fill
              sizes="(max-width: 640px) 78vw, 320px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
