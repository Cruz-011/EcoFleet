import Link from 'next/link';
import { FaHome, FaCar, FaChartLine, FaTachometerAlt } from 'react-icons/fa';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
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
      </nav>
    </header>
  );
}
