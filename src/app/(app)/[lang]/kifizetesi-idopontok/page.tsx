export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/common/PageHeader";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getActivePayoutPeriod } from "@/lib/payload-cms";
import { PayoutDates } from "./components/PayoutDates";

export default async function PayoutInfoPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang, "scholarships");
  const payoutPeriod = await getActivePayoutPeriod();
  const t = dictionary.payouts;

  return (
    <div className="bg-[#f9f4f0] w-full">
      <div className="container mx-auto px-4 py-8 md:px-8">
        {!payoutPeriod ? (
          <div className="flex flex-col">
            <PageHeader title={t.title} />
            <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-8">
              <p className="text-center font-open-sans text-[#9a9a9a]">
                {t.no_active_period}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <PageHeader
              title={t.title}
              subtitle={t.subtitle.replace("{title}", payoutPeriod.title)}
            />

            {/* Content card */}
            <div className="bg-[#fffefc] border-x border-b border-[#e9e2d6] rounded-b-2xl p-4 md:p-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left column — instructional cards */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Important to-dos */}
                  <div className="flex flex-col gap-4 border border-[#e9e2d6] rounded-2xl p-4">
                    <p className="font-open-sans font-semibold text-[13px] uppercase text-[#a82030]">
                      {t.important_todo_title}
                    </p>
                    <p className="font-open-sans text-[14px] leading-[1.6] text-[#3d3d3d]">
                      {t.important_todo_p1}
                    </p>
                    <p className="font-open-sans font-semibold text-[13px] text-[#3d3d3d]">
                      {t.important_todo_p2}
                    </p>
                    <p className="font-open-sans text-[14px] leading-[1.6] text-[#3d3d3d]">
                      {t.important_todo_p3}
                    </p>
                    {/* Warning box */}
                    <div className="bg-[#f9f4f0] border border-[#862633] rounded-2xl px-4 py-2">
                      <p className="font-open-sans text-[14px] leading-[1.6] text-[#6b0f1a]">
                        {t.important_todo_p4}
                      </p>
                    </div>
                  </div>

                  {/* Wrong transfer / termination */}
                  <div className="flex flex-col gap-4 border border-[#e9e2d6] rounded-2xl p-4">
                    <p className="font-open-sans font-semibold text-[13px] uppercase text-[#a82030]">
                      {t.wrong_transfer_title}
                    </p>
                    <p className="font-open-sans text-[14px] leading-[1.6] text-[#3d3d3d]">
                      {t.wrong_transfer_p1}
                    </p>
                  </div>
                </div>

                {/* Right column — payout dates */}
                <div className="flex-1 flex flex-col gap-4">
                  <PayoutDates
                    autumnPayouts={payoutPeriod.autumnSemester?.payouts}
                    springPayouts={payoutPeriod.springSemester?.payouts}
                    lang={lang}
                    autumnLabel={t.autumn_tab}
                    springLabel={t.spring_tab}
                  />
                  <p className="font-open-sans font-semibold text-[11px] leading-[1.6] text-[#9a9a9a]">
                    {t.check_mueper}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
