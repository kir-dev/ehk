import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ActionLinkProps {
  /** Absolute URL, or a site-relative path already carrying the locale prefix. */
  href: string;
  label: string;
  className?: string;
}

const actionLinkClassName =
  "group flex items-center gap-2 rounded-2xl border border-ehk-dark-red bg-ehk-dark-red px-4 py-2 text-left font-open-sans text-xs uppercase leading-[1.5] text-white transition-colors hover:border-ehk-light-red hover:bg-ehk-light-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red";

/**
 * Red pill button. Site-relative hrefs navigate in place and get an arrow,
 * everything else opens in a new tab with the external-link glyph.
 */
export function ActionLink({
  href,
  label,
  className = "",
}: Readonly<ActionLinkProps>) {
  const isInternal = href.startsWith("/");
  const content = (
    <>
      <span className="min-w-0 flex-1">{label}</span>
      {isInternal ? (
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      ) : (
        <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (isInternal) {
    return (
      <Link className={`${actionLinkClassName} ${className}`} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={`${actionLinkClassName} ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {content}
    </a>
  );
}

export default ActionLink;
