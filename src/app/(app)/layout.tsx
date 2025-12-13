import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/(app)/components/Navbar";
import Footer from "@/app/(app)/components/Footer";
import { LanguageProvider } from "@/components/common/LanguageProvider";

export const metadata: Metadata = {
  title: "BME Egyetemi Hallgatói Képviselet",
  description: "A BME Egyetemi Hallgatói Képviselet hivatalos oldala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultLang = 'HU' as const

  return (
    <html lang={defaultLang.toLowerCase()}>
      <body>
        <LanguageProvider defaultLang={defaultLang}>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
