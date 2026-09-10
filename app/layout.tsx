"use client";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// Note: metadata is defined in a separate server component for Next.js App Router
// but since this is "use client" for CookieBanner we keep it simple
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Agencia Tech — Anuncios con IA para marcas que invierten en Meta</title>
        <meta name="description" content="Cuarenta anuncios nuevos al mes en tres días, sin sesión de fotos ni modelos. Superamos a tu mejor anuncio en 30 días o seguimos produciendo sin cobrarte." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Agencia Tech — Anuncios con IA para marcas que invierten en Meta" />
        <meta property="og:description" content="Cuarenta anuncios nuevos al mes, en tres días. Sin sesión de fotos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agenciatech.es" />
        <meta property="og:image" content="https://agenciatech.es/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/logo-agen.jpeg" />
      </head>
      <body className={`${geist.variable} antialiased`}>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
