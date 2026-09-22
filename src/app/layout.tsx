import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllStore",
  description: "A simple online store.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Header />
          <main className="flex flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
