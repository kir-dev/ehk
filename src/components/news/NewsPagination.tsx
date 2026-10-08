"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { useEffect, useRef } from "react";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

// Always returns at most 7 items so the width of the pagination stays stable:
// 1 2 3 4 5 … 101  |  1 … 49 50 51 … 101  |  1 … 97 98 99 100 101
function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, "ellipsis-start", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages];
}

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

  const btnBase = "w-11 h-11 flex items-center justify-center rounded-lg border text-sm transition-colors duration-200 shadow-sm";
  const btnIdle = "border-[#e9e2d6] bg-white text-[#3d3d3d] hover:border-[#862633] hover:text-[#862633]";
  const btnActive = "bg-[#e8e4e0]/40 border-[#3d3d3d] text-[#1a1a1a] font-bold cursor-default";
  const btnDisabled = "opacity-40 border-[#e9e2d6] text-gray-400 cursor-not-allowed pointer-events-none";

  const renderControl = (page: number, content: ReactNode, className: string, options: { disabled?: boolean; isActive?: boolean; label?: string } = {}) => {
    const { disabled = false, isActive = false, label } = options;
    const inert = disabled || isActive;

    if (onPageChange) {
      return (
        <button
          type="button"
          onClick={() => !inert && onPageChange(page)}
          disabled={disabled}
          aria-label={label}
          aria-current={isActive ? "page" : undefined}
          className={className}
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        href={makePageHref(page)}
        onClick={(e) => (inert ? e.preventDefault() : handlePageClick(e, page))}
        aria-disabled={disabled || undefined}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        className={className}
      >
        {content}
      </Link>
    );
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center md:justify-end gap-2 md:gap-2.5 mt-8 pb-2">
      {renderControl(
        Math.max(1, currentPage - 1),
        <ChevronLeft className="w-4 h-4" />,
        `${btnBase} ${isFirst ? btnDisabled : btnIdle}`,
        { disabled: isFirst, label: "Previous page" },
      )}

      <span className="sm:hidden min-w-20 text-center font-open-sans text-sm text-[#3d3d3d]" aria-live="polite">
        <span className="font-bold text-[#1a1a1a]">{currentPage}</span>
        <span className="mx-1 text-[#9a9a9a]">/</span>
        {totalPages}
      </span>

      <div className="hidden sm:flex items-center gap-2 md:gap-2.5">
        {getPageItems(currentPage, totalPages).map((item) => {
          if (typeof item !== "number") {
            return (
              <span key={item} aria-hidden="true" className="w-6 text-center text-sm tracking-widest text-[#9a9a9a] select-none">
                …
              </span>
            );
          }
          const isActive = item === currentPage;
          return (
            <Fragment key={item}>
              {renderControl(item, item, `${btnBase} ${isActive ? btnActive : btnIdle}`, { isActive })}
            </Fragment>
          );
        })}
      </div>

      {renderControl(
        Math.min(totalPages, currentPage + 1),
        <ChevronRight className="w-4 h-4" />,
        `${btnBase} ${isLast ? btnDisabled : btnIdle}`,
        { disabled: isLast, label: "Next page" },
      )}
    </nav>
  );
}
