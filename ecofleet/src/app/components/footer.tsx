export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 EcoFleet. Todos os direitos reservados.</p>
        <nav>
          <a href="/sobre" className="footer-link">
            Sobre Nós
          </a>
          {" | "}
          <a href="/contato" className="footer-link">
            Contato
          </a>
          {" | "}
          <a href="/politica-de-privacidade" className="footer-link">
            Política de Privacidade
          </a>
        </nav>
        <p>Desenvolvido com ❤️ pela equipe INNOVEXGROUP.</p>
      </div>
    </footer>
  );
}
