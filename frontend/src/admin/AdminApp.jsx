import React, { useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResourceList from './pages/ResourceList';
import Settings from './pages/Settings';
import MessageDetail from './pages/MessageDetail';
import '../admin.css';

const pages = {
  terrains: {
    title: 'Terrains',
    subtitle: 'Catalogue foncier, promotions et lots mis en avant.',
    resource: 'terrains',
    columns: ['title', 'location', 'price', 'status', 'is_featured', 'is_promotion'],
  },
  projects: {
    title: 'Projets',
    subtitle: 'Portfolio, categories, videos et projets vedettes.',
    resource: 'projects',
    columns: ['title', 'location', 'category', 'year'],
  },
  'hero-slides': {
    title: 'Bannières Accueil',
    subtitle: 'Images et textes défilants de la page d\'accueil.',
    resource: 'hero-slides',
    columns: ['image_url', 'title', 'eyebrow', 'order', 'is_active'],
  },
  services: {
    title: 'Services',
    subtitle: 'Expertises visibles sur le site public.',
    resource: 'services',
    columns: ['title', 'summary', 'icon'],
  },
  news: {
    title: 'Actualites',
    subtitle: 'Articles, categories, tags et publications.',
    resource: 'news',
    columns: ['title', 'category', 'author', 'date'],
  },
  'team-members': {
    title: 'Equipe',
    subtitle: "Membres de l'equipe et responsables metiers.",
    resource: 'team-members',
    columns: ['name', 'role', 'image_url'],
  },
  vision: {
    title: 'Section Vision',
    subtitle: "Mot du directeur et citation affiches sur la page d'accueil.",
    resource: 'vision-sections',
    columns: ['title', 'quote_author', 'quote_role'],
  },
  stats: {
    title: 'Statistiques Vision',
    subtitle: "Chiffres cles affiches sur la page d'accueil (17+ Annees, 120+ Projets, etc.).",
    resource: 'vision-stats',
    columns: ['order', 'value', 'suffix', 'label'],
  },
  messages: {
    title: 'Messages',
    subtitle: 'Demandes envoyees depuis les formulaires.',
    resource: 'contact-submissions',
    columns: ['name', 'email', 'subject', 'status'],
  },
  settings: {
    title: 'Parametres',
    subtitle: 'Informations de l\'entreprise et configuration.',
    resource: 'site-settings',
    columns: ['site_name', 'primary_color', 'whatsapp_number', 'maintenance_mode'],
  },
  testimonials: {
    title: 'Témoignages',
    subtitle: 'Gestion des témoignages clients affichés sur la page d\'accueil.',
    resource: 'testimonials',
    columns: ['image_url', 'name', 'role', 'content', 'is_active'],
  },
  'legal-sections': {
    title: 'Pages Légales',
    subtitle: 'Gérez les sections (titre et contenu) des mentions légales et politiques de confidentialité.',
    resource: 'legal-sections',
    columns: ['page', 'title', 'order'],
  },
};

function AdminApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [messageId, setMessageId] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('admin_user');

    if (token) {
      setUser(savedUser ? JSON.parse(savedUser) : { name: 'Admin', email: 'Admin@immobilierpluriel.com' });
    }

    setLoading(false);
  }, []);

  // Fetch dashboard data for sidebar updates
  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
    // Refresh every 30 seconds to keep sidebar updated
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = (nextUser) => {
    localStorage.setItem('admin_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  const handleNavigate = (page, id = null) => {
    if (page === 'message-detail' && id) {
      setCurrentPage('message-detail');
      setMessageId(id);
    } else {
      setCurrentPage(page);
      setMessageId(null);
    }
  };

  if (loading) return null;
  if (!user) return <Login onLogin={handleLogin} />;

  const config = pages[currentPage];

  return (
    <MainLayout
      user={user}
      currentPage={currentPage}
      onPageChange={handleNavigate}
      onLogout={handleLogout}
      dashboardData={dashboardData}
    >
      {currentPage === 'dashboard' ? (
        <Dashboard onNavigate={handleNavigate} />
      ) : currentPage === 'message-detail' && messageId ? (
        <MessageDetail messageId={messageId} onNavigate={handleNavigate} />
      ) : currentPage === 'settings' ? (
        <Settings />
      ) : config ? (
        <ResourceList {...config} />
      ) : (
        <Dashboard onNavigate={handleNavigate} />
      )}
    </MainLayout>
  );
}

export default AdminApp;
