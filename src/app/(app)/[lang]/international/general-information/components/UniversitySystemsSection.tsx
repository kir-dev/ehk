import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  FileText, 
  Table, 
  Presentation, 
  Cloud, 
  Mail, 
  Users, 
  Notebook 
} from "lucide-react";
import { SystemCard } from "./SystemCard";
import { ExternalLinkCard } from "./ExternalLinkCard";
import { renderFormattedText } from "@/lib/utils";
import { SectionHeader } from "@/components/common/SectionHeader";

const getAppIcon = (name: string) => {
  switch (name) {
    case "Word": return <FileText size={16} />;
    case "Excel": return <Table size={16} />;
    case "PowerPoint": return <Presentation size={16} />;
    case "OneDrive": return <Cloud size={16} />;
    case "Outlook": return <Mail size={16} />;
    case "Teams": return <Users size={16} />;
    case "OneNote": return <Notebook size={16} />;
    default: return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UniversitySystemsSection({ content }: { content: any }) {
  const moreInfoText = content.more_info;

  return (
    <section id="university-systems" className="scroll-mt-28 space-y-8">
      <SectionHeader title={content.nav.university_systems} />

      <SystemCard 
        title={content.university_systems.neptun.title}
        description={content.university_systems.neptun.description}
        listTitle={content.university_systems.neptun.list_title}
        items={content.university_systems.neptun.items}
        footer={content.university_systems.neptun.footer}
        moreInfoText={moreInfoText}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {content.university_systems.eduid.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              {content.university_systems.eduid.paragraphs.map((p: string, i: number) => (
                <p key={i}>{renderFormattedText(p, "text-gray-800")}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {content.university_systems.o365.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
               {renderFormattedText(content.university_systems.o365.description, "text-gray-800")}
            </p>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mt-auto">
              <h4 className="font-bold text-sm text-gray-800 mb-3">{content.university_systems.o365.how_to_register_title}</h4>
              <ol className="list-decimal pl-4 space-y-2 text-sm font-medium text-gray-600">
                {content.university_systems.o365.steps.map((step: string, i: number) => (
                  <li key={i} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-gray-200 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{content.university_systems.moodle.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="font-semibold text-sm mb-3 text-gray-700">{content.university_systems.moodle.list_title}</p>
            <ul className="space-y-3">
              {content.university_systems.moodle.items.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-ehk-light-red mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{content.university_systems.teams.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              {content.university_systems.teams.paragraphs.map((p: string, i: number) => (
                <p key={i}>{renderFormattedText(p, "text-gray-800")}</p>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <ExternalLinkCard
          title={content.university_systems.wifi.title}
          description={
            <span>{renderFormattedText(content.university_systems.wifi.description.replace(/(https?:\/\/[^\s]+)/g, ''), "text-gray-800")}</span>
          }
          href={content.university_systems.wifi.description.match(/https?:\/\/[^\s]+/)?.[0] || "#"}
          icon={null}
          moreInfoText={moreInfoText}
        />
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">{content.university_systems.office.title}</CardTitle>
          <CardDescription className="text-sm pt-1">
            {content.university_systems.office.description.split(/(https?:\/\/[^\s]+)/g).map((part: string, i: number) => 
                part.match(/https?:\/\/[^\s]+/) ? (
                  <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 font-medium hover:underline break-all">
                    office.com <ExternalLink size={14} className="shrink-0" />
                  </a>
                ) : (
                  <span key={i}>{renderFormattedText(part, "text-gray-800")}</span>
                )
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-xs uppercase tracking-wide mb-3 text-gray-500">{content.university_systems.office.list_title}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {content.university_systems.office.items.map((item: string, i: number) => (
              <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 border border-blue-100 text-blue-700 rounded-md text-sm font-semibold shadow-sm">
                {getAppIcon(item)}
                {item}
              </span>
            ))}
          </div>
          <div className="text-sm font-medium p-3 bg-gray-50 rounded-lg border border-gray-100 inline-block">
            {content.university_systems.office.footer.split(/(https?:\/\/[^\s]+)/g).map((part: string, i: number) => 
              part.match(/https?:\/\/[^\s]+/) ? (
                <Button key={i} variant="outline" size="sm" asChild className="mx-2 hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]">
                  <a href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                    {moreInfoText} <ExternalLink size={12} className="shrink-0" />
                  </a>
                </Button>
              ) : (
                <span key={i} className="text-gray-600">{part}</span>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
