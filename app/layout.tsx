import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Projet BDD",
  description: "Site de gestion de projets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <nav className="bg-gray-800 p-4 text-white flex gap-4">
          <Link href="/">Accueil</Link>
          <Link href="/projets">Projets</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
