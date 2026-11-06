import type { Metadata, Viewport } from "next";
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Marcellus,
  Mea_Culpa,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import { invitation } from "./data";
import "./globals.css";

const cinzel = Cinzel_Decorative({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel-decorative" });
const mea = Mea_Culpa({ subsets: ["latin"], weight: "400", variable: "--font-mea" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-sn-body" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-serif" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus" });

export const metadata: Metadata = {
  title: `${invitation.bride} & ${invitation.groom} — Wedding Invitation`,
  description: `Join us for the wedding of ${invitation.bride} & ${invitation.groom} on ${invitation.dateLong}.`,
  openGraph: { images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#3D5A80" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [cinzel, mea, montserrat, cormorant, playfair, marcellus].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={`${fonts} h-full antialiased`} style={{ scrollBehavior: "smooth" }}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
