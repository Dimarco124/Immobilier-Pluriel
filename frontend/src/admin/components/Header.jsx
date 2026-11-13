import React from 'react';
import { LogOut, ExternalLink, Bell } from 'lucide-react';

const pageNames = {
  dashboard: 'Tableau de bord',
  terrains: 'Terrains & Parcelles',
  projects: 'Projets Immobiliers',
  'hero-slides': 'Bannières Accueil',
  services: 'Nos Services',
  news: 'Actualités & Blog',
  'team-members': "Membres de l'équipe",
  vision: 'Section Vision & Directeur',
  stats: 'Chiffres Clés',
  messages: 'Messages & Demandes',
  'message-detail': 'Détail du message',
  settings: 'Paramètres du Site',
  testimonials: 'Témoignages Clients',
  'legal-sections': 'Pages Légales',
  'social-links': 'Réseaux Sociaux',
};

const Header = ({ user, onLogout, currentPage = 'dashboard', onPageChange, pendingMessages = 0 }) => {
  const currentTitle = pageNames[currentPage] || 'Espace Administration';

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <span style={{ color: 'var(--admin-muted)', fontWeight: 500, fontSize: '13px' }}>Administration /</span>
        <span>{currentTitle}</span>
      </div>

      <div className="admin-header-right">
        {/* Public Site Button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-header-view-site"
          title="Ouvrir le site public"
        >
          <ExternalLink size={14} />
          <span>Voir le site</span>
        </a>

        {/* Notifications */}
        <button
          type="button"
          className="admin-icon-button"
          onClick={() => onPageChange && onPageChange('messages')}
          title="Consulter les messages"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          {pendingMessages > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #ffffff',
              }}
            />
          )}
        </button>

        {/* User Profile Pill */}
        <div className="admin-profile">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="admin-profile-name">{user?.name || 'Administrateur'}</span>
            <span className="admin-profile-email">{user?.email || 'Admin@immobilierpluriel.com'}</span>
          </div>
          <div className="admin-avatar" style={{ position: 'relative' }}>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Admin'}`}
              alt="Avatar"
            />
            <span
              style={{
                position: 'absolute',
                bottom: '1px',
                right: '1px',
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%',
                border: '1.5px solid #ffffff',
              }}
              title="En ligne"
            />
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="admin-logout-btn"
          type="button"
          aria-label="Déconnexion"
          onClick={onLogout}
          title="Se déconnecter"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
