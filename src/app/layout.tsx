import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Manrope } from 'next/font/google';
import Header from "@/components/ui/Header";

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    weight: ['200', '300', '400', '500', '600', '700', '800'],
});


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Foozi",
  description: "Find the food you crave..",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
          className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header/>
      {children}
      </body>
      </html>
  );
}

