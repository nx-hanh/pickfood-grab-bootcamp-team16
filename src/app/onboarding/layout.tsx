// import type { Metadata } from "next";
// import { Roboto as FontSans } from "next/font/google";
// import { cn } from "@/lib/utils";
// // import "./globals.css";
// import Header from "@/components/common/header";

// const fontSans = FontSans({ 
//   subsets: ["vietnamese"],
//   weight: ["100", "300", "400", "500", "700", "900"],
//  });

// export const metadata: Metadata = {
//   title: "PickFood",
//   description: "PickFood: Your personalized dining companion.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cn(
//         "relative flex flex-col h-screen justify-start place-items-center py-auto",
//         fontSans.className
//       )}>
//         {/* <Header /> */}
//         {children}
//         </body>
//     </html>
//   );
// }

import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return  <div className='rounded-md p-3 place-content-center'>{children}</div>;
};

export default AuthLayout;

