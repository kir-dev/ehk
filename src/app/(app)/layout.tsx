import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

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
