import { prisma } from "../../lib/prisma";

export default async function AffectationsPage() {
  const affectations = await prisma.projetEmploye.findMany({
    include: {
      emp: true,
      projet: true,
    },
    orderBy: {
      nomProj: "asc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des affectations</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Projet</th>
            <th className="border border-gray-300 px-4 py-2">Employé</th>
            <th className="border border-gray-300 px-4 py-2">Heures</th>
            <th className="border border-gray-300 px-4 py-2">Évaluation</th>
          </tr>
        </thead>
        <tbody>
          {affectations.map((a) => (
            <tr key={`${a.nomProj}-${a.idEmp}`}>
              <td className="border border-gray-300 px-4 py-2">{a.projet.nomProj}</td>
              <td className="border border-gray-300 px-4 py-2">{a.emp.nomEmp}</td>
              <td className="border border-gray-300 px-4 py-2">{a.heures} h</td>
              <td className="border border-gray-300 px-4 py-2">
                {a.evalEmp !== null ? `${a.evalEmp}/10` : "Non évalué"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
