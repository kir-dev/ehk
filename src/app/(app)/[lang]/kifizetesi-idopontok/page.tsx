import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getActivePayoutPeriod } from "@/lib/payload-cms";
import { PayoutTable } from "./components/PayoutTable";

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
          <PayoutTable
            title={dictionary.payouts.autumn_semester.replace("{title}", title)}
            payouts={autumnSemester?.payouts}
            lang={lang}
          />
          <PayoutTable
            title={dictionary.payouts.spring_semester.replace("{title}", title)}
            payouts={springSemester?.payouts}
            lang={lang}
          />
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
