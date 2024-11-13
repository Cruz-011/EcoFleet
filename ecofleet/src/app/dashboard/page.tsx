'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function SustainabilityDashboard() {
  const [data, setData] = useState({
    classification: 'Amigável',
    energyConsumption: 3200,
    solarEnergyGenerated: 1200,
    renewableUsage: 37.5,
    productionEfficiency: 85,
    combustionVehicles: { count: 10, fuelConsumption: 500, co2Emission: 1200 },
    electricVehicles: { count: 5, energyConsumption: 150, co2Emission: 0 },
    totalEmissions: 2500,
    previousEmissions: 2800,
  });

  const emissionsChange = data.previousEmissions - data.totalEmissions;
  const emissionsTrend = emissionsChange > 0 ? 'Redução' : 'Aumento';

  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <h3>Filtros</h3>
          <label>Ano</label>
          <select>
            <option>Todos</option>
          </select>
          <label>Mês</label>
          <select>
            <option>Todos</option>
          </select>
          <label>Tipo de Serviço</label>
          <select>
            <option>Todos</option>
          </select>
        </aside>

        <main className={styles.dashboardContent}>
          <div className={styles.topIndicators}>
            <div className={styles.indicatorCard}>
              <h4>Consumo de Energia</h4>
              <p>{data.energyConsumption} kWh</p>
            </div>
            <div className={styles.indicatorCard}>
              <h4>Uso de Energia Renovável</h4>
              <p>{data.renewableUsage}%</p>
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
              <div className={`${styles.chartContainer} ${styles.co2Background}`}>
                <Doughnut
                  data={{
                    labels: ['Emitido', 'Reduzido'],
                    datasets: [
                      {
                        data: [data.totalEmissions, data.previousEmissions - data.totalEmissions],
                        backgroundColor: ['#ff6b6b', '#4ecdc4'],
                        borderWidth: 0
                      }
                    ]
                  }}
                  options={{ cutout: '80%' }}
                />
              </div>
              <p>{emissionsTrend} em relação ao mês anterior</p>
            </div>

            <div className={`${styles.chartCard} ${styles.energyCard}`}>
              <h3>Consumo de Energia</h3>
              <div className={`${styles.chartContainer} ${styles.energyBackground}`}>
                <Bar
                  data={{
                    labels: ['Consumido', 'Gerado Solar'],
                    datasets: [
                      {
                        label: 'kWh',
                        data: [data.energyConsumption, data.solarEnergyGenerated],
                        backgroundColor: ['#1a535c', '#4ecdc4']
                      }
                    ]
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </div>

            <div className={`${styles.chartCard} ${styles.renewableCard}`}>
              <h3>Uso de Energia Renovável</h3>
              <div className={`${styles.chartContainer} ${styles.renewableBackground}`}>
                <Doughnut
                  data={{
                    labels: ['Renovável', 'Não Renovável'],
                    datasets: [
                      {
                        data: [data.renewableUsage, 100 - data.renewableUsage],
                        backgroundColor: ['#4ecdc4', '#e0e0e0']
                      }
                    ]
                  }}
                  options={{ cutout: '80%' }}
                />
              </div>
            </div>

            <div className={`${styles.chartCard} ${styles.productionCard}`}>
              <h3>Eficiência de Produção</h3>
              <div className={`${styles.chartContainer} ${styles.productionBackground}`}>
                <Line
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                      {
                        label: 'Eficiência (%)',
                        data: [80, 82, 84, 85, 87, 86, 88, 90, 89, 91, 92, 93],
                        borderColor: '#4ecdc4',
                        fill: false
                      }
                    ]
                  }}
                  options={{ responsive: true }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
