import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Building, Mail, ExternalLink, Music, Rocket } from "lucide-react";

export function StudentLifeSection({ content, lang }: { content: any; lang: string }) {
  return (
    <section id="student-life" className="scroll-mt-28 space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 shrink-0 shadow-sm">
          <Users className="text-ehk-dark-red" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          {content.nav.student_life}
        </h2>
      </div>

      {/* EHK Card */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            {content.student_life.ehk.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-700 mb-8 leading-relaxed font-medium">
              {content.student_life.ehk.paragraphs.map((p: string, i: number) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />
              ))}
          </div>
          
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 mb-6">
            <p className="font-bold text-sm text-gray-800 mb-4 uppercase tracking-wider">{content.student_life.ehk.list_title}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.student_life.ehk.items.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 items-start">
                  <CheckCircle size={16} className="text-ehk-dark-red shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 items-center text-sm font-semibold">
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 border border-gray-200 py-2 px-4 rounded-full text-gray-600">
               <span className="uppercase text-xs tracking-widest opacity-60 mr-1">E-mail:</span>
               <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                  <a href="mailto:international@bmeehk.hu" className="inline-flex items-center gap-1.5 break-all">
                    <Mail size={12} /> international@bmeehk.hu
                  </a>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Councils */}
      <Card className="shadow-sm border-gray-200 bg-gray-50/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Building size={20} className="text-gray-400" />
            {content.student_life.faculty_councils.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {content.student_life.faculty_councils.items.map((council: { name: string; website: string; email: string }, i: number) => (
              <div key={i} className="bg-white border text-center border-gray-200 rounded-xl p-4 hover:border-ehk-light-red hover:shadow-md transition-all group flex flex-col items-center">
                <h4 className="font-bold text-gray-800 mb-3 text-sm leading-tight group-hover:text-ehk-dark-red transition-colors">{council.name}</h4>
                <div className="mt-auto flex w-full gap-2">
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                    <a href={council.website} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-1.5 text-xs font-semibold">
                      {lang === "hu" ? "További információ" : "More information"} <ExternalLink size={12} />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                    <a href={`mailto:${council.email}`} title={council.email} className="flex justify-center items-center gap-1.5 text-xs font-semibold">
                      <Mail size={14} /> {lang === "hu" ? "E-mail" : "Email"}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professional Communities and Colleges */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-lg">{content.student_life.professional_communities_title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
            {content.student_life.organizations_intro}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200 h-full">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg flex items-center gap-2"><Rocket size={20} className="text-ehk-dark-red" />{content.student_life.mvk.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-gray-600 leading-relaxed">{content.student_life.mvk.description}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 h-full">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg flex items-center gap-2"><Building size={20} className="text-ehk-dark-red" />{content.student_life.professional_colleges.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-xs font-medium text-gray-500 mb-4 leading-relaxed">{content.student_life.professional_colleges.description}</p>
            <ul className="space-y-2 text-xs font-semibold text-gray-700">
              {content.student_life.professional_colleges.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-ehk-dark-red"></span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Culture and Student-led */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200 h-full">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg flex items-center gap-2"><Music size={20} className="text-ehk-dark-red" />{content.student_life.culture.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm text-gray-600 leading-relaxed font-medium">
              {content.student_life.culture.paragraphs.map((p: string, i: number) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 h-full">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg flex items-center gap-2"><Users size={20} className="text-ehk-dark-red" />{content.student_life.student_led.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-xs font-medium text-gray-500 mb-4 leading-relaxed">{content.student_life.student_led.description}</p>
            <ul className="space-y-2 text-xs font-semibold text-gray-700">
              {content.student_life.student_led.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-ehk-dark-red"></span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
