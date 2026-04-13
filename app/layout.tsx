import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Silla international Corp",
  description: "Sitio oficial de La Silla international Corp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={bricolage.variable}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
