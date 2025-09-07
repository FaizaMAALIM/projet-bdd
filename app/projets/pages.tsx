'use client';
import { useEffect, useState } from 'react';
import { api } from '../_actions';

type Projet = { nomProj:string; mgrProj:string; budget:number; dateDebut:string };

export default function ProjetsPage() {
  const [items, setItems] = useState<Projet[]>([]);
  const [form, setForm] = useState<Projet>({ nomProj:'', mgrProj:'', budget:0, dateDebut:'' });

  async function load() {
    try {
      const data = await api<Projet[]>('/api/projets');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api('/api/projets', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ nomProj:'', mgrProj:'', budget:0, dateDebut:'' });
      await load();
    } catch(err) {
      console.error(err);
    }
  }

  async function remove(nomProj: string) {
    try {
      await api(`/api/projets/${encodeURIComponent(nomProj)}`, { method:'DELETE' });
      await load();
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Projets</h2>
      <form onSubmit={add} style={{ display:'grid', gap:8, maxWidth:480 }}>
        <input placeholder="Nom du projet" value={form.nomProj} onChange={e=>setForm({...form, nomProj:e.target.value})} required />
        <input placeholder="Manager" value={form.mgrProj} onChange={e=>setForm({...form, mgrProj:e.target.value})} required />
        <input type="number" placeholder="Budget" value={form.budget} onChange={e=>setForm({...form, budget:Number(e.target.value)})} required />
        <input type="date" placeholder="Date début" value={form.dateDebut} onChange={e=>setForm({...form, dateDebut:e.target.value})} required />
        <button type="submit">Ajouter</button>
      </form>

      <table style={{ marginTop:16, width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th>Nom</th><th>Manager</th><th>Budget</th><th>Date début</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.nomProj}>
              <td>{p.nomProj}</td>
              <td>{p.mgrProj}</td>
              <td>{p.budget}</td>
              <td>{new Date(p.dateDebut).toLocaleDateString()}</td>
              <td>
                <button onClick={() => remove(p.nomProj)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
