



export function RepresentativesHeader({ locale }: { locale?: 'hu' | 'en' }) {
  const lang = locale ?? 'hu';
    
    const title = lang === 'en' ? 'Representatives' : 'Képviselők'
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">{title}</h1>
        </div>
    )
}
