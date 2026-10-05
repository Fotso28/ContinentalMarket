import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const displayFont = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://continental-group.cm"),
  title: "Continental Group — Plusieurs expertises, une même exigence",
  description:
    "Depuis Douala, Continental Group rassemble Market, Energy, Software et Pressing au service de l’Afrique centrale.",
  openGraph: {
    title: "Continental Group",
    description: "Un groupe. Plusieurs expertises. Une même exigence.",
    locale: "fr_CM",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
