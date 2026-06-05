import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import News from './pages/News';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import Terrains from './pages/Terrains';
import TerrainDetail from './pages/TerrainDetail';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import ScrollToTop from './components/ScrollToTop';
import FloatingContact from './components/FloatingContact';
import SitePage from './components/SitePage';
import AdminApp from './admin/AdminApp';
import useScrollReveal from './hooks/useScrollReveal';
import './App.css';

function NotFound() {
  return (
    <SitePage label="404" title="Page introuvable" lead="Retournez à l'accueil pour continuer.">
      <div className="ix-wrap ix-empty reveal is-visible">
        <a href="/" className="nl-btn nl-btn-mint">
          Retour à l&apos;accueil
        </a>
      </div>
    </SitePage>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';
  useScrollReveal();

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main className={`content-wrap${isHome ? ' content-wrap--landing' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/terrains" element={<Terrains />} />
          <Route path="/terrains/:id" element={<TerrainDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<BlogDetail />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about-us" element={<Navigate to="/team" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
