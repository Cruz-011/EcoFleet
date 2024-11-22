import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaCar, FaChartLine, FaTachometerAlt, FaUserAlt } from 'react-icons/fa';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/images/ecofleet-logo.png"
            alt="EcoFleet Logo"
            width={120}
            height={40}
            className={styles.logo}
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          <FaHome className={styles.icon} />
          <span>Home</span>
        </Link>
        <Link href="/veiculos" className={styles.navLink}>
          <FaCar className={styles.icon} />
          <span>Veículos</span>
        </Link>
        <Link href="/reports" className={styles.navLink}>
          <FaChartLine className={styles.icon} />
          <span>Relatórios</span>
        </Link>
        <Link href="/dashboard" className={styles.navLink}>
          <FaTachometerAlt className={styles.icon} />
          <span>Dashboard</span>
        </Link>
        <Link href="/login" className={styles.navLink}>
          <FaUserAlt className={styles.icon} />
          <span>Login/Registrar</span>
        </Link>
      </nav>
    </header>
  );
}
