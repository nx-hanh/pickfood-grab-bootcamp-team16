'use client'
import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Header from "@/components/common/header";
import { useEffect } from "react";
import StoreProvider from "@/components/StoreProvider";

const fontSans = FontSans({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const metadata: Metadata = {
  title: "PickFood",
  description: "PickFood: Your personalized dining companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    })
  })
  return (
    <StoreProvider>
      <html lang="en">
        <body className={cn(
          "relative flex flex-col h-screen justify-start items-center py-auto",
          fontSans.className
        )}>
          <Header />
          {children}
        </body>
      </html >
    </StoreProvider>
  );
}

