import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import React from "react";

export function ExternalLinkCard({ title, description, href, icon: Icon, moreInfoText }: {
  title: string;
  description: React.ReactNode;
  href: string;
  icon?: any;
  moreInfoText: string;
}) {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {Icon && <Icon size={20} className="text-gray-400" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          {description}
        </div>
        <Button variant="outline" className="w-full mt-4 hover:bg-red-50 hover:border-[#862633] hover:text-[#862633]" asChild>
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 font-bold">
                {moreInfoText} <ExternalLink size={16} />
            </a>
        </Button>
      </CardContent>
    </Card>
  );
}
