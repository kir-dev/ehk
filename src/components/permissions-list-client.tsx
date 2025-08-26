"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Permission, Media } from "@/payload-types"
import { isMedia } from "@/utils/isMedia"
import { useLanguage } from "@/components/LanguageProvider"
import { RichText } from "@payloadcms/richtext-lexical/react"

interface Props {
  permissions: Permission[]
}

function getFileExtension(file: number | Media) {
  if (isMedia(file)) return file.filename?.split(".").pop()?.toLowerCase() || "file"
  return "file"
}

function getFileUrl(file: number | Media) {
  if (isMedia(file)) return file.url || "#"
  return "#"
}

export default function PermissionsListClient({ permissions }: Props) {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <div className="container mx-auto px-4 py-8">
      {permissions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-12 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('Nincsenek találatok', 'No results')}</h3>
            <p className="text-gray-600">{t('Jelenleg nincsenek elérhető engedélyek.', 'No permissions available at the moment.')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {permissions.map((p) => {
            const href = getFileUrl(p.file)
            const ext = getFileExtension(p.file)
            const description = lang === 'EN' ? p.text_en : p.text_hu
            return (
              <Card key={p.id} className="group hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                          <FileText className="h-6 w-6 text-[#862633]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-xl leading-tight text-gray-900 mb-1 group-hover:text-[#862633] transition-colors line-clamp-2">
                            {p.name}
                          </h3>
                          <p className="text-xs uppercase text-gray-500">{ext}</p>
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-700 richtext">
                        <RichText data={description} />
                      </div>
                    </div>
                    <div className="md:ml-4 flex-shrink-0">
                      <Button
                        variant="outline"
                        className="group/button hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]"
                        asChild
                      >
                        <a href={href} download>
                          <Download className="w-4 h-4 mr-2" />
                          {t('Letöltés', 'Download')}
                        </a>
                      </Button>
                    </div>
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
