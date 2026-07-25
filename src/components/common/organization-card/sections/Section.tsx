import React from "react";

import { cn } from "@/lib/utils";

type SectionProps = Readonly<{
  title: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}>;

export function Section({
  title,
  children,
  className,
  bordered = true,
}: SectionProps) {
  return (
    <section
      className={cn(
        "space-y-4",
        bordered && "border-t border-border pt-6 md:pt-7",
        className,
      )}
    >
      <h3 className="text-xs font-bold uppercase tracking-normal text-ehk-dark-red">
        {title}
      </h3>
      {children}
    </section>
  );
}
