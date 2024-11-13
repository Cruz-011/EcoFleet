'use client'
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/dashboard'); // Endpoint para Java ou Python
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
      <div>
        <p>Emissões Totais: {data.totalEmissions}</p>
        <p>Eficiência Média: {data.averageEfficiency}</p>
      </div>
    </main>
  );
}
