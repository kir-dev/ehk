"use client";

import { ImageCard } from "@/components/common/ImageCard";


export default function DormitoryCardsContainer({ dormitory} : Readonly<{ dormitory: string}>) {
    const imageFolder = "/kolik/"
    const baross = {
        imageSrc: imageFolder+"baross.jpg",
        title: "Baross Gábor "+dormitory,
        href: "https://epiteszhk.bme.hu/kollegium/kollegiumaink/baross-gabor-kollegium/"
    }
    const bercsenyi = {
        imageSrc: imageFolder+"bercsenyi.jpg",
        title: "Bercsényi 28-30 "+dormitory,
        href: "https://bercsenyi.bme.hu/"
    }
    const karman = {
        imageSrc: imageFolder+"karman.jpg",
        title: "Kármán Tódor "+dormitory,
        href: "https://ttkhk.bme.hu/koli/karman-2/"
    }
    const martos = {
        imageSrc: imageFolder+"martos.jpg",
        title: "Martos "+dormitory,
        href: "https://martos.bme.hu/"
    }
    const schonherz = {
        imageSrc: imageFolder+"schonherz.jpg",
        title: "Schönherz "+dormitory,
        href: "https://sch.bme.hu/"
    }
    const vasarhelyi = {
        imageSrc: imageFolder+"vasarhelyi.jpg",
        title: "Vásárhelyi Pál "+dormitory,
        href: "https://vpk.bme.hu/"
    }
    const wigner = {
        imageSrc: imageFolder+"wigner.jpg",
        title: "Wigner Jenő "+dormitory,
        href: "https://wigner.bme.hu/"
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