import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShieldDrive | Compare Auto Insurance Rates & Save",
  description: "Stop overpaying for auto insurance. Compare personalized rates from top-rated carriers in minutes. Drivers save an average of $536/year.",
  metadataBase: new URL("https://shield-drive-sable.vercel.app/"),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ShieldDrive | Compare Auto Insurance Rates & Save",
    description: "Stop overpaying for auto insurance. Compare personalized rates from top-rated carriers in minutes. Drivers save an average of $536/year.",
    url: "https://shield-drive-sable.vercel.app/",
    siteName: "ShieldDrive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShieldDrive | Compare Auto Insurance Rates & Save",
    description: "Stop overpaying for auto insurance. Compare personalized rates from top-rated carriers in minutes. Drivers save an average of $536/year.",
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
