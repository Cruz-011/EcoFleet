'use client'
import Header from '../components/Header';
import Footer from '../components/footer';
import styles from './Home.module.css';
import { FaCar, FaLeaf, FaChartLine } from 'react-icons/fa';

const HomePage = () => (
  <>
    <Header />
    <main className={styles.container}>

      {/* Seção de Apresentação com Animação Sutil */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>EcoFleet</h1>
        <p className={styles.heroSubtitle}>Tecnologia de ponta para eficiência energética e sustentabilidade</p>
        <button className={styles.ctaButton}>Descubra Mais</button>
      </section>

      {/* Benefícios do Projeto */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Por que Escolher o EcoFleet?</h2>
        <div className={styles.benefitCards}>
          <div className={styles.benefitCard}>
            <FaCar className={styles.icon} />
            <h3>Monitoramento em Tempo Real</h3>
            <p>Visualize a performance de cada veículo para uma tomada de decisão informada.</p>
          </div>
          <div className={styles.benefitCard}>
            <FaLeaf className={styles.icon} />
            <h3>Redução de Emissões</h3>
            <p>Controle as emissões de carbono e contribua para um ambiente mais limpo.</p>
          </div>
          <div className={styles.benefitCard}>
            <FaChartLine className={styles.icon} />
            <h3>Relatórios Inteligentes</h3>
            <p>Relatórios personalizados para otimizar a eficiência da frota.</p>
          </div>
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section className={styles.about}>
        <h2 className={styles.sectionTitle}>Quem Somos</h2>
        <p>Equipe dedicada a desenvolver soluções tecnológicas inovadoras, promovendo sustentabilidade e eficiência no setor automotivo.</p>
      </section>

      {/* Seção dos Criadores com Design Aprimorado */}
      <section className={styles.creators}>
        <h2 className={styles.sectionTitle}>Conheça a Equipe</h2>
        <div className={styles.creatorCards}>
          <div className={styles.creatorCard}>
            <img src="/images/cauan.jfif" alt="Cauan da Cruz Ferreira" className={styles.creatorImage} />
            <div className={styles.creatorInfo}>
              <h3>Cauan da Cruz Ferreira</h3>
              <p>RM: 558238</p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/criador1" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/criador1" target="_blank" rel="noopener noreferrer">| LinkedIn</a>
              </div>
            </div>
          </div>
          <div className={styles.creatorCard}>
            <img src="/images/enzo.jfif" alt="Enzo Giuseppe Marsola" className={styles.creatorImage} />
            <div className={styles.creatorInfo}>
              <h3>Enzo Giuseppe Marsola</h3>
              <p>RM: 556310</p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/criador2" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/criador2" target="_blank" rel="noopener noreferrer">| LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
    <Footer />
  </>
);

export default HomePage;
