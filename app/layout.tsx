import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.h-hamdache.fr"),
  title: "Hamza Hamdache | Alternant Chef de Projet IA — Crédit Agricole",
  description:
    "Portfolio de Hamza Hamdache — Candidature au poste d'Assistant Chef de Projet IA au DataLab Groupe, Crédit Agricole S.A. Étudiant SUPINFO Tours, alternant Data & IA chez Keolis.",
  openGraph: {
    title: "Hamza Hamdache | Candidature DataLab Groupe — Crédit Agricole",
    description:
      "Développeur IA & Chef de Projet en alternance. Découvrez mon parcours, mes projets et posez vos questions à mon assistant IA.",
    type: "website",
    locale: "fr_FR",
  },
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
