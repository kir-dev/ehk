export interface NavigationItem {
  title: string;
  href: string;
  targetBlank: boolean;
  items: NavigationSubItem[];
}

export interface NavigationSubItem {
  label: string;
  href: string;
  targetBlank: boolean;
  subtitle?: string;
}

// Build navigation items based on current language
export function getNavigationItems(lang: string): NavigationItem[] {
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);
  const prefix = `/${lang.toLowerCase()}`;

  const link = (href: string) => {
      if (href.startsWith("http") || href.startsWith("#")) return href;
      return `${prefix}${href}`;
  };

  const items: NavigationItem[] = [
    {
      title: t("SZERVEZET", "ORGANIZATION"),
      href: link("/szervezet/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("ADMIN", "ADMIN"),
          subtitle: t("Adminisztrátori felület és tartalomkezelés", "Administrator panel and content management"),
          href: "/admin",
          targetBlank: true,
        },
        {
          label: t("Képviselők", "Representatives"),
          subtitle: t("Ismerd meg a képviselőtestület tagjait", "Meet the members of the representative body"),
          href: link("/kepviselok"),
          targetBlank: false,
        },
        {
          label: t("Emlékeztetők", "Reminders"),
          subtitle: t("Az ülések hivatalos emlékeztetői és jegyzőkönyvei", "Official reminders and minutes of the meetings"),
          href: link("/emlekeztetok"),
          targetBlank: false,
        },
        {
          label: t("Határozatok tára", "Decisions archive"),
          subtitle: t("Az EHK által elfogadott hivatalos határozatok gyűjteménye", "Collection of official decisions accepted by the EHK"),
          href: link("/hatarozatok-tara"),
          targetBlank: false,
        },
        {
          label: t("ESZB honlap", "ESZB website"),
          subtitle: t("Egyetemi Szociális Bizottság hivatalos oldala", "Official website of the University Social Committee"),
          href: "#",
          targetBlank: false,
        },
        {
          label: t("EDK honlap", "EDK website"),
          subtitle: t("Egyetemi Fegyelmi és Kollégiumi Bizottság", "University Disciplinary and Dormitory Committee"),
          href: "https://www.bmeedk.hu/page/1",
          targetBlank: true,
        },
        {
          label: t("Engedélyek", "Permissions"),
          subtitle: t("Közösségi terek és rendezvények engedélyezési folyamatai", "Licensing processes for community spaces and events"),
          href: link("/engedelyek"),
          targetBlank: false,
        },
      ],
    },
    {
      title: t("OKTATÁS", "EDUCATION"),
      href: link("/oktatas/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Szabályzatok", "Regulations"),
          subtitle: t("Tanulmányi és oktatási szabályzatok gyűjteménye", "Collection of academic and educational regulations"),
          href: link("/oktatasi-szabalyzatok"),
          targetBlank: false,
        },
        {
          label: "OMHV",
          subtitle: t("Oktatói Munka Hallgatói Véleményezése", "Student Feedback on Teaching Quality"),
          href: "https://ohv.bme.hu/hu",
          targetBlank: true,
        },
        {
          label: "Neptun",
          subtitle: t("Tanulmányi rendszer bejelentkezés", "Academic system login page"),
          href: "https://neptun.bme.hu/hallgatoi/login.aspx",
          targetBlank: true,
        },
        {
          label: t("Nyelvoktatás", "Language courses"),
          subtitle: t("Idegennyelvi kurzusok és nyelvvizsga információk", "Foreign language courses and exam information"),
          href: link("/nyelvoktatas"),
          targetBlank: false,
        },
        {
          label: t("Kisokosok/Segédletek", "Guides"),
          subtitle: t("Segédletek és útmutatók a tanulmányokhoz", "Guides and manuals for your academic studies"),
          href: link("/kisokosok"),
          targetBlank: false,
        },
      ],
    },
    {
      title: t("JUTTATÁS", "GRANTS"),
      href: link("/juttatas/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Tanulmányi ösztöndíjak", "Academic scholarships"),
          subtitle: t("Tanulmányi eredmények alapján járó juttatások", "Scholarships based on academic achievements"),
          href: link("/tanulmanyi-osztondij"),
          targetBlank: false,
        },
        {
          label: t("Szociális alapú ösztöndíjak", "Need-based scholarships"),
          subtitle: t("Rendszeres és rendkívüli szociális támogatások", "Regular and emergency social allowances"),
          href: link("/szocialis-osztondijak"),
          targetBlank: false,
        },
        {
          label: t("EHK ösztöndíjak", "EHK scholarships"),
          subtitle: t("Az EHK által kiírt egyedi ösztöndíjak és pályázatok", "Custom scholarships and grants created by EHK"),
          href: link("/ehk-osztondij"),
          targetBlank: false,
        },
        {
          label: t("Kifizetési időpontok", "Payout dates"),
          subtitle: t("Az ösztöndíjak havi kifizetésének hivatalos ütemezése", "Official monthly payout dates for scholarships"),
          href: link("/kifizetesi-idopontok"),
          targetBlank: false,
        },
        {
          label: t("Szabályzatok", "Regulations"),
          subtitle: t("Juttatási és térítési szabályzatok", "Scholarship and reimbursement regulations"),
          href: link("/juttatasi-szabalyzatok"),
          targetBlank: false,
        },
        {
          label: "MŰEPER",
          subtitle: t("Műegyetemi Egységes Pályázati és Elbírálási Rendszer", "Unified Student Application and Evaluation System"),
          href: "https://mueper.bme.hu",
          targetBlank: true,
        },
        {
          label: t("Esélyegyenlőség", "Equal opportunities"),
          subtitle: t("Támogatások fogyatékkal élő vagy hátrányos helyzetű hallgatóknak", "Support for students with disabilities or disadvantages"),
          href: "#",
          targetBlank: false,
        },
      ],
    },
    {
      title: t("KOLLÉGIUM", "DORMITORY"),
      href: link("/kollegium/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Bemutató", "Overview"),
          subtitle: t("Ismerd meg a BME kollégiumait", "Get to know the dormitories of BME"),
          href: link("/kollegium/kollegium-bemutato"),
          targetBlank: false,
        },
        {
          label: t("Felvételi tájékoztató", "Admission Information"),
          subtitle: t("Kollégiumi jelentkezés és felvételi pontrendszer", "Dormitory application and admission scoring system"),
          href: link("/kollegium/felveteli-tajekoztato"),
          targetBlank: false,
        },
        {
          label: t("Szabályzatok", "Regulations"),
          subtitle: t("Kollégiumi házirendek és működési szabályzatok", "Dormitory house rules and operating regulations"),
          href: link("/kollegium-szabalyzatok"),
          targetBlank: false,
        },
        {
          label: "KEFIR",
          subtitle: t("Kollégiumi Egységes Felvételi és Információs Rendszer", "Unified Dormitory Admission and Information System"),
          href: "https://kefir.bme.hu/login",
          targetBlank: true,
        },
      ],
    },
    {
      title: t("SPORT", "SPORTS"),
      href: link("/sport/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Sportpálya támogatás pályázat", "Sports field subsidy application"),
          subtitle: t("Pályázat sportpályák bérlésének támogatására", "Sports field rental subsidy application"),
          href: link("/sport/sportpalya-tamogatas"),
          targetBlank: false,
        },
        {
          label: t("Sportterem igénylés", "Gym booking request"),
          subtitle: t("Egyetemi sporttermek és létesítmények foglalása", "Gym booking request"),
          href: link("/sport/sportterem-igenyles"),
          targetBlank: false,
        },
        {
          label: t("Testnevelési Központ", "Department of Physical Education"),
          subtitle: t("Kötelező testnevelés és féléves kurzusok", "Department of Physical Education"),
          href: "https://testneveles.bme.hu",
          targetBlank: true,
        },
        {
          label: t("Sportközpont", "Sports Center"),
          subtitle: t("BME Sportközpont szolgáltatások és edzőtermek", "BME Sports Center services and gym facilities"),
          href: "https://bmesport.hu",
          targetBlank: true,
        },
      ],
    },
    {
      title: t("KÜLÜGY", "INTERNATIONAL AFFAIRS"),
      href: link("/kulugy/hirek"),
      targetBlank: false,
      items: [
        {
          label: "Erasmus",
          subtitle: t("Külföldi tanulmányi és szakmai gyakorlati mobilitás", "Study abroad and internship mobility programs"),
          href: link("/kulugy/erasmus"),
          targetBlank: false,
        },
        {
          label: "EELISA",
          subtitle: t("Európai egyetemi szövetség hallgatói lehetőségei", "Opportunities in the European university alliance"),
          href: link("/kulugy/eelisa"),
          targetBlank: false,
        },
        {
          label: "HKT",
          subtitle: t("Hallgatói Külügyi Testület képviselet", "Student Foreign Affairs Committee representation"),
          href: "#",
          targetBlank: false,
        },
      ],
    },
    {
      title: "INTERNATIONAL",
      href: link("/international/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Hírek", "News"),
          subtitle: t("Friss nemzetközi hallgatói hírek és információk", "Latest news and announcements for international students"),
          href: link("/international/hirek"),
          targetBlank: false,
        },
        {
          label: t("Általános információk", "General Information"),
          subtitle: t("Hasznos tudnivalók a budapesti életről és tanulásról", "Useful information about living and studying in Budapest"),
          href: link("/international/general-information"),
          targetBlank: false,
        },
        {
          label: t("Oktatási információk", "Education Information"),
          subtitle: t("Tanulmányi naptár, kurzusok és tanulmányi útmutató", "Academic calendar, courses, and educational guidelines"),
          href: link("/international/education-information"),
          targetBlank: false,
        },
        {
          label: t("Jelentkezési információk", "Application Information"),
          subtitle: t("Felvételi eljárás és vízumügyintézési tájékoztató", "Admission process and visa application guide"),
          href: link("/international/application-information"),
          targetBlank: false,
        },
        {
          label: t("Kollégiumi információk", "Dormitory Information"),
          subtitle: t("Kollégiumi elhelyezés és szobafoglalási tudnivalók", "Dormitory application and accommodation details"),
          href: link("/international/dormitory-information"),
          targetBlank: false,
        },
        {
          label: t("Mobilitási programok", "Mobility Programs"),
          subtitle: t("Erasmus+ és egyéb csereprogram hallgatói lehetőségek", "Erasmus+ and exchange student opportunities"),
          href: link("/international/mobility-programs"),
          targetBlank: false,
        },
      ],
    },
    {
      title: t("KÖZÉLET", "COMMUNITY LIFE"),
      href: link("/kozelet/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Versenycsapatok", "Competitive Teams"),
          subtitle: t("Műegyetemi hallgatói versenycsapatok és projektek", "Student competitive teams and engineering projects at BME"),
          href: link("/kozelet/versenycsapatok"),
          targetBlank: false,
        },
        {
          label: t("Szakkollégiumok", "Specialized colleges"),
          subtitle: t("Szakmai fejlődést biztosító önálló hallgatói szervezetek", "Self-governing student groups offering professional development"),
          href: link("/kozelet/szakkollegiumok"),
          targetBlank: false,
        },
        {
          label: t("Öntevékeny körök", "Student clubs"),
          subtitle: t("Hallgatói klubok, hobbikörök és kulturális közösségek", "Student clubs, hobby groups, and cultural communities"),
          href: link("/kozelet/ontevekenykorok"),
          targetBlank: false,
        },
        {
          label: t("Rendezvények", "Events"),
          subtitle: t("Közösségi programok, egyetemi napok és fesztiválok", "Community programs, university days, and festivals"),
          href: link("/kozelet/rendezvenyek"),
          targetBlank: false,
        },
        {
          label: t("Klubok", "Clubs"),
          subtitle: t("Közösségi terek és szórakozóhelyek az egyetemen", "Community spaces and entertainment venues on campus"),
          href: link("/kozelet/klubok"),
          targetBlank: false,
        },
      ],
    },
    // {
    //   title: t("GÓLYÁKNAK", "FOR FRESHMEN"),
    //   href: link("/golyaknak/hirek"),
    //   targetBlank: false,
    //   items: [],
    // },
  ];

  // Filter out certain menu items for specific languages
  if (lang === "EN") {
    return items.filter(item => 
      item.title !== "DORMITORY"
    );
  }

  if (lang === "HU") {
    return items.filter(item => 
      item.title !== "INTERNATIONAL"
    );
  }

  return items;
}
