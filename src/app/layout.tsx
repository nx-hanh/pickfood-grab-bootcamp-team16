import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/common/header";
import "./globals.css";

const fontSans = FontSans({ 
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
 });

export const metadata: Metadata = {
  title: "PickFood",
  description: "PickFood: Your personalized dining companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "flex flex-col min-h-screen justify-center items-center",
        fontSans.className
      )}>
        <Header />
        {children}
        </body>
    </html>
  );
}
