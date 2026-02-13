
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n-config";

interface Payout {
  month_hu: string;
  month_en: string;
  date: string;
}

interface PayoutTableProps {
  title: string;
  payouts: Payout[] | undefined | null;
  lang: Locale;
}

export function PayoutTable({ title, payouts, lang }: PayoutTableProps) {
  return (
    <Card>
      <CardHeader className="bg-muted/50 border-b pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-left text-lg">
          <tbody className="divide-y">
            {payouts?.map((payout, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-muted-foreground text-center font-medium">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 font-medium capitalize">
                  {lang === "hu" ? payout.month_hu : payout.month_en}
                </td>
                <td className="px-6 py-4 text-right text-muted-foreground">
                  {payout.date}
                </td>
              </tr>
            ))}
            {(!payouts || payouts.length === 0) && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-muted-foreground italic"
                >
                  -
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
