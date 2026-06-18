import { getReminders } from "@/lib/payload-cms";
import RemindersGridClient from './RemindersGridClient';

// Server component for data fetching
export default async function RemindersGrid() {
    const reminders = await getReminders();
    return <RemindersGridClient reminders={reminders} />;
}
