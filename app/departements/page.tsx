export const dynamic = "force-dynamic";


import { prisma } from "../../lib/prisma";

export default async function DepartementsPage() {
  const departements = await prisma.departements.findMany({
    include: { employes: true },
    orderBy: { deptEmp: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des départements</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Manager</th>
            <th className="border border-gray-300 px-4 py-2">Nombre d'employés</th>
          </tr>
        </thead>
        <tbody>
          {departements.map((dept) => (
            <tr key={dept.deptEmp}>
              <td className="border border-gray-300 px-4 py-2">{dept.deptEmp}</td>
              <td className="border border-gray-300 px-4 py-2">{dept.mgrEmp}</td>
              <td className="border border-gray-300 px-4 py-2">{dept.employes.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
