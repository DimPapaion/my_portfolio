import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Dimitrios Papaioannou — Portfolio",
  description: "Machine Learning Engineer & AI Researcher",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
