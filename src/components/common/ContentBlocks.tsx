export interface ContentListItem {
  /** Bold lead-in, e.g. "Timeline". May stand alone above a nested list. */
  emphasis?: string;
  text?: string;
  /** Nested bullets rendered under this item. */
  items?: string[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: ContentListItem[] };

function ListItems({
  items,
  ordered,
}: Readonly<{ items: ContentListItem[]; ordered?: boolean }>) {
  const List = ordered ? "ol" : "ul";

  return (
    <List
      className={`ml-5 space-y-1 ${ordered ? "list-decimal" : "list-disc"}`}
    >
      {items.map((item) => (
        <li key={item.emphasis ?? item.text}>
          {item.emphasis && (
            <strong className="font-bold">{item.emphasis}</strong>
          )}
          {item.emphasis && item.text ? " " : null}
          {item.text}
          {item.items && (
            <ul className="ml-5 mt-1 list-disc space-y-1">
              {item.items.map((subItem) => (
                <li key={subItem}>{subItem}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </List>
  );
}

/**
 * Renders the paragraphs and (optionally nested or numbered) lists that make up
 * a section on the international information pages. A paragraph that follows a
 * list starts a new thought, so it gets extra spacing.
 */
export function ContentBlocks({
  blocks,
}: Readonly<{ blocks: ContentBlock[] }>) {
  return (
    <div className="flex flex-col gap-2 font-open-sans text-sm leading-[1.6] text-black [&>ol+p]:mt-2 [&>ul+p]:mt-2">
      {blocks.map((block, index) =>
        block.type === "paragraph" ? (
          <p key={`${block.type}-${index}`}>{block.text}</p>
        ) : (
          <ListItems
            items={block.items}
            key={`${block.type}-${index}`}
            ordered={block.ordered}
          />
        )
      )}
    </div>
  );
}

export default ContentBlocks;
