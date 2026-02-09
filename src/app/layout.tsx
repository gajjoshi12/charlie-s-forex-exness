import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, AccountProvider } from "@/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exness | Forex Trading Platform",
  description: "Trade forex, commodities, indices, and cryptocurrencies with Exness. Low spreads, fast execution, and 24/7 support.",
  keywords: "forex, trading, MT4, MT5, CFD, crypto, commodities, indices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <AuthProvider>
          <AccountProvider>
            {children}
          </AccountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
