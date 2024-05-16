// import { FC, ReactNode } from 'react';

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
//   return  <div className=' rounded-md bg-green-600 p-10 content-center'>{children}</div>;
// };

// export default AuthLayout;

import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
// import "./globals.css";
import Header from "@/components/common/header";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        // "rounded-md bg-green-600 p-10 content-center",
        "relative flex flex-col h-screen justify-start items-center py-auto",
        fontSans.className
      )}>
        <Header />
        {children}
        </body>
    </html>
  );
}

