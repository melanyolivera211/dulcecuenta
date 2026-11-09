import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DulceCuenta — Costos y Precios para Repostería Artesanal",
  description:
    "Aplicación web para gestión de ingredientes, recetas y cálculo de costos y precios de venta para reposterías artesanales en Cartagena, Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-cream-50 text-brown-soft-800 antialiased">
        {children}
      </body>
    </html>
  );
}
