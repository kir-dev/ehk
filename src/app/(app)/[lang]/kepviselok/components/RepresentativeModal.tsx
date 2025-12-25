'use client'

import FileCard from '@/components/common/FileCard'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useTranslate } from "@/hooks/useTranslate"
import { Media, Representative } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { Building2, Download, Mail, User } from "lucide-react"
import Image from "next/image"

interface RepresentativeModalProps {
    representative: Representative
    onCloseAction: () => void
}

type RepWithPic = Representative & { picture?: number | Media | null }

export function RepresentativeModal({ representative, onCloseAction }: RepresentativeModalProps) {
    const facultyColors = {
        'ÉMK': 'bg-red-100 text-red-800',
        'GPK': 'bg-blue-100 text-blue-800',
        'ÉPK': 'bg-green-100 text-green-800',
        'VBK': 'bg-purple-100 text-purple-800',
        'VIK': 'bg-orange-100 text-orange-800',
        'GTK': 'bg-pink-100 text-pink-800',
        'TTK': 'bg-indigo-100 text-indigo-800',
        'KJK': 'bg-yellow-100 text-yellow-800',
    }

    const { lang, t } = useTranslate()
    const firstPos = representative.position?.[0]
    const headerPosition = lang === 'EN'
        ? (firstPos?.position_en || firstPos?.position_hu)
        : (firstPos?.position_hu || firstPos?.position_en)

    const getPosText = (pos: NonNullable<Representative['position']>[number]) =>
        lang === 'EN' ? (pos.position_en || pos.position_hu) : (pos.position_hu || pos.position_en)

    // Localized labels
    const labels = {
        positions: t('representatives.positions', lang === 'EN' ? 'Positions' : 'Pozíciók'),
        contacts: t('representatives.contacts', lang === 'EN' ? 'Contacts' : 'Elérhetőségek'),
        intro: t('representatives.intro', lang === 'EN' ? 'Introduction' : 'Bemutatkozás'),
        reports: t('representatives.reports', lang === 'EN' ? 'Reports and documents' : 'Beszámolók és dokumentumok'),
        open: t('representatives.open', lang === 'EN' ? 'Open' : 'Megnyitás'),
        unavailable: t('representatives.unavailable', lang === 'EN' ? 'Unavailable' : 'Nem elérhető'),
    } as const

    const introData = lang === 'EN' ? representative.introduction.text_en : representative.introduction.text_hu

    const rep = representative as RepWithPic
    const media = rep.picture && typeof rep.picture === 'object' ? (rep.picture as Media) : null
    const pictureUrl = media?.url || undefined

    return (
        <Dialog open={true} onOpenChange={onCloseAction}>
            <DialogContent className="w-[85vw] !max-w-none max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {pictureUrl ? (
                                <Image
                                    src={pictureUrl}
                                    alt={representative.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-12 h-12 text-gray-600" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{representative.name}</h2>
                            {headerPosition && (
                                <p className="text-sm text-gray-600 font-normal">
                                    {headerPosition}
                                </p>
                            )}
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {representative.faculty && (
                        <div className="flex items-center gap-2">
                            <Badge className={facultyColors[representative.faculty as keyof typeof facultyColors] || 'bg-gray-100 text-gray-800'}>
                                <Building2 className="w-4 h-4 mr-2" />
                                {representative.faculty}
                            </Badge>
                        </div>
                    )}

                    {representative.position && representative.position.length > 1 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3">{labels.positions}</h3>
                            <div className="space-y-2">
                                {representative.position.map((pos, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium">{getPosText(pos)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {representative.emails && representative.emails.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center">
                                <Mail className="w-5 h-5 mr-2" />
                                {labels.contacts}
                            </h3>
                            <div className="space-y-2">
                                {representative.emails.map((emailObj, index) => (
                                    <a
                                        key={index}
                                        href={`mailto:${emailObj.email}`}
                                        className="block bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-colors"
                                    >
                                        <span className="text-blue-600 hover:text-blue-800">
                                            {emailObj.email}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    <div>
                        <h3 className="font-semibold text-lg mb-3">{labels.intro}</h3>
                        <div className="text-gray-700 leading-relaxed richtext">
                            <RichText data={introData} />
                        </div>
                    </div>

                    {representative.files && representative.files.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center">
                                    <Download className="w-5 h-5 mr-2" />
                                    {labels.reports}
                                </h3>
                                <div className="grid gap-3">
                                    {representative.files.map((fileObj, index) => {
                                        const fileTitle = lang === 'EN' ? (fileObj.title_en || fileObj.title_hu) : (fileObj.title_hu || fileObj.title_en)
                                        return (
                                            <FileCard
                                                key={index}
                                                file={fileObj.file || undefined}
                                                title={fileTitle || 'Dokumentum'}
                                                actionType="view"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
