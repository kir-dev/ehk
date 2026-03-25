import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErasmusData {
  title: string;
  general_info: {
    title: string;
    description: string;
  };
  mobility_options?: {
    title: string;
    items: string[];
  };
  additional_support?: string;
  current_call?: string;
  additional_support_link?: string;
  current_call_link?: string;
}

export default function ErasmusContent({ content }: Readonly<{ content: ErasmusData }>) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
      {/* What is Erasmus? */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              {content.general_info.title}
            </h3>
            <div className="prose max-w-none text-gray-700">
              <p className="leading-relaxed">
                {content.general_info.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobility options */}
      {content.mobility_options && (
        <Card className="group hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                {content.mobility_options.title}
              </h3>
              <div className="prose max-w-none text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  {content.mobility_options.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Links */}
      {(content.additional_support_link || content.current_call_link) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {content.additional_support_link && (
            <Button asChild className="w-full bg-[#862633] hover:bg-[#862633]/90 text-white h-auto min-h-[4rem] py-4 px-6 justify-start text-left whitespace-normal transition-all duration-300 hover:shadow-md">
              <Link href={content.additional_support_link} target="_blank" rel="noopener noreferrer">
                <span className="font-medium text-base">{content.additional_support}</span>
              </Link>
            </Button>
          )}
          {content.current_call_link && (
            <Button asChild className="w-full bg-[#862633] hover:bg-[#862633]/90 text-white h-auto min-h-[4rem] py-4 px-6 justify-start text-left whitespace-normal transition-all duration-300 hover:shadow-md">
              <Link href={content.current_call_link} target="_blank" rel="noopener noreferrer">
                <span className="font-medium text-base">{content.current_call}</span>
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
