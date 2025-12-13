

export default function RegularSocialScholarshipHeader({ locale }: { locale?: 'hu' | 'en' }) {
  const lang = locale ?? 'hu';
    
    const t = (hu: string, en?: string) => (lang === 'en' ? (en || hu) : hu)
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">{t('Szociális ösztöndíjak', 'Scholarship for Social Needs')}</h1>
        </div>
    )
}