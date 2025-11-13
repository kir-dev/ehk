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
                <p className="text-gray-700 text-lg richtext">{t(`Tanulmányi ösztöndíjban részesülhet az a hallgató, aki államilag támogatott vagy állami (rész)ösztöndíjas képzési formában vesz részt.`,
                    ``)}</p>
                <p className="text-gray-700 text-lg richtext">{t(`A tanulmányi ösztöndíjra nem kell pályázni, egy meghatározott elvrendszer alapján ítélik meg. Az összeg megállapításakor törekednek arra, hogy a homogén hallgatói csoportokon belül a jogosult hallgatók maximum 50%-a részesüljön ösztöndíjban. A tanulmányi ösztöndíj minimumösszege a hallgatói normatíva 5%-a (jelenleg 8 330 Ft).`,
                    ``)}</p>
              <p className="text-gray-700 text-lg richtext">
                {t(
                  `Az ösztöndíj odaítélésének alapja az ösztöndíjindex a kreditindex vagy a korrigált kreditindex lehet, amelyet a Kari Hallgatói Képviselet határoz meg a dékán véleményének figyelembevételével. A hallgatókat a homogén hallgatói csoportonként az előző aktív tanulmányi eredmény szerint rangsorolják. Az elsőéves mesterszakos hallgatók esetében az ösztöndíj odaítélésének alapja a felvételi pontszámuk, a felvételi vizsgán elért pontok száma, vagy ezek kombinációja lehet. Más felsőoktatási intézményből, szakról, képzési formáról átvett, illetve külföldi részképzésen részt vett hallgató tanulmányi eredményének megállapításáról a Kari Tanulmányi Bizottság dönt. Elsőéves alapszakos és osztatlan képzéses hallgatók csak a második félévtől kezdődően részesülhetnek tanulmányi ösztöndíjban.`,
                  ``
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
