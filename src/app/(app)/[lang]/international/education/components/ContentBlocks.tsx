import type {
  EducationBlock,
  EducationListItem,
} from "../education.types";

function ListItems({ items }: Readonly<{ items: EducationListItem[] }>) {
  return (
    <ul className="ml-5 list-disc space-y-1">
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
    </ul>
  );
}

/**
 * Renders a section's paragraphs and (optionally nested) bullet lists. A
 * paragraph that follows a list starts a new thought, so it gets extra spacing.
 */
export function ContentBlocks({
  blocks,
}: Readonly<{ blocks: EducationBlock[] }>) {
  return (
    <div className="flex flex-col gap-2 font-open-sans text-sm leading-[1.6] text-black [&>ul+p]:mt-2">
      {blocks.map((block, index) =>
        block.type === "paragraph" ? (
          <p key={`${block.type}-${index}`}>{block.text}</p>
        ) : (
          <ListItems items={block.items} key={`${block.type}-${index}`} />
        )
      )}
    </div>
  );
}

export default ContentBlocks;
