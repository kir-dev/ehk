"use client"

import { useTranslate } from "@/hooks/useTranslate"
import { cn } from "@/lib/utils"
import { Representative } from "@/payload-types"
import { ArrowRight, Mail } from 'lucide-react'
import Image from 'next/image'
import {
    facultyStyles,
    getPrimaryPosition,
    getRepresentativeInitials,
    getRepresentativePicture,
} from './representatives.helpers'

interface RepresentativeCardProps {
    representative: Representative
    onClickAction: () => void
}

export function RepresentativeCard({ representative, onClickAction }: Readonly<RepresentativeCardProps>) {
    const { t, lang } = useTranslate()
    const positionText = getPrimaryPosition(representative, lang)
    const detailsLabel = lang === "EN" ? t('representatives.view_details') : "Részletek"
    const picture = getRepresentativePicture(representative)

    return (
        <article
            role="button"
            tabIndex={0}
            onClick={onClickAction}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onClickAction()
                }
            }}
            className="group relative min-h-[31.6rem] cursor-pointer pt-16 focus-visible:outline-none"
            aria-label={`${detailsLabel}: ${representative.name}`}
        >
            <div className="absolute left-1/2 top-0 z-10 h-74 w-[min(70%,16.45rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#f9f4f0] shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
                {picture.url ? (
                    <Image
                        src={picture.url}
                        alt={picture.alt}
                        fill
                        sizes="(min-width: 1280px) 263px, (min-width: 768px) 32vw, 70vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f9f4f0] text-[#862633]">
                        <span className="font-playfair text-5xl font-bold">
                            {getRepresentativeInitials(representative.name)}
                        </span>
                    </div>
                )}
            </div>

            {representative.faculty && (
                <span
                    className={cn(
                        "absolute left-1/2 top-[17.35rem] z-20 -translate-x-1/2 rounded-lg border-2 px-4 py-2 font-open-sans text-[15px] font-bold leading-none shadow-sm",
                        facultyStyles[representative.faculty],
                    )}
                >
                    {representative.faculty}
                </span>
            )}

            <div className="flex min-h-[28.3rem] flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#e9e2d6] bg-[#fffefc] px-8 pb-8 pt-[16.6rem] transition-shadow duration-200 group-hover:shadow-[-4px_4px_8px_rgba(0,0,0,0.25)] group-focus-visible:shadow-[-4px_4px_8px_rgba(0,0,0,0.25)]">
                <div className="flex w-full flex-col items-center gap-2 text-center">
                    <h2 className="font-playfair text-[22px] font-bold uppercase leading-[1.3] text-[#1a1a1a]">
                        {representative.name}
                    </h2>

                    {positionText && (
                        <p className="font-playfair text-base font-semibold leading-[1.4] text-[#1a1a1a]">
                            {positionText}
                        </p>
                    )}

                    {representative.emails && representative.emails.length > 0 && (
                        <div className="flex flex-col items-center gap-1">
                            {representative.emails.map((emailObj, index) => (
                                <a
                                    key={`${emailObj.email}-${index}`}
                                    href={`mailto:${emailObj.email}`}
                                    className="inline-flex items-center justify-center gap-1 font-open-sans text-[13px] font-semibold leading-none text-black transition-colors hover:text-[#862633] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#862633] focus-visible:ring-offset-2"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <Mail className="h-3.75 w-3.75 shrink-0" />
                                    <span>{emailObj.email}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full border-t border-[#e9e2d6] pt-4">
                    <div className="flex h-5.5 items-center justify-between gap-4 font-open-sans text-sm font-semibold leading-[1.6] text-[#862633]">
                        <span>{detailsLabel}</span>
                        <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                    </div>
                </div>
            </div>
        </article>
    )
}
