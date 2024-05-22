import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Header from "@/components/common/header";
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
  return (
    <StoreProvider>
      <html lang="en">
        <body className={cn(
          "relative h-svh max-h-svh flex flex-col justify-start items-center w-screen",
          fontSans.className
        )}>
          <div className="h-full w-screen flex flex-col justify-start items-center max-w-xs shadow-lg">
            <Header />
            {children}
          </div>
        </body>
      </html >
    </StoreProvider >
  );
}

