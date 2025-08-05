import React from 'react';
import Image from "next/image";

interface CardProps {
    title: string;
    date: string;
    imageUrl: string;
}

const MUSZAKCard = ({ title, date, imageUrl }: CardProps) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 bg-red-700 overflow-hidden">
                {imageUrl ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain transition-all duration-300 hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-white text-2xl font-bold">
                        No Image Available
                    </div>
                )}
            </div>
            <div className="px-6 py-4">
                <p className="italic text-gray-600 mb-2 text-sm">{new Date(date).toLocaleDateString("hu-HU")}</p>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h2>
                <div className="mt-2 border-b-4 border-red-700 w-24" />
            </div>
        </div>
    );
};

export default MUSZAKCard;