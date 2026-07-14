import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { parseFormattedText } from '@/utils/parseFormattedText';

interface SportteremContentData {
  title: string;
  description: string;
  facilities: {
    title: string;
    items: string[];
  };
  conditions: {
    title: string;
    description: string;
  };
  process: {
    title: string;
    description: string;
    warning: string;
  };
  requiredData: {
    title: string;
    intro: string;
    items: string[];
  };
  selection: {
    title: string;
    intro: string;
    items: string[];
    warning: string;
  };
  usage: {
    title: string;
    items: string[];
  };
  costs: {
    title: string;
    description: string;
    items: string[];
  };
  contact: {
    title: string;
    description: string;
  };
  footer: string;
}

export default function SportteremContent({ content }: { content: SportteremContentData }) {
  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      <SectionCard title={content.facilities.title}>
        <TextList items={content.facilities.items} />
      </SectionCard>

      <SectionCard title={content.conditions.title}>
        <Paragraph>{parseFormattedText(content.conditions.description)}</Paragraph>
      </SectionCard>

      <SectionCard title={content.process.title}>
        <Paragraph>{parseFormattedText(content.process.description)}</Paragraph>
        <WarningBox>{parseFormattedText(content.process.warning)}</WarningBox>
      </SectionCard>

      <SectionCard title={content.requiredData.title}>
        <Paragraph>{parseFormattedText(content.requiredData.intro)}</Paragraph>
        <TextList items={content.requiredData.items} />
      </SectionCard>

      <SectionCard title={content.selection.title}>
        <Paragraph>{parseFormattedText(content.selection.intro)}</Paragraph>
        <TextList items={content.selection.items} />
        <WarningBox>{parseFormattedText(content.selection.warning)}</WarningBox>
      </SectionCard>

      <SectionCard title={content.usage.title}>
        <TextList items={content.usage.items} />
      </SectionCard>

      <SectionCard title={content.costs.title}>
        <Paragraph>{parseFormattedText(content.costs.description)}</Paragraph>
        <TextList items={content.costs.items} />
      </SectionCard>

      <SectionCard title={content.contact.title}>
        <Paragraph>{parseFormattedText(content.contact.description)}</Paragraph>
      </SectionCard>

      <p className="px-2 text-center font-open-sans text-sm italic leading-[1.6] text-[#6e6660]">
        {parseFormattedText(content.footer)}
      </p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="rounded-2xl border-[#e9e2d6] bg-white py-0 shadow-none">
      <CardContent className="flex flex-col gap-4 p-4">
        <h2 className="font-playfair text-base font-semibold leading-[1.4] text-black">
          {title}
        </h2>
        <div className="h-px w-full bg-[#e9e2d6]" />
        <div className="flex flex-col gap-4 font-open-sans text-sm leading-[1.6] text-black">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="richtext max-w-none">{children}</p>
  );
}

function TextList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <ListTag className={`${ordered ? 'list-decimal' : 'list-disc'} space-y-2 pl-5 marker:text-[#862633]`}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="pl-1">
          {parseFormattedText(item)}
        </li>
      ))}
    </ListTag>
  );
}

function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div className="richtext rounded-2xl border border-[#d3afaf] bg-[#ffe6e6] px-4 py-2 font-open-sans text-sm leading-[1.6] text-[#6b0f1a]">
      {children}
    </div>
  );
}
