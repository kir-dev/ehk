"use client";

import FileCard from "@/components/common/FileCard";
import { useLanguage } from "@/components/common/LanguageProvider";
import { Help } from "@/payload-types";

interface HelpPageListProps {
  help: Help[];
}

export default function HelpPageList({ help }: HelpPageListProps) {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return help.map((item) => {
    const { title_hu, title_en, description_hu, description_en } = item;
    return (
      <div
        key={item.id}
        className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">{t(title_hu, title_en)}</h2>
        <div className="prose max-w-none text-gray-700 richtext">
          {t(description_hu, description_en)}
        </div>

        {item.files?.map((file) => {
          const { displayName_hu, displayName_en, file_hu, file_en } = file;
          const title = t(displayName_hu, displayName_en || displayName_hu);
          const currentFile = lang === "HU" ? file_hu : file_en || file_hu;

          return <FileCard key={file.id} file={currentFile} title={title} />;
        })}
      </div>
    );
  });
}
