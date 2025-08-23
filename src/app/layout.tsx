import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { links } from "@/data/links";


export const metadata: Metadata = {
  title: `${links.name} — Portfolio`,
  description:
  "Machine Learning Engineer & AI Researcher — Computer Vision, Distributed AI, Blockchain",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}