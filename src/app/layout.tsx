import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1% Club | Premium Ecosystem",
  description: "Exclusive venture and service ecosystem for the top 1%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased dark`}
    >
      <body className="bg-background text-foreground overflow-x-hidden">
        <CustomCursor />
        <div className="bg-mesh"></div>
        {children}
      </body>
    </html>
  );
}
