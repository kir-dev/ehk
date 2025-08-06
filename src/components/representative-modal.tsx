'use client'

import { X, Mail, Download, Building2, User } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {Representative} from "@/payload-types";
import {RichText} from "@payloadcms/richtext-lexical/react";

interface RepresentativeModalProps {
    representative: Representative
    onClose: () => void
}

export function RepresentativeModal({ representative, onClose }: RepresentativeModalProps) {
    const facultyColors = {
        'ÉMK': 'bg-red-100 text-red-800',
        'GPK': 'bg-blue-100 text-blue-800',
        'ÉPK': 'bg-green-100 text-green-800',
        'VBK': 'bg-purple-100 text-purple-800',
        'VIK': 'bg-orange-100 text-orange-800',
        'GTK': 'bg-pink-100 text-pink-800',
        'TTK': 'bg-indigo-100 text-indigo-800',
        'KJK': 'bg-yellow-100 text-yellow-800',
    }

    console.log('representative.files:', representative.files);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {representative.picture ? (
                                <Image
                                    src={representative.picture.url || "/placeholder.svg"}
                                    alt={representative.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-8 h-8 text-gray-600" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{representative.name}</h2>
                            {representative.position && representative.position.length > 0 && (
                                <p className="text-sm text-gray-600 font-normal">
                                    {representative.position[0].position_hu}
                                </p>
                            )}
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {representative.faculty && (
                        <div className="flex items-center gap-2">
                            <Badge className={facultyColors[representative.faculty as keyof typeof facultyColors] || 'bg-gray-100 text-gray-800'}>
                                <Building2 className="w-4 h-4 mr-2" />
                                {representative.faculty}
                            </Badge>
                        </div>
                    )}

                    {representative.position && representative.position.length > 1 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Pozíciók</h3>
                            <div className="space-y-2">
                                {representative.position.map((pos, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium">{pos.position_hu}</p>
                                        {pos.position_en && (
                                            <p className="text-sm text-gray-600">{pos.position_en}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {representative.emails && representative.emails.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3 flex items-center">
                                <Mail className="w-5 h-5 mr-2" />
                                Elérhetőségek
                            </h3>
                            <div className="space-y-2">
                                {representative.emails.map((emailObj, index) => (
                                    <a
                                        key={index}
                                        href={`mailto:${emailObj.email}`}
                                        className="block bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-colors"
                                    >
                    <span className="text-blue-600 hover:text-blue-800">
                      {emailObj.email}
                    </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    <div>
                        <h3 className="font-semibold text-lg mb-3">Bemutatkozás</h3>
                        <div
                            className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                            <RichText data={representative.introduction.text_hu} />
                        </div>
                    </div>

                    {representative.files && representative.files.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center">
                                    <Download className="w-5 h-5 mr-2" />
                                    Beszámolók és dokumentumok
                                </h3>
                                <div className="grid gap-3">
                                    {representative.files.map((fileObj, index) => {
                                        const fileUrl = fileObj.file?.url || fileObj.url;
                                        return (
                                            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div>
                                                    <h4 className="font-medium">{fileObj.title_hu}</h4>
                                                </div>
                                                {fileUrl ? (
                                                    <a
                                                        href={fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center"
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Megnyitás
                                                        </Button>
                                                    </a>
                                                ) : (
                                                    <Button variant="outline" size="sm" disabled>
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Nem elérhető
                                                    </Button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
