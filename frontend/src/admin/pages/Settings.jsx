import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Save, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/Settings.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [company, setCompany] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',
    description: '',
    legal_text: '',
    privacy_text: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const [companyRes, contactRes] = await Promise.all([
        axios.get(`${API_URL}/company-info`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }).catch(() => ({ data: null })),
        axios.get(`${API_URL}/contact-info`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }).catch(() => ({ data: [] })),
      ]);

      if (companyRes.data) {
        setCompany(prev => ({
          ...prev,
          ...companyRes.data,
          legal_text: companyRes.data.legal_text || '',
          privacy_text: companyRes.data.privacy_text || '',
        }));
      }

      if (Array.isArray(contactRes.data) && contactRes.data.length > 0) {
        const contactData = {};
        contactRes.data.forEach(item => {
          if (item.label === 'Téléphone' || item.label === 'Telephone') contactData.phone = item.value;
          if (item.label === 'Email') contactData.email = item.value;
          if (item.label === 'Adresse') {
            const parts = item.value.split(',');
            contactData.address = parts[0]?.trim() || '';
            contactData.city = parts[1]?.trim() || '';
            contactData.country = parts[2]?.trim() || '';
          }
        });
        setCompany(prev => ({ ...prev, ...contactData }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');

      // Mettre à jour les infos de l'entreprise
      await axios.post(`${API_URL}/admin/settings/company`, company, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setMessage({ type: 'success', text: 'Paramètres mis à jour avec succès!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde des données' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-loader">
        <Loader2 className="spinner" size={48} />
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Paramètres</h1>
        <p>Gérez les informations de votre entreprise</p>
      </div>

      {message.text && (
        <div className={`message-alert ${message.type}`}>
          <div className="message-icon">
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          </div>
          <p>{message.text}</p>
        </div>
      )}

      <div className="settings-form">
        <div className="form-section">
          <h2>Informations de l'entreprise</h2>
          
          <div className="form-group">
            <label htmlFor="name">Nom de l'entreprise</label>
            <input
              type="text"
              id="name"
              name="name"
              value={company.name}
              onChange={handleChange}
              placeholder="Ex: Immobilier Pluriel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={company.description}
              onChange={handleChange}
              rows="4"
              placeholder="Décrivez votre entreprise..."
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Coordonnées</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                placeholder="contact@entreprise.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={company.phone}
                onChange={handleChange}
                placeholder="+225 07 00 00 00 00"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Localisation</h2>

          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              name="address"
              value={company.address}
              onChange={handleChange}
              placeholder="Ex: 220 Logements"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={company.city}
                onChange={handleChange}
                placeholder="Ex: Yamoussoukro"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Pays</label>
              <input
                type="text"
                id="country"
                name="country"
                value={company.country}
                onChange={handleChange}
                placeholder="Ex: Côte d'Ivoire"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={company.latitude}
                onChange={handleChange}
                placeholder="Ex: 6.8276"
                step="0.0001"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={company.longitude}
                onChange={handleChange}
                placeholder="Ex: -5.2893"
                step="0.0001"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            className="btn-save"
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
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
