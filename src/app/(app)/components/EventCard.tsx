import { Event } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/common/LanguageProvider";

interface EventCardProps {
  event?: Event;
  onReturn?: () => void;
  className?: string;
  nextEvent?: () => void;
  previousEvent?: () => void;
}

export default function EventCard({
  event,
  onReturn,
  className,
  nextEvent,
  previousEvent,
}: EventCardProps) {
  const { lang } = useLanguage();
  if (!event) {
    return null;
  }
  const { title_hu, title_en, shortDescription, date } = event;
  const { startDate, endDate } = date;

  const t = {
    back: lang === "EN" ? "Back to calendar" : "Vissza a naptárhoz",
    locale: lang === "EN" ? "en-GB" : "hu-HU",
  } as const;

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative",
        className
      )}
    >
      <div className="p-6 relative z-10 flex-1">
        <p className="text-gray-500 text-sm mb-2 transition-colors duration-300">
          {new Date(startDate).toLocaleDateString(t.locale)} -{" "}
          {new Date(endDate).toLocaleDateString(t.locale)}
        </p>
        <h3 className="text-xl font-bold mb-3 text-gray-900 transition-colors duration-300">
          {lang === "EN" ? title_en : title_hu}
        </h3>

        <div className="mb-4">
          <p className="text-gray-600 w-full block break-words transition-colors duration-300">
            {lang === "EN"
              ? shortDescription.description_en
              : shortDescription.description_hu}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 relative z-10 w-full flex flex-col gap-2">
        <Button
          onClick={() => onReturn?.()}
          variant="outline"
          className="w-full"
        >
          {t.back}
        </Button>

        <div className="flex items-center justify-between">
          <ArrowLeft
            onClick={previousEvent}
            color={previousEvent ? "black" : "gray"}
            className={previousEvent && "cursor-pointer"}
          />
          <ArrowRight
            onClick={nextEvent}
            color={nextEvent ? "black" : "gray"}
            className={nextEvent && "cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
}