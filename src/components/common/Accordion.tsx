"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemProps {
  /** Header / title text shown in the always-visible row. */
  header: React.ReactNode;
  /** Expanded content. */
  children: React.ReactNode;
  /** Uncontrolled initial open state. Ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state. Provide together with `onOpenChange`. */
  open?: boolean;
  /** Called whenever the user toggles the item. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * A single expand/collapse panel matching the EHK design system:
 * warm-white card, light border, rounded corners and a chevron that
 * rotates when open. Fully keyboard accessible.
 */
export function AccordionItem({
  header,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className = "",
}: AccordionItemProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const reactId = React.useId();
  const contentId = `${reactId}-content`;
  const buttonId = `${reactId}-button`;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      className={`bg-[#fffefc] border border-[#e9e2d6] rounded-2xl overflow-hidden ${className}`}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggle}
          className="group flex w-full items-center gap-4 md:gap-8 px-4 py-4 md:px-8 text-left cursor-pointer transition-colors hover:bg-[#f9f4f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#862633] focus-visible:ring-inset"
        >
          <span className="flex-1 font-open-sans font-bold text-base leading-[1.6] text-[#1a1a1a] group-hover:text-[#862633] transition-colors">
            {header}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`shrink-0 w-5 h-5 text-[#6e6660] transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </h3>

      {/* grid-rows trick animates from 0fr -> 1fr for a smooth, height-agnostic slide */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 md:px-8 md:pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export interface AccordionEntry {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionEntry[];
  /** Allow only one item open at a time. */
  single?: boolean;
  className?: string;
}

/**
 * Convenience wrapper that renders a list of {@link AccordionItem}s.
 * Pass `single` to make the group behave like an exclusive accordion.
 */
export function Accordion({ items, single = false, className = "" }: AccordionProps) {
  const initial = single
    ? items.find((i) => i.defaultOpen)?.id ?? null
    : null;
  const [openId, setOpenId] = React.useState<string | null>(initial);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item) =>
        single ? (
          <AccordionItem
            key={item.id}
            header={item.header}
            open={openId === item.id}
            onOpenChange={(next) => setOpenId(next ? item.id : null)}
          >
            {item.content}
          </AccordionItem>
        ) : (
          <AccordionItem
            key={item.id}
            header={item.header}
            defaultOpen={item.defaultOpen}
          >
            {item.content}
          </AccordionItem>
        ),
      )}
    </div>
  );
}

export default Accordion;
