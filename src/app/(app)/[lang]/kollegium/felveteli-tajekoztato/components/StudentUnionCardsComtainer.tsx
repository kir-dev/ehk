"use client";
import { DormitoryAdmissionInformationContent} from "./DormitoryAdmissionInformationContent";
import { ImageCard } from "@/components/common/ImageCard";


export default function StudentUnionCardsComtainer({ content }: Readonly<{ content: DormitoryAdmissionInformationContent; }>) {
    const faculties = content.faculties;
    const dimensions = {
        width: 62,
        height: 72
    }
    const imageFolder = "/karihk/"
    const emk = {
        imageSrc: imageFolder+"emk.jpg",
        title: faculties.ÉMK,
        dimensions: dimensions,
        href: "https://emkhk.bme.hu/"
    }
    const epk = {
        imageSrc: imageFolder+"epk.jpg",
        title: faculties.ÉPK,
        dimensions: dimensions,
        href: "https://epiteszhk.bme.hu"
    }
    const gtk = {
        imageSrc: imageFolder+"gtk.png",
        title: faculties.GTK,
        dimensions: dimensions,
        href: "http://gtkhk.hu/"
    }
    const gpk = {
        imageSrc: imageFolder+"gpk.jpg",
        title: faculties.GPK,
        dimensions: dimensions,
        href: "https://ghk.bme.hu/"
    }
    const kjk = {
        imageSrc: imageFolder+"kjk.png",
        title: faculties.KJK,
        dimensions: dimensions,
        href: "http://kozlekhk.hu/"
    }
    const ttk = {
        imageSrc: imageFolder+"ttk.jpg",
        title: faculties.TTK,
        dimensions: dimensions,
        href: "https://ttkhk.bme.hu"
    }
    const vbk = {
        imageSrc: imageFolder+"vbk.png",
        title: faculties.VBK,
        dimensions: dimensions,
        href: "http://www.vegyeszhk.hu/"
    }
    const vik = {
        imageSrc: imageFolder+"vik.png",
        title: faculties.VIK,
        dimensions: dimensions,
        href: "https://vik.hk/"
    }

    return (
        <div className="block sm:flex sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-0 flex-1">
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
