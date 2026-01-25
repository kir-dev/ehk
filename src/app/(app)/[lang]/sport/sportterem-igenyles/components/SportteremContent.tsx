import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const SportteremContent = () => {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-slate-700 uppercase mb-4">
        Tornaterem Igénylési Tájékoztató
      </h1>

      {/* Introduction */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Általános tudnivalók
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>A <strong>Budapesti Műszaki és Gazdaságtudományi Egyetem Sport Divíziója és az Egyetemi Hallgatói Képviselet (EHK)</strong> lehetőséget biztosít a sportolni vágyó csapatoknak és baráti köröknek, hogy kedvezményesen edzzenek az egyetem sportlétesítményeiben.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Elérhető Sportlétesítmények
            </h3>
            <div className="space-y-2 text-gray-700">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>BME Sportközpont</strong> (Bertalan Lajos utca 4-6. ÉL Épület) termeire.</li>
                <li><strong>Kollégiumi tornatermek:</strong> Kármán Tódor Kollégium és Bercsényi 28-30 Kollégium tornatermei.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Kedvezményes Terembérlés Feltétele
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>Kedvezményes terembérlésre akkor van lehetőség, ha a pályázatot leadó csapat <strong>80%-a BME nappali tagozatos hallgatói jogviszonnyal</strong> rendelkezik az adott szemeszterben.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process & Deadlines */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Igénylés Menete és Határidők
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>Az igényléseket a megadott online űrlapon (link a kiírásban) lehet leadni. A kitöltött taglistákat (minta szintén elérhető a kiírásban megadott linken) e-mailben várjuk a <strong>bmesport@umsz.bme.hu</strong> címre a kiírásban meghatározott határidőig.</p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                <strong> Fontos! </strong>A hiányosan vagy a határidő után beérkező igényléseket nem áll módunkban elfogadni.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Data */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Kötelezően Megadandó Adatok az Igénylés Során
            </h3>
            <p>Az igénylés leadásánál a csapatoknak kötelező megadni:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Csapatnév, Sportág</li>
              <li>Csapatvezető neve, elérhetőségei (ő a felelős a csapatért az egyetemi sportlétesítményekben)</li>
              <li>Csapatnévsor, feltüntetve az aktív BME-s hallgatói jogviszonnyal rendelkezők körét</li>
              <li>Melyik teremben/termekben szeretne sportolni a csapat </li>
              <li>Hány alkalommal edzene egy héten a csapat </li>
              <li>Melyik napokon, melyik idősávok felelnek meg a csapat számára (lehetőleg minél tágabb időintervallumot megadva) </li>
              <li>A csapat 3 legjobb eredménye az előző 2 évben (ha van) </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Selection Criteria */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Elbírálás és Előnyben Részesítés
            </h3>
            <p>Az igénylések elbírálását a BME Üzemeltető és Műszaki Szolgáltató Kft. Sport Divíziója végzi, az EHK egyetértésével</p>
            <p><strong>Túljelentkezés esetén</strong> a bíráló bizottság a következő szempontok alapján részesíti előnyben a csapatokat:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A minél több <strong>aktív hallgatói jogviszonyú</strong> műegyetemistát tartalmazó csapatok.</li>
              <li>A sportversenyeken <strong>eredményesebben</strong> szereplő csapatok.</li>
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                <strong> Fontos! </strong>A terembeosztás eredményével kapcsolatban fellebbezésre lehetőség nincs.
              </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules & usage */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Tudnivalók a Bérlésről és Használatról
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Terembeosztás:</strong> A végleges terembeosztás a kiírásban megadott napon válik elérhetővé, és minden igénylőt e-mailben értesítenek.</li>
              <li><strong>Sportolói kör:</strong> Az adott idősávban csak az igénylés során leadott listán szereplő személyek sportolhatnak. A sportolásra mindig vigyenek magukkal fényképes igazolványt. Ha olyan személy sportol a csapattal, aki nincs rajta a listán, a csapat elveszti a teremre való jogosultságát, és az előre kifizetett bérleti díj visszafizetésére nincs kötelezettség. A névsor minimális mértékben módosítható a szemeszter közben, amit előre jelezni kell a Sport Divízió felé a <strong>bmesport@umsz.bme.hu</strong> címen.</li>
              <li><strong>Cipőhasználat:</strong> A sportlétesítmények pályáira csak <strong>világos talpú és nyomot nem hagyó</strong> sportcipőben lehet belépni.</li>
              <li><strong>Házirend:</strong> A házirend betartása kötelező.</li>
              <li><strong>Kollégiumi Kulcsfelelősök:</strong> Azoknak a csapatoknak, akik kollégiumi tornateremben szeretnének sportolni, maximum 4 kulcsfelelőst kell megjelölniük a taglistán, akik jogosultságot kapnak a kulcsok felvételére a kollégiumok portáin.</li>
              <li><strong>Kármán/Bercsényi Tornatermek:</strong> A Kármán teremben főként edzés jellegű teremfoglalások lehetségesek, a mérkőzésekkel járó edzéseket a Bercsényi tornateremben javasolt tervezni.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Costs */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Bérleti Díjak (Tájékoztató jelleggel)
            </h3>
            <p>A BME hallgatói kedvezményesen vehetik igénybe a sportlétesítményeket. A bérleti díjakat a Sport Divíziónak kell befizetni. A Sport Divízió tájékoztatja az érintett csapatokat a befizetéssel kapcsolatos információkról.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kollégiumi Tornatermek:</strong>Különböző bruttó óradíjak érvényesek főidőben (H-P 6:00-8:00 és 14:00-24:00) és főidőn kívül/éjjel.</li>
              <li><strong>BME Sportközpont Termei:</strong>A tornatermek és az Aréna terem ára a résztvevők számától függően sávosan emelkedik. A tatami és a multifunkcionális terem esetén fix óradíj vonatkozik a maximális létszámra.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Kapcsolattartás */}
      <Card className="group hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
              Kapcsolattartás
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>Bármilyen felmerülő kérdéssel forduljanak a BME Üzemeltető és Műszaki Szolgáltató Kft. (BME ÜMSZ Kft.) Sport Divíziójához a <strong>bmesport@umsz.bme.hu</strong> e-mail címen.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-gray-400 italic mt-4">*A pontos információkat mindig az adott félévben kiírt pályázat tartalmazza.</p>

    </div>
  );
};