import { groupRemindersByYear } from '@/lib/utils'
import {getReminders} from "@/lib/payload-cms";
import RemindersGridClient from './reminders-grid-client';

// Server component for data fetching
export default async function RemindersGrid() {
    const reminders = await getReminders();
    const remindersByYear = groupRemindersByYear(reminders);
    return <RemindersGridClient remindersByYear={remindersByYear} />;
}
