"use client";

import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Decision } from "@/payload-types";
import { useLanguage } from "@/components/common/LanguageProvider";
import { getFileExtension, getFileUrl } from "@/utils/file";
import FileIcon from "@/components/common/FileIcon";

interface Props {
  decisions: Decision[];
}

export default function DecisionsArchiveClient({ decisions }: Props) {
  const { lang } = useLanguage();
  const t = (hu: string, en?: string) => (lang === "EN" ? en || hu : hu);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-500 mb-4 uppercase">
          {t("Határozatok Tára", "Decisions Archive")}
        </h1>
      </div>

      {decisions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-12 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("Nincsenek találatok", "No results")}
            </h3>
            <p className="text-gray-600">
              {t(
                "Próbáljon meg más keresési feltételeket vagy módosítsa a szűrőket.",
                "Try different search criteria or adjust the filters."
              )}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {decisions.map((decision) => {
            const ext = getFileExtension(decision.file);
            const href = getFileUrl(decision.file);
            const title = lang === "EN" ? decision.text_en : decision.text_hu;
            const secondary = decision.displayText;
            return (
              <Card
                key={decision.id}
                className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-4">
                  {/* compact */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-1">
                        {/* compact spacing */}
                        <div className="flex-shrink-0 bg-gray-50 p-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                          {/* compact icon container */}
                          <FileIcon extension={ext} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-tight text-gray-900 mb-1 group-hover:text-[#862633] transition-colors">
                            {title}
                          </h3>
                          {secondary && (
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {secondary}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            {/* compact meta */}
                            <Badge
                              variant="secondary"
                              className="text-[10px] uppercase tracking-wide"
                            >
                              {ext}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-3 group-hover:bg-red-50 group-hover:border-[#862633] group-hover:text-[#862633] bg-transparent"
                      asChild
                    >
                      <a href={href} download>
                        <Download className="w-4 h-4 mr-2" />
                        {t("Letöltés", "Download")}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}