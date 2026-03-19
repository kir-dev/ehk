import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Mail, Globe, MapPin, Phone, ExternalLink, HeartHandshake, Camera, Coffee, PlaneTakeoff } from "lucide-react";

export function ContactsSection({ content, lang }: { content: any; lang: string }) {
  return (
    <section id="contacts-and-explore" className="scroll-mt-28 space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 shrink-0 shadow-sm">
          <HeartHandshake className="text-ehk-dark-red" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          {content.nav.contacts}
        </h2>
      </div>

      <Card className="shadow-sm border-gray-200 mb-8">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-2xl text-gray-800">{content.contacts_and_explore.important_contacts.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {content.contacts_and_explore.important_contacts.items.map((contact: { name: string; description: string; contacts: { label: string; value: string }[] }, i: number) => (
              <div key={i} className="border-l-2 border-gray-200 pl-6">
                <h4 className="text-lg font-bold text-gray-800 mb-2">{contact.name}</h4>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{contact.description}</p>
                <ul className="space-y-3 text-sm font-medium">
                  {contact.contacts.map((contactDetail: { label: string; value: string }, j: number) => {
                    let Icon = Info;
                    const labelLower = contactDetail.label.toLowerCase();
                    if (labelLower.includes('email') || labelLower.includes('e-mail')) Icon = Mail;
                    else if (labelLower.includes('web') || labelLower.includes('honlap')) Icon = Globe;
                    else if (labelLower.includes('location') || labelLower.includes('cím') || labelLower.includes('address')) Icon = MapPin;
                    else if (labelLower.includes('phone') || labelLower.includes('telefon')) Icon = Phone;

                    return (
                      <li key={j} className="flex items-start gap-4 text-gray-700">
                        <Icon size={18} className="text-ehk-dark-red shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">{contactDetail.label}</span>
                          <div className="text-gray-800 flex flex-wrap gap-2">
                             {contactDetail.value.match(/https?:\/\/[^\s]+/) ? (
                                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                                  <a href={contactDetail.value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 break-all">
                                    {contactDetail.value.replace('https://', '').replace('http://', '').replace(/\/$/, '')} <ExternalLink size={12} />
                                  </a>
                                </Button>
                              ) : contactDetail.value.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) ? (
                                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
                                  <a href={`mailto:${contactDetail.value}`} className="inline-flex items-center gap-1.5 break-all">
                                    <Mail size={12} /> {contactDetail.value}
                                  </a>
                                </Button>
                              ) : (
                                <span>{contactDetail.value}</span>
                              )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <PlaneTakeoff size={20} className="text-blue-500" />
                {content.contacts_and_explore.transport.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-medium">
              {content.contacts_and_explore.transport.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-gray-200 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <Coffee size={20} className="text-amber-600" />
                {content.contacts_and_explore.restaurants.title.split(':')[0]}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-3">{content.contacts_and_explore.restaurants.restaurants_title}</h4>
              <ul className="space-y-3">
                {content.contacts_and_explore.restaurants.restaurants_list.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-700 font-medium leading-snug flex items-start gap-2">
                      <span className="block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                      {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-3">{content.contacts_and_explore.restaurants.cafes_title}</h4>
              <ul className="space-y-3">
                {content.contacts_and_explore.restaurants.cafes_list.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-gray-700 font-medium leading-snug flex items-start gap-2">
                      <span className="block w-1.5 h-1.5 rounded-full bg-orange-300 mt-1.5 shrink-0"></span>
                      {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-gray-200 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
              <Camera size={20} className="text-emerald-500" />
              {content.contacts_and_explore.sights.title.split(':')[0]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pr-2">
            {content.contacts_and_explore.sights.items.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 border border-gray-100 p-2 rounded-lg font-medium">
                <MapPin size={14} className="text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
