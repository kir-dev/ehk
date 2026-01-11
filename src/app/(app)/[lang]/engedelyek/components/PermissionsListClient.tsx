"use client"

import FileCard from "@/components/common/FileCard"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslate } from "@/hooks/useTranslate"
import type { Permission } from "@/payload-types"
import { isMedia } from "@/utils/isMedia"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { FileText } from "lucide-react"

interface Props {
  permissions: Permission[]
}

export default function PermissionsListClient({ permissions }: Props) {
  const { t, lang } = useTranslate()

  return (
    <div className="container mx-auto lg:px-4 px-2 py-8">
      {permissions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-12 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('permissions.no_results')}</h3>
            <p className="text-gray-600">{t('permissions.no_permissions')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {permissions.map((p0) => {
            const p = p0 as Permission
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
                      <FileCard
                        file={p.file || undefined}
                        title={disp || ext || 'file'}
                        actionType="view"
                        className="mt-1"
                      />
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
