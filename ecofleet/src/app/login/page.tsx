'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './login.module.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Alternar entre login e registro
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Atualizar o formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${formData.email}`);
        if (!response.ok) throw new Error('Usuário ou senha inválidos.');

        const user = await response.json();

        if (user.senha === formData.password) {
          setSuccessMessage('Login realizado com sucesso!');
          setErrorMessage('');
          // Redirecionar para o dashboard
          localStorage.setItem('auth', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          router.push('/dashboard');
        } else {
          throw new Error('Senha incorreta.');
        }
      } catch (error: any) {
        setErrorMessage(error.message || 'Erro ao realizar login.');
        setSuccessMessage('');
      }
    } else {
      // REGISTRO
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('As senhas não coincidem!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: formData.name,
            email: formData.email,
            senha: formData.password,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || 'Erro ao registrar usuário.');
        }

        setSuccessMessage('Registro concluído! Agora faça login.');
        setErrorMessage('');
        setIsLogin(true);
      } catch (error: any) {
        setErrorMessage(error.message || 'Erro ao registrar usuário.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className={`${styles.authContainer} ${isLogin ? styles.loginBg : styles.registerBg}`}>
      <div className={styles.logo}>
        <Image
          src="/images/ecofleet-logo.png"
          alt="Logo EcoFleet"
          width={200}
          height={200}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.authCard}>
        <h1>{isLogin ? 'LOGIN' : 'REGISTRO'}</h1>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        <form className={styles.authForm} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className={styles.togglePassword} onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>
        <button onClick={toggleAuthMode} className={styles.toggleButton}>
          {isLogin ? 'Registrar' : 'Voltar para Login'}
        </button>
      </div>
    </div>
  );
}