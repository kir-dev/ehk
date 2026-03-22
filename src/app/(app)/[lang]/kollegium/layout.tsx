import { ReactNode } from "react";
import { HungarianOnlyWarning } from "./components/HungarianOnlyWarning";

export default async function KollegiumLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang === "en") {
    return <HungarianOnlyWarning />;
  }

  return <>{children}</>;
}
