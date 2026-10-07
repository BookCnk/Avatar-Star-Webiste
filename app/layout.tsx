import type { Metadata } from "next";
import { Noto_Sans_Thai, Roboto_Mono } from "next/font/google";
import { SiteMotionController } from "@/components/site-motion.client";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: {
    default: "Avatar Star",
    template: "%s | Avatar Star",
  },
  description: "Fast-paced shooting action in a colorful world of floating islands.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${robotoMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans font-medium text-foreground leading-relaxed">
        <SiteMotionController />
        {children}
      </body>
    </html>
  );
}
