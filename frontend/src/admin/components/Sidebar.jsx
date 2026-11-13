import React from 'react';
import {
  BarChart3,
  Briefcase,
  Building2,
  Eye,
  LayoutDashboard,
  LogOut,
  Mail,
  Map as MapIcon,
  Newspaper,
  Settings,
  Users,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  ExternalLink,
  Share2,
} from 'lucide-react';

const menuSections = [
  {
    title: 'Vue d\'ensemble',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
      { id: 'messages', icon: Mail, label: 'Messages & Demandes', badgeKey: 'messages' },
    ],
  },
  {
    title: 'Catalogue Foncier',
    items: [
      { id: 'terrains', icon: MapIcon, label: 'Terrains' },
      { id: 'projects', icon: Briefcase, label: 'Projets' },
    ],
  },
  {
    title: 'Contenu Public',
    items: [
      { id: 'hero-slides', icon: ImageIcon, label: 'Bannières Accueil' },
      { id: 'services', icon: Building2, label: 'Services' },
      { id: 'team-members', icon: Users, label: 'Équipe' },
      { id: 'vision', icon: Eye, label: 'Section Vision' },
      { id: 'stats', icon: BarChart3, label: 'Chiffres Clés' },
      { id: 'news', icon: Newspaper, label: 'Actualités & Blog' },
      { id: 'testimonials', icon: MessageSquare, label: 'Témoignages' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { id: 'social-links', icon: Share2, label: 'Réseaux Sociaux' },
      { id: 'legal-sections', icon: FileText, label: 'Pages Légales' },
      { id: 'settings', icon: Settings, label: 'Paramètres du Site' },
    ],
  },
];

const Sidebar = ({ onLogout, currentPage, onPageChange, pendingMessages = 0 }) => {
  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-brand">
        <div className="admin-brand-icon">
          <img
            src="/images/logo_immobilier.png"
            alt="Logo"
            style={{ width: '26px', height: '26px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="admin-brand-info">
          <span className="admin-brand-title">IMMOBILIER PLURIEL</span>
          <span className="admin-brand-badge">Espace Gestion</span>
        </div>
      </div>

      {/* Menu Sections */}
      <nav className="admin-menu">
        {menuSections.map((section, sIndex) => (
          <div key={sIndex} className="admin-menu-group">
            <div className="admin-menu-section-label">{section.title}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              const badge = item.badgeKey === 'messages' ? pendingMessages : null;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onPageChange(item.id)}
                  className={`admin-menu-button${active ? ' is-active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {badge > 0 && (
                    <span className="admin-menu-badge amber">{badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* View Public Site Shortcut */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-sidebar-public-link"
          title="Ouvrir le site public dans un nouvel onglet"
        >
          <ExternalLink size={15} />
          <span>Voir le site public</span>
        </a>

        {/* Footer Actions */}
        <div className="admin-sidebar-footer">
          <button
            type="button"
            onClick={onLogout}
            className="admin-menu-button"
            style={{ color: '#f87171' }}
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
