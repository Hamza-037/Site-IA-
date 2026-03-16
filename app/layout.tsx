import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.h-hamdache.fr"),
  title: "Hamza Hamdache | Alternant Chef de Projet IA",
  description:
    "Portfolio one-page de Hamza Hamdache, alternant Chef de Projet IA, etudiant SUPINFO Tours et builder de SaaS IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body>{children}</body>
    </html>
  );
}
