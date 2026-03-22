'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, ArrowLeft } from 'lucide-react';

export function HungarianOnlyWarning() {
  const pathname = usePathname();
  // Replace /en/ with /hu/
  const huPath = pathname.replace(/^\/en\//, '/hu/');

  return (
    <div className="min-h-[60vh] bg-gray-50/50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-ehk-dark-red rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
          <Globe size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">This page is only available in Hungarian</h1>
          <p className="text-gray-600 font-medium">Ez az oldal csak magyar nyelven érhető el</p>
        </div>
        
        <div className="text-sm text-gray-500 space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p>
            The information in this section is specifically designed for Hungarian students or deals with local administrative matters, so it is currently not available in English.
          </p>
          <p className="italic">
            Az információk ezen a részen kifejezetten a magyar hallgatók számára készültek, vagy helyi adminisztratív ügyekkel foglalkoznak, ezért jelenleg nem érhetőek el angol nyelven.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild className="bg-ehk-dark-red hover:bg-[#862633] text-white">
            <Link href={huPath}>
              Hungarian version / Magyar nyelvű verzió
            </Link>
          </Button>
          <Button variant="outline" asChild className="hover:bg-red-50 hover:text-[#862633] hover:border-[#862633]">
            <Link href="/en">
              <ArrowLeft size={16} className="mr-2" /> Homepage / Főoldal
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
