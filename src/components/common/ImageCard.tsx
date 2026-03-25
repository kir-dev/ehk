"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ImageCardProps {
    href: string;
    imageSrc: string;
    title: string;
    description?: string;
}

export function ImageCard({ content }: Readonly<{content: ImageCardProps }> ) {
    const { href, imageSrc, title, description} = content;
    const shouldBeBlank = href.startsWith('http');
    return (
        <a href={href} target={shouldBeBlank ? "_blank" : "_self"} rel={shouldBeBlank ? "noopener noreferrer" : ""} className="block w-full sm:w-auto self-stretch">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full sm:w-64 h-full min-h-[17rem] flex flex-col m-0">
                <CardContent className="h-full flex flex-col flex-1 p-6">
                    <div className="flex flex-col items-center md:items-center text-center gap-4 md:gap-0 flex-1">
                        <div className="relative mb-0 md:mb-4 shrink-0">
                            <div className="w-20 h-20 min-[13.5rem]:w-32 min-[13.5rem]:h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center mt-2">
                            <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-1.5 md:mb-2 group-hover:text-ehk-dark-red transition-colors min-[20rem]:hyphens-none break-words">
                                {title}
                            </h3>
                            <p className="text-sm md:text-m text-gray-600 mb-2 md:mb-3">{description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </a>
    )

}