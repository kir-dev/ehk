import { News } from "@/payload-types";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({
  news: { title, shortDescription, date, tags },
}: NewsCardProps) {
  return (
    <div className="p-2 bg-white text-black max-w-2xs h-96 hover:bg-red-100 transition-colors relative group items-center flex flex-col justify-between">
      <div>
        <p className="italic text-gray-500">
          {new Date(date).toLocaleDateString("HU-hu")}
        </p>
        <h1 className="text-xl bold uppercase">{title}</h1>
        <p className="line-clamp-5 text-gray-500">{shortDescription.text_hu}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button className="opacity-0 uppercase group-hover:opacity-100 transition-opacity mt-3 bg-transparent text-white py-1 px-4 border-4 border-white rounded w-fit">
        Tovább
      </button>
    </div>
  );
}
