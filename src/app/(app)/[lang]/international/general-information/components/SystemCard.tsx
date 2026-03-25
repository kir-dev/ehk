import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Info } from "lucide-react";

export function SystemCard({ title, description, listTitle, items, footer, moreInfoText }: {
  title: string;
  description?: string;
  listTitle: string;
  items: string[];
  footer: string;
  moreInfoText: string;
}) {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <p className="text-sm text-gray-600 pt-1 font-medium">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 mb-5">
          <p className="font-bold text-sm text-gray-700 uppercase tracking-wide mb-3">{listTitle}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm font-medium text-gray-600">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm font-medium text-gray-600 bg-blue-50/50 p-4 border border-blue-100 rounded-lg flex gap-3 items-center">
          <Info className="text-blue-500 shrink-0" size={18} />
          <div className="leading-relaxed flex items-center gap-1.5 flex-wrap">
            {footer.split(/(https?:\/\/[^\s.,;:!?)]+)/g).filter(Boolean).map((part, j) => 
              part.match(/^https?:\/\//) ? (
                <Button key={j} variant="outline" size="sm" asChild className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]">
                  <a href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                    {moreInfoText} <ExternalLink size={12} />
                  </a>
                </Button>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
