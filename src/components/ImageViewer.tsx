"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {HeroImage} from "@/payload-types";
import {isMedia} from "@/utils/isMedia";

interface ImageViewerProps {
    images?: HeroImage[]
}

export default function ImageViewer({ images = [] }: ImageViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (images.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                    <div className="relative aspect-[4/3] w-full flex items-center justify-center text-white">
                        No images available
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
        <div className="max-w-7xl mx-auto p-4">
            <div className="relative bg-transparent rounded-lg overflow-hidden">
                {/* Main Image Container */}
                <div className="relative h-[500px] w-full">
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
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
                        onClick={goToNext}
                        aria-label="Next image"
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
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Image Title/Description */}
            {/*<div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{images[currentIndex].alt}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Image {currentIndex + 1} of {images.length}
                </p>
            </div>*/}

            {/* Thumbnail Strip (Optional) */}
            {/*<div className="mt-6 flex justify-center space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                            "flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200",
                            index === currentIndex
                                ? "border-blue-500 shadow-md"
                                : "border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100",
                        )}
                    >
                        <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>*/}
        </div>
    )
}
