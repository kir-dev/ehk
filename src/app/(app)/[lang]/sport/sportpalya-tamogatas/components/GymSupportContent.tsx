import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { parseFormattedText } from '@/utils/parseFormattedText';

interface SportpalyaTamogatasContentData {
  title: string;
  description: string;
  application: { 
    title: string; 
    description: string 
  };
  period: { 
    title: string; 
    items: string[] 
  };
  condition: { 
    title: string; 
    intro: string; 
    items: string[]; 
    outro: string 
  };
  selection: { 
    title: string; 
    description: string; 
    items: string[] 
  };
  result: { 
    title: string;
    items: string[] 
  };
  
  footer: string;
}

export default function SportpalyaTamogatasContent({ content }: { content: SportpalyaTamogatasContentData }) {
  return (
    <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-[#e9e2d6] bg-[#fffefc] p-4 md:p-8">
      <SectionCard title={content.application.title}>
        <Paragraph>{parseFormattedText(content.application.description)}</Paragraph>
      </SectionCard>

      <SectionCard title={content.period.title}>
        <TextList items={content.period.items} />
      </SectionCard>

      <SectionCard title={content.condition.title}>
        <Paragraph>{parseFormattedText(content.condition.intro)}</Paragraph>
        <TextList items={content.condition.items} ordered />
        <NoticeBox>{parseFormattedText(content.condition.outro)}</NoticeBox>
      </SectionCard>

      <SectionCard title={content.selection.title}>
        <Paragraph>{parseFormattedText(content.selection.description)}</Paragraph>
        <TextList items={content.selection.items} />
      </SectionCard>

      <SectionCard title={content.result.title}>
        <TextList items={content.result.items} />
      </SectionCard>

      <p className="px-2 text-center font-open-sans text-sm italic leading-[1.6] text-[#6e6660]">
        {parseFormattedText(content.footer)}
      </p>
    </div>
  );
};

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="rounded-2xl border-[#e9e2d6] bg-transparent py-0 shadow-none">
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

function NoticeBox({ children }: { children: ReactNode }) {
  return (
    <div className="richtext rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0] px-4 py-2 font-open-sans text-sm leading-[1.6] text-[#6b0f1a]">
      {children}
    </div>
  );
}
