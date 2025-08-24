import { News } from "@/payload-types";
import Link from "next/link";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({
  news: { id, title, shortDescription, date, tags },
}: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative">
      {/* Overlay div that appears on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-0"
        style={{ backgroundImage: "url('/bmebgred.jpg')" }}
      />

      <div className="p-6 flex-grow relative z-10">
        <p className="text-gray-500 text-sm mb-2 group-hover:text-white transition-colors duration-300">
          {new Date(date).toLocaleDateString("HU-hu")}
        </p>
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>

        {/* Increased line-clamp and added more height */}
        <div className="min-h-[150px] mb-4">
          <p className="text-gray-600 w-full block break-words group-hover:text-white transition-colors duration-300">
            {shortDescription.text_hu}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm group-hover:bg-white group-hover:text-red-800 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 relative z-10">
        <Link
          href={`/news/${id}`}
          className="inline-block bg-ehk-dark-red hover:bg-white hover:text-[var(--ehk-dark-red)] text-white py-2 px-4 rounded transition-colors duration-200 text-center w-full border border-transparent hover:border-[var(--ehk-dark-red)]"
        >
          Tovább
        </Link>
      </div>
    </div>
  );
}
