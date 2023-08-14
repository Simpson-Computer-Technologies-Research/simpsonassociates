/* eslint-disable @next/next/no-page-custom-font */
import "@/app/styles/globals.css";

import type { Metadata } from "next";

import { SessionProvider } from "@/app/components/providers";

export const metadata: Metadata = {
  title: "Simpson & Associates",
  description: "Dominion Lending - Simpson & Associates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`bg-white font-montserrat text-slate-950`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
