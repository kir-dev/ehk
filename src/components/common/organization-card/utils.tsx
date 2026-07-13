import React from "react";

import type { Locale } from "@/i18n-config";
import { parseFormattedText } from "@/utils/parseFormattedText";

import type {
  OrganizationCardLabels,
  OrganizationGalleryImage,
  TextContent,
} from "./types";

const labelsByLocale: Record<Locale, OrganizationCardLabels> = {
  hu: {
    presentation: "Bemutatás",
    events: "Kiemelt események",
    activities: "Tevékenységek",
    departments: "Tagozatok",
    targetAudience: "Kinek ajánljuk?",
    contacts: "Elérhetőségek",
    gallery: "Galéria",
    join: "Csatlakozom!",
  },
  en: {
    presentation: "Presentation",
    events: "Featured events",
    activities: "Activities",
    departments: "Departments",
    targetAudience: "Who is it for?",
    contacts: "Contact",
    gallery: "Gallery",
    join: "Join us",
  },
};

export function getOrganizationCardLabels(locale: Locale) {
  return labelsByLocale[locale] ?? labelsByLocale.hu;
}

export function renderTextContent(content: TextContent) {
  if (Array.isArray(content)) {
    return (
      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p key={`${paragraph.slice(0, 28)}-${index}`}>
            {parseFormattedText(paragraph)}
          </p>
        ))}
      </div>
    );
  }

  if (typeof content === "string") {
    return <p>{parseFormattedText(content)}</p>;
  }

  return content;
}

export function resolveImageSrc(
  image: OrganizationGalleryImage,
  imageBasePath: string,
) {
  const source = typeof image === "string" ? image : image.src;
  if (source.startsWith("/") || source.startsWith("http")) {
    return source;
  }

  return `${imageBasePath}/${source}`;
}

export function getImageAlt(
  image: OrganizationGalleryImage,
  organizationName: string,
  index: number,
) {
  if (typeof image !== "string" && image.alt) {
    return image.alt;
  }

  return `${organizationName} - ${index + 1}`;
}

export function getStatLabel(label: string) {
  return label.replace(/:$/, "");
}
