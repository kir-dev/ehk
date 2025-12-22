import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ExternalLink } from 'lucide-react';

export default async function SocialScholarshipPage({
  params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const social = dictionary.scholarships.social;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="container mx-auto px-4 py-8">
                <PageHeader title={social.regular.title} />
                <Card className="group hover:shadow-md transition-all duration-300 mb-6">
                    <CardContent className="p-3 md:p-6">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <div>
                                <h3 className="font-bold text-xl leading-tight uppercase text-gray-900 group-hover:text-[#862633] transition-colors">
                                    {social.regular.title}
                                </h3>
                            </div>
                            <div className="pt-6  prose max-w-none text-gray-700 richtext">
                                <p>{social.regular.list_title}</p>
                                <ol className="pt-6 space-y-4 list-decimal list-inside">
                                    {social.regular.list_items.map((item, i) => (
                                        <li key={i}>
                                            {item}
                                        </li>))}
                                </ol>
                                
                                <p className="pt-6">
                                    {social.regular.description_1}
                                    <a href="https://mueper.bme.hu"
                                       className="no-underline text-ehk-light-red hover:text-ehk-dark-red hover:underline">MŰEPER</a>
                                    {social.regular.description_2}
                                </p>
                                <p className="pt-6">
                                    {social.more_info}
                                </p>
                                <Button className="cursor-pointer w-48 mt-4">
                                    <ExternalLink/>
                                    {social.eszb_website}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="group hover:shadow-md transition-all duration-300">
                    <CardContent className="p-3 md:p-6">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <div>
                                <h3 className="font-bold text-xl leading-tight uppercase text-gray-900 group-hover:text-[#862633] transition-colors">
                                    {social.exceptional.title}
                                </h3>
                            </div>
                            <div className="pt-6  prose max-w-none text-gray-700 richtext">
                                <p>
                                    {social.exceptional.description_1}
                                </p>
                                <p className="pt-6">
                                    {social.exceptional.description_2}
                                    <a href="https://mueper.bme.hu"
                                       className="no-underline text-ehk-light-red hover:text-ehk-dark-red hover:underline">MŰEPER</a>
                                    {social.exceptional.description_3}
                                </p>
                                <p className="pt-6" >
                                    {social.exceptional.description_4}
                                </p>

                                <p className="pt-6">
                                    {social.more_info}
                                </p>
                                <Button className="cursor-pointer w-48 mt-4">
                                    <ExternalLink/>
                                    {social.eszb_website}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}