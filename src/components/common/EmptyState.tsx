"use client";

import { FileText, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FileText,
}: EmptyStateProps) {
  // const { t } = useTranslate();

  // Note: We expect title and description to be already translated strings passed from the parent,
  // OR raw strings if the parent handles translation logic differently.
  // However, for consistency with the existing pattern where t() is called at render time:
  // The existing code calls t('Text', 'Text') inline.
  // This component will just render what it gets.

  return (
    <div className="text-center py-12">
      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
