import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = ({ children, user, onLogout, currentPage, onPageChange, dashboardData }) => {
  return (
    <div className="admin-root">
      <div className="admin-window">
        <Sidebar
          onLogout={onLogout}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pendingMessages={dashboardData?.stats?.pending_submissions || 0}
        />
        <div className="admin-main">
          <Header user={user} onLogout={onLogout} />
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
