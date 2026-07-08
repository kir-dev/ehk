import { Section } from "./Section";

export function InlineListSection({
  title,
  items,
}: Readonly<{
  title: string;
  items?: readonly string[];
}>) {
  if (!items?.length) {
    return null;
  }

  return (
    <Section title={title}>
      <ul className="flex flex-col gap-2 text-sm font-semibold text-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex items-center gap-2 sm:after:mx-4 sm:after:h-1 sm:after:w-1 sm:after:rounded-full sm:after:bg-ehk-light-red sm:last:after:hidden"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function DepartmentsSection({
  title,
  departments,
}: Readonly<{
  title: string;
  departments?: readonly string[];
}>) {
  if (!departments?.length) {
    return null;
  }

  return (
    <Section title={title}>
      <ul className="flex flex-wrap gap-2">
        {departments.map((department) => (
          <li
            key={department}
            className="rounded-full border border-ehk-light-red/20 bg-ehk-light-red/5 px-3.5 py-1.5 text-sm font-semibold text-foreground"
          >
            {department}
          </li>
        ))}
      </ul>
    </Section>
  );
}
