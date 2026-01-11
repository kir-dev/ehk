"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/hooks/useTranslate";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";
import { getFileExtension } from "@/utils/file";
import { Calendar, Download, Eye } from "lucide-react";
import { ReactNode } from "react";
import FileIcon from "./FileIcon";

interface FileCardProps {
  file?: number | Media | { url?: string; filename?: string };
  title: string;
  secondaryText?: string | ReactNode;
  date?: string;
  actionType?: 'view' | 'download';
  actionLabel?: string;
  className?: string;
}

export default function FileCard({ 
  file, 
  title, 
  secondaryText,
  date,
  actionType = 'view',
  actionLabel,
  className 
}: FileCardProps) {
  const { t } = useTranslate();
  
  // Helper to extract file info safely
  const getFileInfo = () => {
    if (!file) return { url: '#', ext: 'file' };
    if (typeof file === 'number') return { url: '#', ext: 'file' };
    
    // Check if it's likely a Media object (has id and filename)
    if ('id' in file && 'filename' in file) {
       return { 
         url: file.url || '#', 
         ext: getFileExtension(file as Media) 
       };
    }
    
    // Fallback for simple object { url, filename }
    const simpleFile = file as { url?: string; filename?: string };
    return { 
      url: simpleFile.url || '#', 
      ext: simpleFile.filename?.split(".").pop()?.toLowerCase() || "file" 
    };
  };

  const { url, ext } = getFileInfo();

  const handleAction = (e: React.MouseEvent) => {
    if (actionType === 'view') {
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const Icon = actionType === 'view' ? Eye : Download;
  const defaultLabel = actionType === 'view' ? t("Megtekintés", "View") : t("Letöltés", "Download");

  return (
    <Card className={cn("group hover:shadow-md transition-all duration-300 w-full py-4", className)}>
      <CardContent className="px-3 md:px-4 py-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <FileIcon extension={ext} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-lg leading-tight text-gray-900 mb-1 group-hover:text-[#862633] transition-colors break-words">
                  {title}
                </h3>
                {secondaryText && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-1">
                    {secondaryText}
                  </p>
                )}
                {date && (
                   <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{date}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                    {ext}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 group/button hover:bg-red-50 hover:border-[#862633] hover:text-[#862633] bg-transparent"
            asChild={actionType === 'download'}
            onClick={actionType === 'view' ? handleAction : undefined}
          >
            {actionType === 'download' ? (
              <a href={url} download className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                {actionLabel || defaultLabel}
              </a>
            ) : (
               <>
                 <Icon className="w-4 h-4 mr-2" />
                 {actionLabel || defaultLabel}
               </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
