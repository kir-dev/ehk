"use client";

import { EmptyState } from "@/components/common/EmptyState";
import FileCard from "@/components/common/FileCard";
import { useTranslate } from "@/hooks/useTranslate";
import { Help } from "@/payload-types";

interface HelpPageListProps {
  help: Help[];
}

export default function HelpPageList({ help }: HelpPageListProps) {
  const { t, lang } = useTranslate();

  return (
    <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
      {help.length === 0 ? (
        <EmptyState
          title={t("Nincs találat", "No results")}
          description={t(
            "Jelenleg nincsenek elérhető segédanyagok.",
            "There are no guides available at the moment.",
          )}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {help.map((item) => {
            const { title_hu, title_en, description_hu, description_en } = item;
            const title = t(title_hu, title_en);
            const description = t(description_hu, description_en);

            return (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] bg-white p-4"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="font-playfair font-semibold text-base leading-[1.4] text-black break-words">
                    {title}
                  </h2>
                  <p className="font-open-sans text-sm leading-[1.6] text-black break-words">
                    {description}
                  </p>
                </div>

                {item.files?.map((file) => {
                  const { displayName_hu, displayName_en, file_hu, file_en } = file;
                  const displayName = t(displayName_hu, displayName_en || displayName_hu);
                  const currentFile = lang === "EN" ? file_en || file_hu : file_hu || file_en;

                  return (
                    <FileCard
                      key={file.id}
                      file={currentFile || undefined}
                      title={displayName}
                      actionType="view"
                    />
                  );
                })}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
