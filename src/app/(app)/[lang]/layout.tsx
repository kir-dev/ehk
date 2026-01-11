import Footer from "@/app/(app)/components/Footer";
import Navbar from "@/app/(app)/components/navbar";
import { LanguageProvider } from "@/components/common/LanguageProvider";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "BME Egyetemi Hallgatói Képviselet",
  description: "A BME Egyetemi Hallgatói Képviselet hivatalos oldala",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  // Ensure valid lang or fallback (middleware should handle this but for safety)
  const validLang = i18n.locales.includes(lang as 'hu' | 'en') ? lang as "hu" | "en" : i18n.defaultLocale;
  const dictionary = await getDictionary(validLang);

  return (
    <html lang={validLang}>
      <body>
        <LanguageProvider defaultLang={validLang.toUpperCase() as "HU" | "EN"} dictionary={dictionary}>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
