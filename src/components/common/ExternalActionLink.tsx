import { ExternalLink } from "lucide-react";

interface ExternalActionLinkProps {
  href: string;
  label: string;
  className?: string;
}

const actionLinkClassName =
  "group flex items-center gap-2 rounded-2xl border border-ehk-dark-red bg-ehk-dark-red px-4 py-2 text-left font-open-sans text-xs uppercase leading-[1.5] text-white transition-colors hover:border-ehk-light-red hover:bg-ehk-light-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red";

/** Red pill button with the external-link glyph, used across the page. */
export function ExternalActionLink({
  href,
  label,
  className = "",
}: Readonly<ExternalActionLinkProps>) {
  return (
    <a
      className={`${actionLinkClassName} ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="min-w-0 flex-1">{label}</span>
      <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default ExternalActionLink;
