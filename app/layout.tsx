import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diviora | Data Consultancy - Automate Back-Office Work",
  description: "Transform your back-office operations with Diviora's data automation solutions. PDF-to-SQL processing, on-premise ERP sync, and intelligent data extraction for logistics and construction industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
