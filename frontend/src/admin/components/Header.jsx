import React from 'react';
import { Search, LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-title">Espace Administration</div>
      


      <div className="admin-header-right">
        <div className="admin-profile">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="admin-profile-name">{user?.name || 'Administrateur'}</span>
            <span className="admin-profile-email">{user?.email || 'Admin@immobilierpluriel.com'}</span>
          </div>
          <div className="admin-avatar">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Admin'}`}
              alt="Avatar"
            />
          </div>
        </div>

        <button 
          className="admin-logout-btn" 
          type="button" 
          aria-label="Déconnexion"
          onClick={onLogout}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
