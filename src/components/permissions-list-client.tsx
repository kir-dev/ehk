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

// Extend generated type to reflect current collection fields without regenerating
type PermissionX = Permission & {
  name_hu: string;
  name_en: string;
  text_hu: unknown;
  text_en: unknown;
  displayText_hu?: string | null;
  displayText_en?: string | null;
  file?: number | Media | null;
}

export default function PermissionsListClient({ permissions }: Props) {
  const { lang } = useLanguage()
  const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

  return (
    <div className="container mx-auto lg:px-4 px-2 py-8">
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
          {permissions.map((p0) => {
            const p = p0 as PermissionX
            const title = lang === 'EN' ? (p.name_en || p.name_hu) : (p.name_hu || p.name_en)
            const description = lang === 'EN' ? (p.text_en || p.text_hu) : (p.text_hu || p.text_en)
            const href = p.file && isMedia(p.file) ? (p.file.url || "#") : undefined
            const ext = p.file && isMedia(p.file) ? (p.file.filename?.split(".").pop()?.toLowerCase() || "file") : undefined
            const disp = lang === 'EN' ? (p.displayText_en || p.displayText_hu) : (p.displayText_hu || p.displayText_en)
            return (
              <Card key={p.id} className="group hover:shadow-md transition-all duration-300">
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
