//import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

export default function LanguageEducationContent() {
  //const { lang } = useLanguage();
  //const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);
  return (
    <Card>
      <CardContent className="text-center py-12 grid grid-cols-2">
        <p className="col-span-1">
          <strong>Minden, ami nyelv, egy helyen!</strong>
          Az Idegen Nyelvi Központ 6&nbsp;nyelven, több szinten kínál általános,
          szaknyelvi és vizsgafelkészítő kurzusokat. Itt kredites és 0-kredites
          kurzusok felvétére is van lehetőséged!
          Ha nyelvvizsgázni szeretnél, lehetőséged van itt helyben, a BME-n is
          nyelvvizsgát letenned!
          Ha már mindez megvan, de még mindig fejlődni szeretnél, akkor
          választhatsz a Központ fordító és tolmács szakirányú továbbképzései
          közül, ami újabb munkalehetőséget is ad.
          A részleteket megtalálod itt:&nbsp;
          <a
            data-saferedirecturl="https://www.google.com/url?hl=hu&amp;q=http://www.inyk.bme.hu&amp;source=gmail&amp;ust=1507196724505000&amp;usg=AFQjCNEuuewQfB1GsRud3ozIMunvr_fQZg"
            href="http://www.inyk.bme.hu/"
            target="_blank"
          >
            www.inyk.bme.hu
          </a>
        </p>

        
          <Image className={"col-span-1"} src={"/nyelviskola.png"} alt={'Nyelviskola'} width={5000} height={500}/>
      </CardContent>
    </Card>
  );
}
