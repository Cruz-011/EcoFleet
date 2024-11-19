'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function SustainabilityDashboard() {
  const mockData: Record<string, any> = {
    2024: {
      Todos: {
        energyConsumption: 9400,
        solarEnergyGenerated: 3450,
        totalEmissions: 7700,
      },
      January: {
        energyConsumption: 3000,
        solarEnergyGenerated: 1100,
        totalEmissions: 2600,
      },
      February: {
        energyConsumption: 3200,
        solarEnergyGenerated: 1200,
        totalEmissions: 2500,
      },
      March: {
        energyConsumption: 3100,
        solarEnergyGenerated: 1150,
        totalEmissions: 2550,
      },
    },
    2023: {
      Todos: {
        energyConsumption: 8900,
        solarEnergyGenerated: 3400,
        totalEmissions: 7800,
      },
      January: {
        energyConsumption: 2900,
        solarEnergyGenerated: 1000,
        totalEmissions: 2700,
      },
    },
  };

  const [data, setData] = useState({
    energyConsumption: 9400,
    solarEnergyGenerated: 3450,
    totalEmissions: 7700,
    renewableUsage: 37.5,
    productionEfficiency: 85,
    previousEmissions: 8000,
  });

  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('Todos');

  useEffect(() => {
    const yearData = mockData[selectedYear] || mockData['2024'];
    const monthData = yearData[selectedMonth] || yearData['Todos'];
    setData((prev) => ({
      ...prev,
      energyConsumption: monthData.energyConsumption,
      solarEnergyGenerated: monthData.solarEnergyGenerated,
      totalEmissions: monthData.totalEmissions,
    }));
  }, [selectedYear, selectedMonth]);

  const emissionsChange = data.previousEmissions - data.totalEmissions;
  const emissionsTrend = emissionsChange > 0 ? 'Redução' : 'Aumento';

  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <h3>Filtros</h3>
          <label>Ano</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {Object.keys(mockData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label>Mês</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {['Todos', 'January', 'February', 'March'].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </aside>

        <main className={styles.dashboardContent}>
          <div className={styles.topIndicators}>
            <div className={styles.indicatorCard}>
              <h4>Consumo de Energia</h4>
              <p>{data.energyConsumption} kWh</p>
            </div>
            <div className={styles.indicatorCard}>
              <h4>Energia Solar Gerada</h4>
              <p>{data.solarEnergyGenerated} kWh</p>
            </div>
            <div className={styles.indicatorCard}>
              <h4>Emissões de CO₂</h4>
              <p>{data.totalEmissions} kg</p>
            </div>
            <div className={styles.indicatorCard}>
              <h4>Eficiência de Produção</h4>
              <p>{data.productionEfficiency}%</p>
            </div>
          </div>

          <div className={styles.chartsGrid}>
            <div className={`${styles.chartCard} ${styles.co2Card}`}>
              <h3>Emissões de CO₂</h3>
              <Doughnut
                data={{
                  labels: ['Emitido', 'Reduzido'],
                  datasets: [
                    {
                      data: [data.totalEmissions, emissionsChange],
                      backgroundColor: ['#ff6b6b', '#4ecdc4'],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{ cutout: '80%' }}
              />
              <p>{emissionsTrend} em relação ao mês anterior</p>
            </div>

            <div className={`${styles.chartCard} ${styles.energyCard}`}>
              <h3>Consumo de Energia</h3>
              <Bar
                data={{
                  labels: ['Consumido', 'Gerado Solar'],
                  datasets: [
                    {
                      label: 'kWh',
                      data: [data.energyConsumption, data.solarEnergyGenerated],
                      backgroundColor: ['#1a535c', '#4ecdc4'],
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
