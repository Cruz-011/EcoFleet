'use client';
import Header from '../components/Header';
import styles from './Home.module.css';
import { FaCar, FaLeaf, FaChartLine, FaTools } from 'react-icons/fa';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        
        {/* Seção de Apresentação */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Bem-vindo ao EcoFleet</h1>
          <p className={styles.heroSubtitle}>
            A solução completa para monitorar emissões, consumo energético e eficiência da sua frota.
          </p>

        </section>

        {/* Sobre o Site */}
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>O que é o EcoFleet?</h2>
          <p>
            O EcoFleet é uma plataforma inovadora que combina tecnologia de ponta e práticas sustentáveis para ajudar
            empresas a otimizar suas frotas e operações energéticas. Oferecemos uma solução completa para:
          </p>
          <ul className={styles.list}>
            <li>Monitorar veículos em tempo real.</li>
            <li>Gerar relatórios detalhados sobre consumo e emissões.</li>
            <li>Reduzir custos operacionais e impacto ambiental.</li>
          </ul>
        </section>

        {/* Por Que Escolher EcoFleet */}
        <section className={styles.benefits}>
          <h2 className={styles.sectionTitle}>Por que Escolher a EcoFleet?</h2>
          <div className={styles.benefitCards}>
            <div className={styles.benefitCard}>
              <FaCar className={styles.icon} />
              <h3>Gestão Inteligente</h3>
              <p>Monitore sua frota em tempo real e otimize custos operacionais.</p>
            </div>
            <div className={styles.benefitCard}>
              <FaLeaf className={styles.icon} />
              <h3>Sustentabilidade</h3>
              <p>Reduza emissões e contribua para um futuro mais limpo.</p>
            </div>
            <div className={styles.benefitCard}>
              <FaChartLine className={styles.icon} />
              <h3>Relatórios Dinâmicos</h3>
              <p>Visualize métricas e gráficos para tomada de decisões estratégicas.</p>
            </div>
            <div className={styles.benefitCard}>
              <FaTools className={styles.icon} />
              <h3>Interface Intuitiva</h3>
              <p>Facilidade de uso e acessibilidade para todos os níveis de usuários.</p>
            </div>
          </div>
        </section>

        {/* Passo a Passo */}
        <section className={styles.steps}>
          <h2 className={styles.sectionTitle}>Como Utilizar a EcoFleet?</h2>
          <div className={styles.stepCards}>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>1</span>
              <h3>Cadastre sua Frota</h3>
              <p>Insira as informações dos seus veículos, como modelo, tipo de combustível e quilometragem.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>2</span>
              <h3>Monitore em Tempo Real</h3>
              <p>Acompanhe o consumo de combustível, emissões e eficiência energética em nosso dashboard.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>3</span>
              <h3>Analise Relatórios</h3>
              <p>Gere relatórios detalhados com insights para reduzir custos e melhorar a sustentabilidade.</p>
            </div>
          </div>
        </section>

        {/* Criadores */}
        <section className={styles.creators}>
          <h2 className={styles.sectionTitle}>Nossa Equipe</h2>
          <div className={styles.creatorCards}>
            <div className={styles.creatorCard}>
              <img src="/images/cauan.jfif" alt="Cauan da Cruz Ferreira" className={styles.creatorImage} />
              <h3>Cauan da Cruz Ferreira</h3>
              <p>RM: 558238</p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/criador1" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/criador1" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className={styles.creatorCard}>
              <img src="/images/enzo.jfif" alt="Enzo Giuseppe Marsola" className={styles.creatorImage} />
              <h3>Enzo Giuseppe Marsola</h3>
              <p>RM: 556310</p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/criador2" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/criador2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default HomePage;
