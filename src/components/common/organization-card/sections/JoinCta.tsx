import React from "react";
import { ExternalLink } from "lucide-react";

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
    <footer className="flex justify-end border-t border-border bg-[#fffefc] p-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-ehk-dark-red px-4 py-2 font-open-sans text-sm font-semibold leading-[1.5] text-white transition-colors hover:bg-ehk-light-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red"
      >
        {children}
        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </footer>
  );
}
