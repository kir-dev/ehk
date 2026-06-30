import { Card, CardContent } from "@/components/ui/card";
import ErasmusActionLink from "./ErasmusActionLink";
import Divider from "@/components/common/Divider";

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

export default function ErasmusContent({
  content,
}: Readonly<{ content: ErasmusData }>) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 p-2 lg:p-8">
      {/* What is Erasmus? */}
      <Card>
        <CardContent className="px-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="font-semibold text-xl leading-tight text-gray-900">
              {content.general_info.title}
            </h3>
            <Divider />
            <div className="prose max-w-none">
              <p className="leading-relaxed">
                {content.general_info.description}
              </p>
            </div>
            {content.mobility_options && (
              <>
                <h3 className="font-bold uppercase text-xl leading-tight text-[#9A9A9A]">
                  {content.mobility_options.title}
                </h3>
                <div className="prose max-w-none">
                  <ul className="list-disc pl-5 space-y-2">
                    {content.mobility_options.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Links */}
      {(content.additional_support_link || content.current_call_link) && (
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {content.additional_support_link && (
            <ErasmusActionLink href={content.additional_support_link}>
              {content.additional_support}
            </ErasmusActionLink>
          )}
          {content.current_call_link && (
            <ErasmusActionLink href={content.current_call_link}>
              {content.current_call}
            </ErasmusActionLink>
          )}
        </div>
      )}
    </div>
  );
}
