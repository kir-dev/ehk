import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, CalendarCheck, FileCheck2, CheckCircle, GraduationCap, ExternalLink } from "lucide-react";
import React from "react";
import { useTranslate } from "@/hooks/useTranslate";

// InfoCard komponens az egységes stílushoz
function InfoCard({ title, icon: Icon, children }: { title: string; icon?: any; children: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-gray-200 gap-0 py-0 overflow-hidden">
      <CardHeader className="py-3 px-5 border-b border-gray-100 bg-gray-50/50 flex flex-row items-center gap-3">
        {Icon && <Icon className="text-ehk-light-red" size={20} />}
        <CardTitle className="text-lg leading-none m-0">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

export function GettingStartedSection({ content, lang }: { content: any, lang: string }) {
  const moreInfoText = lang === "hu" ? "További információ" : "More information";
  return (
    <section id="getting-started" className="scroll-mt-28 space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 shrink-0 shadow-sm">
          <School className="text-ehk-dark-red" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          {content.nav.getting_started}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title={content.getting_started.admission.title} icon={School}>
          <p className="mb-4 text-sm text-gray-600 leading-relaxed font-medium">{content.getting_started.admission.description}</p>
          <ul className="space-y-3">
            {content.getting_started.admission.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-ehk-dark-red mt-2 shrink-0"></span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title={content.getting_started.application.title} icon={CalendarCheck}>
          <ul className="space-y-3">
            {content.getting_started.application.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </InfoCard>
      </div>

      <Card className="shadow-sm border-gray-200 overflow-hidden gap-0 py-0">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-3 px-5">
          <div className="flex items-center gap-3">
            <FileCheck2 className="text-ehk-dark-red" size={22} />
            <CardTitle className="text-xl leading-none">{content.getting_started.administrative_tasks.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="space-y-0">
            {content.getting_started.administrative_tasks.items.map((item: string, i: number) => {
              const parts = item.split(/(https?:\/\/[^\s]+)/g);
              const isLast = i === content.getting_started.administrative_tasks.items.length - 1;
              return (
                <div key={i} className={`flex items-start gap-4 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <CheckCircle size={16} strokeWidth={3} />
                  </div>
                  <div className="text-sm font-medium text-gray-700 leading-relaxed pt-1">
                     {parts.map((part, j) => 
                       part.match(/https?:\/\/[^\s]+/) ? (
                         <Button key={j} variant="outline" size="sm" asChild className="mx-1 hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]">
                           <a href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                             {moreInfoText} <ExternalLink size={12} />
                           </a>
                         </Button>
                       ) : (
                         <span key={j} dangerouslySetInnerHTML={{ __html: part }} />
                       )
                     )}

                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200 overflow-hidden gap-0 py-0">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-3 px-5">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl leading-none">{content.getting_started.official_documents.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.getting_started.official_documents.items.map((item: string, i: number) => {
               const formatted = item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 border-b-2 border-red-100 pb-0.5">$1</strong>');
               const parts = formatted.split(/(https?:\/\/[^\s]+)/g);
               return (
                 <div key={i} className="flex flex-col border border-gray-100 bg-gray-50/30 rounded-xl p-4 hover:border-red-200 hover:shadow-sm transition-all h-full">
                   <p className="text-sm text-gray-600 leading-relaxed">
                     {parts.map((part, j) => 
                       part.match(/https?:\/\/[^\s]+/) ? (
                         <Button key={j} variant="outline" size="sm" asChild className="mt-2 hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]">
                            <a href={part} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                               {moreInfoText} <ExternalLink size={12} />
                            </a>
                         </Button>
                       ) : (
                         <span key={j} dangerouslySetInnerHTML={{ __html: part }} />
                       )
                     )}
                   </p>
                 </div>
               );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200 gap-0 py-0 overflow-hidden">
          <CardHeader className="py-3 px-5 border-b border-gray-100 bg-gray-50/50 flex flex-row items-center gap-3">
               <GraduationCap className="text-gray-500" size={20} />
               <CardTitle className="text-lg leading-none m-0">{content.getting_started.academic_affairs.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <ul className="space-y-3">
              {content.getting_started.academic_affairs.items.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-amber-200 bg-amber-50/50 gap-0 py-0 overflow-hidden">
          <CardHeader className="py-3 px-5 border-b border-amber-100 bg-amber-100/30">
            <CardTitle className="text-amber-900 text-lg leading-none m-0">{content.getting_started.tasks_by_sept_1.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <ul className="space-y-3">
              {content.getting_started.tasks_by_sept_1.items.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-amber-800 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
