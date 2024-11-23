'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import styles from './Veiculos.module.css';

interface Vehicle {
  id: number;
  modelo: string;
  marca: string;
  consumoEnergetico: number;
  emissaoCarbono: number;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    id: 0,
    modelo: '',
    marca: '',
    consumoEnergetico: 0,
    emissaoCarbono: 0,
  });
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Função para lidar com entrada de dados no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editVehicle) {
      setEditVehicle({ ...editVehicle, [name]: value });
    } else {
      setNewVehicle({ ...newVehicle, [name]: value });
    }
  };

  // Função de Adicionar Veículo (simulado localmente)
  const handleAddVehicle = () => {
    const newId = vehicles.length + 1;
    setVehicles([...vehicles, { ...newVehicle, id: newId }]);
    setNewVehicle({ id: 0, modelo: '', marca: '', consumoEnergetico: 0, emissaoCarbono: 0 });
    setSuccessMessage('Veículo adicionado com sucesso!');
    setShowForm(false);
  };

  // Editar veículo
  const handleUpdateVehicle = () => {
    if (!editVehicle) return;
    const updatedVehicles = vehicles.map((v) =>
      v.id === editVehicle.id ? editVehicle : v
    );
    setVehicles(updatedVehicles);
    setEditVehicle(null);
    setSuccessMessage('Veículo atualizado com sucesso!');
    setShowForm(false);
  };

  // Excluir veículo
  const handleDeleteVehicle = (id: number) => {
    const filteredVehicles = vehicles.filter((v) => v.id !== id);
    setVehicles(filteredVehicles);
    setSuccessMessage('Veículo excluído com sucesso!');
  };

  return (
    <>
      <Header />
      <main className={styles.vehicles}>
        <h1 className={styles.title}>Veículos Monitorados</h1>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        {/* Lista de veículos */}
        <ul className={styles.vehicleList}>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <li key={vehicle.id} className={styles.vehicleItem}>
                <div className={styles.vehicleInfo}>
                  <p><strong>Modelo:</strong> {vehicle.modelo}</p>
                  <p><strong>Marca:</strong> {vehicle.marca}</p>
                  <p><strong>Consumo:</strong> {vehicle.consumoEnergetico} km/L</p>
                  <p><strong>Emissões:</strong> {vehicle.emissaoCarbono} kg</p>
                </div>
                <div className={styles.vehicleActions}>
                  <button
                    onClick={() => {
                      setEditVehicle(vehicle);
                      setShowForm(true);
                    }}
                    className={`${styles.button} ${styles.editButton}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className={`${styles.button} ${styles.deleteButton}`}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum veículo encontrado.</p>
          )}
        </ul>

        {/* Formulário de cadastro/edição */}
        <button onClick={() => setShowForm(!showForm)} className={styles.toggleButton}>
          {showForm ? 'Fechar Formulário' : 'Cadastrar Veículo'}
        </button>
        {showForm && (
          <section className={styles.formSection}>
            <h2>{editVehicle ? 'Editar Veículo' : 'Cadastrar Veículo'}</h2>
            <div className={styles.formGroup}>
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                placeholder="Digite o modelo"
                value={editVehicle ? editVehicle.modelo : newVehicle.modelo}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="marca">Marca</label>
              <input
                type="text"
                id="marca"
                name="marca"
                placeholder="Digite a marca"
                value={editVehicle ? editVehicle.marca : newVehicle.marca}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="consumoEnergetico">Consumo Energético (km/L)</label>
              <input
                type="number"
                id="consumoEnergetico"
                name="consumoEnergetico"
                placeholder="Consumo por km/L"
                value={editVehicle ? editVehicle.consumoEnergetico : newVehicle.consumoEnergetico}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="emissaoCarbono">Emissão de Carbono (kg)</label>
              <input
                type="number"
                id="emissaoCarbono"
                name="emissaoCarbono"
                placeholder="Emissões em kg"
                value={editVehicle ? editVehicle.emissaoCarbono : newVehicle.emissaoCarbono}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <button
              onClick={editVehicle ? handleUpdateVehicle : handleAddVehicle}
              className={styles.addButton}
            >
              {editVehicle ? 'Salvar Alterações' : 'Adicionar Veículo'}
            </button>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
