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
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { id: 'hero-slides', icon: ImageIcon, label: 'Bannières' },
  { id: 'terrains', icon: MapIcon, label: 'Terrains', badge: '25' },
  { id: 'projects', icon: Briefcase, label: 'Projets' },
  { id: 'services', icon: Building2, label: 'Services' },
  { id: 'team-members', icon: Users, label: 'Equipe' },
  { id: 'vision', icon: Eye, label: 'Section Vision' },
  { id: 'stats', icon: BarChart3, label: 'Statistiques' },
  { id: 'news', icon: Newspaper, label: 'Actualites' },
  { id: 'testimonials', icon: MessageSquare, label: 'Témoignages' },
  { id: 'legal-sections', icon: FileText, label: 'Pages Légales' },
  { id: 'messages', icon: Mail, label: 'Messages', badgeKey: 'messages' },
  { id: 'settings', icon: Settings, label: 'Parametres' },
];

const Sidebar = ({ onLogout, currentPage, onPageChange, pendingMessages = 0 }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">
          <img src="/images/logo_immobilier.png" alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
        </div>
        <span>IMMOBILIER PLURIEL</span>
      </div>

      <nav className="admin-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          const badge = item.badgeKey === 'messages' ? pendingMessages : item.badge;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onPageChange(item.id)}
              className={`admin-menu-button${active ? ' is-active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {badge && badge !== '0' && <span className="admin-menu-badge">{badge}</span>}
            </button>
          );
        })}
        
        <button
          type="button"
          onClick={onLogout}
          className="admin-menu-button"
          style={{ marginTop: 'auto' }}
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </nav>

      <div className="admin-sidebar-bird">
        {/* Custom Real Estate / Immobilier Theme SVG watermark */}
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 80 L100 25 L170 80 V170 H30 Z" stroke="url(#logo-grad)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M60 170 V110 H140 V170" stroke="url(#logo-grad)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M100 110 V170" stroke="url(#logo-grad)" strokeWidth="8" />
          <circle cx="100" cy="70" r="14" stroke="url(#logo-grad)" strokeWidth="8" />
          <defs>
            <linearGradient id="logo-grad" x1="30" y1="25" x2="170" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--admin-accent)"/>
              <stop offset="1" stopColor="var(--admin-mint)"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;
