import Link from "next/link";

import { ActionLink } from "@/components/common/ActionLink";
import type { Locale } from "@/i18n-config";

import { GETTING_STARTED_LINKS } from "../gettingStarted.constants";
import type {
  GettingStartedGroup,
  GettingStartedListItem,
} from "../gettingStarted.types";

interface InfoGroupProps {
  group: GettingStartedGroup;
  locale: Locale;
}

const inlineLinkClassName =
  "font-semibold text-black underline decoration-1 underline-offset-2 transition-colors hover:text-ehk-dark-red";

function ListItemContent({
  item,
  locale,
}: Readonly<{ item: GettingStartedListItem; locale: Locale }>) {
  const href = item.link ? GETTING_STARTED_LINKS[item.link] : undefined;

  return (
    <>
      {item.emphasis && <strong className="font-bold">{item.emphasis} </strong>}
      {item.text}
      {href && item.link_label && (
        <Link className={inlineLinkClassName} href={`/${locale}${href}`}>
          {item.link_label}
        </Link>
      )}
      {item.suffix}
    </>
  );
}

/** Labelled block inside a section card: bullet list or paragraph, plus buttons. */
export function InfoGroup({ group, locale }: Readonly<InfoGroupProps>) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-open-sans text-[13px] font-semibold leading-normal tracking-[0.1em] text-[#6e6660]">
        {group.label}
      </h3>

      <div className="flex flex-col items-start gap-2 font-open-sans text-sm leading-[1.6] text-black">
        {group.items && (
          <ul className="ml-5 list-disc space-y-1">
            {group.items.map((item) => (
              <li key={item.text}>
                <ListItemContent item={item} locale={locale} />
              </li>
            ))}
          </ul>
        )}

        {group.text && <p>{group.text}</p>}

        {group.actions?.map((action) => (
          <ActionLink
            href={GETTING_STARTED_LINKS[action.link]}
            key={action.link}
            label={action.label}
          />
        ))}
      </div>
    </div>
  );
}

export default InfoGroup;
