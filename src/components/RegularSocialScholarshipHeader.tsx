import {useLanguage} from "@/components/LanguageProvider";

export default function RegularSocialScholarshipHeader() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">{t('Szociális ösztöndíjak', 'Scholarship for Social Needs')}</h1>
        </div>
    )
}