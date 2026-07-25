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
    <Section title={title} bordered={false}>
      <div className="richtext text-sm leading-7 text-foreground/85 sm:text-base">
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
      <div className="richtext text-sm leading-7 text-foreground/85 sm:text-base">
        {renderTextContent(content)}
      </div>
    </Section>
  );
}
