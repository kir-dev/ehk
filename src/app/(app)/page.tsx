import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    <div className="bg-black text-[#EA580B] flex items-center justify-center min-h-screen flex-col gap-4">
      <h1 className="text-4xl font-extrabold">Kir-Dev Next-Payload template</h1>
      <NewsSection />
    </div>
  );
}
