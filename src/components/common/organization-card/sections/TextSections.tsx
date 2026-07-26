import type { TextContent } from "../types";
import { renderTextContent } from "../utils";
import { Section } from "./Section";

export function PresentationSection({
  title,
  content,
}: Readonly<{
  title: string;
  content?: TextContent;
}>) {
  if (!content) {
    return null;
  }

  return (
    <Section title={title}>
      <div className="richtext font-open-sans text-sm leading-[1.6] text-black">
        {renderTextContent(content)}
      </div>
    </Section>
  );
}

export function RichTextSection({
  title,
  content,
}: Readonly<{
  title: string;
  content?: TextContent;
}>) {
  if (!content) {
    return null;
  }

  return (
    <Section title={title}>
      <div className="richtext font-open-sans text-sm leading-[1.6] text-black">
        {renderTextContent(content)}
      </div>
    </Section>
  );
}
