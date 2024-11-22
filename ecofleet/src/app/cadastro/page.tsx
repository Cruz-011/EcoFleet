'use client';

import { useState } from 'react';
import styles from './cadastro.module.css';
import Image from 'next/image';

export default function CadastroPage() {
  const [user, setUser] = useState({ nome: '', email: '', senha: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar. Verifique os dados informados.');

      setMessage('Cadastro realizado com sucesso! Faça login para continuar.');
      setUser({ nome: '', email: '', senha: '' });
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.logo}>
        <Image src="/images/ecofleet-logo.png" alt="EcoFleet" width={200} height={50} className={styles.logoImage} />
      </div>
      <div className={styles.authCard}>
        <h1>Cadastro de Cliente</h1>
        {message && <p>{message}</p>}
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={user.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={user.senha}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <button className={styles.toggleButton} onClick={() => (window.location.href = '/login')}>
          Já tem uma conta? Faça login!
        </button>
      </div>
    </div>
  );
}