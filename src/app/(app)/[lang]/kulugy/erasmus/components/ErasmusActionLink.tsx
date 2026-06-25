import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ErasmusActionLink({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Button
      asChild
      variant="secondary"
      className="h-auto p-4 font-semibold text-lg uppercase border-1 bg-[#F9F4F0] border-[#E9E2D6] hover:border-[#862633] hover:text-[#862633] rounded-xl transition-all duration-300"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center w-full lg:w-auto"
      >
        <span className="flex-1 min-w-0 text-left whitespace-normal break-words lg:flex-none">
          {children}
        </span>
        <ExternalLink className="w-5 h-5 ml-2 flex-shrink-0" />
      </Link>
    </Button>
  );
}
