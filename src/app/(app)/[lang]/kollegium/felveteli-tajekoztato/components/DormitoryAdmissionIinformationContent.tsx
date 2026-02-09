"use client";

import { useLanguage } from "@/components/common/LanguageProvider";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface DormitoryAdmissionInformationContent {
    admission_information: {
        title: string,
        capacity: string,
        capacity_p1: string,
        capacity_p2: string,
        application: string,
        application_p1: string,
        application_p2: string,
        application_p3: string,
        contacts: string,
        contacts_p1: string,
        contacts_p2: string,
        contacts_p3: string
    },
    faculties: {
        ÉMK: string,
        GPK: string,
        ÉPK: string,
        VBK: string,
        VIK: string,
        GTK: string,
        TTK: string,
        KJK: string
    }

}


export default function DormitoryAdmissionInformationContent({ content }: Readonly<{ content: DormitoryAdmissionInformationContent }>) {
    const admission_information = content.admission_information;
  return (
<div className="container mx-auto lg:px-4 px-2 py-8">
      <Card>
        <CardContent className="p-3 md:p-6">
            <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex flex-col gap-2 md:gap-3">
                    <h3 className="font-bold text-xl leading-tight text-gray-900">
                        {admission_information.capacity}
                    </h3>
                    <p className="text-gray-700 text-lg richtext text-justify">
                        {admission_information.capacity_p1}
                    </p>
                    <div>
                        {DormitoryCardsComtainer()}
                    </div>
                    <p className="text-gray-700 text-lg richtext text-justify">
                        {admission_information.capacity_p2}
                    </p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                    <h3 className="font-bold text-xl leading-tight text-gray-900">
                        {admission_information.application}
                    </h3>
                    <p className="text-gray-700 text-lg richtext text-justify">
                        {admission_information.application_p1}
                    </p>
                    <p className="text-gray-700 text-lg richtext text-justify">
                        {admission_information.application_p2}                
                        <a href="http://kefir.bme.hu" target="_blank"  rel="noopener noreferrer" className="font-bold text-lg leading-tight text-gray-900 hover:text-[#862633] transition-colors inline">
                            KEFIR
                        </a>
                        {admission_information.application_p3}
                    </p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                    <h3 className="font-bold text-xl leading-tight text-gray-900">
                        {admission_information.contacts}
                    </h3>
                    <p className="text-gray-700 text-lg richtext text-justify">
                        {admission_information.contacts_p1}
                    </p>
                    <div>
                        {StudentUnionCardsComtainer({content})}
                    </div>
                    <p className="text-gray-700 text-lg richtext text-justify">
                        {admission_information.contacts_p2}
                        {<a href="mailto:info@bmeehk.hu" target="_blank"  rel="noopener noreferrer" className="font-bold text-lg leading-tight text-gray-900 hover:text-[#862633] transition-colors inline">
                            info@bmeehk.hu
                        </a>}
                        {admission_information.contacts_p3}
                    </p>
                </div>

            </div>
        </CardContent>
      </Card>
    </div>
    
  )}

export function DormitoryCardsComtainer(){
    return (
        <div className="display-block sm:flex sm:flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-0 flex-1" >
            {DormitoryCards("baross.jpg","Baross Gábor","https://epiteszhk.bme.hu/kollegium/kollegiumaink/baross-gabor-kollegium/")}
            {DormitoryCards("bercsenyi.jpg","Bercsényi 28-30","https://bercsenyi.bme.hu/")}
            {DormitoryCards("karman.jpg","Kármán Tódor","https://ttkhk.bme.hu/koli/karman-2/")}
            {DormitoryCards("martos.jpg","Martos Flóra","https://martos.bme.hu/")}
            {DormitoryCards("schonherz.jpg","Schönherz Zoltán","https://sch.bme.hu/")}
            {DormitoryCards("vasarhelyi.jpg","Vásárhelyi Pál","https://vpk.bme.hu/")}
            {DormitoryCards("wigner.jpg","Wigner Jenő","https://wigner.bme.hu/")}
        </div>
    )
}

export function DormitoryCards(imageSrc: string, dormitoryName: string, href: string){
    const { lang } = useLanguage()
    const dormitory = lang === 'EN' ? 'Dormitory' : 'Kollégium'
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full m-2 mx-auto sm:m-2 sm:w-60 sm:h-60">
                <CardContent className="h-full flex flex-col">
                    <div className="flex flex-col items-center md:items-center text-center gap-4 md:gap-0 flex-1">
                        <div className="relative mb-0 md:mb-4 shrink-0">
                            <div className="w-20 h-20 min-[220px]:w-32 min-[220px]:h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <Image
                                    src={"/kolik/"+imageSrc}
                                    alt={dormitoryName}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        <div className="">
                            <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-1.5 md:mb-2 group-hover:text-[#862633] transition-colors min-[280px]:hyphens-none">
                                {dormitoryName} {dormitory}
                            </h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </a>
    )

}

export function StudentUnionCardsComtainer({ content }: Readonly<{ content: DormitoryAdmissionInformationContent }>){
    const faculties = content.faculties;
    return (
        <div className="display-block sm:flex sm:flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-0 flex-1" >
            {StudentUnionCards("emk.jpg", faculties.ÉMK, "https://emkhk.bme.hu/")}
            {StudentUnionCards("epk.jpg", faculties.ÉPK, "https://epiteszhk.bme.hu")}
            {StudentUnionCards("gtk.png", faculties.GTK, "http://gtkhk.hu/")}
            {StudentUnionCards("gpk.jpg", faculties.GPK, "https://ghk.bme.hu/")}
            {StudentUnionCards("kjk.png", faculties.KJK, "http://kozlekhk.hu/")}
            {StudentUnionCards("ttk.jpg", faculties.TTK, "https://ttkhk.bme.hu")}
            {StudentUnionCards("vbk.png", faculties.VBK, "http://www.vegyeszhk.hu/")}
            {StudentUnionCards("vik.png", faculties.VIK, "https://vik.hk/")}
        </div>
    )
}

export function StudentUnionCards(imageSrc: string, facultyName: string, href: string){
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full m-2 mx-auto sm:m-2 sm:w-62 sm:h-72">
                <CardContent className="h-full flex flex-col">
                    <div className="flex flex-col items-center md:items-center text-center gap-4 md:gap-0 flex-1">
                        <div className="relative mb-0 md:mb-4 shrink-0">
                            <div className="w-20 h-20 min-[220px]:w-32 min-[220px]:h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <Image
                                    src={"/karihk/"+imageSrc}
                                    alt={facultyName}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        <div className="">
                            <h3 className="font-semibold text-base md:text-lg text-gray-900 mb-1.5 md:mb-2 group-hover:text-[#862633] transition-colors min-[280px]:hyphens-none">
                                {facultyName}
                            </h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </a>
    )

}