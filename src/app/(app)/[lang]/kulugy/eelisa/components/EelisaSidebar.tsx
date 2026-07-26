import type { ReactNode } from "react";
import { EelisaActionLink } from "./EelisaActionLink";
import type {
  SidebarContact,
  SidebarLink,
} from "./eelisa.types";

interface EelisaSidebarProps {
  contacts: SidebarContact[];
  contactsTitle: string;
  isEnglish: boolean;
  links: SidebarLink[];
  linksTitle: string;
}

export function EelisaSidebar({
  contacts,
  contactsTitle,
  isEnglish,
  links,
  linksTitle,
}: Readonly<EelisaSidebarProps>) {
  return (
    <aside className="mt-4 h-fit rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 md:mt-8">
      <div className="flex flex-col gap-4">
        {links.length > 0 && (
          <SidebarGroup title={linksTitle}>
            {links.map((link, index) => {
              const label = isEnglish
                ? link.label_en || link.label_hu
                : link.label_hu || link.label_en;

              return (
                <EelisaActionLink
                  href={link.url}
                  key={link.id ?? `${link.url}-${index}`}
                  label={label}
                  uppercase
                />
              );
            })}
          </SidebarGroup>
        )}

        {contacts.length > 0 && (
          <SidebarGroup title={contactsTitle}>
            {contacts.map((contact, index) => (
              <EelisaActionLink
                href={`mailto:${contact.email}`}
                key={contact.id ?? `${contact.email}-${index}`}
                label={contact.label || contact.email}
                newTab={false}
                variant="secondary"
              />
            ))}
          </SidebarGroup>
        )}
      </div>
    </aside>
  );
}

function SidebarGroup({
  children,
  title,
}: Readonly<{
  children: ReactNode;
  title: string;
}>) {
  return (
    <section className="flex flex-col items-start gap-2">
      <h2 className="font-open-sans text-[13px] font-semibold uppercase leading-none tracking-[0.1em] text-[#6e6660]">
        {title}
      </h2>
      {children}
    </section>
  );
}
