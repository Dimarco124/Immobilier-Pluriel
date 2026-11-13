import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = ({ children, user, onLogout, currentPage, onPageChange, dashboardData }) => {
  const pendingCount = dashboardData?.stats?.pending_submissions || 0;

  return (
    <div className="admin-root">
      <div className="admin-window">
        <Sidebar
          onLogout={onLogout}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pendingMessages={pendingCount}
        />
        <div className="admin-main">
          <Header
            user={user}
            onLogout={onLogout}
            currentPage={currentPage}
            onPageChange={onPageChange}
            pendingMessages={pendingCount}
          />
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
