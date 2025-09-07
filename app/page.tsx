import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Bienvenue dans la Gestion Projets / Employés</h2>
      <p>Choisissez une section :</p>
      <ul>
        <li><Link href="/projets">Projets</Link></li>
        <li><Link href="/employes">Employés</Link></li>
        <li><Link href="/departements">Départements</Link></li>
        <li><Link href="/affectations">Affectations</Link></li>
      </ul>
    </div>
  );
}
