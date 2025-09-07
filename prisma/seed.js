require("dotenv").config();
const { Client } = require("pg");

// on prend l’URL Supabase depuis le .env
const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString });

async function main() {
  await client.connect();

  // ----------------------------
  // Départements
  // ----------------------------
  const departements = [
    { deptEmp: "10", mgrEmp: "Holmes" },
    { deptEmp: "12", mgrEmp: "Lupin" },
    { deptEmp: "14", mgrEmp: "Watson" },
    { deptEmp: "16", mgrEmp: "Marple" },
    { deptEmp: "18", mgrEmp: "Poirot" },
    { deptEmp: "20", mgrEmp: "Hercule" },
    { deptEmp: "22", mgrEmp: "Sherlock" },
    { deptEmp: "24", mgrEmp: "Nancy" },
    { deptEmp: "26", mgrEmp: "Columbo" },
    { deptEmp: "28", mgrEmp: "MissF" },
  ];

  for (const d of departements) {
    await client.query(`
      INSERT INTO "Departements" ("deptEmp", "mgrEmp") 
      VALUES ($1, $2)
      ON CONFLICT ("deptEmp") DO NOTHING
    `, [d.deptEmp, d.mgrEmp]);
  }

  // ----------------------------
  // Projets
  // ----------------------------
  const projets = [
    { nomProj: "ILO", mgrProj: "Dupont", budget: 100000, dateDebut: "2011-11-15" },
    { nomProj: "MAXI", mgrProj: "Jones", budget: 200000, dateDebut: "2012-01-03" },
    { nomProj: "OMEGA", mgrProj: "Smith", budget: 150000, dateDebut: "2013-05-10" },
    { nomProj: "ALPHA", mgrProj: "Brown", budget: 120000, dateDebut: "2014-07-21" },
    { nomProj: "BETA", mgrProj: "Davis", budget: 90000, dateDebut: "2015-02-11" },
    { nomProj: "GAMMA", mgrProj: "Wilson", budget: 110000, dateDebut: "2016-03-05" },
    { nomProj: "DELTA", mgrProj: "Taylor", budget: 130000, dateDebut: "2017-08-19" },
    { nomProj: "SIGMA", mgrProj: "Anderson", budget: 170000, dateDebut: "2018-12-01" },
    { nomProj: "THETA", mgrProj: "Thomas", budget: 140000, dateDebut: "2019-06-14" },
    { nomProj: "ZETA", mgrProj: "Jackson", budget: 160000, dateDebut: "2020-09-30" },
  ];

  for (const p of projets) {
    await client.query(`
      INSERT INTO "Projets" ("nomProj", "mgrProj", "budget", "dateDebut") 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("nomProj") DO NOTHING
    `, [p.nomProj, p.mgrProj, p.budget, p.dateDebut]);
  }

  // ----------------------------
  // Employés
  // ----------------------------
  const employes = [
    { idEmp: "E101", nomEmp: "Durand", salaire: 45000, mgrEmp: "Holmes", deptEmp: "10" },
    { idEmp: "E102", nomEmp: "Martin", salaire: 47000, mgrEmp: "Lupin", deptEmp: "12" },
    { idEmp: "E103", nomEmp: "Bernard", salaire: 43000, mgrEmp: "Watson", deptEmp: "14" },
    { idEmp: "E104", nomEmp: "Simon", salaire: 50000, mgrEmp: "Marple", deptEmp: "16" },
    { idEmp: "E105", nomEmp: "Adam", salaire: 43000, mgrEmp: "Lupin", deptEmp: "12" },
    { idEmp: "E106", nomEmp: "Rivera", salaire: 41000, mgrEmp: "Holmes", deptEmp: "10" },
    { idEmp: "E107", nomEmp: "Lemoine", salaire: 46000, mgrEmp: "Poirot", deptEmp: "18" },
    { idEmp: "E108", nomEmp: "Faure", salaire: 42000, mgrEmp: "Hercule", deptEmp: "20" },
    { idEmp: "E109", nomEmp: "Petit", salaire: 44000, mgrEmp: "Sherlock", deptEmp: "22" },
    { idEmp: "E110", nomEmp: "Moreau", salaire: 45000, mgrEmp: "Nancy", deptEmp: "24" },
    { idEmp: "E111", nomEmp: "Blanc", salaire: 43000, mgrEmp: "Columbo", deptEmp: "26" },
    { idEmp: "E112", nomEmp: "Richard", salaire: 46000, mgrEmp: "MissF", deptEmp: "28" },
    { idEmp: "E113", nomEmp: "Dupont", salaire: 47000, mgrEmp: "Holmes", deptEmp: "10" },
    { idEmp: "E114", nomEmp: "Michel", salaire: 42000, mgrEmp: "Lupin", deptEmp: "12" },
    { idEmp: "E115", nomEmp: "Paul", salaire: 44000, mgrEmp: "Watson", deptEmp: "14" },
  ];

  for (const e of employes) {
    await client.query(`
      INSERT INTO "Employes" ("idEmp", "nomEmp", "salaire", "mgrEmp", "deptEmp") 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT ("idEmp") DO NOTHING
    `, [e.idEmp, e.nomEmp, e.salaire, e.mgrEmp, e.deptEmp]);
  }

  // ----------------------------
  // Liens Projet-Employés
  // ----------------------------
  const liens = [
    { nomProj: "ILO", idEmp: "E101", heures: 25, evalEmp: 9 },
    { nomProj: "ILO", idEmp: "E105", heures: 39, evalEmp: null },
    { nomProj: "ILO", idEmp: "E106", heures: 10, evalEmp: 8 },
    { nomProj: "MAXI", idEmp: "E110", heures: 29, evalEmp: null },
    { nomProj: "OMEGA", idEmp: "E102", heures: 15, evalEmp: 7 },
    { nomProj: "ALPHA", idEmp: "E103", heures: 20, evalEmp: 6 },
    { nomProj: "BETA", idEmp: "E104", heures: 22, evalEmp: 9 },
    { nomProj: "GAMMA", idEmp: "E107", heures: 18, evalEmp: 8 },
    { nomProj: "DELTA", idEmp: "E108", heures: 12, evalEmp: 7 },
    { nomProj: "SIGMA", idEmp: "E109", heures: 25, evalEmp: 10 },
    { nomProj: "THETA", idEmp: "E111", heures: 30, evalEmp: 8 },
    { nomProj: "ZETA", idEmp: "E112", heures: 16, evalEmp: 7 },
  ];

  for (const l of liens) {
    await client.query(`
      INSERT INTO "ProjetEmploye" ("nomProj", "idEmp", "heures", "evalEmp")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("nomProj", "idEmp") DO NOTHING
    `, [l.nomProj, l.idEmp, l.heures, l.evalEmp]);
  }

  console.log("✅ Données insérées avec succès !");
  await client.end();
}

main().catch((e) => {
  console.error("Erreur seed:", e);
  client.end();
});
