import { Event } from "@/payload-types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  if (!event) {
    return null;
  }
  const { title_hu, shortDescription, date } = event;
  const { startDate, endDate } = date;
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative",
        className
      )}
    >
      <div className="p-6 relative z-10 flex-1">
        <p className="text-gray-500 text-sm mb-2 transition-colors duration-300">
          {new Date(startDate).toLocaleDateString("hu-HU")} -{" "}
          {new Date(endDate).toLocaleDateString("hu-HU")}
        </p>
        <h3 className="text-xl font-bold mb-3 text-gray-900 transition-colors duration-300">
          {title_hu}
        </h3>

        {/* Increased line-clamp and added more height */}
        <div className="mb-4">
          <p className="text-gray-600 w-full block break-words transition-colors duration-300">
            {shortDescription.description_hu}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 relative z-10 w-full flex flex-col gap-2">
        <Button
          onClick={() => onReturn?.()}
          variant="outline"
          className="w-full"
        >
          Vissza a naptárhoz
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
