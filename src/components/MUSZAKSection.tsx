import Image from "next/image";
import MUSZAKCard from "@/components/MUSZAKCard";
import getMuszakPapers from "@/lib/getMuszakPapers";
import { isMedia } from "@/utils/isMedia";

export default async function MUSZAKSection() {
  const papers = await getMuszakPapers();

    return (
        <section className="bg-gray-100 p-8 ">
            <div className="relative w-full h-[100px]">
                <Image
                    src={'/muhelyehklapja.gif'}
                    alt={'Műszak'}
                    fill
                    sizes="100vw"
                    className="object-contain transition-opacity duration-300"
                />
            </div>
            <div className="flex flex-col gap-8 mt-8">
                {papers.map((paper) => (
                    <MUSZAKCard
                        key={paper.id}
                        title={paper.title}
                        titleEng={paper.titleEng}
                        date={paper.date}
                        imageUrl={isMedia(paper.picture) ? (paper.picture.url ?? "") : ""}
                    />
                ))}
            </div>
        </section>
    );
}
