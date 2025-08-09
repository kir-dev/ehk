import Image from 'next/image'
import { FileText, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {Representative} from "@/payload-types";

interface RepresentativeCardProps {
    representative: Representative
    onClick: () => void
}

export function RepresentativeCard({ representative, onClick }: RepresentativeCardProps) {
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

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={onClick}>
            <CardContent className="p-6 h-full flex flex-col">
                <div className="flex flex-col items-center text-center flex-1">
                    <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {representative.picture ? (
                                <Image
                                    src={typeof representative.picture === 'object' ? representative.picture.url || "/nincs.jpg" : "/nincs.jpg"}
                                    alt={representative.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-3xl font-semibold text-gray-600">
                                    {representative.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                        </div>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-[#862633] transition-colors">
                        {representative.name}
                    </h3>

                    {representative.position && representative.position.length > 0 && (
                        <p className="text-sm text-gray-600 mb-3">
                            {representative.position[0]?.position_hu}
                        </p>
                    )}

                    {representative.faculty && (
                        <Badge className={`mb-3 ${facultyColors[representative.faculty as keyof typeof facultyColors] || 'bg-gray-100 text-gray-800'}`}>
                            <Building2 className="w-3 h-3 mr-1" />
                            {representative.faculty}
                        </Badge>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {representative.files && representative.files.length > 0 && (
                            <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-1" />
                                <span>{representative.files.length}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-auto w-full">
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-red-200 group-hover:border-[#862633]">
                        Részletek megtekintése
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
