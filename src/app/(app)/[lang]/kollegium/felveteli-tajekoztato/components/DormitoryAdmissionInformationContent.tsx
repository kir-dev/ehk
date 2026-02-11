"use client";

import {PostBlock} from "@/components/common/PageBlock";
import  DormitoryCardsComtainer  from "./DormitoryCardsComtainer";
import  StudentUnionCardsComtainer  from "./StudentUnionCardsComtainer";

export interface DormitoryAdmissionInformationContent {
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
        contacts_p3: string,
        dormitory: string
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
    <div className="flex flex-col gap-4 md:gap-6 lg:px-4 px-2 py-8">
        <PostBlock>                
            <h3 className="font-bold text-xl leading-tight text-gray-900">
                {admission_information.capacity}
            </h3>
            <p className="text-gray-700 text-lg richtext text-justify">
                {admission_information.capacity_p1}
            </p>
            <div>
                <DormitoryCardsComtainer dormitory={admission_information.dormitory}/>
            </div>
            <p className="text-gray-700 text-lg richtext text-justify">
                {admission_information.capacity_p2}
            </p>
        </PostBlock>
        <PostBlock>
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
                
        </PostBlock>
        <PostBlock>    
            <h3 className="font-bold text-xl leading-tight text-gray-900">
                {admission_information.contacts}
            </h3>
            <p className="text-gray-700 text-lg richtext text-justify">
                {admission_information.contacts_p1}
            </p>
            <div>
                
                <StudentUnionCardsComtainer content={content}/>
            </div>
            <p className="text-gray-700 text-lg richtext text-justify">
                {admission_information.contacts_p2}
                {<a href="mailto:info@bmeehk.hu" target="_blank"  rel="noopener noreferrer" className="font-bold text-lg leading-tight text-gray-900 hover:text-[#862633] transition-colors inline">
                    info@bmeehk.hu
                </a>}
                {admission_information.contacts_p3}
            </p>            
      </PostBlock>
    </div>
    
  )}

