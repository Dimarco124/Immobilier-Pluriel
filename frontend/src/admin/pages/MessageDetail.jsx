import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArrowLeft,
  Loader2,
  Mail,
  Clock,
  User,
  Tag,
  CheckCircle,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
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
      await axios.post(
        `${API_URL}/admin/messages/${messageId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (message) {
        setMessage((prev) => (prev ? { ...prev, is_read: true } : null));
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
        <p>Message non trouvé ou déjà supprimé.</p>
        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => onNavigate('messages')}
        >
          Retour aux messages
        </button>
      </div>
    );
  }

  const cleanPhone = message.phone ? message.phone.replace(/[^\d+]/g, '') : '';
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
        `Bonjour ${message.name}, suite à votre message sur le site Immobilier Pluriel concernant "${message.subject || 'votre demande'}" : `
      )}`
    : null;

  const mailtoUrl = `mailto:${message.email}?subject=${encodeURIComponent(
    `Re: ${message.subject || 'Votre demande sur Immobilier Pluriel'}`
  )}`;

  return (
    <div className="msg-page">
      {/* Top Header */}
      <div className="msg-header">
        <button
          type="button"
          className="admin-btn-outline back-btn"
          onClick={() => onNavigate('messages')}
        >
          <ArrowLeft size={16} />
          <span>Retour aux messages</span>
        </button>

        <div className="msg-title-wrap">
          <span className="msg-category-pill">Demande de contact</span>
          <h1 className="msg-title">{message.subject || 'Message sans objet'}</h1>
        </div>
      </div>

      <div className="msg-layout">
        {/* Main Content Card */}
        <div className="msg-card-main">
          {/* Status banner */}
          <div className="msg-status-strip">
            <div className="msg-status-left">
              <span className={`msg-pill ${message.is_read ? 'read' : 'unread'}`}>
                {message.is_read ? '✓ Lu' : '● Nouveau / Non lu'}
              </span>
              <span className="msg-date">
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

            <div className="msg-status-actions">
              {!message.is_read && (
                <button
                  type="button"
                  className="msg-action-chip"
                  onClick={markAsRead}
                  disabled={marking}
                >
                  <CheckCircle size={14} />
                  Marquer comme lu
                </button>
              )}
            </div>
          </div>

          {/* Message Body */}
          <div className="msg-body">
            <h3 className="msg-body-heading">Message reçu :</h3>
            <div className="msg-text-box">
              {message.message}
            </div>
          </div>

          {/* Action Reply Bar */}
          <div className="msg-reply-bar">
            <span className="reply-bar-title">Répondre au prospect :</span>
            <div className="reply-buttons">
              <a
                href={mailtoUrl}
                className="admin-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={16} />
                Répondre par Email
              </a>

              {waUrl && (
                <a
                  href={waUrl}
                  className="admin-btn-outline wa-reply-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} />
                  Répondre sur WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sender Info Sidebar */}
        <div className="msg-card-sidebar">
          <div className="sender-card">
            <div className="sender-avatar">
              {(message.name || 'A').charAt(0).toUpperCase()}
            </div>
            <h3 className="sender-name">{message.name || 'Visiteur anonyme'}</h3>
            <p className="sender-role">Expéditeur du formulaire</p>

            <div className="sender-details-list">
              <div className="sender-detail-item">
                <span className="detail-label">Email</span>
                <a href={mailtoUrl} className="detail-value email">
                  <Mail size={14} />
                  {message.email}
                </a>
              </div>

              {message.phone && (
                <div className="sender-detail-item">
                  <span className="detail-label">Téléphone</span>
                  <a href={`tel:${message.phone}`} className="detail-value phone">
                    <Phone size={14} />
                    {message.phone}
                  </a>
                </div>
              )}

              {message.terrain_id && (
                <div className="sender-detail-item">
                  <span className="detail-label">Terrain concerné</span>
                  <span className="detail-value">#{message.terrain_id}</span>
                </div>
              )}

              <div className="sender-detail-item">
                <span className="detail-label">Statut du dossier</span>
                <span className="detail-value status-tag">{message.status || 'Nouveau'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
