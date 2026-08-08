import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";

export type ActionLinkVariant = "primary" | "secondary";

interface ActionLinkProps {
  /** Absolute URL, mailto:, or a site-relative path already carrying the locale prefix. */
  href: string;
  label: string;
  variant?: ActionLinkVariant;
  className?: string;
}

const baseClassName =
  "group flex items-center gap-2 rounded-2xl border px-4 py-2 text-left font-open-sans text-xs uppercase leading-[1.5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ehk-dark-red";

const variantClassName: Record<ActionLinkVariant, string> = {
  primary:
    "border-ehk-dark-red bg-ehk-dark-red text-white hover:border-ehk-light-red hover:bg-ehk-light-red",
  secondary:
    "border-[#e9e2d6] bg-[#f9f4f0] text-[#3d3d3d] hover:border-ehk-dark-red hover:text-ehk-dark-red",
};

/**
 * Pill button. Site-relative hrefs navigate in place and get an arrow, mailto:
 * links get an envelope, and everything else opens in a new tab with the
 * external-link glyph.
 */
export function ActionLink({
  href,
  label,
  variant = "primary",
  className = "",
}: Readonly<ActionLinkProps>) {
  const isInternal = href.startsWith("/");
  const isMail = href.startsWith("mailto:");
  const fullClassName = `${baseClassName} ${variantClassName[variant]} ${className}`;

  const icon = isInternal ? (
    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
  ) : isMail ? (
    <Mail className="h-4 w-4 shrink-0" />
  ) : (
    <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  );

  const content = (
    <>
      <span className="min-w-0 flex-1">{label}</span>
      {icon}
    </>
  );

  if (isInternal) {
    return (
      <Link className={fullClassName} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={fullClassName}
      href={href}
      rel={isMail ? undefined : "noopener noreferrer"}
      target={isMail ? undefined : "_blank"}
    >
      {content}
    </a>
  );
}

export default ActionLink;
