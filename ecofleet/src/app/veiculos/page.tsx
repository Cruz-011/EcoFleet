import { useEffect, useState } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/vehicles'); // Endpoint para Java ou Python
      const data = await res.json();
      setVehicles(data);
    };
    fetchData();
  }, []);

  return (
    <main className="vehicles">
      <h1>Veículos Monitorados</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>{vehicle.name} - {vehicle.efficiency}</li>
        ))}
      </ul>
    </main>
  );
}
