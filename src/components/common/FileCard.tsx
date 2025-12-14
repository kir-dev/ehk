"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Media } from "@/payload-types";
import { getFileExtension, getFileUrl } from "@/utils/file";
import { Download } from "lucide-react";
import FileIcon from "./FileIcon";
import { useLanguage } from "./LanguageProvider";

interface FileCardProps {
  file: number | Media;
  title: string;
}

export default function FileCard({ file, title }: FileCardProps) {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);
  const ext = getFileExtension(file);
  const href = getFileUrl(file);

  return (
    <div className="flex items-center justify-between bg-gray-50 p-2 md:p-3 rounded-lg border border-gray-200 my-3 gap-2 flex-col sm:flex-row">
      <div className="flex gap-2 mb-1 self-start">
        <div className="flex-shrink-0">
          <FileIcon extension={ext} />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight text-gray-900 mb-1 group-hover:text-[#862633] transition-colors">
            {title}{" "}
            <Badge variant="extension" className="">
              {ext}
            </Badge>
          </h3>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="group/button hover:bg-red-50 hover:border-[#862633] hover:text-[#862633] self-end"
        asChild
      >
        <a href={href} download>
          <Download className="w-4 h-4 mr-2" />
          {t("Letöltés", "Download")}
        </a>
      </Button>
    </div>
  );
}
