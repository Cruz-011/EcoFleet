'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import styles from './Reports.module.css';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    date: '',
    minConsumption: '',
    maxConsumption: ''
  });

  // Função para buscar relatórios da API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/reports'); // Endpoint para Java ou Python
      const data = await res.json();
      setReports(data);
      setFilteredReports(data); // Define o estado inicial de relatórios filtrados
    };
    fetchData();
  }, []);

  // Função para lidar com a entrada dos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Função para aplicar filtros
  const applyFilters = () => {
    const filtered = reports.filter((report) => {
      const matchesName = filters.name ? report.title === filters.name : true;
      const matchesDate = filters.date ? report.date === filters.date : true;
      const matchesMinConsumption = filters.minConsumption ? report.consumption >= parseFloat(filters.minConsumption) : true;
      const matchesMaxConsumption = filters.maxConsumption ? report.consumption <= parseFloat(filters.maxConsumption) : true;
      return matchesName && matchesDate && matchesMinConsumption && matchesMaxConsumption;
    });
    setFilteredReports(filtered);
  };

  // Função para redefinir filtros
  const resetFilters = () => {
    setFilters({
      name: '',
      date: '',
      minConsumption: '',
      maxConsumption: ''
    });
    setFilteredReports(reports);
  };

  // Obter valores únicos para os campos de seleção
  const uniqueNames = [...new Set(reports.map((report) => report.title))];
  const uniqueDates = [...new Set(reports.map((report) => report.date))];
  const uniqueConsumptions = [...new Set(reports.map((report) => report.consumption))];

  return (
    <>
      <Header />
      <main className={styles.reports}>
        
        {/* Card Explicativo */}
        <section className={styles.infoCard}>
          <h2>Sobre a Página de Relatórios</h2>
          <p>
            Nesta página, você pode visualizar e filtrar relatórios sobre emissões e consumo energético. 
            Use as opções abaixo para localizar relatórios específicos.
          </p>
        </section>

        {/* Formulário de Filtros Básicos */}
        <section className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>Nome do Relatório:</label>
            <select
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className={styles.input}
            >
              <option value="">Selecione</option>
              {uniqueNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Data:</label>
            <select
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className={styles.input}
            >
              <option value="">Selecione</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Consumo Mínimo (kWh):</label>
            <select
              name="minConsumption"
              value={filters.minConsumption}
              onChange={handleFilterChange}
              className={styles.input}
            >
              <option value="">Selecione</option>
              {uniqueConsumptions.map((consumption) => (
                <option key={consumption} value={consumption}>{consumption} kWh</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Consumo Máximo (kWh):</label>
            <select
              name="maxConsumption"
              value={filters.maxConsumption}
              onChange={handleFilterChange}
              className={styles.input}
            >
              <option value="">Selecione</option>
              {uniqueConsumptions.map((consumption) => (
                <option key={consumption} value={consumption}>{consumption} kWh</option>
              ))}
            </select>
          </div>
          <button onClick={applyFilters} className={styles.filterButton}>Aplicar Filtros</button>
          <button onClick={resetFilters} className={styles.resetButton}>Redefinir Filtros</button>
        </section>

        {/* Lista de Relatórios Filtrados */}
        <section className={styles.reportList}>
          {filteredReports.length ? (
            filteredReports.map((report) => (
              <div key={report.id} className={styles.reportItem}>
                <h3>{report.title}</h3>
                <p>Data: {report.date}</p>
                <p>Consumo: {report.consumption} kWh</p>
                <p>Tipo de Combustível: {report.fuelType}</p>
                <p>{report.content}</p>
              </div>
            ))
          ) : (
            <p className={styles.noReports}>Nenhum relatório disponível.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
