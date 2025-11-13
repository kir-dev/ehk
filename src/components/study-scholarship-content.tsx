"use client";

import { useLanguage } from "./LanguageProvider";
import { Card, CardContent } from "./ui/card";

export default function LanguageEducationContent() {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);
  return (
    <div className="container mx-auto lg:px-4 px-2 py-8">
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex not-md:flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <p className="text-gray-700 text-lg richtext">
                {t(
                  `Tanulmányi ösztöndíjban részesülhet az a hallgató, aki államilag támogatott vagy állami (rész)ösztöndíjas képzési formában vesz részt.`,
                  `A student may be granted a academic scholarship if they are enrolled in a state-funded or state (partial) scholarship programme.`
                )}
              </p>
              <p className="text-gray-700 text-lg richtext">
                {t(
                  `A tanulmányi ösztöndíjra nem kell pályázni, egy meghatározott elvrendszer alapján ítélik meg. 
                  Az összeg megállapításakor törekednek arra, hogy a homogén hallgatói csoportokon belül a jogosult hallgatók maximum 50%-a részesüljön ösztöndíjban. 
                  A tanulmányi ösztöndíj minimumösszege a hallgatói normatíva 5%-a (jelenleg 8 330 Ft).`,
                  `There is no need to apply for the academic scholarship, as it is awarded on the basis of a defined set of principles. 
                  When determining the amount, an effort is made to ensure that within each homogeneous student group, a maximum of 50% of eligible students receive the scholarship. 
                  The minimum amount of the academic scholarship is 5% of the student normative grant (currently HUF 8,330).`
                )}
              </p>
              <p className="text-gray-700 text-lg richtext">
                {t(
                  `Az ösztöndíj odaítélésének alapja az ösztöndíjindex a kreditindex vagy a korrigált kreditindex lehet, amelyet a Kari Hallgatói Képviselet határoz meg a dékán véleményének figyelembevételével. 
                  A hallgatókat a homogén hallgatói csoportonként az előző aktív tanulmányi eredmény szerint rangsorolják. 
                  Az elsőéves mesterszakos hallgatók esetében az ösztöndíj odaítélésének alapja a felvételi pontszámuk, a felvételi vizsgán elért pontok száma, vagy ezek kombinációja lehet. 
                  Más felsőoktatási intézményből, szakról, képzési formáról átvett, illetve külföldi részképzésen részt vett hallgató tanulmányi eredményének megállapításáról a Kari Tanulmányi Bizottság dönt. 
                  Elsőéves alapszakos és osztatlan képzéses hallgatók csak a második félévtől kezdődően részesülhetnek tanulmányi ösztöndíjban.`,
                  `The basis for awarding the scholarship may be the scholarship index, the credit index or the corrected credit index, as determined by the Faculty Student Union in consultation with the Dean. 
                  Students are ranked within each homogeneous student group according to their academic performance in the previous active semester. 
                  For first-year Master’s students, the basis for awarding the scholarship may be their admission score, the number of points achieved at the entrance examination, or a combination of these. 
                  The Faculty Study Committee decides on the evaluation of academic results of students who have transferred from another higher education institution, programme or form of study, as well as those who have participated in a partial study programme abroad. 
                  First-year Bachelor’s and single-cycle students may only receive a academic scholarship from the second semester onwards.`
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
