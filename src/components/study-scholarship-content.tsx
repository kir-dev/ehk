"use client";

import { ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { Card, CardContent } from "./ui/card";

export default function LanguageEducationContent() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);
  return (
    <div className="flex flex-col items-center lg:px-4 px-2 py-8 gap-4 md:gap-6">
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <Paragraph>
                {t(
                  `A tanulmányi ösztöndíj az egyik legfontosabb tanulmányi alapú juttatás, amelyet azok a hallgatók kaphatnak, akik az előző aktív félévükben kiemelkedő tanulmányi eredményt értek el.`,
                  `The academic scholarship is one of the most important merit-based financial grants, awarded to students who have achieved outstanding academic results in their previous active semester.`
                )}
              </Paragraph>
              <h3 className="font-bold text-xl leading-tight text-gray-900">
                {t(
                  "Kik kaphatnak tanulmányi ösztöndíjat?",
                  "Who can receive an academic scholarship?"
                )}
              </h3>
              <Paragraph>
                {t(
                  `A juttatásra az Egyetem állami ösztöndíjas, teljes idejű képzésben részt vevő hallgatók jogosultak és a hallgatók legfeljebb 50%-a részesülhet belőle.`,
                  `The grant is available to state-funded, full-time students of the University, and up to 50% of students may receive it.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A támogatás egy tanulmányi félévre, azaz 5 hónapos időtartamra szól.`,
                  `The scholarship is awarded for one academic semester, i.e. a period of five months.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `Az ösztöndíjra való jogosultság és az összegek meghatározása az előző lezárt aktív félév tanulmányi eredményei alapján történik. A félév szüneteltetése nem zár ki a pályázásból: ilyenkor az utolsó aktív félév eredményét veszik figyelembe.`,
                  `Eligibility and the amount of the scholarship are determined on the basis of the academic results of the most recently completed active semester. A suspended semester does not exclude a student from eligibility; in such cases, the results of the last active semester are taken into account.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `Fontos, hogy az elsőéves hallgatók (alap- vagy osztatlan képzésben) az első megkezdett félévükben még nem kaphatnak ösztöndíjat.`,
                  `It is important to note that first-year students (in Bachelor’s or single-cycle programmes) cannot receive an academic scholarship in their first semester.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A tanulmányi ösztöndíj párhuzamos hallgatói jogviszony esetén is külön-külön elnyerhető, de ugyanazon teljesítmény alapján csak egyszer adható.`,
                  `If a student is enrolled in parallel programmes, the scholarship may be awarded separately for each programme; however, it may be granted only once for the same academic performance.`
                )}
              </Paragraph>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex not-md:flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900">
                {t(
                  "Hogyan számítják az ösztöndíjat?",
                  "How is the scholarship calculated?"
                )}
              </h3>
              <Paragraph>
                {t(
                  `A tanulmányi ösztöndíj alapja az ösztöndíjindex, amely az előző aktív félév teljesítménye alapján kerül kiszámításra.`,
                  `The basis of the academic scholarship is the scholarship index, calculated from the performance achieved in the previous active semester.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `Ez lehet: kreditindex vagy korrigált kreditindex, amely a kari szabályozástól függ.`,
                  `Depending on the faculty’s regulations, this may be the credit index or the corrected credit index.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A hallgatók teljesítményét úgynevezett Homogén Hallgatói Csoportokon belül (a továbbiakban: HHCS) hasonlítják össze, amelyek kialakulhatnak például évfolyamonként, szakonként vagy specializációnként.`,
                  `Students’ performance is compared within so-called Homogeneous Student Groups (HHCS), which may be formed according to academic year, programme, or specialisation.`
                )}
              </Paragraph>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex not-md:flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900">
                {t(
                  "Ki dönt a tanulmányi ösztöndíjról?",
                  "Who decides on the academic scholarship?"
                )}
              </h3>
              <Paragraph>
                {t(
                  `A Kari Hallgatói Képviseletek felelnek az ösztöndíj lebonyolításáért. Ők határozzák meg a pontos kari szabályokat, illetve hozzák meg az elsőfokú döntést.`,
                  `The Faculty Student Union is responsible for the administration of the scholarship. They determine the specific faculty regulations and make the first-instance decision.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `Az eredményeket a HK a döntést követő 5 munkanapon belül közzéteszi a honlapján. A közzétett lista tartalmazza a HHCS-k ösztöndíjindexeit és az azokhoz tartozó összegeket.`,
                  `The results are published on the Faculty Student Union’s website within five working days following the decision. The published list includes the scholarship indices of each HHCS and the corresponding scholarship amounts.`
                )}
              </Paragraph>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex not-md:flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900">
                {t(
                  "TJSZ ide vonatkozó passzusai",
                  "Relevant passages from the Student Financial Regulations (TJSZ)"
                )}
              </h3>
              <Paragraph>
                {t(
                  `Tanulmányi ösztöndíjban az Egyetem állami ösztöndíjas, teljes idejű képzésében részt vevő hallgatóinak legfeljebb 50%-a részesülhet, oly módon, hogy az egyes hallgatóknak megállapított tanulmányi ösztöndíj havi összegének el kell érnie a hallgatói normatíva 5%-ának megfelelő összeget.`,
                  `Up to 50% of full-time, state-funded students at the University may receive an academic scholarship, and the monthly amount awarded to each student must reach at least 5% of the student normative grant.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A tanulmányi ösztöndíj odaítélésekor a hallgatókat Homogén Hallgatói Csoportokba kell sorolni. A besorolás egy adott félévre szól. A Homogén Hallgatói Csoportok kialakíthatóak szakonként, évfolyamonként, specializációnként, szakirányonként, mellékspecializációnként, modulonként, ismeretkörönként, ágazatonként, egyéb önálló tantervi egységenként vagy adott kredit mennyiséget teljesített csoportonként, illetve ezek kombinációjaként.`,
                  `When awarding the academic scholarship, students must be assigned to Homogeneous Student Groups for a given semester. These groups may be established according to programme, academic year, specialisation, field of study, sub-specialisation, module, subject area, branch, or other curriculum unit, or as a combination of these criteria.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A tárgyfélévet megelőző félév, vagy félévek szünetelése a tanulmányi ösztöndíj jogosultságból nem kizáró ok. Ez esetben az utolsó aktív félév tanulmányi eredményét kell figyelembe venni.`,
                  `The suspension of the semester(s) preceding the subject semester does not exclude eligibility for the academic scholarship. In such cases, the results of the last active semester must be taken into account.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A kari hallgatói képviselet a kari elosztás további elveit (beleértve a más felsőoktatási intézményből, illetve az Egyetemen belül más karról, szakról, képzési formából nappali tagozatra átvett, az előző félév(ek)ben külföldi részképzésen részt vett hallgató tanulmányi eredménye megállapításának módjáról), az eljárási szabályokat, határidejét az ösztöndíj odaítélését megelőző szorgalmi időszak kezdetéig meghatározza, és a KTB egyetértése után nyilvánosságra hozza honlapján.`,
                  `The Faculty Student Union defines the further principles of faculty-level allocation (including the procedure for evaluating the academic results of students transferred from another higher education institution or faculty, from a different programme or study form, or those who participated in partial studies abroad), as well as the procedural rules and deadlines. These are to be finalised by the beginning of the semester preceding the awarding period and published on the faculty’s website following the approval of the Faculty Study Committee (KTB).`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A tanulmányi ösztöndíjat a kari hallgatói képviselet koordinálja, bírálja el, meghozza az elsőfokú döntést és ad róla tájékoztatást.`,
                  `The Faculty Student Union is responsible for coordinating, evaluating, and deciding on the academic scholarship, and for providing official notification of the results.`
                )}
              </Paragraph>
              <Paragraph>
                {t(
                  `A tanulmányi ösztöndíj eredményét a kari hallgatói képviselet a döntést követő 5 munkanapon belül honlapján hozza nyilvánosságra. Az eredménynek tartalmaznia kell HHCS-nként az ösztöndíjindexet és a hozzá tartozó ösztöndíj összegét.`,
                  `The results of the academic scholarship are published on the Faculty Student Union’s website within five working days after the decision. The published results must include, for each HHCS, the scholarship index and the corresponding amount of the scholarship.`
                )}
              </Paragraph>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Paragraph({children} : {children:ReactNode}){
  return(<p className="max-w-[80ch] text-gray-700 text-lg richtext text-justify">
    {children}
  </p>);
}