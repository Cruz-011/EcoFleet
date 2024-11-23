'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  // Obter o ID do usuário do localStorage (apenas no cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id);
        } catch (error) {
          console.error('Erro ao analisar o usuário do localStorage:', error);
          alert('Por favor, faça login novamente.');
          router.push('/login');
        }
      } else {
        alert('Por favor, faça login.');
        router.push('/login');
      }
    }
  }, [router]);

  // Função para buscar veículos
  const fetchVehicles = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/usuario/${userId}`);
      if (!response.ok) throw new Error('Erro ao buscar veículos.');
      const data = await response.json();
      setVehicles(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (userId) fetchVehicles();
  }, [userId]);

  // Função para lidar com entrada de dados no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editVehicle) {
      setEditVehicle({ ...editVehicle, [name]: value });
    } else {
      setNewVehicle({ ...newVehicle, [name]: value });
    }
  };

  // Adicionar veículo
  const handleAddVehicle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/veiculos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newVehicle, idUsuario: userId }),
      });
      if (!response.ok) throw new Error('Erro ao cadastrar veículo.');
      setSuccessMessage('Veículo cadastrado com sucesso!');
      fetchVehicles();
      setNewVehicle({ id: 0, modelo: '', marca: '', consumoEnergetico: 0, emissaoCarbono: 0 });
      setShowForm(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // Editar veículo
  const handleUpdateVehicle = async () => {
    if (!editVehicle) return;
    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/${editVehicle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editVehicle),
      });
      if (!response.ok) throw new Error('Erro ao atualizar veículo.');
      setSuccessMessage('Veículo atualizado com sucesso!');
      fetchVehicles();
      setEditVehicle(null);
      setShowForm(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // Excluir veículo
  const handleDeleteVehicle = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/veiculos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir veículo.');
      setSuccessMessage('Veículo excluído com sucesso!');
      fetchVehicles();
    } catch (error: any) {
      setErrorMessage(error.message);
    }
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
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={editVehicle ? editVehicle.modelo : newVehicle.modelo}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={editVehicle ? editVehicle.marca : newVehicle.marca}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="number"
              name="consumoEnergetico"
              placeholder="Consumo Energético (km/L)"
              value={editVehicle ? editVehicle.consumoEnergetico : newVehicle.consumoEnergetico}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="number"
              name="emissaoCarbono"
              placeholder="Emissão de Carbono (kg)"
              value={editVehicle ? editVehicle.emissaoCarbono : newVehicle.emissaoCarbono}
              onChange={handleInputChange}
              className={styles.input}
            />
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
