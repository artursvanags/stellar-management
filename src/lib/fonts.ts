import { JetBrains_Mono as FontMono } from "next/font/google";
import { GeistSans as FontSans } from "geist/font/sans";

import localFont from "next/font/local";

export const fontSans = FontSans;

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});