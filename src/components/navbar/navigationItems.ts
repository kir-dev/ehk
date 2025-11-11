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
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
    return [
        {
            title: t("SZERVEZET", "ORGANIZATION"),
            href: "/szervezet/hirek",
            targetBlank: false,
            items: [
                { label: t("ADMIN", "ADMIN"), href: "/admin", targetBlank: false },
                { label: t("Képviselők", "Representatives"), href: "/kepviselok", targetBlank: false },
                { label: t("Emlékeztetők", "Reminders"), href: "/emlekeztetok", targetBlank: false },
                { label: t("Határozatok tára", "Decisions archive"), href: "/hatarozatok-tara", targetBlank: false },
                { label: t("ESZB honlap", "ESZB website"), href: "#", targetBlank: false },
                { label: t("EDK honlap", "EDK website"), href: "https://www.bmeedk.hu/page/1", targetBlank: true },
                { label: t("Engedélyek", "Permissions"), href: "/engedelyek", targetBlank: false },
            ],
        },
        {
            title: t("OKTATÁS", "EDUCATION"),
            href: "/oktatas/hirek",
            targetBlank: false,
            items: [
                { label: t("Szabályzatok", "Regulations"), href: "/oktatasi-szabalyzatok", targetBlank: false },
                { label: "OMHV", href: "https://ohv.bme.hu/hu", targetBlank: true },
                { label: "Neptun", href: "https://neptun.bme.hu/hallgatoi/login.aspx", targetBlank: true },
                { label: t("Nyelvoktatás", "Language courses"), href: "/nyelvoktatas", targetBlank: false },
                { label: t("Kisokosok/Segédletek", "Guides"), href: "#", targetBlank: false },
            ],
        },
        {
            title: t("JUTTATÁS", "GRANTS"),
            href: "/juttatas/hirek",
            targetBlank: false,
            items: [
                { label: t("Tanulmányi ösztöndíjak", "Academic scholarships"), href: "#", targetBlank: false },
                { label: t("Szociális alapú ösztöndíjak", "Need-based scholarships"), href: "#", targetBlank: false },
                { label: t("EHK ösztöndíjak", "EHK scholarships"), href: "#", targetBlank: false },
                { label: t("Szabályzatok", "Regulations"), href: "/juttatasi-szabalyzatok", targetBlank: false },
                { label: "MŰEPER", href: "https://mueper.bme.hu", targetBlank: true },
                { label: t("Esélyegyenlőség", "Equal opportunities"), href: "#", targetBlank: false },
            ],
        },
        {
            title: t("KOLLÉGIUM", "DORMITORY"),
            href: "/kollegium/hirek",
            targetBlank: false,
            items: [
                { label: t("Bemutató", "Overview"), href: "#", targetBlank: false },
                { label: t("Szabályzatok", "Regulations"), href: "/kollegium-szabalyzatok", targetBlank: false },
                { label: "KEFIR", href: "https://kefir.bme.hu/login", targetBlank: true },
            ],
        },
        {
            title: t("SPORT", "SPORTS"),
            href: "/sport/hirek",
            targetBlank: false,
            items: [
                { label: t("Sportpálya támogatás pályázat", "Sports field subsidy application"), href: "#", targetBlank: false },
                { label: t("Sportterem igénylés", "Gym booking request"), href: "#", targetBlank: false },
                { label: t("Testnevelési Központ", "Department of Physical Education"), href: "https://testneveles.bme.hu", targetBlank: true },
                { label: t("Sportközpont", "Sports Center"), href: "https://bmesport.hu", targetBlank: true },
            ],
        },
        {
            title: t("KÜLÜGY", "INTERNATIONAL AFFAIRS"),
            href: "/kulugy/hirek",
            targetBlank: false,
            items: [
                { label: "Erasmus", href: "#", targetBlank: false },
                { label: "EELISA", href: "#", targetBlank: false },
                { label: "HKT", href: "#", targetBlank: false },
            ],
        },
        {
            title: "INTERNATIONAL",
            href: "/international/hirek",
            targetBlank: false,
            items: [
                { label: "", href: "", targetBlank: false },
            ],
        },
        {
            title: t("KÖZÉLET", "COMMUNITY LIFE"),
            href: "/kozelet/hirek",
            targetBlank: false,
            items: [
                { label: t("Versenycsapatok", "Competition teams"), href: "#", targetBlank: false },
                { label: t("Szakkollégiumok", "Specialized colleges"), href: "#", targetBlank: false },
                { label: t("Öntevékeny körök", "Student clubs"), href: "#", targetBlank: false },
                { label: t("Rendezvények", "Events"), href: "#", targetBlank: false },
                { label: t("Klubbok", "Clubs"), href: "#", targetBlank: false },
            ],
        },
        {
            title: t("GÓLYÁKNAK", "FOR FRESHMEN"),
            href: "/golyaknak/hirek",
            targetBlank: false,
            items: [],
        },
    ]
}
