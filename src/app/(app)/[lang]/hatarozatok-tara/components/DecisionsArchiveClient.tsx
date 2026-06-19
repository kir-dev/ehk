"use client";

import { EmptyState } from "@/components/common/EmptyState";
import FileCard from "@/components/common/FileCard";
import { useLanguage } from "@/components/common/LanguageProvider";
import { PageHeader } from "@/components/common/PageHeader";
import { useTranslate } from "@/hooks/useTranslate";
import type { Decision } from "@/payload-types";

interface Props {
  decisions: Decision[];
}

export default function DecisionsArchiveClient({ decisions }: Props) {
  const { t } = useTranslate();
  const { lang } = useLanguage();

  return (
    <div className="container mx-auto px-2 md:px-4 py-8">
      <PageHeader
        title={t("decisions.title")}
        subtitle={t("decisions.description")}
      />

      <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-6 md:p-8">
        {decisions.length === 0 ? (
          <EmptyState title={t("decisions.no_decisions_global")} />
        ) : (
          <div className="flex flex-col gap-4">
            {decisions.map((decision) => {
              const title =
                lang === "EN"
                  ? decision.text_en || decision.text_hu
                  : decision.text_hu || decision.text_en;

              return (
                <FileCard
                  key={decision.id}
                  file={decision.file}
                  title={title}
                  actionType="view"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
