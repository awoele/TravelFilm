import type { Metadata } from "next";
import { Albert_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({ variable: "--font-albert-sans", subsets: ["latin"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", weight: ["400", "700"], subsets: ["latin"] });
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://awoele.github.io/TravelFilm/");
const socialImageUrl = new URL("og.png", siteUrl).toString();
const title = "TravelFilm｜把旅行变成可以回去的地方";
const description = "一款用 Footprints、Rolls 与长期回顾重新组织旅行记忆的本地优先 iPhone App。";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{
      url: socialImageUrl,
      width: 1730,
      height: 909,
      alt: "TravelFilm mobile product case with eight screen windows",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${albertSans.variable} ${spaceMono.variable}`}>{children}</body></html>;
}
