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

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN LOCAL
      const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
      const user = storedUsers[formData.email];

      if (user && user.password === formData.password) {
        setSuccessMessage('Login realizado com sucesso!');
        setErrorMessage('');
        localStorage.setItem('auth', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        router.push('/home'); // Redireciona para a página "Home"
      } else {
        setErrorMessage('Email ou senha inválidos.');
        setSuccessMessage('');
      }
    } else {
      // REGISTRO LOCAL
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('As senhas não coincidem!');
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');

      if (storedUsers[formData.email]) {
        setErrorMessage('Email já cadastrado.');
        return;
      }

      storedUsers[formData.email] = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem('users', JSON.stringify(storedUsers));
      setSuccessMessage('Registro concluído! Agora faça login.');
      setErrorMessage('');
      setIsLogin(true);
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
