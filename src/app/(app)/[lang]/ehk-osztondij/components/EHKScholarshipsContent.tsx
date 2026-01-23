import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface EHKScholarshipsContents {
  items : {
    title:string;
    paragraphs: string[];
  }[];
}

export default function EHKScholarshipsContent({ content }: { content: EHKScholarshipsContents }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
    {content.items.map((item) => (
      <Card key={item.title} className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                {item.title}
              </h3>
              <div className="space-y-2">
                {item.paragraphs.map((para, i) => (
                  <Paragraph key={i}>{para}</Paragraph>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>))}
    </div>
  );
}

function Paragraph({children} : {children:ReactNode}){
  return(
    <div className="prose max-w-none text-gray-700 richtext">
      <p>{children}</p>
    </div>
  );
}