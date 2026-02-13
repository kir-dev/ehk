
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getActivePayoutPeriod } from "@/lib/payload-cms";

export default async function PayoutInfoPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const payoutPeriod = await getActivePayoutPeriod();

  if (!payoutPeriod) {
    return (
      <div className="container mx-auto py-10 px-4">
        <PageHeader title={dictionary.payouts.title} />
        <p className="text-center text-muted-foreground mt-8">
          {dictionary.payouts.no_active_period}
        </p>
      </div>
    );
  }

  const { title, autumnSemester, springSemester } = payoutPeriod;

  return (
    <div className="container mx-auto py-10 px-4">
      <PageHeader title={dictionary.payouts.title} />

      <div className="mx-auto space-y-10">
        <p className="text-lg text-center">
          {dictionary.payouts.intro_text.replace("{title}", title)}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Autumn Semester Card */}
          <Card>
            <CardHeader className="bg-muted/50 border-b pb-4">
              <CardTitle className="text-xl">
                {dictionary.payouts.autumn_semester.replace("{title}", title)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left text-lg">
                <tbody className="divide-y">
                  {autumnSemester?.payouts?.map((payout, index) => (
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
                  {(!autumnSemester?.payouts ||
                    autumnSemester.payouts.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground italic">
                        -
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Spring Semester Card */}
          <Card>
            <CardHeader className="bg-muted/50 border-b pb-4">
              <CardTitle className="text-xl">
                {dictionary.payouts.spring_semester.replace("{title}", title)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left text-lg">
                <tbody className="divide-y">
                  {springSemester?.payouts?.map((payout, index) => (
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
                  {(!springSemester?.payouts ||
                    springSemester.payouts.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground italic">
                        -
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-muted-foreground italic">
          {dictionary.payouts.check_mueper}
        </p>

        <div className="space-y-6">
          {/* Important Info Section */}
          <Card className="border-ehk-dark-red">
            <CardHeader>
              <CardTitle className="text-ehk-dark-red flex items-center gap-2">
                {dictionary.payouts.important_todo_title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{dictionary.payouts.important_todo_p1}</p>
              <p className="font-medium text-foreground">
                {dictionary.payouts.important_todo_p2}
              </p>
              <p>{dictionary.payouts.important_todo_p3}</p>
              <div className="bg-ehk-dark-red/5 p-4 rounded-lg border border-ehk-dark-red/20 text-ehk-dark-red text-sm mt-2">
                {dictionary.payouts.important_todo_p4}
              </div>
            </CardContent>
          </Card>

          {/* Wrong Transfer / Termination Info Section */}
          <Card>
            <CardHeader>
              <CardTitle>{dictionary.payouts.wrong_transfer_title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>{dictionary.payouts.wrong_transfer_p1}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
