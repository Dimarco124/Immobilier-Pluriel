import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Edit2, Loader2, Plus, Search, Trash2, Upload, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const formatValue = (value) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (Array.isArray(value)) return `${value.length} element(s)`;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const resourceFields = {
  terrains: [
    ['title', 'Titre', 'text', true],
    ['location', 'Localisation', 'text'],
    ['price', 'Prix', 'text'],
    ['promo_price', 'Prix promo', 'text'],
    ['area', 'Superficie', 'text'],
    ['status', 'Statut', 'text'],
    ['image_url', 'Image principale', 'file'],
    ['description', 'Description courte', 'textarea'],
    ['long_description', 'Description longue', 'textarea'],
    ['features', 'Caracteristiques, separees par des virgules', 'array'],
    ['gallery', 'Galerie URLs, separees par des virgules', 'array'],
    ['is_featured', 'Afficher en vedette', 'boolean'],
    ['is_promotion', 'Afficher en promotion', 'boolean'],
    ['is_active', 'Actif', 'boolean'],
  ],
  projects: [
    ['slug', 'Slug', 'text', true],
    ['title', 'Titre', 'text', true],
    ['location', 'Localisation', 'text'],
    ['category', 'Categorie', 'text'],
    ['year', 'Annee', 'text'],
    ['highlight', 'Highlight', 'text'],
    ['image_url', 'Image principale', 'file'],
    ['video_url', 'Video YouTube (URL)', 'text'],
    ['description', 'Description courte', 'textarea'],
    ['long_description', 'Description longue', 'textarea'],
    ['key_features', 'Specificites, separees par des virgules', 'array'],
    ['results', 'Resultats, separes par des virgules', 'array'],
    ['gallery', 'Galerie URLs, separees par des virgules', 'array'],
    ['is_featured', 'Afficher en vedette', 'boolean'],
    ['is_active', 'Actif', 'boolean'],
  ],
  'hero-slides': [
    ['title', 'Titre', 'text', true],
    ['eyebrow', 'Surtitre (eyebrow)', 'text'],
    ['description', 'Description / Sous-titre', 'textarea'],
    ['image_url', 'Image de fond', 'file'],
    ['order', 'Ordre', 'number'],
    ['is_active', 'Actif', 'boolean'],
  ],
  services: [
    ['title', 'Titre', 'text', true],
    ['summary', 'Resume', 'textarea'],
    ['example', 'Exemple', 'textarea'],
    ['result', 'Resultat', 'textarea'],
    ['icon', 'Icone', 'text'],
    ['image_url', 'Image', 'file'],
    ['is_active', 'Actif', 'boolean'],
  ],
  news: [
    ['slug', 'Slug', 'text', true],
    ['title', 'Titre', 'text', true],
    ['category', 'Categorie', 'text'],
    ['author', 'Auteur', 'text'],
    ['date', 'Date', 'date'],
    ['image_url', 'Image', 'file'],
    ['excerpt', 'Resume', 'textarea'],
    ['content', 'Contenu HTML', 'textarea'],
    ['tags', 'Tags, separes par des virgules', 'array'],
    ['gallery', 'Galerie URLs, separees par des virgules', 'array'],
    ['is_featured', 'Afficher en vedette', 'boolean'],
    ['is_active', 'Actif', 'boolean'],
  ],
  'contact-submissions': [
    ['name', 'Nom', 'text', true],
    ['email', 'Email', 'text', true],
    ['phone', 'Telephone', 'text'],
    ['subject', 'Sujet', 'text'],
    ['message', 'Message', 'textarea', true],
    ['status', 'Statut', 'text'],
    ['is_read', 'Lu', 'boolean'],
  ],
  'team-members': [
    ['name', 'Nom', 'text', true],
    ['role', 'Role', 'text'],
    ['bio', 'Bio', 'textarea'],
    ['image_url', 'Photo', 'file'],
    ['is_active', 'Actif', 'boolean'],
  ],
  'vision-sections': [
    ['title', 'Titre', 'text', true],
    ['description', 'Description', 'textarea'],
    ['quote_text', 'Citation du directeur', 'textarea', true],
    ['quote_author', 'Nom du directeur', 'text', true],
    ['quote_role', 'Fonction du directeur', 'text', true],
    ['quote_image_url', 'Photo du directeur', 'file'],
  ],
  'vision-stats': [
    ['order', 'Ordre d\'affichage', 'number', true],
    ['value', 'Valeur (nombre)', 'text', true],
    ['suffix', 'Suffixe (ex: +)', 'text'],
    ['label', 'Libelle', 'text', true],
    ['hint', 'Texte d\'aide (optionnel)', 'text'],
  ],
  'navigation-links': [
    ['label', 'Libelle', 'text', true],
    ['url', 'URL', 'text', true],
    ['is_active', 'Actif', 'boolean'],
  ],
  'site-settings': [
    ['site_name', 'Nom du site', 'text'],
    ['site_tagline', 'Slogan', 'text'],
    ['site_description', 'Description', 'textarea'],
    ['logo_url', 'Logo', 'text'],
    ['primary_color', 'Couleur primaire', 'text'],
    ['secondary_color', 'Couleur secondaire', 'text'],
    ['whatsapp_number', 'Numero WhatsApp', 'text'],
    ['whatsapp_message_template', 'Message WhatsApp', 'textarea'],
    ['creator_name', 'Createur', 'text'],
    ['creator_whatsapp', 'WhatsApp createur', 'text'],
    ['maintenance_mode', 'Mode maintenance', 'boolean'],
  ],
  testimonials: [
    ['name', 'Nom', 'text', true],
    ['role', 'Rôle', 'text'],
    ['content', 'Témoignage', 'textarea', true],
    ['image_url', 'Photo (Optionnelle)', 'file'],
    ['is_active', 'Actif', 'boolean'],
  ],
  'legal-sections': [
    ['page', 'Page (legal ou privacy)', 'text', true],
    ['title', 'Titre de la section', 'text', true],
    ['content', 'Contenu', 'textarea', true],
    ['order', 'Ordre d\'affichage', 'number', true],
  ],
};

const fieldDefaults = {
  boolean: false,
  array: '',
  textarea: '',
  date: '',
  text: '',
  file: '', // Les champs file commencent vides
};

const toInputValue = (value, type) => {
  if (type === 'file') return ''; // Les inputs file ne peuvent pas avoir de valeur
  if (type === 'array') return Array.isArray(value) ? value.join(', ') : '';
  if (type === 'boolean') return Boolean(value);
  return value ?? '';
};

const fromInputValue = (value, type) => {
  if (type === 'file') return value; // Pour les fichiers, on garde l'URL telle quelle
  if (type === 'array') {
    return String(value || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (type === 'boolean') return Boolean(value);
  return value;
};

const ResourceList = ({ title, subtitle, resource, columns, readOnly = false }) => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/admin/${resource}`, {
        params: { search: search || undefined, per_page: 20 },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setItems(response.data.data || []);
      setMeta(response.data);
    } catch (error) {
      console.error(`Unable to fetch ${resource}`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [resource]);

  const filteredItems = useMemo(() => items, [items]);

  const fieldLabel = (column) => {
    if (column === 'is_featured') return 'Vedette';
    if (column === 'is_promotion') return 'Promotion';
    return column.replaceAll('_', ' ');
  };

  const toggleBooleanField = async (item, field) => {
    const nextValue = !Boolean(item[field]);
    try {
      await axios.patch(`${API_URL}/admin/${resource}/${item.id}`, { [field]: nextValue }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setItems((current) => current.map((entry) => (
        entry.id === item.id ? { ...entry, [field]: nextValue } : entry
      )));
    } catch (error) {
      console.error('Impossible de mettre a jour le flag', error);
      alert('Impossible de mettre a jour ce terrain.');
    }
  };

  const deleteItem = async (id) => {
    if (readOnly || !window.confirm('Supprimer cet element ?')) return;

    try {
      await axios.delete(`${API_URL}/admin/${resource}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      alert('Suppression impossible.');
    }
  };

  const fields = resourceFields[resource] || columns.map((column) => [column, column.replaceAll('_', ' '), 'text']);

  const handleFileUpload = async (fieldName, file) => {
    if (!file) return;

    // Vérifier la taille (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximale: 5MB');
      return;
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      alert('Seules les images sont acceptées');
      return;
    }

    setUploadingFiles((prev) => ({ ...prev, [fieldName]: true }));
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/admin/upload`, formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress((prev) => ({ ...prev, [fieldName]: percentCompleted }));
        },
      });

      if (response.data.success) {
        setFormData((current) => ({
          ...current,
          [fieldName]: response.data.url,
        }));
      } else {
        alert('Erreur lors de l\'upload du fichier');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload du fichier');
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [fieldName]: false }));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
    }
  };

  const handleRemoveImage = (fieldName) => {
    setFormData((current) => ({
      ...current,
      [fieldName]: '',
    }));
  };

  const openForm = (item = null) => {
    const nextData = {};
    fields.forEach(([name, , type]) => {
      nextData[name] = item ? toInputValue(item[name], type) : fieldDefaults[type || 'text'];
    });
    setEditingItem(item);
    setFormData(nextData);
  };

  const closeForm = () => {
    setEditingItem(null);
    setFormData({});
  };


  const saveItem = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = {};
    fields.forEach(([name, , type]) => {
      payload[name] = fromInputValue(formData[name], type);
    });

    try {
      if (editingItem?.id) {
        await axios.patch(`${API_URL}/admin/${resource}/${editingItem.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        await axios.post(`${API_URL}/admin/${resource}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
      closeForm();
      await fetchItems();
    } catch (error) {
      alert("Enregistrement impossible. Verifie les champs obligatoires.");
    } finally {
      setSaving(false);
    }
  };

  // ── FORM PAGE VIEW ──
  if (Object.keys(formData).length > 0) {
    return (
      <div className="admin-form-page">
        <div className="admin-form-page-head">
          <div>
            <h1 className="admin-title">{editingItem ? 'Modifier' : 'Ajouter'} — {title}</h1>
            <p className="admin-subtitle">Les changements sont enregistrés directement dans Laravel.</p>
          </div>
          <button type="button" className="admin-btn-outline" onClick={closeForm}>
            <X size={16} />
            Retour à la liste
          </button>
        </div>

        <form className="admin-card admin-form-page-card" onSubmit={saveItem}>
          <div className="admin-form-page-body">
            {fields.map(([name, label, type = 'text', required]) => (
              <div key={name} className={`admin-field ${['textarea', 'array'].includes(type) ? 'is-wide' : ''}`}>
                {type === 'boolean' ? (
                  <label className="admin-check-field">
                    <input
                      type="checkbox"
                      checked={Boolean(formData[name])}
                      onChange={(event) => setFormData((current) => ({ ...current, [name]: event.target.checked }))}
                    />
                    {label}
                  </label>
                ) : type === 'file' ? (
                  <>
                    <label>{label} {required && <span className="admin-field-required">*</span>}</label>
                    <div className="admin-file-upload">
                      {formData[name] ? (
                        <div className="admin-file-preview">
                          <img src={formData[name]} alt="Preview" className="admin-preview-image" />
                          <button
                            type="button"
                            className="admin-remove-image"
                            onClick={() => handleRemoveImage(name)}
                            title="Supprimer l'image"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="admin-upload-button">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              if (file) handleFileUpload(name, file);
                            }}
                            disabled={uploadingFiles[name]}
                            style={{ display: 'none' }}
                          />
                          {uploadingFiles[name] ? (
                            <div className="admin-upload-progress">
                              <Loader2 className="spin" size={20} />
                              <span>Upload en cours... {uploadProgress[name]}%</span>
                            </div>
                          ) : (
                            <>
                              <Upload size={20} />
                              <span>Choisir une image</span>
                            </>
                          )}
                        </label>
                      )}
                    </div>
                  </>
                ) : ['textarea', 'array'].includes(type) ? (
                  <>
                    <label>{label}</label>
                    <textarea
                      value={formData[name] || ''}
                      required={required}
                      onChange={(event) => setFormData((current) => ({ ...current, [name]: event.target.value }))}
                    />
                  </>
                ) : (
                  <>
                    <label>{label}</label>
                    <input
                      type={type}
                      value={formData[name] || ''}
                      required={required}
                      onChange={(event) => setFormData((current) => ({ ...current, [name]: event.target.value }))}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="admin-form-page-actions">
            <button type="button" className="admin-btn-outline" onClick={closeForm}>Annuler</button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving && <Loader2 className="spin" size={16} />}
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-title">{title}</h1>
          <p className="admin-subtitle">{subtitle}</p>
        </div>
        {!readOnly && (
          <button type="button" className="admin-btn-primary" onClick={() => openForm()}>
            <Plus size={18} />
            Ajouter
          </button>
        )}
      </div>

      <div className="admin-card admin-table-toolbar">
        <div className="admin-page-head">
          <div className="admin-search">
            <Search size={18} />
            <input
              type="text"
              placeholder={`Rechercher dans ${title.toLowerCase()}...`}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && fetchItems()}
            />
          </div>
          <button type="button" className="admin-btn-outline" onClick={fetchItems}>Actualiser</button>
        </div>
      </div>

      <div className="admin-card admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{fieldLabel(column)}</th>
              ))}
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="admin-empty-cell">
                  <Loader2 className="spin" size={32} />
                </td>
              </tr>
            ) : filteredItems.length ? (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  {columns.map((column, index) => (
                    <td key={column}>
                      {index === 0 ? (
                        <div className="admin-table-entity admin-table-entity--with-badges" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {(item.image_url || item.image) && (
                            <img 
                              src={item.image_url || item.image} 
                              alt="Thumbnail" 
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--admin-border)' }} 
                            />
                          )}
                          <div>
                            <strong>{formatValue(item[column])}</strong>
                            {(item.is_featured || item.is_promotion) && (
                              <div className="admin-row-badges" style={{ marginTop: '4px' }}>
                                {item.is_featured && <span className="admin-badge admin-badge--featured">Vedette</span>}
                                {item.is_promotion && <span className="admin-badge admin-badge--promo">Promo</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : column === 'is_featured' || column === 'is_promotion' ? (
                        <label className="admin-checkbox-cell">
                          <input
                            type="checkbox"
                            checked={Boolean(item[column])}
                            onChange={() => toggleBooleanField(item, column)}
                          />
                          <span>{fieldLabel(column)}</span>
                        </label>
                      ) : ['image_url', 'image', 'icon'].includes(column) ? (
                        item[column] ? (
                          <img 
                            src={item[column]} 
                            alt="Aperçu" 
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--admin-border)' }} 
                          />
                        ) : (
                          <span style={{ color: 'var(--admin-muted)' }}>Aucune</span>
                        )
                      ) : (
                        <span>{formatValue(item[column])}</span>
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="admin-table-actions">
                      <button type="button" className="admin-icon-button" aria-label="Modifier" onClick={() => openForm(item)}>
                        <Edit2 size={15} />
                      </button>
                      <button type="button" className="admin-icon-button" aria-label="Supprimer" onClick={() => deleteItem(item.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="admin-empty-cell">Aucun element trouve.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <p className="admin-meta-note">
          {meta.total || items.length} element(s) disponibles dans Laravel.
        </p>
      )}
    </>
  );
};

export default ResourceList;
