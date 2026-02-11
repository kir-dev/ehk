"use client";

import { ImageCard } from "@/components/common/ImageCard";


export default function DormitoryCardsComtainer({ dormitory} : Readonly<{ dormitory: string}>) {
    const dimensions = {
        width: 60,
        height: 60
    }
    const imageFolder = "/kolik/"
    const baross = {
        imageSrc: imageFolder+"baross.jpg",
        title: "Baross Gábor "+dormitory,
        dimensions: dimensions,
        href: "https://epiteszhk.bme.hu/kollegium/kollegiumaink/baross-gabor-kollegium/"
    }
    const bercsenyi = {
        imageSrc: imageFolder+"bercsenyi.jpg",
        title: "Bercsényi 28-30 "+dormitory,
        dimensions: dimensions,
        href: "https://bercsenyi.bme.hu/"
    }
    const karman = {
        imageSrc: imageFolder+"karman.jpg",
        title: "Kármán Tódor "+dormitory,
        dimensions: dimensions,
        href: "https://ttkhk.bme.hu/koli/karman-2/"
    }
    const martos = {
        imageSrc: imageFolder+"martos.jpg",
        title: "Martos "+dormitory,
        dimensions: dimensions,
        href: "https://martos.bme.hu/"
    }
    const schonherz = {
        imageSrc: imageFolder+"schonherz.jpg",
        title: "Schönherz "+dormitory,
        dimensions: dimensions,
        href: "https://sch.bme.hu/"
    }
    const vasarhelyi = {
        imageSrc: imageFolder+"vasarhelyi.jpg",
        title: "Vásárhelyi Pál "+dormitory,
        dimensions: dimensions,
        href: "https://vpk.bme.hu/"
    }
    const wigner = {
        imageSrc: imageFolder+"wigner.jpg",
        title: "Wigner Jenő "+dormitory,
        dimensions: dimensions,
        href: "https://wigner.bme.hu/"
    }
    return (
        <div className="block sm:flex sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-0 flex-1">
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