import React from "react";

import { cn } from "@/lib/utils";

type SectionProps = Readonly<{
  title: string;
  children: React.ReactNode;
  className?: string;
}>;

export function Section({
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-2", className)}>
      <h3 className="font-open-sans text-sm font-bold uppercase leading-[1.6] tracking-normal text-[#9a9a9a]">
        {title}
      </h3>
      {children}
    </section>
  );
}
