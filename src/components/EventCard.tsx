import { Event } from "@/payload-types";
import Link from "next/link";

interface EventCardProps {
  event?: Event;
}

export default function EventCard({ event }: EventCardProps) {
  if (!event) {
    return null;
  }
  const { id, title_hu, shortDescription, date } = event;
  const { startDate, endDate } = date;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative w-fit">
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

      <div className="px-6 pb-6 relative z-10">
        <Link
          href={`/events/${id}`}
          className="inline-block bg-ehk-dark-red hover:bg-white hover:text-red-600 text-black py-2 px-4 rounded transition-colors duration-200 text-center w-full border border-transparent hover:border-red-600"
        >
          Tovább
        </Link>
      </div>
    </div>
  );
}
