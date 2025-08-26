"use client"

import { useLanguage } from "@/components/LanguageProvider"

export function LoadingSpinner() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <div className="flex items-center justify-center py-12">
            <div className="relative">
                {/* Spinning circle */}
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>

                {/* Pulsing dots */}
                <div className="flex justify-center mt-4 space-x-2">
                    <div className="w-2 h-2 bg-[#862633] rounded-full animate-pulse delay-0"></div>
                    <div className="w-2 h-2 bg-[#862633] rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-[#862633] rounded-full animate-pulse delay-300"></div>
                </div>

                {/* Loading text with fade animation */}
                <div className="text-center mt-4">
                    <p className="text-[#862633] font-medium animate-pulse">
                        {t('Betöltés...', 'Loading...')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function LoadingCard() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
    )
}

export function LoadingRepresentativeCard() {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-64 bg-gray-200"></div>

            {/* Content placeholder */}
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
            </div>
        </div>
    )
}

export function LoadingGrid() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <div className="space-y-8">
            {/* Main loading spinner prominently displayed */}
            <div className="flex items-center justify-center min-h-[40vh] py-16">
                <div className="flex flex-col items-center">
                    {/* Spinning circle */}
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>

                    {/* Loading text */}
                    <div className="text-center mt-6">
                        <p className="text-[#862633] font-medium text-lg animate-pulse">
                            {t('Emlékeztetők betöltése...', 'Loading reminders...')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Skeleton year sections */}
            {[2024, 2023, 2022].map((year) => (
                <div key={year} className="space-y-4">
                    {/* Year header skeleton */}
                    <div className="flex items-center space-x-4 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-8"></div>
                    </div>

                    {/* Cards grid skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export function LoadingRepresentativesGrid() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <div className="space-y-8">
            {/* Main loading spinner prominently displayed */}
            <div className="flex items-center justify-center min-h-[40vh] py-16">
                <div className="flex flex-col items-center">
                    {/* Spinning circle */}
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>

                    {/* Loading text */}
                    <div className="text-center mt-6">
                        <p className="text-[#862633] font-medium text-lg animate-pulse">
                            {t('Képviselők betöltése...', 'Loading representatives...')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Skeleton cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <LoadingRepresentativeCard key={i} />
                ))}
            </div>
        </div>
    )
}

export function LoadingDecisionsGrid() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-center min-h-[40vh] py-16">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>
                    <div className="text-center mt-6">
                        <p className="text-[#862633] font-medium text-lg animate-pulse">
                            {t('Engedélyek betöltése...', 'Loading permits...')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                                    <div className="h-3 bg-gray-200 rounded w-40"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                            <div className="h-8 w-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function LoadingPermissionsGrid() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-center min-h-[40vh] py-16">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>
                    <div className="text-center mt-6">
                        <p className="text-[#862633] font-medium text-lg animate-pulse">
                            {t('Engedélyek betöltése...', 'Loading permissions...')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                                    <div className="h-3 bg-gray-200 rounded w-40"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                            <div className="h-8 w-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function LoadingRegulationsGrid() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-center min-h-[40vh] py-16">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#862633] rounded-full animate-spin"></div>
                    <div className="text-center mt-6">
                        <p className="text-[#862633] font-medium text-lg animate-pulse">
                            {t('Szabályzatok betöltése...', 'Loading regulations...')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                                    <div className="h-3 bg-gray-200 rounded w-40"></div>
                                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                            <div className="h-8 w-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
