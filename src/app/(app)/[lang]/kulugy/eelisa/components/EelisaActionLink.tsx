import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface EelisaActionLinkProps {
  href: string;
  label: string;
  newTab?: boolean;
  uppercase?: boolean;
  variant?: "primary" | "secondary";
}

export function EelisaActionLink({
  href,
  label,
  newTab = true,
  uppercase = false,
  variant = "primary",
}: Readonly<EelisaActionLinkProps>) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={
        isPrimary
          ? "group inline-flex min-h-9 max-w-full items-center gap-2 whitespace-normal rounded-2xl border border-[#862633] bg-[#862633] px-4 py-2 font-open-sans text-xs leading-[1.5] text-white transition-colors hover:border-[#9e2d3e] hover:bg-[#9e2d3e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#862633] lg:shrink-0 lg:whitespace-nowrap"
          : "group inline-flex min-h-9 max-w-full items-center gap-2 whitespace-normal rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0] px-4 py-2 font-open-sans text-xs leading-[1.5] text-[#3d3d3d] transition-colors hover:border-[#862633] hover:bg-[#fffefc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#862633] lg:shrink-0 lg:whitespace-nowrap"
      }
    >
      <span className={uppercase ? "uppercase" : undefined}>{label}</span>
      <ExternalLink
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
