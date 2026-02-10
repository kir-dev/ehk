import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ReactNode } from "react";

export default async function EHKScholarshipPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title={dictionary.scholarships.ehk.title} />{" "}
        <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
          {dictionary.scholarships.ehk.items.map((item) => (
            <Card
              key={item.title}
              className="group hover:shadow-md transition-all duration-300"
            >
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <div className="prose max-w-none text-gray-700 richtext">
      <p>{children}</p>
    </div>
  );
}
