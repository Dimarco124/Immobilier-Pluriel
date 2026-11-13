import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Briefcase,
  MessageSquare,
  ArrowUpRight,
  Loader2,
  Settings,
  Eye,
  Plus,
  Clock,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
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

  const currentDateStr = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const stats = [
    {
      title: 'Terrains disponibles',
      value: data?.stats?.total_terrains || 0,
      icon: <MapPin size={22} />,
      colorClass: 'emerald',
      page: 'terrains',
      tag: 'Catalogue foncier',
    },
    {
      title: 'Projets immobiliers',
      value: data?.stats?.total_projects || 0,
      icon: <Briefcase size={22} />,
      colorClass: 'blue',
      page: 'projects',
      tag: 'Portfolio',
    },
    {
      title: 'Demandes de contact',
      value: data?.stats?.pending_submissions || 0,
      icon: <MessageSquare size={22} />,
      colorClass: 'amber',
      page: 'messages',
      tag: data?.stats?.unread_submissions ? `${data.stats.unread_submissions} non lu(s)` : 'À modérer',
    },
    {
      title: 'Articles & Actualités',
      value: data?.stats?.total_news || 0,
      icon: <TrendingUp size={22} />,
      colorClass: 'purple',
      page: 'news',
      tag: 'Publications',
    },
  ];

  const recentMessages = data?.recent_submissions || [];
  const topTerrains = data?.top_terrains || [];
  const recentActivities = data?.recent_activities || [];

  return (
    <div className="dash-container">
      {/* Hero Welcome Banner */}
      <div className="dash-hero">
        <div className="dash-hero-content">
          <div className="dash-live-badge">
            <span className="live-dot" />
            Système opérationnel • Immobilier Pluriel
          </div>
          <h1 className="dash-hero-title">
            Bonjour, {data?.admin_user?.name || 'Administrateur'} 👋
          </h1>
          <p className="dash-hero-subtitle">
            Aujourd'hui, {currentDateStr}. Voici les indicateurs clés et l'activité récente de votre plateforme.
          </p>
        </div>

        <div className="dash-hero-actions">
          <button
            type="button"
            className="admin-btn-primary"
            onClick={() => onNavigate('terrains')}
          >
            <Plus size={16} />
            Nouveau Terrain
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-outline dash-site-btn"
          >
            <ExternalLink size={16} />
            Site Public
          </a>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="dash-kpi-grid">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`dash-kpi-card ${stat.colorClass}`}
            onClick={() => onNavigate(stat.page)}
            role="button"
            tabIndex={0}
          >
            <div className="kpi-top">
              <div className="kpi-icon-wrap">{stat.icon}</div>
              <span className="kpi-tag">{stat.tag}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-value">{stat.value}</div>
              <div className="kpi-title">{stat.title}</div>
            </div>
            <div className="kpi-footer">
              <span>Gérer les éléments</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Bar */}
      <div className="dash-quick-bar">
        <span className="quick-bar-label">Raccourcis rapides :</span>
        <button
          type="button"
          className="quick-chip"
          onClick={() => onNavigate('terrains')}
        >
          <MapPin size={14} /> Terrains
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => onNavigate('projects')}
        >
          <Briefcase size={14} /> Projets
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => onNavigate('news')}
        >
          <Layers size={14} /> Actualités
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => onNavigate('messages')}
        >
          <MessageSquare size={14} /> Messages
        </button>
        <button
          type="button"
          className="quick-chip"
          onClick={() => onNavigate('settings')}
        >
          <Settings size={14} /> Paramètres & Réseaux
        </button>
      </div>

      {/* 2-Column Dashboard Layout */}
      <div className="dash-columns">
        {/* Left Column: Recent Messages & Activity */}
        <div className="dash-col-main">
          {/* Recent Contact Messages */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h3 className="dash-card-title">Dernières demandes de contact</h3>
                <p className="dash-card-desc">Messages envoyés depuis le formulaire de contact du site.</p>
              </div>
              <button
                type="button"
                className="dash-link-btn"
                onClick={() => onNavigate('messages')}
              >
                Voir tout ({data?.stats?.pending_submissions || 0})
              </button>
            </div>

            <div className="dash-messages-list">
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => {
                  const initial = (msg.name || 'A').charAt(0).toUpperCase();
                  const isUnread = !msg.is_read;

                  return (
                    <div
                      key={msg.id}
                      className={`dash-message-row ${isUnread ? 'is-unread' : ''}`}
                      onClick={() => onNavigate('message-detail', msg.id)}
                    >
                      <div className="dash-avatar-circle">{initial}</div>
                      <div className="dash-message-body">
                        <div className="dash-message-top">
                          <strong className="dash-sender-name">{msg.name || 'Visiteur'}</strong>
                          <span className="dash-message-date">
                            {msg.created_at
                              ? new Date(msg.created_at).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                })
                              : ''}
                          </span>
                        </div>
                        <div className="dash-message-subject">
                          {msg.subject || 'Demande d\'information'}
                        </div>
                        <div className="dash-message-email">{msg.email}</div>
                      </div>
                      <div className="dash-message-action">
                        {isUnread && <span className="dash-unread-pill">Nouveau</span>}
                        <ArrowUpRight size={16} className="dash-arrow" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="dash-empty-state">
                  <CheckCircle2 size={36} color="#10b981" />
                  <p>Aucun message en attente pour le moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          {recentActivities.length > 0 && (
            <div className="dash-card">
              <div className="dash-card-header">
                <div>
                  <h3 className="dash-card-title">Flux d'activités</h3>
                  <p className="dash-card-desc">Dernières mises à jour effectuées sur le contenu.</p>
                </div>
              </div>

              <div className="dash-timeline">
                {recentActivities.map((act, i) => (
                  <div key={i} className="dash-timeline-item">
                    <div className="dash-timeline-icon">{act.icon || '📌'}</div>
                    <div className="dash-timeline-content">
                      <div className="dash-timeline-title">
                        <strong>{act.title}</strong>
                        {act.status && (
                          <span className={`status-pill ${act.status.toLowerCase()}`}>
                            {act.status}
                          </span>
                        )}
                      </div>
                      <p className="dash-timeline-desc">{act.description}</p>
                      {act.time && (
                        <span className="dash-timeline-time">
                          <Clock size={12} />
                          {new Date(act.time).toLocaleDateString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Top Terrains & System Info */}
        <div className="dash-col-side">
          {/* Top Terrains */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h3 className="dash-card-title">Terrains populaires</h3>
                <p className="dash-card-desc">Les offres les plus consultées sur le site.</p>
              </div>
              <button
                type="button"
                className="dash-link-btn"
                onClick={() => onNavigate('terrains')}
              >
                Gérer
              </button>
            </div>

            <div className="dash-terrains-list">
              {topTerrains.length > 0 ? (
                topTerrains.map((terrain, idx) => (
                  <div
                    key={terrain.id || idx}
                    className="dash-terrain-item"
                    onClick={() => onNavigate('terrains')}
                  >
                    <div className="terrain-rank-badge">#{terrain.rank || idx + 1}</div>
                    <div className="terrain-details">
                      <strong className="terrain-title">{terrain.name}</strong>
                      <span className="terrain-loc">
                        <MapPin size={12} /> {terrain.location}
                      </span>
                    </div>
                    <div className="terrain-views-pill">
                      <Eye size={12} />
                      <span>{terrain.views || 0}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="dash-empty-state-mini">
                  <p>Aucune statistique de consultation disponible.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Guide & Support Card */}
          <div className="dash-card dash-support-card">
            <div className="support-badge">
              <Sparkles size={14} /> Astuce Gestion
            </div>
            <h4>Personnalisation en direct</h4>
            <p>
              Pour modifier les réseaux sociaux affichés dans le footer ou le numéro WhatsApp de contact direct, rendez-vous dans l'onglet <strong>Paramètres du Site</strong>.
            </p>
            <button
              type="button"
              className="admin-btn-primary support-btn"
              onClick={() => onNavigate('settings')}
            >
              Ouvrir les Paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
