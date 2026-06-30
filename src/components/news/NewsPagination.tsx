"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  queryKey?: string;
  onPageChange?: (page: number) => void;
}

export default function NewsPagination({ currentPage, totalPages, basePath = "/", queryKey = "page", onPageChange }: NewsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldScrollRef = useRef(false);

  const makePageHref = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p === 1) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, p.toString());
    }
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const isVisible = (el: Element | null) => {
    if (!el || !(el instanceof HTMLElement)) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && !!el.offsetParent;
  };

  const scrollToNewsHeader = () => {
    const headers = Array.from(document.querySelectorAll('[data-hirek-header="true"]')) as HTMLElement[];
    const target = headers.find(isVisible);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    const anchor = document.getElementById('hirek-section');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  };

  const triggerReflow = () => {
    document.body.getBoundingClientRect();
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  };

  useEffect(() => {
    if (onPageChange) return; // scroll handled by parent in callback mode

    const pageParam = searchParams.get(queryKey);

    const performScroll = () => {
      const didScroll = scrollToNewsHeader();
      if (didScroll) triggerReflow();
    };

    const rafScroll = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(performScroll);
      });
    };

    if (shouldScrollRef.current) {
      rafScroll();
      shouldScrollRef.current = false;
      return;
    }

    if (pageParam && pageParam !== '1') {
      rafScroll();
      return;
    }
  }, [searchParams, queryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    shouldScrollRef.current = true;
    router.push(makePageHref(page), { scroll: false });
  };

  if (totalPages <= 1) return null;

  const btnBase = "w-9 h-9 flex items-center justify-center rounded-lg border text-sm transition-colors duration-200 shadow-sm";

  if (onPageChange) {
    return (
      <nav className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-2.5 mt-8 pb-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`${btnBase} ${
            currentPage === 1
              ? 'opacity-40 border-[#e9e2d6] text-gray-400 cursor-not-allowed'
              : 'border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => !isActive && onPageChange(p)}
              aria-current={isActive ? 'page' : undefined}
              className={`${btnBase} ${
                isActive
                  ? 'bg-[#e8e4e0]/40 border-[#3d3d3d] text-[#1a1a1a] font-bold cursor-default'
                  : 'border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`${btnBase} ${
            currentPage === totalPages
              ? 'opacity-40 border-[#e9e2d6] text-gray-400 cursor-not-allowed'
              : 'border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    );
  }

  return (
    <nav className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-2.5 mt-8 pb-2">
      <Link
        href={makePageHref(Math.max(1, currentPage - 1))}
        onClick={(e) => currentPage > 1 && handlePageClick(e, Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${btnBase} ${
          currentPage === 1
            ? 'pointer-events-none opacity-40 border-[#e9e2d6] text-gray-400'
            : 'border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        const isActive = p === currentPage;
        return (
          <Link
            key={p}
            href={makePageHref(p)}
            onClick={(e) => !isActive && handlePageClick(e, p)}
            className={`${btnBase} ${
              isActive
                ? 'bg-[#e8e4e0]/40 border-[#3d3d3d] text-[#1a1a1a] font-bold'
                : 'border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {p}
          </Link>
        );
      })}

      <Link
        href={makePageHref(Math.min(totalPages, currentPage + 1))}
        onClick={(e) => currentPage < totalPages && handlePageClick(e, Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${btnBase} ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-40 border-[#e9e2d6] text-gray-400'
            : 'border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}
