import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import fs from "fs";
import path from "path";

const validSlugs = ["baross", "bercsenyi", "karman", "martos", "sch", "vpk", "wigner"] as const;
type DormitorySlug = typeof validSlugs[number];

type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'images'; indices: number[] };

function getDormitoryImages(slug: DormitorySlug): string[] {
    const imagesDir = path.join(process.cwd(), "public", "kolik", slug);
    try {
        if (!fs.existsSync(imagesDir)) {
            return [];
        }
        const files = fs.readdirSync(imagesDir);
        return files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
            .map(file => encodeURI(`/kolik/${slug}/${file}`));
    } catch (e) {
        console.error("Failed to read dormitory images directory", e);
        return [];
    }
}

export async function generateStaticParams() {
    return validSlugs.map((slug) => ({
        slug,
    }));
}

export default async function DormitoryDetailsPage({
    params
}: Readonly<{ params: Promise<{ lang: Locale; slug: string }> }>) {
    const { lang, slug } = await params;

    if (!validSlugs.includes(slug as DormitorySlug)) {
        notFound();
    }

    const typedSlug = slug as DormitorySlug;
    const dictionary = await getDictionary(lang);
    const detailsDict = dictionary.dormitory_details;
    const dormData = detailsDict[typedSlug];
    const images = getDormitoryImages(typedSlug);

    // Split at (Image) ignoring leading/trailing newlines
    const descriptionParts = dormData.description.split(/(?:\r?\n)*\(Image\)(?:\r?\n)*/i);
    const embeddedImageCount = Math.min(images.length, descriptionParts.length - 1);
    const remainingImages = images.slice(embeddedImageCount);

    const blocks: ContentBlock[] = [];
    let currentImageGroup: number[] = [];

    descriptionParts.forEach((part, idx) => {
        const text = part.trim();
        if (text) {
            if (currentImageGroup.length > 0) {
                blocks.push({ type: 'images', indices: currentImageGroup });
                currentImageGroup = [];
            }
            blocks.push({ type: 'text', content: text });
        }
        
        if (idx < descriptionParts.length - 1) {
            currentImageGroup.push(idx);
        }
    });

    if (currentImageGroup.length > 0) {
        blocks.push({ type: 'images', indices: currentImageGroup });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Link 
                    href={`/${lang}/kollegium/kollegium-bemutato`} 
                    className="inline-flex items-center text-red-700 hover:text-red-800 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {detailsDict.back_button}
                </Link>

                <PageHeader title={dormData.title} />

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        {blocks.map((block, bIdx) => {
                            if (block.type === 'text') {
                                return (
                                    <p key={bIdx} className="whitespace-pre-line leading-relaxed mb-6">
                                        {block.content}
                                    </p>
                                );
                            } else {
                                return (
                                    <div key={bIdx} className="my-6 md:my-10 flex flex-wrap justify-center gap-6 items-center w-full">
                                        {block.indices.map(imgIdx => (
                                            images[imgIdx] ? (
                                                <img 
                                                    key={imgIdx}
                                                    src={images[imgIdx]} 
                                                    alt={`${dormData.title} inline image ${imgIdx + 1}`}
                                                    className={`rounded-xl shadow-md md:shadow-lg border border-gray-100 object-contain ${
                                                        block.indices.length > 1 
                                                            ? "max-w-full sm:max-w-[calc(50%-12px)] md:max-w-[calc(33.333%-16px)] max-h-[40vh]" 
                                                            : "max-w-full max-h-[60vh]"
                                                    }`}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div key={imgIdx} className={`p-8 md:p-12 bg-gray-50 rounded-xl border border-gray-200 border-dashed text-center text-gray-500 italic text-sm md:text-base ${
                                                        block.indices.length > 1 
                                                            ? "max-w-full sm:max-w-[calc(50%-12px)] md:max-w-[calc(33.333%-16px)]" 
                                                            : "w-full"
                                                    }`}>
                                                    [ Kép helye: {imgIdx + 1}. kép hiányzik ]
                                                </div>
                                            )
                                        ))}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>

                {remainingImages.length > 0 || images.length === 0 ? (
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                            {detailsDict.images_title}
                        </h2>
                        
                        {remainingImages.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6 items-center">
                                {remainingImages.map((imgSrc, idx) => (
                                    <div key={idx} className="rounded-lg overflow-hidden shadow-md group bg-white border border-gray-100">
                                        <img 
                                            src={imgSrc} 
                                            alt={`${dormData.title} image ${embeddedImageCount + idx + 1}`}
                                            className="max-w-full h-auto max-h-[350px] object-contain transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500 italic">
                                {detailsDict.no_images}
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
