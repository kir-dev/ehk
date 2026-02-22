"use client";
import { ImageCard } from "@/components/common/ImageCard";
import { DormitoryAdmissionInformationContent } from "./DormitoryAdmissionInformationContent";


export default function StudentUnionCardsContainer({ content }: Readonly<{ content: DormitoryAdmissionInformationContent; }>) {
    const faculties = content.faculties;
    const imageFolder = "/karihk/"
    const emk = {
        imageSrc: imageFolder+"emk.jpg",
        title: faculties.ÉMK,
        href: "https://emkhk.bme.hu/"
    }
    const epk = {
        imageSrc: imageFolder+"epk.jpg",
        title: faculties.ÉPK,
        href: "https://epiteszhk.bme.hu"
    }
    const gtk = {
        imageSrc: imageFolder+"gtk.png",
        title: faculties.GTK,
        href: "http://gtkhk.hu/"
    }
    const gpk = {
        imageSrc: imageFolder+"gpk.jpg",
        title: faculties.GPK,
        href: "https://ghk.bme.hu/"
    }
    const kjk = {
        imageSrc: imageFolder+"kjk.png",
        title: faculties.KJK,
        href: "http://kozlekhk.hu/"
    }
    const ttk = {
        imageSrc: imageFolder+"ttk.jpg",
        title: faculties.TTK,
        href: "https://ttkhk.bme.hu"
    }
    const vbk = {
        imageSrc: imageFolder+"vbk.png",
        title: faculties.VBK,
        href: "http://www.vegyeszhk.hu/"
    }
    const vik = {
        imageSrc: imageFolder+"vik.png",
        title: faculties.VIK,
        href: "https://vik.hk/"
    }

    return (
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-4 sm:gap-6 flex-1">
            <ImageCard content={emk}/>
            <ImageCard content={epk}/>
            <ImageCard content={gtk}/>
            <ImageCard content={gpk}/>
            <ImageCard content={kjk}/>
            <ImageCard content={ttk}/>
            <ImageCard content={vbk}/>
            <ImageCard content={vik}/>
         </div>
    );
}
