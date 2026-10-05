import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
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
    <html lang="fr" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
