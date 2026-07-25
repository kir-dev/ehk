import type { Locale } from "@/i18n-config";
import { getSocialIcon, getSocialName } from "@/lib/social-utils";

import type { OrganizationSocialLink } from "../types";
import { Section } from "./Section";

export function ContactsSection({
  title,
  links,
  locale,
}: Readonly<{
  title: string;
  links: readonly OrganizationSocialLink[];
  locale: Locale;
}>) {
  if (!links.length) {
    return null;
  }

  return (
    <Section title={title}>
      <div className="flex flex-wrap gap-2.5">
        {links.map((link) => {
          const socialName = getSocialName(link.label, locale);

          return (
            <a
              key={`${link.label}-${link.url}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialName}
              title={socialName}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-ehk-light-red/5 hover:text-ehk-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red"
            >
              {getSocialIcon(link.label, "h-5 w-5")}
            </a>
          );
        })}
      </div>
    </Section>
  );
}
