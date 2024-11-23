'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Reports.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Vehicle {
  id: number;
  modelo: string;
  marca: string;
  consumoEnergetico: number;
  emissaoCarbono: number;
}

export default function ReportsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  // Verificar `localStorage` no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id);
        } catch (error) {
          console.error('Erro ao analisar o JSON do localStorage:', error);
          alert('Erro ao carregar as informações do usuário. Faça login novamente.');
          window.location.href = '/login';
        }
      } else {
        alert('Por favor, faça login.');
        window.location.href = '/login';
      }
    }
  }, []);

  // Buscar veículos do usuário
  const fetchVehicles = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/usuario/${userId}`);
      if (!response.ok) throw new Error('Erro ao buscar dados dos veículos.');
      const data = await response.json();
      setVehicles(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (userId) fetchVehicles();
  }, [userId]);

  const totalEmissions = vehicles.reduce((sum, vehicle) => sum + vehicle.emissaoCarbono, 0);
  const totalEfficiency = vehicles.reduce((sum, vehicle) => sum + vehicle.consumoEnergetico, 0) / (vehicles.length || 1);

  const emissionsData = {
    labels: vehicles.map((vehicle) => vehicle.modelo),
    datasets: [
      {
        label: 'Emissões (kg)',
        data: vehicles.map((vehicle) => vehicle.emissaoCarbono),
        backgroundColor: '#ff6b6b',
      },
    ],
  };

  const efficiencyData = {
    labels: vehicles.map((vehicle) => vehicle.modelo),
    datasets: [
      {
        label: 'Eficiência (km/L)',
        data: vehicles.map((vehicle) => vehicle.consumoEnergetico),
        backgroundColor: '#4ecdc4',
      },
    ],
  };

  return (
    <>
      <Header />
      <main className={styles.reports}>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <section className={styles.infoCard}>
          <h2>Relatórios Detalhados</h2>
          <p>
            Aqui você encontra informações detalhadas sobre o desempenho e impacto ambiental de seus veículos.
          </p>
        </section>

        <section className={styles.reportDetails}>
          <div>
            <h3>Total de Emissões (kg):</h3>
            <p>{totalEmissions.toFixed(2)}</p>
          </div>
          <div>
            <h3>Eficiência Média (km/L):</h3>
            <p>{totalEfficiency.toFixed(2)}</p>
          </div>
        </section>

        <section className={styles.charts}>
          <div className={styles.chartCard}>
            <h3>Emissões por Veículo</h3>
            <Bar data={emissionsData} options={{ responsive: true }} />
          </div>
          <div className={styles.chartCard}>
            <h3>Eficiência por Veículo</h3>
            <Bar data={efficiencyData} options={{ responsive: true }} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
