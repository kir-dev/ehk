import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EelisaSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function EelisaSection({
  title,
  children,
  className,
}: Readonly<EelisaSectionProps>) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] p-4",
        className,
      )}
    >
      <h2 className="font-playfair text-base font-semibold leading-[1.4] text-black">
        {title}
      </h2>
      <div className="h-px w-full bg-[#e9e2d6]" />
      {children}
    </section>
  );
}
