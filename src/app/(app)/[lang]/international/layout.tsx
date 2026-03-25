import { ReactNode } from "react";
import { LanguageWarning } from "./components/LanguageWarning";

export default async function InternationalLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang === "hu") {
    return <LanguageWarning />;
  }

  return <>{children}</>;
}
