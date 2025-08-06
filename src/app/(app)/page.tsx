import Calendar from "@/components/Calendar";
import { getEvents } from "@/lib/payload-cms";

export default async function Home() {
  const events = await getEvents();
  return (
    <div className="bg-transparent min-h-screen">
      <Calendar events={events} />
    </div>
  );
}
