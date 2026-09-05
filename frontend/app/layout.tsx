import { I18nProvider } from "@/lib/i18n/context";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";

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
  title: {
    default: "KALAKRITI — India's Living Craft Heritage",
    template: "%s | KALAKRITI",
  },
  description:
    "Discover authentic Indian handicrafts, artisan stories and India's living craft heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </I18nProvider>
      </body>
    </html>
  );
}

