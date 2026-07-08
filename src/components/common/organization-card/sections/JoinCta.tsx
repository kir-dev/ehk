import React from "react";
import { ArrowRight, Users } from "lucide-react";

export function JoinCta({
  href,
  children,
}: Readonly<{
  href?: string;
  children: React.ReactNode;
}>) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 bg-ehk-dark-red px-5 py-4 text-white transition-colors hover:bg-ehk-light-red sm:px-7 md:px-8"
    >
      <span className="inline-flex items-center gap-2 text-sm font-semibold sm:text-base">
        <Users className="h-4 w-4" />
        {children}
      </span>
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
