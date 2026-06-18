'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useTranslate } from "@/hooks/useTranslate"
import { cn } from "@/lib/utils"
import { Representative } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { ArrowLeft, Eye, Mail } from "lucide-react"
import Image from "next/image"
import {
    facultyStyles,
    formatFileSize,
    getFileInfo,
    getPositionText,
    getPrimaryPosition,
    getRepresentativeInitials,
    getRepresentativePicture,
} from './representatives.helpers'

interface RepresentativeModalProps {
    representative: Representative
    onCloseAction: () => void
}

export function RepresentativeModal({ representative, onCloseAction }: RepresentativeModalProps) {
    const { lang, t } = useTranslate()
    const headerPosition = getPrimaryPosition(representative, lang)

    const labels = {
        back: t("Vissza", "Back"),
        positions: t('representatives.positions'),
        intro: t('representatives.intro'),
        reports: t('representatives.reports'),
        open: t('representatives.open'),
    } as const

    const introData = lang === 'EN' ? representative.introduction.text_en : representative.introduction.text_hu
    const picture = getRepresentativePicture(representative)
    const primaryEmail = representative.emails?.[0]?.email

    return (
        <Dialog open={true} onOpenChange={(open) => !open && onCloseAction()}>
            <DialogContent
                showCloseButton={false}
                className="top-[7vh] max-h-[86vh] w-[min(90vw,1272px)] !max-w-[1272px] translate-y-0 gap-0 overflow-y-auto rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-0 shadow-[-4px_4px_8px_rgba(0,0,0,0.25)] sm:!max-w-[1272px]"
            >
                <DialogTitle className="sr-only">{representative.name}</DialogTitle>

                <div className="flex h-[72px] items-center border-b border-[#e9e2d6] bg-[#fffefc] px-4 py-4 md:px-8">
                    <button
                        type="button"
                        onClick={onCloseAction}
                        className="group inline-flex items-center gap-2 rounded-full border border-[#e9e2d6] bg-[#862633] px-4 py-2 font-open-sans text-sm font-bold leading-[1.6] text-white transition-colors duration-200 hover:bg-[#9e2d3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#862633] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefc]"
                    >
                        <ArrowLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                        <span>{labels.back}</span>
                    </button>
                </div>

                <div className="flex flex-col gap-8 p-4 md:p-8">
                    <div className="block md:hidden">
                        <div className="relative mx-auto h-[19.5rem] max-w-[17.4rem] overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0] shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
                            {picture.url ? (
                                <Image
                                    src={picture.url}
                                    alt={picture.alt}
                                    fill
                                    sizes="278px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#862633]">
                                    <span className="font-playfair text-5xl font-bold">
                                        {getRepresentativeInitials(representative.name)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 rounded-2xl bg-[#862633] p-6 text-[#f9f4f0]">
                            <h2 className="font-playfair text-[32px] font-bold uppercase leading-[1.2] text-white">
                                {representative.name}
                            </h2>
                            {headerPosition && (
                                <p className="mt-2 font-playfair text-[22px] font-bold leading-[1.3]">
                                    {headerPosition}
                                </p>
                            )}
                            {primaryEmail && (
                                <a
                                    href={`mailto:${primaryEmail}`}
                                    className="mt-4 inline-flex items-center gap-1 font-open-sans text-sm font-semibold leading-[1.6] transition-colors hover:text-white"
                                >
                                    <Mail className="h-4 w-4" />
                                    {primaryEmail}
                                </a>
                            )}
                        </div>

                        {representative.faculty && (
                            <span
                                className={cn(
                                    "mx-auto -mt-5 flex w-fit rounded-lg border-2 px-4 py-2 font-open-sans text-[15px] font-bold leading-none shadow-sm",
                                    facultyStyles[representative.faculty],
                                )}
                            >
                                {representative.faculty}
                            </span>
                        )}
                    </div>

                    <div className="relative hidden min-h-[313px] md:block">
                        <div className="absolute left-0 top-0 h-[313px] w-[278px] overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0] shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
                            {picture.url ? (
                                <Image
                                    src={picture.url}
                                    alt={picture.alt}
                                    fill
                                    sizes="278px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#862633]">
                                    <span className="font-playfair text-5xl font-bold">
                                        {getRepresentativeInitials(representative.name)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="ml-[278px] mt-[72px] min-h-[154px] rounded-r-2xl border-y border-r border-[#e9e2d6] bg-[#862633] p-8 text-[#f9f4f0]">
                            <h2 className="font-playfair text-[32px] font-bold uppercase leading-[1.2] text-white">
                                {representative.name}
                            </h2>
                            {headerPosition && (
                                <p className="mt-1 font-playfair text-[22px] font-bold leading-[1.3]">
                                    {headerPosition}
                                </p>
                            )}
                            {primaryEmail && (
                                <a
                                    href={`mailto:${primaryEmail}`}
                                    className="mt-3 inline-flex items-center gap-1 font-open-sans text-sm font-semibold leading-[1.6] transition-colors hover:text-white"
                                >
                                    <Mail className="h-4 w-4" />
                                    {primaryEmail}
                                </a>
                            )}
                            {representative.faculty && (
                                <span
                                    className={cn(
                                        "mt-3 flex w-fit rounded-lg border-2 px-4 py-2 font-open-sans text-[15px] font-bold leading-none shadow-sm",
                                        facultyStyles[representative.faculty],
                                    )}
                                >
                                    {representative.faculty}
                                </span>
                            )}
                        </div>
                    </div>

                    {representative.position && representative.position.length > 1 && (
                        <section className="flex flex-col gap-4">
                            <h3 className="font-open-sans text-[11px] font-semibold uppercase leading-none text-[#9a9a9a]">
                                {labels.positions}
                            </h3>
                            <div className="grid gap-3 md:grid-cols-2">
                                {representative.position.map((position, index) => (
                                    <p
                                        key={position.id || index}
                                        className="rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 font-playfair text-base font-semibold leading-[1.4] text-[#1a1a1a]"
                                    >
                                        {getPositionText(position, lang)}
                                    </p>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="flex flex-col gap-4">
                        <h3 className="font-open-sans text-[11px] font-semibold uppercase leading-none text-[#9a9a9a]">
                            {labels.intro}
                        </h3>
                        <div className="richtext rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 font-open-sans text-sm leading-[1.6] text-[#3d3d3d]">
                            <RichText data={introData} />
                        </div>
                    </section>

                    {representative.files && representative.files.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <h3 className="font-open-sans text-[11px] font-semibold uppercase leading-none text-[#9a9a9a]">
                                {labels.reports}
                            </h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {representative.files.map((fileObj, index) => {
                                    const fileTitle = lang === 'EN'
                                        ? (fileObj.title_en || fileObj.title_hu)
                                        : (fileObj.title_hu || fileObj.title_en)
                                    const fileInfo = getFileInfo(fileObj.file)
                                    const fileSize = formatFileSize(fileInfo.filesize)

                                    return (
                                        <a
                                            key={fileObj.id || index}
                                            href={fileInfo.url || undefined}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-disabled={!fileInfo.url}
                                            className={cn(
                                                "group/report flex min-h-[72px] items-center justify-between gap-4 rounded-2xl border border-[#e9e2d6] bg-[#fffefc] p-4 transition-colors duration-200 hover:border-[#d3afaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#862633] focus-visible:ring-offset-2",
                                                !fileInfo.url && "pointer-events-none opacity-60",
                                            )}
                                        >
                                            <div className="min-w-0">
                                                <p className="font-open-sans text-sm leading-[1.6] text-[#1a1a1a]">
                                                    {fileTitle || "Dokumentum"}
                                                </p>
                                                <div className="mt-2 flex flex-wrap items-center gap-2 font-open-sans text-xs text-[#6e6660]">
                                                    <span className="rounded-full border border-[#e9e2d6] bg-[#f9f4f0] px-3 py-1 text-[11px] font-semibold uppercase text-[#862633]">
                                                        {fileInfo.extension}
                                                    </span>
                                                    {fileSize && (
                                                        <>
                                                            <span>-</span>
                                                            <span>{fileSize}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e9e2d6] text-[#6e6660] transition-colors group-hover/report:border-[#d3afaf] group-hover/report:text-[#862633]">
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">{labels.open}</span>
                                            </span>
                                        </a>
                                    )
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
