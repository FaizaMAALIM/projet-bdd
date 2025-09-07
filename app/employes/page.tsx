export const dynamic = "force-dynamic";


import { prisma } from "../../lib/prisma";


export default async function EmployesPage() {
  const employes = await prisma.employes.findMany({
    orderBy: { nomEmp: "asc" },
    include: { dept: true }, // si tu as une relation dans Prisma
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des employés</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Salaire</th>
            <th className="border border-gray-300 px-4 py-2">Manager</th>
            <th className="border border-gray-300 px-4 py-2">Département</th>
          </tr>
        </thead>
        <tbody>
          {employes.map((emp) => (
            <tr key={emp.idEmp}>
              <td className="border border-gray-300 px-4 py-2">{emp.idEmp}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.nomEmp}</td>
              <td className="border border-gray-300 px-4 py-2">
  {parseFloat(emp.salaire.toString()).toFixed(2)} €
</td>

              <td className="border border-gray-300 px-4 py-2">{emp.mgrEmp}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.deptEmp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
