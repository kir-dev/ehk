'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, ArrowLeft } from 'lucide-react';

export function LanguageWarning() {
  const pathname = usePathname();
  // Replace /hu/ with /en/
  const enPath = pathname.replace(/^\/hu\//, '/en/');

  return (
    <div className="min-h-[60vh] bg-gray-50/50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-ehk-dark-red rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
          <Globe size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Ez az oldal csak angol nyelven érhető el</h1>
          <p className="text-gray-600 font-medium">This page is only available in English</p>
        </div>
        
        <div className="text-sm text-gray-500 space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p>
            Az információk ezen a részen kifejezetten a külföldi hallgatók számára készültek, ezért jelenleg nem érhetőek el magyar nyelven.
          </p>
          <p className="italic">
            The information in this section is specifically designed for international students, so it is currently not available in Hungarian.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild className="bg-ehk-dark-red hover:bg-[#862633] text-white">
            <Link href={enPath}>
              Angol nyelvű verzió / English version
            </Link>
          </Button>
          <Button variant="outline" asChild className="hover:bg-red-50 hover:text-[#862633] hover:border-[#862633]">
            <Link href="/hu">
              <ArrowLeft size={16} className="mr-2" /> Főoldal / Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
