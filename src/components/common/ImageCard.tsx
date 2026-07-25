import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageCardProps {
  href: string;
  imageSrc: string;
  title: string;
  description?: string;
  detailsLabel?: string;
}

export function ImageCard({ content }: Readonly<{ content: ImageCardProps }>) {
  const {
    href,
    imageSrc,
    title,
    description,
    detailsLabel = "Részletek",
  } = content;
  const isExternal = href.startsWith("http");

  const card = (
    <article className="group relative h-full pb-4 transition-transform duration-200 hover:-translate-y-1">
      <div
        className="absolute inset-x-0 bottom-0 top-16 rounded-2xl border border-[#e9e2d6] bg-[#fffefc] transition-colors duration-200 group-hover:border-[#d3afaf]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-4 aspect-[349/296] overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0] sm:mx-8">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) calc(100vw - 64px), (max-width: 1024px) 45vw, 349px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-4 px-4 pt-8 sm:px-8">
        <div className="flex min-h-[29px] items-end justify-center text-center">
          <h3 className="font-playfair text-[22px] font-bold uppercase leading-[1.3] text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#862633]">
            {title}
          </h3>
        </div>

        {description ? (
          <p className="font-open-sans text-center text-sm leading-[1.6] text-[#6e6660]">
            {description}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-[#e9e2d6] pt-4">
          <div className="flex h-[22px] items-center gap-4">
            <span className="font-open-sans text-sm font-semibold leading-[1.6] text-[#862633]">
              {detailsLabel}
            </span>
            <span className="flex flex-1 justify-end text-[#862633]">
              <ArrowRight
                className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full max-w-full sm:w-[413px]"
      >
        {card}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full w-full max-w-full sm:w-[413px]">
      {card}
    </Link>
  );
}
