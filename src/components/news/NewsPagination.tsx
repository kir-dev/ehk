"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // defaults to '/'
  queryKey?: string; // defaults to 'page'
}

export default function NewsPagination({ currentPage, totalPages, basePath = "/", queryKey = "page" }: NewsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldScrollRef = useRef(false);

  const makePageHref = (p: number) => (p === 1 ? basePath : `${basePath}?${queryKey}=${p}`);

  const isVisible = (el: Element | null) => {
    if (!el || !(el instanceof HTMLElement)) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && !!el.offsetParent;
  };

  const scrollToNewsHeader = () => {
    // Find all headers and pick the first visible one (handles mobile/desktop duplicates)
    const headers = Array.from(document.querySelectorAll('[data-hirek-header="true"]')) as HTMLElement[];
    const target = headers.find(isVisible);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    // Fallback to anchor if present
    const anchor = document.getElementById('hirek-section');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  };

  const triggerReflow = () => {
    // Force a layout reflow and notify components that rely on resize listeners
    document.body.getBoundingClientRect();
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  };

  useEffect(() => {
    const pageParam = searchParams.get(queryKey);

    const rafScroll = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const didScroll = scrollToNewsHeader();
          if (didScroll) triggerReflow();
        });
      });
    };

    // Scroll after navigation click
    if (shouldScrollRef.current) {
      rafScroll();
      shouldScrollRef.current = false;
      return;
    }

    // Also handle direct loads or back/forward when page param exists and not first page
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

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-2 pb-4">
      {/* Prev */}
      <Link
        href={makePageHref(Math.max(1, currentPage - 1))}
        onClick={(e) => currentPage > 1 && handlePageClick(e, Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
        className={`px-3 py-1.5 rounded border text-sm ${
          currentPage === 1
            ? 'pointer-events-none opacity-50 border-gray-200 text-gray-400'
            : 'hover:border-[#862633] hover:text-[#862633] border-gray-300 text-gray-700'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {/* Page numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        const isActive = p === currentPage;
        return (
          <Link
            key={p}
            href={makePageHref(p)}
            onClick={(e) => !isActive && handlePageClick(e, p)}
            className={`px-3 py-1.5 rounded border text-sm ${
              isActive
                ? 'bg-[#862633] border-[#862633] text-white'
                : 'border-gray-300 text-gray-700 hover:border-[#862633] hover:text-[#862633]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {p}
          </Link>
        );
      })}

      {/* Next */}
      <Link
        href={makePageHref(Math.min(totalPages, currentPage + 1))}
        onClick={(e) => currentPage < totalPages && handlePageClick(e, Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`px-3 py-1.5 rounded border text-sm ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-50 border-gray-200 text-gray-400'
            : 'hover:border-[#862633] hover:text-[#862633] border-gray-300 text-gray-700'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}
