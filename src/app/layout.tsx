import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Dimitrios Papaioannou — Portfolio",
  description: "Machine Learning Engineer & AI Researcher (CV, projects, publications).",
  metadataBase: new URL("https://dimpap.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dimitrios Papaioannou — Portfolio",
    description: "Machine Learning Engineer & AI Researcher",
    url: "https://dimpap.vercel.app",
    siteName: "Dimitrios Papaioannou",
    images: [{ url: "/me.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
