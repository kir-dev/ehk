"use client"

import Link from "next/link"
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
    const { lang } = useLanguage()
    const t = (hu: string, en?: string) => (lang === 'EN' ? (en || hu) : hu)

    return (
        <footer className="bg-[#3E3D3D] text-white py-12 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* KAPCSOLAT Section */}
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg font-semibold mb-4">{t('KAPCSOLAT', 'CONTACT')}</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>{t('Budapesti Műszaki és Gazdaságtudományi Egyetem', 'Budapest University of Technology and Economics')}</p>
                            <p>{t('Egyetemi Hallgatói Képviselet', 'University Student Council')}</p>

                            <div className="mt-4 space-y-1">
                                <p>
                                    <span className="text-gray-400">{t('Cím:', 'Address:')}</span>{' '}
                                    <Link
                                        href="https://maps.google.com/?q=1111+Budapest,+Műegyetem+rkp.+7-9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        1111 Bp., Műegyetem rkp. 7-9. R. ép. 2.07.
                                    </Link>
                                </p>
                                <p>
                                    <span className="text-gray-400">Tel:</span> +36-1-463-3836
                                </p>
                                <p>
                                    <span className="text-gray-400">{t('E-mail címek:', 'Email addresses:')}</span>
                                </p>

                                <ul className="ml-4 space-y-1">
                                    <li>
                                        <span className="text-gray-500">•</span>{' '}
                                        <Link
                                            href="mailto:info@bmeehk.hu"
                                            className="text-gray-200 hover:text-white transition-colors"
                                        >
                                            info@bmeehk.hu
                                        </Link>
                                    </li>
                                    <li>
                                        <span className="text-gray-500">•</span>{' '}
                                        <Link
                                            href="mailto:palyazat@bmeehk.hu"
                                            className="text-gray-200 hover:text-white transition-colors"
                                        >
                                            palyazat@bmeehk.hu
                                        </Link>
                                    </li>
                                    <li>
                                        <span className="text-gray-500">•</span>{' '}
                                        <Link
                                            href="mailto:kollegium@bmeehk.hu"
                                            className="text-gray-200 hover:text-white transition-colors"
                                        >
                                            kollegium@bmeehk.hu
                                        </Link>
                                    </li>
                                    <li>
                                        <span className="text-gray-500">•</span>{' '}
                                        <Link
                                            href="mailto:oktatas@bmeehk.hu"
                                            className="text-gray-200 hover:text-white transition-colors"
                                        >
                                            oktatas@bmeehk.hu
                                        </Link>
                                    </li>
                                    <li>
                                        <span className="text-gray-500">•</span>{' '}
                                        <Link
                                            href="mailto:szoc@bmeehk.hu"
                                            className="text-gray-200 hover:text-white transition-colors"
                                        >
                                            szoc@bmeehk.hu
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <p>
                                    <span className="text-gray-400">{t('Az Iroda fogadó ideje:', 'Office hours:')}</span> {t('hétköznap 10-14 óra között', 'weekdays 10:00–14:00')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-gray-600"></div>

                    {/* EGYETEMI OLDALAK Section */}
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg font-semibold mb-4">{t('EGYETEMI OLDALAK', 'UNIVERSITY PAGES')}</h3>
                        <nav className="space-y-2">
                            <Link href="https://bme.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                BME
                            </Link>
                            <Link href="https://telefon.bme.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                {t('BME Telefonkönyv', 'BME Phonebook')}
                            </Link>
                            <Link href="https://www.hszi.bme.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                {t('Értékesítési és Szolgáltatási Igazgatóság', 'Directorate of Sales and Services')}
                            </Link>
                            <Link href="https://kth.bme.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                {t('Központi Tanulmányi Hivatal', 'Central Academic Office')}
                            </Link>
                            <Link href="https://miszisz.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                {t('MISZ Műegyetemi Iskolaszövetkezet', 'MISZ University Student Cooperative')}
                            </Link>
                            <Link href="https://www.szkene.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                {t('Szkéné színház', 'Szkéné Theatre')}
                            </Link>
                            <Link href="https://muhely.bme.hu/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                                MŰHELY Online
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* University Logo */}
                <div className="flex justify-center items-center pt-8">
                    <Image src={"/bmelogo.png"} alt={t("BME Logó", "BME Logo")} width={100} height={100} className="h-16 w-auto" />
                </div>
            </div>
        </footer>
    )
}
