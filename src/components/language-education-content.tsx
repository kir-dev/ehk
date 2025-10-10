"use client";

import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
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
              <h3 className="font-bold text-xl leading-tight text-gray-900">
                {t(
                  "Minden, ami nyelv, egy helyen!",
                  "No regulations available at the moment."
                )}
              </h3>
              <p className="text-gray-700 text-lg richtext">
                {t(
                  `Az Idegen Nyelvi Központ 6 nyelven, több szinten kínál általános,
              szaknyelvi és vizsgafelkészítő kurzusokat. Itt kredites és 0-kredites
              kurzusok felvétére is van lehetőséged!
              Ha nyelvvizsgázni szeretnél, lehetőséged van itt helyben, a BME-n is
              nyelvvizsgát letenned!
              Ha már mindez megvan, de még mindig fejlődni szeretnél, akkor
              választhatsz a Központ fordító és tolmács szakirányú továbbképzései
              közül, ami újabb munkalehetőséget is ad.
              A részleteket megtalálod itt: `,
                  "No regulations available at the moment."
                )}
                <a href="http://www.inyk.bme.hu/">www.inyk.bme.hu</a>
              </p>
            </div>
            <div className="">
              <Image
                src={"/nyelviskola.png"}
                alt={"Nyelviskola"}
                width={2000}
                height={500}
                className="transition-opacity duration-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
