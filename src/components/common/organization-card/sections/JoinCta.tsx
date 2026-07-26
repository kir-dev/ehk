import { ExternalLink } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import type { TextContent } from "../types";
import { renderTextContent } from "../utils";

export function JoinCta({
  href,
  prompt,
  children,
}: Readonly<{
  href?: string;
  prompt?: TextContent;
  children: React.ReactNode;
}>) {
  if (!href) {
    return null;
  }

  return (
    <footer
      className={cn(
        "flex flex-col gap-4 border-t border-border bg-[#fffefc] p-4 sm:flex-row sm:items-center",
        prompt ? "sm:justify-between" : "sm:justify-end",
      )}
    >
      {prompt && (
        <div className="font-playfair text-base font-semibold leading-[1.4] text-black">
          {renderTextContent(prompt)}
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-fit shrink-0 items-center gap-2 self-end rounded-2xl border border-border bg-ehk-dark-red px-4 py-2 font-open-sans text-sm font-semibold leading-[1.5] text-white transition-colors hover:bg-ehk-light-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red"
      >
        {children}
        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </footer>
  );
}
