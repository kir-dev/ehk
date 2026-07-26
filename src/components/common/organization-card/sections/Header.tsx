import type { OrganizationStat } from "../types";
import { getStatLabel } from "../utils";

export function OrganizationCardHeader({
  name,
  stats,
}: Readonly<{
  name: string;
  stats?: readonly OrganizationStat[];
}>) {
  return (
    <header className="border-b border-border p-4">
      <div className="space-y-2">
        <h2 className="font-playfair text-[22px] font-bold leading-[1.3] text-black">
          {name}
        </h2>

        {Boolean(stats?.length) && (
          <dl className="flex flex-col gap-2 font-open-sans text-[13px] font-semibold text-[#9a9a9a] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
            {stats?.map((stat) => (
              <div
                key={`${stat.label}-${stat.value}`}
                className="flex items-center gap-2 sm:after:mx-4 sm:after:h-1 sm:after:w-1 sm:after:rounded-full sm:after:bg-ehk-light-red sm:last:after:hidden"
              >
                <dt>
                  {getStatLabel(stat.label)}:
                </dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
