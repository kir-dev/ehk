import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

/**
 * Bordered card with an uppercase Playfair heading and a divider, used by the
 * international information pages to group their content blocks.
 */
export function SectionCard({ title, children }: Readonly<SectionCardProps>) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] p-4">
      <h2 className="font-playfair text-base font-semibold uppercase leading-[1.4] text-black">
        {title}
      </h2>

      <div className="h-px w-full bg-[#e9e2d6]" />

      {children}
    </section>
  );
}

export default SectionCard;
