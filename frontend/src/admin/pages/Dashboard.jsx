import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Loader2,
  Settings,
  Bell,
  Eye,
  Download,
  MessageSquare,
  Zap,
  Eye as EyeIcon,
} from 'lucide-react';
import '../styles/Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Dashboard = ({ onNavigate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error('Dashboard unavailable', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loader">
        <Loader2 className="spinner" size={48} />
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Terrains actifs',
      value: data?.stats?.total_terrains || 0,
      icon: <BarChart3 size={24} />,
      color: '#4CAF50',
      trend: '+12%',
      description: 'Terrains publiés'
    },
    {
      title: 'Projets en cours',
      value: data?.stats?.total_projects || 0,
      icon: <TrendingUp size={24} />,
      color: '#2196F3',
      trend: '+5%',
      description: 'En développement'
    },
    {
      title: 'Messages reçus',
      value: data?.stats?.pending_submissions || 0,
      icon: <MessageSquare size={24} />,
      color: '#FF9800',
      trend: '3 nouveaux',
      description: 'À modérer'
    },
  ];

  const recentMessages = data?.recent_submissions?.map((msg) => ({
    id: msg.id,
    name: msg.name || 'Anonymous',
    email: msg.email || '-',
    subject: msg.subject || 'No subject',
    time: new Date(msg.created_at).toLocaleDateString('fr-FR'),
    unread: !msg.is_read,
  })) || [];

  const topTerrains = data?.top_terrains || [];

  const handleMarkAsRead = async (messageId, event) => {
    event.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/admin/messages/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      
      // Actualiser les messages
      setData(prev => ({
        ...prev,
        recent_submissions: prev.recent_submissions.map(msg =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      }));
    } catch (error) {
      console.error('Erreur lors du marquage du message', error);
    }
  };

  const openMessageDetails = (msg) => {
    onNavigate('message-detail', msg.id);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Bienvenue, {data?.admin_user?.name || 'Administrateur'}</h1>
          <p>Voici un aperçu de votre activité immobilière</p>
        </div>
        <div className="dashboard-actions">
          <button className="header-btn" onClick={() => onNavigate('messages')}>
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="header-btn" onClick={() => onNavigate('settings')}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const navigationMap = {
            0: 'terrains',
            1: 'projects',
            2: 'messages',
          };
          
          return (
            <div 
              key={index} 
              className="stat-card"
              onClick={() => navigationMap[index] && onNavigate(navigationMap[index])}
              style={{ cursor: navigationMap[index] ? 'pointer' : 'default' }}
            >
              <div className="stat-icon" style={{ backgroundColor: stat.color + '15' }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className="stat-trend">
                  <ArrowUpRight size={14} />
                  {stat.trend}
                </span>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Activity Section */}
          <div className="content-section">
            <div className="section-header">
              <h2>Activités récentes</h2>
              <button className="btn-secondary" onClick={() => onNavigate('news')}>Voir tout</button>
            </div>

            <div className="activity-list">
              {data?.recent_activities?.map((activity, index) => (
                <div key={index} className={`activity-item ${activity.status === 'Publié' ? 'published' : activity.status === 'Brouillon' ? 'draft' : 'pending'}`}>
                  <div className="activity-icon">
                    <span>{activity.icon}</span>
                  </div>
                  <div className="activity-details">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-time">
                      {activity.time && new Date(activity.time).toLocaleDateString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className={`activity-badge ${activity.status === 'Brouillon' ? 'draft-badge' : activity.status === 'Urgent' ? 'pending-badge' : ''}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="content-section">
            <div className="section-header">
              <h2>Raccourcis rapides</h2>
            </div>

            <div className="quick-actions">
              <button className="action-btn" onClick={() => onNavigate('terrains')}>
                <span className="action-icon">🏠</span>
                <div>
                  <p>Gérer Terrains</p>
                  <small>{data?.stats?.total_terrains || 0} terrains</small>
                </div>
              </button>

              <button className="action-btn" onClick={() => onNavigate('projects')}>
                <span className="action-icon">🏗️</span>
                <div>
                  <p>Gérer Projets</p>
                  <small>{data?.stats?.total_projects || 0} projets</small>
                </div>
              </button>

              <button className="action-btn" onClick={() => onNavigate('news')}>
                <span className="action-icon">📰</span>
                <div>
                  <p>Gérer Actualités</p>
                  <small>Articles publiés</small>
                </div>
              </button>

              <button className="action-btn" onClick={() => onNavigate('messages')}>
                <span className="action-icon">💬</span>
                <div>
                  <p>Messages</p>
                  <small>{data?.stats?.pending_submissions || 0} en attente</small>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          {/* User Profile Card */}
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data?.admin_user?.name || 'Admin'}`}
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-info-mini">
                <h3>{data?.admin_user?.name || 'Administrateur'}</h3>
                <p>{data?.admin_user?.email}</p>
              </div>
            </div>
            <div className="profile-stats-mini">
              <div className="profile-stat">
                <span className="stat-num">5</span>
                <span className="stat-label">Terrains</span>
              </div>
              <div className="profile-stat">
                <span className="stat-num">3</span>
                <span className="stat-label">Projets</span>
              </div>
              <div className="profile-stat">
                <span className="stat-num">12</span>
                <span className="stat-label">Messages</span>
              </div>
            </div>
            <button className="btn-primary" onClick={() => onNavigate('settings')}>Éditer le profil</button>
          </div>

          {/* Recent Messages */}
          <div className="content-section">
            <div className="section-header">
              <h2>Messages récents</h2>
              <span className="badge-count">{recentMessages.filter(m => m.unread).length}</span>
            </div>

            <div className="messages-list">
              {recentMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message-item ${msg.unread ? 'unread' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div 
                    style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}
                    onClick={() => openMessageDetails(msg)}
                  >
                    <div className="message-avatar">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="message-content">
                      <p className="message-name">{msg.name}</p>
                      <p className="message-subject">{msg.subject}</p>
                      <p className="message-time">{msg.time}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="admin-icon-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMessageDetails(msg);
                    }}
                    title="Voir le message"
                    style={{ marginLeft: '12px' }}
                  >
                    <EyeIcon size={16} color={msg.unread ? '#FF9800' : '#999'} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Terrains */}
          <div className="content-section">
            <div className="section-header">
              <h2>Terrains populaires</h2>
              <button className="btn-secondary" onClick={() => onNavigate('terrains')}>
                <Download size={14} />
                Rapport
              </button>
            </div>

            <div className="terrains-list">
              {topTerrains.map((terrain) => (
                <div key={terrain.id} className="terrain-item">
                  <div className="terrain-rank">#{terrain.rank}</div>
                  <div className="terrain-info">
                    <h4>{terrain.name}</h4>
                    <p style={{ fontSize: '0.85em', color: '#666', marginTop: '2px' }}>{terrain.location}</p>
                    <div className="terrain-metrics">
                      <span><Eye size={14} /> {terrain.views} vues</span>
                      <span><Zap size={14} /> {terrain.sales} ventes</span>
                    </div>
                  </div>
                </div>
              ))}
              {topTerrains.length === 0 && (
                <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Aucun terrain populaire pour le moment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
