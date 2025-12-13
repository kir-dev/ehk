"use client"
import RegularSocialScholarshipHeader from "@/app/(app)/szocialis-osztondijak/components/RegularSocialScholarshipHeader";
import {Card, CardContent} from "@/components/ui/card";
import {useLanguage} from "@/components/common/LanguageProvider";
import {Button} from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

export default function SocialScholarshipPage() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
    const translations = {
        regularSocialScholarshipTitleHu : "Rendszeres szociális ösztöndíj",
        regularSocialScholarshipTitleEn : "Regular Grant Based on Social Needs",
        regularSocialScholarshipListTitleHu: "Rendszeres szociális ösztöndíjra az a hallgató pályázhat,",
        regularSocialScholarshipListTitleEn: "A student may apply for the Regular Social Scholarship if they,",
        regularScholarshipListItemsHu: [
            "aki teljes idejű alap-, mester-, osztatlan vagy doktori képzésben vesz részt és",
            "államilag támogatott vagy állami ösztöndíjas képzési formában vesz részt, vagy tanulmányait államilag támogatott vagy állami ösztöndíjas képzési formában kezdte meg és az adott szakon, szakképzésben megkezdett féléveinek száma alapján jogosult lenne államilag támogatott képzésben való részvételre.",
        ],
        regularScholarshipListItemsEn: [
            "are enrolled in a full-time bachelor’s, master’s, single-cycle, or doctoral program, and",
            "are studying in a state-funded or state scholarship-funded form of education, or began their studies in such a form and, based on the number of semesters started in the given program, would still be eligible to participate in a state-funded program."
        ],
        regularSocialScholarshipDescriptionHuSection1 : " A képzéseinek számától függetlenül egy pályázó egy pályázatot nyújthat be az adott ösztöndíjra. A pályázatot a ",
        regularSocialScholarshipDescriptionHuSection2 : " (Műegyetemi Egységes Pályázati és Elbírálási Rendszer) felületén lehet leadni a pályázási időszakban.",
        moreInfoSocialScholarshipDescriptionHu : "Bővebb információkat az Egyetemi Szociális Bizottság (ESZB) honlapján olvashattok: ",
        regularSocialScholarshipDescriptionEnSection1: " Regardless of the number of programs they are enrolled in, each applicant may submit only one application for this scholarship. The application must be submitted through the ",
        regularSocialScholarshipDescriptionEnSection2: " (Unified Application and Evaluation System of the Budapest University of Technology and Economics) platform during the application period.",
        moreInfoSocialScholarshipDescriptionEn: "For more information, please visit the website of the University Social Committee (ESZB): ",

        //Exceptional scholarship for social needs
        exceptionalSocialScholarshipTitleHu : "Rendkívüli szociális ösztöndíj",
        exceptionalSocialScholarshipTitleEn : "Exceptional Grant Based on Social Needs",
        exceptionalSocialScholarshipDescriptionHuSection1 : "A Rendkívüli szociális ösztöndíjra azon hallgatóknak van lehetősége pályázni, akik váratlan esemény bekövetkeztében szociálisan rászorulóvá váltak, akiknek szociális helyzetében váratlan romlás történt.",
        exceptionalSocialScholarshipDescriptionHuSection2: "Az ösztöndíj egy egyszeri juttatást jelent. A hallgatónak lehetősége van egy félévben több pályázat leadására is, amennyiben több esemény is indokolja ezt, de eseményenként csak egyszer lehet pályázni. A pályázatot a ",
        exceptionalSocialScholarshipDescriptionHuSection3 : " (Műegyetemi Egységes Pályázati és Elbírálási Rendszer) felületén lehet leadni.",
        exceptionalSocialScholarshipDescriptionHuSection4 : "A pályázat leadása előtt érdemes egyeztetni a mindenkori Egyetemi Szociális Bizottság elnökével a megfelelő dokumentumok beszerzésével kapcsolatban.",
        exceptionalSocialScholarshipDescriptionEnSection1: "Students who have become socially disadvantaged due to an unexpected event, or whose social situation has unexpectedly deteriorated, are eligible to apply for the Exceptional Social Scholarship.",
        exceptionalSocialScholarshipDescriptionEnSection2: "The scholarship is a one-time grant. Students may submit multiple applications within a semester if several events justify it, but only one application may be submitted per event. The application must be submitted through the ",
        exceptionalSocialScholarshipDescriptionEnSection3: "(Unified Application and Evaluation System of the Budapest University of Technology and Economics) platform.",
        exceptionalSocialScholarshipDescriptionEnSection4: "Before submitting the application, it is recommended to consult with the current president of the University Social Committee regarding the required documents.",
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="container mx-auto px-4 py-8">
                <RegularSocialScholarshipHeader   />
                <Card className="group hover:shadow-md transition-all duration-300 mb-6">
                    <CardContent className="p-3 md:p-6">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <div>
                                <h3 className="font-bold text-xl leading-tight uppercase text-gray-900 group-hover:text-[#862633] transition-colors">
                                    {t(translations.regularSocialScholarshipTitleHu, translations.regularSocialScholarshipTitleEn )}
                                </h3>
                            </div>
                            <div className="pt-6  prose max-w-none text-gray-700 richtext">
                                <p>{t(translations.regularSocialScholarshipListTitleHu, translations.regularSocialScholarshipListTitleEn)}</p>
                                {lang === 'EN' && (
                                    <ol className="pt-6 space-y-4 list-decimal list-inside">
                                        {translations.regularScholarshipListItemsEn.map((item, i) => (
                                            <li key={i}>
                                                {item}
                                            </li>))}
                                    </ol>
                                )}
                                {lang === 'HU' && (
                                    <ol className="pt-6 space-y-3 pl-8 list-decimal list-inside">
                                        {translations.regularScholarshipListItemsHu.map((item, i) => (
                                            <li key={i}>
                                                {item}
                                            </li>))}
                                    </ol>
                                )}
                                <p className="pt-6">
                                    {t(translations.regularSocialScholarshipDescriptionHuSection1, translations.regularSocialScholarshipDescriptionEnSection1)}
                                    <a href="https://mueper.bme.hu"
                                       className="no-underline text-ehk-light-red hover:text-ehk-dark-red hover:underline">MŰEPER</a>
                                    {t(translations.regularSocialScholarshipDescriptionHuSection2, translations.regularSocialScholarshipDescriptionEnSection2)}
                                </p>
                                <p className="pt-6">
                                    {t(translations.moreInfoSocialScholarshipDescriptionHu, translations.moreInfoSocialScholarshipDescriptionEn)}
                                </p>
                                <Button className="cursor-pointer w-48 mt-4">
                                    <ExternalLink/>
                                    {lang === 'EN' ? "ESZB website" : "ESZB honlapja"}
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
                                    {t(translations.exceptionalSocialScholarshipTitleHu, translations.exceptionalSocialScholarshipTitleEn )}
                                </h3>
                            </div>
                            <div className="pt-6  prose max-w-none text-gray-700 richtext">
                                <p>
                                    {t(translations.exceptionalSocialScholarshipDescriptionHuSection1, translations.exceptionalSocialScholarshipDescriptionEnSection1)}
                                </p>
                                <p className="pt-6">
                                    {t(translations.exceptionalSocialScholarshipDescriptionHuSection2,translations.exceptionalSocialScholarshipDescriptionEnSection2)}
                                    <a href="https://mueper.bme.hu"
                                       className="no-underline text-ehk-light-red hover:text-ehk-dark-red hover:underline">MŰEPER</a>
                                    {t(translations.exceptionalSocialScholarshipDescriptionHuSection3,translations.exceptionalSocialScholarshipDescriptionEnSection3)}
                                </p>
                                <p className="pt-6" >
                                    {t(translations.exceptionalSocialScholarshipDescriptionHuSection4, translations.exceptionalSocialScholarshipDescriptionEnSection4)}
                                </p>

                                <p className="pt-6">
                                    {t(translations.moreInfoSocialScholarshipDescriptionHu, translations.moreInfoSocialScholarshipDescriptionEn)}
                                </p>
                                <Button className="cursor-pointer w-48 mt-4">
                                    <ExternalLink/>
                                    {lang === 'EN' ? "ESZB website" : "ESZB honlapja"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}