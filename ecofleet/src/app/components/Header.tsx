import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/vehicles">Veículos</Link>
        <Link href="/reports">Relatórios</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
