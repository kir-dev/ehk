import { ArrowLeft, Calendar, Tag, Share2, Clock, Download, FileText, File } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RelatedNews } from "@/components/related-news"
import {News, Media} from "@/payload-types";
import {RichText} from "@payloadcms/richtext-lexical/react";
import ShareButton from "@/components/ShareButton";

interface NewsDetailProps {
    article: News
}

type NewsFileItem = {
    id?: string
    file: number | Media
    description?: string
}

function lexicalToPlainText(data: unknown): string {
    if (!data || typeof data !== 'object') return ''
    const root = (data as { root?: unknown }).root
    return collectText(root)
}

function collectText(node: unknown): string {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: unknown; children?: unknown }
    let out = ''
    if (typeof n.text === 'string') out += n.text + ' '
    const children = Array.isArray(n.children) ? n.children : []
    for (const child of children) out += collectText(child)
    return out
}

function getReadingTimeFromRichText(data: unknown): number {
    const text = lexicalToPlainText(data)
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
}

function formatBytes(bytes?: number | null): string | null {
    if (!bytes || bytes <= 0) return null
    const units = ["B", "KB", "MB", "GB", "TB"]
    let i = 0
    let val = bytes
    while (val >= 1024 && i < units.length - 1) {
        val = val / 1024
        i++
    }
    return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}

function getFileIcon(type?: string | null) {
    const t = (type || "").toLowerCase()
    if (t.includes("pdf")) return <FileText className="w-4 h-4 text-red-500" />
    if (t.includes("word") || t.includes("document") || t.includes("msword")) return <FileText className="w-4 h-4 text-blue-500" />
    if (t.includes("excel") || t.includes("spreadsheet") || t.includes("sheet")) return <FileText className="w-4 h-4 text-green-500" />
    return <File className="w-4 h-4 text-gray-500" />
}

export function NewsDetail({ article }: NewsDetailProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Navigation */}
                <div className="mb-6">
                    <Button variant="ghost" asChild className="hover:bg-gray-100 hover:text-ehk-dark-red">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Vissza a hírekhez
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="col-span-2 col-start-1">
                        <Card className="mb-6">
                            <CardContent className="p-8">
                                {/* Article Header */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-ehk-dark-red" />
                                            <span>{formatDate(article.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-ehk-dark-red" />
                                            <span>{getReadingTimeFromRichText(article.description.text_hu)} perc olvasás</span>
                                        </div>
                                    </div>

                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>

                                    <p className="text-xl text-gray-600 leading-relaxed mb-6">{article.shortDescription.text_hu}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {article.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Share Button */}
                                    <div className="flex justify-end">
                                        <ShareButton
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 bg-transparent hover:border-ehk-dark-red hover:text-ehk-dark-red"
                                            title={article.title}
                                            text={article.shortDescription.text_hu}
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Megosztás
                                        </ShareButton>
                                    </div>
                                </div>

                                <Separator className="mb-8" />

                                {/* Article Content */}
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                    <RichText data={article.description.text_hu} />
                                </div>
                                {/* Attached Files */}
                                {article.files && article.files.length > 0 && (
                                    <>
                                        <Separator className="my-8" />
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Download className="w-5 h-5" />
                                                Csatolt fájlok
                                            </h3>
                                            <div className="grid gap-3">
                                                {((article.files as unknown) as NewsFileItem[]).map((item) => {
                                                    const media = typeof item.file === 'object' ? item.file : null
                                                    const name: string = media?.filename ?? 'Fájl'
                                                    const mime = media?.mimeType ?? undefined
                                                    const size = formatBytes(media?.filesize)
                                                    const url = media?.url ?? undefined
                                                    const key = item.id ?? media?.id ?? `${name}-${url}`
                                                    const title = item.description && item.description.trim().length > 0 ? item.description : name
                                                    return (
                                                        <div
                                                            key={key}
                                                            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors border border-gray-200"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-shrink-0">{getFileIcon(mime)}</div>
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">{title}</h4>
                                                                    <p className="text-sm text-gray-500">
                                                                        {size ? size : null}
                                                                        {item.description ? (size ? ' · ' : '') + name : null}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {url && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="hover:bg-white hover:border-ehk-dark-red hover:text-ehk-dark-red bg-transparent"
                                                                    asChild
                                                                >
                                                                    <a href={url} download>
                                                                        <Download className="w-4 h-4 mr-2" />
                                                                        Letöltés
                                                                    </a>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-1 col-start-3">
                        {/* Article Info */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg mb-4">Cikk információk</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Publikálás dátuma</span>
                                        <p className="text-sm text-gray-900">{formatDate(article.date)}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Olvasási idő</span>
                                        <p className="text-sm text-gray-900">{getReadingTimeFromRichText(article.description.text_hu)} perc</p>
                                    </div>
                                    {article.files && article.files.length > 0 && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Csatolt fájlok</span>
                                            <p className="text-sm text-gray-900">{article.files.length} fájl</p>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Címkék</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {article.tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related News */}
                        <RelatedNews currentArticle={article} />
                    </div>
                </div>
            </div>
        </div>
    )
}
