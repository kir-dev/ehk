



import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface LanguageEducationContent {
  title: string;
  info_box: {
    title: string;
    content: string;
  };
}

export default function LanguageEducationContent({ content }: { content: LanguageEducationContent }) {
  return (
    <div className="container mx-auto lg:px-4 px-2 py-8">
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex not-md:flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-bold text-xl leading-tight text-gray-900">
                {content.info_box.title}
              </h3>
              <p className="text-gray-700 text-lg richtext">
                {content.info_box.content}
                &nbsp;
                <a
                  href="http://www.inyk.bme.hu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.inyk.bme.hu
                </a>
              </p>
            </div>
            <div>
              <Image
                src={"/nyelviskola.png"}
                alt={"Nyelviskola"}
                width={2000}
                height={500}
                className="transition-opacity duration-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}