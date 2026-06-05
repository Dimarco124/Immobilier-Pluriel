import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Loader2, Mail, Clock, User, Tag } from 'lucide-react';
import '../styles/MessageDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const MessageDetail = ({ messageId, onNavigate }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetchMessage();
  }, [messageId]);

  const fetchMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/contact-submissions/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setMessage(response.data);
      
      // Marquer comme lu automatiquement
      if (!response.data.is_read) {
        markAsRead();
      }
    } catch (error) {
      console.error('Erreur lors du chargement du message', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    setMarking(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/admin/messages/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      
      if (message) {
        setMessage({ ...message, is_read: true });
      }
    } catch (error) {
      console.error('Erreur lors du marquage du message', error);
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="message-detail-loader">
        <Loader2 className="spinner" size={48} />
        <p>Chargement du message...</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="message-detail-error">
        <p>Message non trouvé</p>
        <button className="admin-btn-primary" onClick={() => onNavigate('messages')}>
          Retour aux messages
        </button>
      </div>
    );
  }

  return (
    <div className="message-detail-container">
      {/* Header */}
      <div className="message-detail-header">
        <button
          type="button"
          className="admin-btn-outline"
          onClick={() => onNavigate('messages')}
        >
          <ArrowLeft size={18} />
          Retour aux messages
        </button>
        <div>
          <h1 className="admin-title">Détails du message</h1>
          <p className="admin-subtitle">Consulter et gérer les soumissions de contact</p>
        </div>
      </div>

      {/* Message Card */}
      <div className="admin-card message-detail-card">
        {/* Status Banner */}
        <div className={`message-status-banner ${message.is_read ? 'read' : 'unread'}`}>
          <div className="banner-content">
            <span className={`status-badge ${message.is_read ? 'read' : 'unread'}`}>
              {message.is_read ? '✓✓ Lu' : '✓ Non lu'}
            </span>
            <span className="banner-date">
              <Clock size={14} />
              {new Date(message.created_at).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className="message-detail-body">
          {/* Contact Info Section */}
          <div className="message-info-section">
            <div className="section-title">
              <User size={18} />
              Informations de contact
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Nom</label>
                <p className="info-value">{message.name}</p>
              </div>

              <div className="info-item">
                <label>Email</label>
                <p className="info-value email-link">
                  <Mail size={14} />
                  <a href={`mailto:${message.email}`}>{message.email}</a>
                </p>
              </div>

              {message.phone && (
                <div className="info-item">
                  <label>Téléphone</label>
                  <p className="info-value">{message.phone}</p>
                </div>
              )}

              {message.terrain_id && (
                <div className="info-item">
                  <label>Terrain ID</label>
                  <p className="info-value">#{message.terrain_id}</p>
                </div>
              )}
            </div>
          </div>

          {/* Subject Section */}
          {message.subject && (
            <div className="message-info-section">
              <div className="section-title">
                <Tag size={18} />
                Sujet
              </div>
              <div className="subject-box">{message.subject}</div>
            </div>
          )}

          {/* Message Content Section */}
          <div className="message-info-section">
            <div className="section-title">Message</div>
            <div className="message-content-box">
              {message.message}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="message-info-section metadata-section">
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Statut</span>
                <span className="metadata-value">{message.status}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Créé le</span>
                <span className="metadata-value">
                  {new Date(message.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Mis à jour le</span>
                <span className="metadata-value">
                  {new Date(message.updated_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="message-detail-actions">
          <button
            type="button"
            className="admin-btn-outline"
            onClick={() => onNavigate('messages')}
          >
            Fermer
          </button>
          <button
            type="button"
            className={`admin-btn-primary ${marking ? 'loading' : ''}`}
            onClick={markAsRead}
            disabled={message.is_read || marking}
          >
            {marking ? (
              <>
                <Loader2 className="spin" size={16} />
                Marquage en cours...
              </>
            ) : message.is_read ? (
              'Déjà marqué comme lu'
            ) : (
              'Marquer comme lu'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
