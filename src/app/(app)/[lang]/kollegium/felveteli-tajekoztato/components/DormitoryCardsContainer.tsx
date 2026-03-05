"use client";

import { ImageCard } from "@/components/common/ImageCard";
import { useParams } from "next/navigation";

export default function DormitoryCardsContainer({ dormitory, linkOrRoute} : Readonly<{ dormitory: string, linkOrRoute: "link" | "route"}>) {
    const params = useParams();
    const lang = params?.lang ?? "hu";
    
    const imageFolder = "/kolik/"
    const baross = {
        imageSrc: imageFolder+"baross.jpg",
        title: "Baross Gábor "+dormitory,
        href: linkOrRoute === "link" ? "https://epiteszhk.bme.hu/kollegium/kollegiumaink/baross-gabor-kollegium/" : `/${lang}/kollegium/kollegium-bemutato/baross`,
    }
    const bercsenyi = {
        imageSrc: imageFolder+"bercsenyi.jpg",
        title: "Bercsényi 28-30 "+dormitory,
        href: linkOrRoute === "link" ? "https://bercsenyi.bme.hu/" : `/${lang}/kollegium/kollegium-bemutato/bercsenyi`
    }
    const karman = {
        imageSrc: imageFolder+"karman.jpg",
        title: "Kármán Tódor "+dormitory,
        href: linkOrRoute === "link" ? "https://ttkhk.bme.hu/koli/karman-2/" : `/${lang}/kollegium/kollegium-bemutato/karman`,
    }
    const martos = {
        imageSrc: imageFolder+"martos.jpg",
        title: "Martos "+dormitory,
        href: linkOrRoute === "link" ? "https://martos.bme.hu/" : `/${lang}/kollegium/kollegium-bemutato/martos`
    }
    const schonherz = {
        imageSrc: imageFolder+"schonherz.jpg",
        title: "Schönherz "+dormitory,
        href: linkOrRoute === "link" ? "https://sch.bme.hu/" : `/${lang}/kollegium/kollegium-bemutato/sch`
    }
    const vasarhelyi = {
        imageSrc: imageFolder+"vasarhelyi.jpg",
        title: "Vásárhelyi Pál "+dormitory,
        href: linkOrRoute === "link" ? "https://vpk.bme.hu/" : `/${lang}/kollegium/kollegium-bemutato/vpk`,
    }
    const wigner = {
        imageSrc: imageFolder+"wigner.jpg",
        title: "Wigner Jenő "+dormitory,
        href: linkOrRoute === "link" ? "https://wigner.bme.hu/" : `/${lang}/kollegium/kollegium-bemutato/wigner`
    }
    return (
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-4 sm:gap-6 flex-1">
            <ImageCard content={baross}/>
            <ImageCard content={bercsenyi}/>
            <ImageCard content={karman}/>
            <ImageCard content={martos}/>
            <ImageCard content={schonherz}/>
            <ImageCard content={vasarhelyi}/>
            <ImageCard content={wigner}/>
        </div>
    );
}