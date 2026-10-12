import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import "./catalog.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const frauncesItalic = Fraunces({
  variable: "--font-display-italic",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://continentalmarket237.com"),
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

export const viewport: Viewport = {
  themeColor: "#03291f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} ${fraunces.variable} ${frauncesItalic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
