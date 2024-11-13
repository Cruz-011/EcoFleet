import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Footer from './components/footer';
import LoadingSpinner from './components/loadingSpinner';

// Carregar a página inicial de forma dinâmica para otimizar o carregamento
const HomePage = dynamic(() => import('./home/page'), {
  suspense: true,
});

export default function MainPage() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
      <Footer />
    </div>
  );
}
