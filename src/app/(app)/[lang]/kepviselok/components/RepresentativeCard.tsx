"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslate } from "@/hooks/useTranslate"
import { Media, Representative } from "@/payload-types"
import { Building2, FileText } from 'lucide-react'
import Image from 'next/image'

interface RepresentativeCardProps {
    representative: Representative
    onClickAction: () => void
}

type RepWithPic = Representative & { picture?: number | Media | null }

export function RepresentativeCard({ representative, onClickAction }: RepresentativeCardProps) {
    const facultyColors = {
        'ÉMK': 'bg-red-100 text-red-800',
        'GPK': 'bg-blue-100 text-blue-800',
        'ÉPK': 'bg-green-100 text-green-800',
        'VBK': 'bg-purple-100 text-purple-800',
        'VIK': 'bg-orange-100 text-orange-800',
        'GTK': 'bg-pink-100 text-pink-800',
        'TTK': 'bg-indigo-100 text-indigo-800',
        'KJK': 'bg-yellow-100 text-yellow-800',
    } as const

    const { t, lang } = useTranslate()
    const primaryPos = representative.position?.[0]
    const positionText = lang === 'EN'
        ? (primaryPos?.position_en || primaryPos?.position_hu)
        : (primaryPos?.position_hu || primaryPos?.position_en)

    const detailsLabel = t('representatives.view_details')

    const rep = representative as RepWithPic
    const media = rep.picture && typeof rep.picture === 'object' ? (rep.picture as Media) : null
    const pictureUrl = media?.url || null

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={onClickAction}>
            <CardContent className="p-4 md:p-6 h-full flex flex-col">
                <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0 flex-1">
                    <div className="relative mb-0 md:mb-4 shrink-0">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {pictureUrl ? (
                                <Image
                                    src={pictureUrl}
                                    alt={representative.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-xl md:text-3xl font-semibold text-gray-600">
                                    {representative.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-1.5 md:mb-2 group-hover:text-[#862633] transition-colors truncate md:whitespace-normal">
                            {representative.name}
                        </h3>

                        {positionText && (
                            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                                {positionText}
                            </p>
                        )}

                        {representative.faculty && (
                            <Badge className={`${facultyColors[representative.faculty as keyof typeof facultyColors] || 'bg-gray-100 text-gray-800'} mb-2 md:mb-3 text-xs md:text-sm px-2 py-0.5`}>
                                <Building2 className="w-3 h-3 mr-1" />
                                {representative.faculty}
                            </Badge>
                        )}

                        <div className="hidden md:flex items-center gap-4 text-sm text-gray-500 mb-4">
                            {representative.files && representative.files.length > 0 && (
                                <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-1" />
                                    <span>{representative.files.length}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-3 md:mt-auto w-full">
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-red-200 group-hover:border-[#862633] group-hover:text-[#862633] hover:border-[#862633] hover:text-[#862633] focus-visible:ring-[#862633]">
                        {detailsLabel}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
