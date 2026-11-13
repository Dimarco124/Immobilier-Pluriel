import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Loader2,
  Save,
  AlertCircle,
  CheckCircle,
  Building2,
  Share2,
  MapPin,
  FileText,
  MessageCircle,
} from 'lucide-react';
import '../styles/Settings.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [message, setMessage] = useState({ type: '', text: '' });

  const [company, setCompany] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',
    description: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    legal_text: '',
    privacy_text: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

      const [companyRes, contactRes, socialRes, settingsRes] = await Promise.all([
        axios.get(`${API_URL}/company-info`, { headers: authHeader, withCredentials: true }).catch(() => ({ data: null })),
        axios.get(`${API_URL}/contact-info`, { headers: authHeader, withCredentials: true }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/social-links`, { headers: authHeader, withCredentials: true }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/site-settings`, { headers: authHeader, withCredentials: true }).catch(() => ({ data: null })),
      ]);

      const mergedData = { ...company };

      if (companyRes.data) {
        mergedData.name = companyRes.data.name || '';
        mergedData.description = companyRes.data.description || '';
        mergedData.legal_text = companyRes.data.legal_text || '';
        mergedData.privacy_text = companyRes.data.privacy_text || '';
      }

      if (Array.isArray(contactRes.data) && contactRes.data.length > 0) {
        contactRes.data.forEach((item) => {
          const lbl = (item.label || '').toLowerCase();
          if (lbl.includes('téléphone') || lbl.includes('telephone')) {
            mergedData.phone = item.value || '';
          } else if (lbl.includes('email')) {
            mergedData.email = item.value || '';
          } else if (lbl.includes('adresse') || lbl.includes('address')) {
            const parts = (item.value || '').split(',');
            mergedData.address = parts[0]?.trim() || '';
            mergedData.city = parts[1]?.trim() || '';
            mergedData.country = parts[2]?.trim() || '';
          }
        });
      }

      if (settingsRes.data) {
        if (settingsRes.data.whatsapp_number) {
          mergedData.whatsapp = settingsRes.data.whatsapp_number;
        }
      }

      if (Array.isArray(socialRes.data) && socialRes.data.length > 0) {
        socialRes.data.forEach((item) => {
          const platform = (item.platform || '').toLowerCase().trim();
          if (platform === 'facebook') mergedData.facebook = item.url || '';
          if (platform === 'instagram') mergedData.instagram = item.url || '';
          if (platform === 'linkedin') mergedData.linkedin = item.url || '';
          if (platform === 'tiktok') mergedData.tiktok = item.url || '';
          if (platform === 'whatsapp' && !mergedData.whatsapp) {
            mergedData.whatsapp = item.url || '';
          }
        });
      }

      setCompany(mergedData);
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres', error);
      setMessage({ type: 'error', text: 'Impossible de charger tous les paramètres.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');

      await axios.post(`${API_URL}/admin/settings/company`, company, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      window.dispatchEvent(new CustomEvent('company_updated', { detail: company }));

      setMessage({
        type: 'success',
        text: 'Les paramètres (coordonnées, réseaux sociaux, mentions) ont été enregistrés avec succès !',
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erreur lors de la sauvegarde des paramètres.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-loader">
        <Loader2 className="spinner" size={48} />
        <p>Chargement des paramètres...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'company', label: 'Entreprise & Contact', icon: Building2 },
    { id: 'social', label: 'Réseaux & WhatsApp', icon: Share2 },
    { id: 'location', label: 'Localisation & GPS', icon: MapPin },
    { id: 'legal', label: 'Pages Légales', icon: FileText },
  ];

  return (
    <div className="settings-page">
      {/* Top Header */}
      <div className="settings-hero">
        <div>
          <span className="settings-badge">Configuration Générale</span>
          <h1 className="settings-title">Paramètres du Site</h1>
          <p className="settings-subtitle">
            Configurez les coordonnées officielles, les réseaux sociaux affichés dans le footer et les textes légaux.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn-primary save-btn-top"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 size={18} className="spinner" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save size={18} />
              Enregistrer
            </>
          )}
        </button>
      </div>

      {/* Alert message */}
      {message.text && (
        <div className={`settings-alert ${message.type}`}>
          <div className="settings-alert-icon">
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          </div>
          <div className="settings-alert-text">
            <strong>{message.type === 'success' ? 'Succès' : 'Attention'} :</strong> {message.text}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="settings-tabs-bar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`settings-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="settings-content-card">
        {/* TAB 1: Entreprise & Contact */}
        {activeTab === 'company' && (
          <div className="settings-section-animate">
            <div className="section-intro">
              <h3>Identité de l'entreprise & Contact principal</h3>
              <p>Ces informations s'affichent dans l'en-tête, le footer et la page de contact.</p>
            </div>

            <div className="settings-grid">
              <div className="settings-field full-width">
                <label htmlFor="name">Nom officiel de l'entreprise *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={company.name}
                  onChange={handleChange}
                  placeholder="Ex: IMMOBILIER PLURIEL"
                  required
                />
              </div>

              <div className="settings-field full-width">
                <label htmlFor="description">Description / Présentation courte</label>
                <textarea
                  id="description"
                  name="description"
                  value={company.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Société de promotion immobilière et d'aménagement foncier de référence en Côte d'Ivoire..."
                />
                <span className="field-hint">Visible notamment sur la page d'accueil et le pied de page.</span>
              </div>

              <div className="settings-field">
                <label htmlFor="email">Email de contact officiel *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={company.email}
                  onChange={handleChange}
                  placeholder="contact@immobilierpluriel.com"
                  required
                />
              </div>

              <div className="settings-field">
                <label htmlFor="phone">Téléphone d'appels principal *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={company.phone}
                  onChange={handleChange}
                  placeholder="+225 07 00 00 00 00"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Réseaux Sociaux & WhatsApp */}
        {activeTab === 'social' && (
          <div className="settings-section-animate">
            <div className="section-intro">
              <h3>Réseaux Sociaux & Numéro WhatsApp</h3>
              <p>
                Ces liens contrôlent directement les icônes du pied de page (Footer) et les boutons d'appel à l'action.
              </p>
            </div>

            <div className="settings-highlight-card">
              <div className="highlight-icon whatsapp-bg">
                <MessageCircle size={24} />
              </div>
              <div className="highlight-body">
                <h4>Numéro WhatsApp du Site & Chat Flottant</h4>
                <p>
                  Saisissez le numéro avec l'indicatif pays (ex: <code>+225 07 00 00 00 00</code> ou <code>22507000000</code>).
                  Il est utilisé pour le bouton WhatsApp du footer et le widget de chat.
                </p>
                <div className="settings-field" style={{ marginTop: '12px' }}>
                  <input
                    type="text"
                    id="whatsapp"
                    name="whatsapp"
                    value={company.whatsapp}
                    onChange={handleChange}
                    placeholder="+225 07 00 00 00 00"
                  />
                </div>
              </div>
            </div>

            <div className="settings-grid" style={{ marginTop: '24px' }}>
              <div className="settings-field">
                <label htmlFor="facebook">
                  <span className="social-pill fb">Facebook</span>
                  Lien de votre page Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={company.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/immobilierpluriel"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="instagram">
                  <span className="social-pill insta">Instagram</span>
                  Lien de votre compte Instagram
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={company.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/immobilierpluriel"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="linkedin">
                  <span className="social-pill in">LinkedIn</span>
                  Lien de votre page LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={company.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/company/immobilierpluriel"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="tiktok">
                  <span className="social-pill tt">TikTok</span>
                  Lien de votre compte TikTok
                </label>
                <input
                  type="url"
                  id="tiktok"
                  name="tiktok"
                  value={company.tiktok}
                  onChange={handleChange}
                  placeholder="https://tiktok.com/@immobilierpluriel"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Localisation & Coordonnées GPS */}
        {activeTab === 'location' && (
          <div className="settings-section-animate">
            <div className="section-intro">
              <h3>Localisation & Coordonnées Géographiques</h3>
              <p>Adresse physique affichée sur le site et positionnement pour la carte interactive.</p>
            </div>

            <div className="settings-grid">
              <div className="settings-field full-width">
                <label htmlFor="address">Adresse physique / Siège *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={company.address}
                  onChange={handleChange}
                  placeholder="Ex: 220 Logements, Yamoussoukro"
                  required
                />
              </div>

              <div className="settings-field">
                <label htmlFor="city">Ville *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={company.city}
                  onChange={handleChange}
                  placeholder="Ex: Yamoussoukro"
                  required
                />
              </div>

              <div className="settings-field">
                <label htmlFor="country">Pays *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={company.country}
                  onChange={handleChange}
                  placeholder="Ex: Côte d'Ivoire"
                  required
                />
              </div>

              <div className="settings-field">
                <label htmlFor="latitude">Latitude GPS</label>
                <input
                  type="number"
                  step="0.000001"
                  id="latitude"
                  name="latitude"
                  value={company.latitude}
                  onChange={handleChange}
                  placeholder="Ex: 6.8276"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="longitude">Longitude GPS</label>
                <input
                  type="number"
                  step="0.000001"
                  id="longitude"
                  name="longitude"
                  value={company.longitude}
                  onChange={handleChange}
                  placeholder="Ex: -5.2893"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Textes Légaux */}
        {activeTab === 'legal' && (
          <div className="settings-section-animate">
            <div className="section-intro">
              <h3>Textes Légaux & Politiques</h3>
              <p>Textes affichés sur les pages Mentions Légales et Politique de Confidentialité.</p>
            </div>

            <div className="settings-grid">
              <div className="settings-field full-width">
                <label htmlFor="legal_text">Mentions Légales (Texte global)</label>
                <textarea
                  id="legal_text"
                  name="legal_text"
                  value={company.legal_text}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Renseignez ici les informations sur l'éditeur du site, hébergeur, capital social, etc."
                />
              </div>

              <div className="settings-field full-width">
                <label htmlFor="privacy_text">Politique de Confidentialité (Texte global)</label>
                <textarea
                  id="privacy_text"
                  name="privacy_text"
                  value={company.privacy_text}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Politique relative au traitement des données personnelles, cookies, etc."
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Bottom Bar */}
        <div className="settings-bottom-actions">
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={18} className="spinner" />
                Enregistrement en cours...
              </>
            ) : (
              <>
                <Save size={18} />
                Enregistrer toutes les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
