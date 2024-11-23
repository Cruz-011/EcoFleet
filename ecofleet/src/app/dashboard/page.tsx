'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface Vehicle {
  id: number;
  modelo: string;
  marca: string;
  consumoEnergetico: number; // Consumo em km/L
  emissaoCarbono: number; // Emissões em kg
}

export default function SustainabilityDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [data, setData] = useState({
    totalVehicles: 0,
    totalFuelConsumption: 0, // Combustível consumido no total (L)
    totalEmissions: 0, // Total de emissões em kg
    averageEfficiency: 0, // Eficiência média (km/L)
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [user, setUser] = useState<{ id?: number; nome?: string } | null>(null);

  // Obter usuário ao carregar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Erro ao analisar o usuário do localStorage:', error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  // Função para buscar veículos do usuário
  const fetchVehicles = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/usuario/${user.id}`);
      if (!response.ok) throw new Error('Erro ao buscar veículos.');
      const vehicleData = await response.json();

      setVehicles(vehicleData);

      // Calcula dados do dashboard
      const totalVehicles = vehicleData.length;
      const totalFuelConsumption = vehicleData.reduce(
        (sum: number, vehicle: Vehicle) => sum + vehicle.consumoEnergetico * 100, // Estimando consumo em 100 km
        0
      );
      const totalEmissions = vehicleData.reduce(
        (sum: number, vehicle: Vehicle) => sum + vehicle.emissaoCarbono,
        0
      );
      const averageEfficiency = totalVehicles
        ? (totalFuelConsumption / totalVehicles).toFixed(2)
        : 0;

      setData({
        totalVehicles,
        totalFuelConsumption,
        totalEmissions,
        averageEfficiency: Number(averageEfficiency),
      });
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <aside className={styles.sidebar}>
          <h3>Resumo</h3>
          <p><strong>Usuário:</strong> {user?.nome || 'Não identificado'}</p>
          <p><strong>Total de Veículos:</strong> {data.totalVehicles}</p>
          <p><strong>Média de Eficiência:</strong> {data.averageEfficiency} km/L</p>
        </aside>

        <main className={styles.dashboardContent}>
          <div className={styles.topIndicators}>
            <div className={styles.indicatorCard}>
              <h4>Consumo Total de Combustível</h4>
              <p>{data.totalFuelConsumption} L</p>
            </div>
            <div className={styles.indicatorCard}>
              <h4>Emissões de CO₂</h4>
              <p>{data.totalEmissions} kg</p>
            </div>
            <div className={styles.indicatorCard}>
              <h4>Total de Veículos</h4>
              <p>{data.totalVehicles}</p>
            </div>
          </div>

          <div className={styles.chartsGrid}>
            <div className={`${styles.chartCard} ${styles.co2Card}`}>
              <h3>Distribuição de Emissões</h3>
              <Pie
                data={{
                  labels: vehicles.map((vehicle) => vehicle.modelo),
                  datasets: [
                    {
                      data: vehicles.map((vehicle) => vehicle.emissaoCarbono),
                      backgroundColor: ['#ff6b6b', '#4ecdc4', '#1a535c', '#f7b32b', '#5f4b66'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </div>

            <div className={`${styles.chartCard} ${styles.energyCard}`}>
              <h3>Eficiência por Veículo</h3>
              <Bar
                data={{
                  labels: vehicles.map((vehicle) => vehicle.modelo),
                  datasets: [
                    {
                      label: 'Eficiência (km/L)',
                      data: vehicles.map((vehicle) => vehicle.consumoEnergetico),
                      backgroundColor: '#4ecdc4',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
