'use client'

import { useEffect, useState } from 'react';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/reports'); // Endpoint para Java ou Python
      const data = await res.json();
      setReports(data);
    };
    fetchData();
  }, []);

  return (
    <main className="reports">
      <h1>Relatórios de Emissões</h1>
      {reports.length ? (
        reports.map((report) => (
          <div key={report.id}>
            <h2>{report.title}</h2>
            <p>{report.content}</p>
          </div>
        ))
      ) : (
        <p>Nenhum relatório disponível.</p>
      )}
    </main>
  );
}
