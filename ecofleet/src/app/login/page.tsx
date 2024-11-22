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
  const router = useRouter();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = storedUsers.find(
        (user: { email: string; password: string }) =>
          user.email === formData.email && user.password === formData.password
      );

      if (userExists) {
        localStorage.setItem('auth', 'true');
        alert('Login bem-sucedido!');
        router.push('/dashboard');
      } else {
        alert('Credenciais inválidas!');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = storedUsers.find(
        (user: { email: string }) => user.email === formData.email
      );

      if (userExists) {
        alert('Este email já está registrado!');
      } else {
        storedUsers.push({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Registro concluído! Agora faça login.');
        setIsLogin(true);
      }
    }
  };

  return (
    <div className={`${styles.authContainer} ${isLogin ? styles.loginBg : styles.registerBg}`}>
      <div className={styles.logo}>
        <Image
          src="/images/ecofleet-logo.png"
          alt="Logo "
          width={200}
          height={200}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.authCard}>
        <h1>{isLogin ? 'LOGIN' : 'REGISTRO'}</h1>
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
