export const dynamic = "force-dynamic";


import { prisma } from "../../lib/prisma";

import Link from "next/link";

export default async function ProjetsPage() {
  // Récupération des projets depuis Supabase avec Prisma
  const projets = await prisma.projets.findMany({
    orderBy: { dateDebut: "asc" },
  });

  return (
    <div style={{ padding: "20px" }}>
      <Link href="/" style={{ color: "blue" }}>
        Accueil
      </Link>
      <h1>Liste des projets</h1>
      <table border={1} cellPadding={5} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Manager</th>
            <th>Budget</th>
            <th>Date début</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet) => (
            <tr key={projet.nomProj}>
              <td>{projet.nomProj}</td>
              <td>{projet.mgrProj}</td>
              <td>{Number(projet.budget).toLocaleString()} €</td>
              <td>
                {projet.dateDebut
                  ? new Date(projet.dateDebut).toLocaleDateString()
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
