import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
}

export function SectionHeader({ title, icon: Icon }: Readonly<SectionHeaderProps>) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 shrink-0 shadow-sm">
          <Icon className="text-ehk-dark-red" size={24} />
        </div>
      )}
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
