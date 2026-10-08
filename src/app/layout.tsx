import type { Metadata } from "next";
import "./globals.css";
import PwaUpdate from "../components/pwa-update";

export const metadata: Metadata = {
  title: {
    default: "Trella Marketing Consultant — Marketing that moves the needle",
    template: "%s · Trella Marketing Consultant",
  },
  description:
    "Trella Marketing Consultant is a full-service marketing partner — brand strategy, social media management, paid advertising, content, web, and analytics that grow Caribbean businesses.",
  keywords: [
    "marketing consultant",
    "social media management",
    "brand strategy",
    "digital marketing Jamaica",
    "paid ads",
    "content marketing",
    "Trella Marketing",
  ],
  metadataBase: new URL("https://trella-marketing.vercel.app"),
  openGraph: {
    title: "Trella Marketing Consultant",
    description:
      "Brand strategy, social media, paid ads, content, and analytics that move the needle.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <PwaUpdate />
      </body>
    </html>
  );
}
