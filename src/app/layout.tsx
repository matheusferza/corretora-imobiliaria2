import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Corretora Val | Confiança que abre portas",
    template: "%s | Corretora Val",
  },
  description:
    "Administração de imóveis, venda, locação anual e temporada em Balneário Camboriú e Camboriú.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
