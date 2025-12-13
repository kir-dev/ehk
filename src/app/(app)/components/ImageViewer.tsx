"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {HeroImage} from "@/payload-types";
import {isMedia} from "@/utils/isMedia";
import { useLanguage } from "@/components/common/LanguageProvider"

interface ImageViewerProps {
    images?: HeroImage[]
}

export default function ImageViewer({ images = [] }: ImageViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    if (images.length === 0) {
        return (
            <div className="max-w-screen mx-auto p-4">
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                    <div className="relative aspect-[4/3] w-full flex items-center justify-center text-white">
                        {t('Nincs elérhető kép', 'No images available')}
                    </div>
                </div>
            </div>
        )
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    return (
        <div className="max-w-screen mx-auto pt-4">
            <div className="relative bg-transparent rounded-lg overflow-hidden w-full">
                {/* Main Image Container */}
                <div className="relative w-full aspect-10/3">
                    {/* Keep the aspect ratio of the upoaded image approximately 30/9=10/3 to ensure best appearence*/}
                    {/* One such good ratio is, if the image is 1200px wide and 360px high or 1400px wide and 420px high*/}
                    <Image
                        src={isMedia(images[currentIndex].picture) ? (images[currentIndex].picture.url ?? "") : ""}
                        alt={isMedia(images[currentIndex].picture) ? (images[currentIndex].picture.alt ?? "") : ""}
                        fill
                        className="object-cover transition-opacity duration-300"
                        priority
                    />

                    {/* Navigation Arrows */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
                        onClick={goToPrevious}
                        aria-label={t('Előző kép', 'Previous image')}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
                        onClick={goToNext}
                        aria-label={t('Következő kép', 'Next image')}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-200 hover:scale-110",
                                index === currentIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70",
                            )}
                            aria-label={t(`Ugrás a(z) ${index + 1}. képre`, `Go to image ${index + 1}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
