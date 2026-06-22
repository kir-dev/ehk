export const dynamic = "force-dynamic";

import { NewsDetail } from "@/app/(app)/[lang]/hirek/[slug]/components/NewsDetail"
import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/payload-cms";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { LanguageProvider, Lang } from "@/components/common/LanguageProvider";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    const { slug, lang } = await params
    const id = Number(slug)
    if (!Number.isFinite(id)) {
        notFound()
    }

    const article = await getNewsById(id)

    if (!article) {
        notFound()
    }

    const dictionary = await getDictionary(lang as Locale, 'news');

    return (
        <LanguageProvider defaultLang={lang.toUpperCase() as Lang} dictionary={dictionary}>
            <NewsDetail article={article} />
        </LanguageProvider>
    )
}
