'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import styles from './Veiculos.module.css';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<
    {
      id: number;
      name: string;
      efficiency: string;
      score: string;
      cost: string;
      fuelType: string;
      monthlyDistance: string;
    }[]
  >([]);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    distance: '',
    fuel: '',
    fuelType: 'gasoline',
    monthlyDistance: ''
  });
  const [showForm, setShowForm] = useState(false);

  // Preços médios por tipo de combustível
  const fuelPrices: { [key: string]: number } = {
    gasoline: 5.59, // R$ por litro
    ethanol: 4.09, // R$ por litro
    diesel: 4.89, // R$ por litro
    electricity: 0.50 // R$ por kWh
  };

  // Cálculo de eficiência e custo com base no tipo de combustível
  const calculateEfficiencyAndCost = (
    distance: number,
    fuel: number,
    fuelType: string,
    monthlyDistance: number
  ) => {
    const efficiency = (distance / fuel).toFixed(2); // km/L ou km/kWh
    const fuelNeededMonthly = (monthlyDistance / parseFloat(efficiency)).toFixed(2); // Consumo mensal estimado
    const cost = (parseFloat(fuelNeededMonthly) * fuelPrices[fuelType]).toFixed(2); // Custo mensal

    let score = 'Alta Eficiência';
    if (parseFloat(efficiency) < 10) score = 'Baixa Eficiência';
    else if (parseFloat(efficiency) < 15) score = 'Eficiência Média';

    return { efficiency: `${efficiency} km/${fuelType === 'electricity' ? 'kWh' : 'L'}`, score, cost };
  };

  // Função para lidar com entrada de dados do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  // Adicionar um novo veículo
  const handleAddVehicle = () => {
    const { name, distance, fuel, fuelType, monthlyDistance } = newVehicle;
    if (name && distance && fuel && fuelType && monthlyDistance) {
      const { efficiency, score, cost } = calculateEfficiencyAndCost(
        Number(distance),
        Number(fuel),
        fuelType,
        Number(monthlyDistance)
      );
      const vehicle = { id: Date.now(), name, efficiency, score, cost, fuelType, monthlyDistance };
      setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
      setNewVehicle({ name: '', distance: '', fuel: '', fuelType: 'gasoline', monthlyDistance: '' });
      setShowForm(false);
    }
  };

  // Alternar exibição do formulário
  const toggleForm = () => setShowForm(!showForm);

  // Cálculo do custo total do mês para todos os veículos
  const totalCost = vehicles.reduce((sum, vehicle) => sum + parseFloat(vehicle.cost), 0).toFixed(2);

  return (
    <>
      <Header />
      <main className={styles.vehicles}>
        <h1 className={styles.title}>Veículos Monitorados</h1>
        <p className={styles.description}>
          Cadastre seus veículos e acompanhe o consumo, eficiência e o custo estimado de combustível por mês.
        </p>

        {/* Resumo Financeiro do Mês */}
        <section className={styles.summary}>
          <p>Total de Veículos: {vehicles.length}</p>
          <p>Gasto Total do Mês: R$ {totalCost}</p>
        </section>

        {/* Botão para Cadastrar Veículo */}
        <button onClick={toggleForm} className={styles.toggleButton}>
          {showForm ? 'Fechar Cadastro' : 'Cadastrar Veículo'}
        </button>

        {/* Formulário de Cadastro Oculto */}
        {showForm && (
          <section className={styles.formSection}>
            <h2 className={styles.formTitle}>Cadastrar Novo Veículo</h2>
            <div className={styles.formGroup}>
              <label>Nome do Veículo:</label>
              <input
                type="text"
                name="name"
                value={newVehicle.name}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Distância Total Percorrida (km):</label>
              <input
                type="number"
                name="distance"
                value={newVehicle.distance}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Consumo Total de Combustível (L ou kWh):</label>
              <input
                type="number"
                name="fuel"
                value={newVehicle.fuel}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tipo de Combustível:</label>
              <select
                name="fuelType"
                value={newVehicle.fuelType}
                onChange={handleInputChange}
                className={styles.input}
              >
                <option value="gasoline">Gasolina</option>
                <option value="ethanol">Etanol</option>
                <option value="diesel">Diesel</option>
                <option value="electricity">Eletricidade</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Quilometragem Estimada por Mês (km):</label>
              <input
                type="number"
                name="monthlyDistance"
                value={newVehicle.monthlyDistance}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <button onClick={handleAddVehicle} className={styles.addButton}>
              Adicionar Veículo
            </button>
          </section>
        )}

        {/* Lista de Veículos com Eficiência, Custo e Alertas */}
        <ul className={styles.vehicleList}>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <li key={vehicle.id} className={styles.vehicleItem}>
                <span className={styles.vehicleName}>{vehicle.name}</span>
                <span className={styles.vehicleDetails}>
                  Eficiência: {vehicle.efficiency} - {vehicle.score}
                  <br />
                  Consumo Mensal Estimado para {vehicle.monthlyDistance} km: R$ {vehicle.cost}
                </span>
              </li>
            ))
          ) : (
            <p className={styles.loadingMessage}>Nenhum veículo cadastrado.</p>
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
}
