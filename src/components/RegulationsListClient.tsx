"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type {Regulation} from "@/payload-types"
import { isMedia } from "@/utils/isMedia"
import { useLanguage } from "@/components/LanguageProvider"
import { RichText } from "@payloadcms/richtext-lexical/react"

interface Props {
  regulations: Regulation[]
}

export default function RegulationsListClient({ regulations }: Props) {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <div className="container mx-auto px-2 lg:px-4 py-8">
      {regulations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-12 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('Nincsenek találatok', 'No results')}</h3>
            <p className="text-gray-600">{t('Jelenleg nincsenek elérhető szabályzatok.', 'No regulations available at the moment.')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {regulations.map((r0) => {
            const r = r0 as Regulation
            const title = lang === 'EN' ? (r.name_en || r.name_hu) : (r.name_hu || r.name_en)
            const description = lang === 'EN' ? (r.text_en || r.text_hu) : (r.text_hu || r.text_en)
            const href = r.file && isMedia(r.file) ? (r.file.url || "#") : undefined
            const ext = r.file && isMedia(r.file) ? (r.file.filename?.split(".").pop()?.toLowerCase() || "file") : undefined
            const disp = lang === 'EN' ? (r.displayText_en || r.displayText_hu) : (r.displayText_hu || r.displayText_en)
            return (
              <Card key={r.id} className="group hover:shadow-md transition-all duration-300">
                <CardContent className="p-3 md:p-6">
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div>
                      <h3 className="font-bold text-xl leading-tight text-gray-900 group-hover:text-[#862633] transition-colors">
                        {title}
                      </h3>
                    </div>
                    <div className="prose max-w-none text-gray-700 richtext">
                      <RichText data={description} />
                    </div>
                    {href && (
                      <div className="mt-1 flex items-center justify-between bg-gray-50 p-2 md:p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-5 w-5 text-[#862633]" />
                          <span className="font-medium text-gray-900 truncate">{disp || ext}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/button hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]"
                          asChild
                        >
                          <a href={href} download>
                            <Download className="w-4 h-4 mr-2" />
                            {t('Letöltés', 'Download')}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
