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
        { label: t("ADMIN", "ADMIN"), href: "/admin", targetBlank: true },
        {
          label: t("Képviselők", "Representatives"),
          href: link("/kepviselok"),
          targetBlank: false,
        },
        {
          label: t("Emlékeztetők", "Reminders"),
          href: link("/emlekeztetok"),
          targetBlank: false,
        },
        {
          label: t("Határozatok tára", "Decisions archive"),
          href: link("/hatarozatok-tara"),
          targetBlank: false,
        },
        {
          label: t("ESZB honlap", "ESZB website"),
          href: "#",
          targetBlank: false,
        },
        {
          label: t("EDK honlap", "EDK website"),
          href: "https://www.bmeedk.hu/page/1",
          targetBlank: true,
        },
        {
          label: t("Engedélyek", "Permissions"),
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
          href: link("/oktatasi-szabalyzatok"),
          targetBlank: false,
        },
        { label: "OMHV", href: "https://ohv.bme.hu/hu", targetBlank: true },
        {
          label: "Neptun",
          href: "https://neptun.bme.hu/hallgatoi/login.aspx",
          targetBlank: true,
        },
        {
          label: t("Nyelvoktatás", "Language courses"),
          href: link("/nyelvoktatas"),
          targetBlank: false,
        },
        {
          label: t("Kisokosok/Segédletek", "Guides"),
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
          href: link("/tanulmanyi-osztondij"),
          targetBlank: false,
        },
        {
          label: t("Szociális alapú ösztöndíjak", "Need-based scholarships"),
          href: link("/szocialis-osztondijak"),
          targetBlank: false,
        },
        {
          label: t("EHK ösztöndíjak", "EHK scholarships"),
          href: link("/ehk-osztondij"),
          targetBlank: false,
        },
        {
          label: t("Szabályzatok", "Regulations"),
          href: link("/juttatasi-szabalyzatok"),
          targetBlank: false,
        },
        { label: "MŰEPER", href: "https://mueper.bme.hu", targetBlank: true },
        {
          label: t("Esélyegyenlőség", "Equal opportunities"),
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
        { label: t("Bemutató", "Overview"), href: "#", targetBlank: false },
        { label: t("Felvételi tájékoztató", "Admission Information"),
          href: "/kollegium/felveteli-tajekoztato",
          targetBlank: false },
        {
          label: t("Szabályzatok", "Regulations"),
          href: link("/kollegium-szabalyzatok"),
          targetBlank: false,
        },
        {
          label: "KEFIR",
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
          label: t(
            "Sportpálya támogatás pályázat",
            "Sports field subsidy application"
          ),
          href: "#",
          targetBlank: false,
        },
        {
          label: t("Sportterem igénylés", "Gym booking request"),
          href: "#",
          targetBlank: false,
        },
        {
          label: t("Testnevelési Központ", "Department of Physical Education"),
          href: "https://testneveles.bme.hu",
          targetBlank: true,
        },
        {
          label: t("Sportközpont", "Sports Center"),
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
        { label: "Erasmus", href: "#", targetBlank: false },
        { label: "EELISA", href: "#", targetBlank: false },
        { label: "HKT", href: "#", targetBlank: false },
      ],
    },
    {
      title: "INTERNATIONAL",
      href: link("/international/hirek"),
      targetBlank: false,
      items: [{ label: "", href: "", targetBlank: false }],
    },
    {
      title: t("KÖZÉLET", "COMMUNITY LIFE"),
      href: link("/kozelet/hirek"),
      targetBlank: false,
      items: [
        {
          label: t("Versenycsapatok", "Competition teams"),
          href: "#",
          targetBlank: false,
        },
        {
          label: t("Szakkollégiumok", "Specialized colleges"),
          href: "#",
          targetBlank: false,
        },
        {
          label: t("Öntevékeny körök", "Student clubs"),
          href: "#",
          targetBlank: false,
        },
        { label: t("Rendezvények", "Events"), href: "#", targetBlank: false },
        { label: t("Klubbok", "Clubs"), href: "#", targetBlank: false },
      ],
    },
    {
      title: t("GÓLYÁKNAK", "FOR FRESHMEN"),
      href: link("/golyaknak/hirek"),
      targetBlank: false,
      items: [],
    },
  ];

  // Filter out certain menu items for English version
  if (lang === "EN") {
    return items.filter(item => 
      item.title !== "DORMITORY" && item.title !== "INTERNATIONAL"
    );
  }

  return items;
}
