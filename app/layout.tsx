import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blach Blach | Restaurador Plásticos",
  description: "Devuelve el brillo original a tus plásticos negros y grises. Fórmula avanzada SIN GRASAS para interior y exterior.",
};

import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import CartDrawerWrapper from "@/components/cart/CartDrawerWrapper";
import DistributorModalWrapper from "@/components/distributor/DistributorModalWrapper";
import LoginModalWrapper from "@/components/auth/LoginModalWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased selection:bg-primary selection:text-white`}
      >
        <UIProvider>
          <CartProvider>
            {children}
            <CartDrawerWrapper />
            <DistributorModalWrapper />
            <LoginModalWrapper />
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
