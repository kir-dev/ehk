"use client";

import { EmptyState } from "@/components/common/EmptyState";
import { PartyPopper } from "lucide-react";

interface ClubsEmptyStateProps {
  title: string;
}

export function ClubsEmptyState({ title }: ClubsEmptyStateProps) {
  return (
    <EmptyState
      title={title}
      icon={PartyPopper}
      iconClassName="text-ehk-dark-red"
    />
  );
}
