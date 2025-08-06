import { YearSection } from '@/components/year-section'
import { groupRemindersByYear } from '@/lib/utils'
import {getReminders} from "@/lib/payload-cms";
import {FileText} from "lucide-react";
import RemindersGridClient from './reminders-grid-client';

// Server component for data fetching
export default async function RemindersGrid() {
    const reminders = await getReminders();
    const remindersByYear = groupRemindersByYear(reminders);
    return <RemindersGridClient remindersByYear={remindersByYear} />;
}
