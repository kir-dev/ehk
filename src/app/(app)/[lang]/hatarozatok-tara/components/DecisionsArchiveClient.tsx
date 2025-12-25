"use client";

import FileCard from "@/components/common/FileCard";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/hooks/useTranslate";
import type { Decision } from "@/payload-types";
import { FileText } from "lucide-react";

interface Props {
  decisions: Decision[];
}

export default function DecisionsArchiveClient({ decisions }: Props) {
  const { t, lang } = useTranslate();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={t("decisions.title", lang === "EN" ? "Decisions Archive" : "Határozatok Tára")}
        description={t("decisions.description", lang === "EN" ? "Archive of decisions made by the University Students' Union." : "Az Egyetemi Hallgatói Képviselet által hozott határozatok archívuma.")}
      />

      {decisions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-12 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("decisions.no_results", lang === "EN" ? "No results" : "Nincsenek találatok")}
            </h3>
            <p className="text-gray-600">
              {t("decisions.try_filtering", lang === "EN" ? "Try different search criteria or adjust the filters." : "Próbáljon meg más keresési feltételeket vagy módosítsa a szűrőket.")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {decisions.map((decision) => {
            // Fallback content handling
            const title = lang === 'EN' 
                ? (decision.text_en || decision.text_hu) 
                : (decision.text_hu || decision.text_en);
            const secondary = decision.displayText;
            
            return (
              <FileCard
                key={decision.id}
                file={decision.file}
                title={title || ''}
                secondaryText={secondary}
                actionType="view" 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}