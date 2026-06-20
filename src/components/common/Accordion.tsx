"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface AccordionItemProps {
  /** Header / title text shown in the always-visible row. */
  header?: React.ReactNode;
  /** Alias for `header`, useful when consuming the component as a title/content pair. */
  title?: React.ReactNode;
  /** Expanded content. */
  children: React.ReactNode;
  /** Uncontrolled initial open state. Ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state. Provide together with `onOpenChange`. */
  open?: boolean;
  /** Called whenever the user toggles the item. */
  onOpenChange?: (open: boolean) => void;
  /** Heading level for the accordion trigger. */
  headingLevel?: AccordionHeadingLevel;
  className?: string;
  buttonClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

/**
 * A single expand/collapse panel matching the EHK design system:
 * warm-white card, light border, rounded corners and a chevron that
 * rotates when open. Fully keyboard accessible.
 */
export function AccordionItem({
  header,
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  headingLevel = 3,
  className = "",
  buttonClassName,
  headerClassName,
  contentClassName,
  iconClassName,
}: AccordionItemProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;
  const Heading = `h${headingLevel}` as React.ElementType;

  const reactId = React.useId();
  const contentId = `${reactId}-content`;
  const buttonId = `${reactId}-button`;
  const label = header ?? title;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#fffefc]",
        className,
      )}
    >
      <Heading className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggle}
          className={cn(
            "group flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-[#f9f4f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#862633] focus-visible:ring-inset md:gap-8 md:px-8 motion-reduce:transition-none",
            buttonClassName,
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1 font-open-sans text-base font-bold leading-[1.6] text-[#1a1a1a] transition-colors group-hover:text-[#862633] motion-reduce:transition-none",
              headerClassName,
            )}
          >
            {label}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-5 w-5 shrink-0 text-[#6e6660] transition-transform duration-300 motion-reduce:transition-none",
              isOpen ? "rotate-180" : "rotate-0",
              iconClassName,
            )}
          />
        </button>
      </Heading>

      {/* Grid rows animate the natural content height without measuring it. */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        inert={isOpen ? undefined : true}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className={cn("px-4 pb-4 md:px-8 md:pb-6", contentClassName)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface AccordionEntry {
  id: string;
  header?: React.ReactNode;
  title?: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
  headingLevel?: AccordionHeadingLevel;
  className?: string;
  buttonClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
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
export function Accordion({ items, single = false, className }: AccordionProps) {
  const initial = single
    ? items.find((i) => i.defaultOpen)?.id ?? null
    : null;
  const [openId, setOpenId] = React.useState<string | null>(initial);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item) =>
        single ? (
          <AccordionItem
            key={item.id}
            header={item.header}
            title={item.title}
            open={openId === item.id}
            onOpenChange={(next) => setOpenId(next ? item.id : null)}
            headingLevel={item.headingLevel}
            className={item.className}
            buttonClassName={item.buttonClassName}
            headerClassName={item.headerClassName}
            contentClassName={item.contentClassName}
            iconClassName={item.iconClassName}
          >
            {item.content}
          </AccordionItem>
        ) : (
          <AccordionItem
            key={item.id}
            header={item.header}
            title={item.title}
            defaultOpen={item.defaultOpen}
            headingLevel={item.headingLevel}
            className={item.className}
            buttonClassName={item.buttonClassName}
            headerClassName={item.headerClassName}
            contentClassName={item.contentClassName}
            iconClassName={item.iconClassName}
          >
            {item.content}
          </AccordionItem>
        ),
      )}
    </div>
  );
}

export default Accordion;
