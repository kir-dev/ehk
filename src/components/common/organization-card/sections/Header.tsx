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
    <div className="px-5 pb-5 pt-6 sm:px-7 md:px-8 md:pb-6 md:pt-7">
      <div className="space-y-3">
        <h2 className="font-playfair text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          {name}
        </h2>

        {Boolean(stats?.length) && (
          <dl className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
            {stats?.map((stat) => (
              <div
                key={`${stat.label}-${stat.value}`}
                className="flex items-center gap-2 sm:after:mx-4 sm:after:h-1 sm:after:w-1 sm:after:rounded-full sm:after:bg-ehk-light-red sm:last:after:hidden"
              >
                <dt className="font-semibold text-muted-foreground">
                  {getStatLabel(stat.label)}:
                </dt>
                <dd className="font-semibold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
