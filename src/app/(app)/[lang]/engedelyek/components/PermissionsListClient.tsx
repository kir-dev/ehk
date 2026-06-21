"use client";

import { EmptyState } from "@/components/common/EmptyState";
import FileCard from "@/components/common/FileCard";
import { useLanguage } from "@/components/common/LanguageProvider";
import { PageHeader } from "@/components/common/PageHeader";
import { useTranslate } from "@/hooks/useTranslate";
import type { Permission } from "@/payload-types";
import { isMedia } from "@/utils/isMedia";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface Props {
  permissions: Permission[];
}

// Lexical richtext can be "empty" (a root with no real content). Only render when there is something.
type LexicalData = Permission["submissionProcess_hu"];
const hasRichText = (data: LexicalData): data is NonNullable<LexicalData> => {
  const children = data?.root?.children;
  return Array.isArray(children) && children.length > 0;
};

export default function PermissionsListClient({ permissions }: Props) {
  const { t } = useTranslate();
  const { lang } = useLanguage();
  const isEn = lang === "EN";

  return (
    <div className="container mx-auto px-2 md:px-4 py-8">
      <PageHeader
        title={t("permissions.title")}
        subtitle={t("permissions.description")}
      />

      <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
        {permissions.length === 0 ? (
          <EmptyState
            title={t("permissions.no_results")}
            description={t("permissions.no_permissions")}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {permissions.map((p) => {
              const name = isEn
                ? p.name_en || p.name_hu
                : p.name_hu || p.name_en;
              const description = isEn
                ? p.text_en || p.text_hu
                : p.text_hu || p.text_en;
              const submission = isEn
                ? p.submissionProcess_en || p.submissionProcess_hu
                : p.submissionProcess_hu || p.submissionProcess_en;
              const displayText = isEn
                ? p.displayText_en || p.displayText_hu
                : p.displayText_hu || p.displayText_en;

              const hasFile = !!p.file && isMedia(p.file);
              const externalLink = p.externalLink?.trim() || undefined;
              const fileTitle = displayText || name;

              return (
                <article
                  key={p.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e9e2d6] p-4"
                >
                  <div className="flex flex-col gap-4">
                    <h2 className="font-playfair font-semibold text-base leading-[1.4] text-black uppercase break-words">
                      {name}
                    </h2>

                    <div className="h-px w-full bg-[#e9e2d6]" />

                    <div className="prose max-w-none richtext text-sm leading-[1.6] text-black">
                      <RichText data={description} />
                    </div>
                  </div>

                  {hasRichText(submission) && (
                    <div className="flex flex-col gap-2">
                      <h3 className="font-open-sans font-semibold text-[13px] uppercase tracking-wide text-[#9a9a9a]">
                        {t("permissions.submission_process")}
                      </h3>
                      <div className="prose max-w-none richtext text-sm leading-[1.6] text-black">
                        <RichText data={submission} />
                      </div>
                    </div>
                  )}

                  {externalLink ? (
                    <FileCard
                      externalUrl={externalLink}
                      extensionLabel="link"
                      title={fileTitle}
                      actionType="open"
                    />
                  ) : hasFile ? (
                    <FileCard
                      file={p.file || undefined}
                      title={fileTitle}
                      actionType="view"
                    />
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
