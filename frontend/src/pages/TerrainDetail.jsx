import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiMapPin, FiMaximize, FiShield, FiTrendingUp, FiClock, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { terrains } from '../data/terrainsData';
import { getTerrain, getImageUrl } from '../services/api';
import '../styles/pages/DetailPages.css';

export default function TerrainDetail() {
  const { id } = useParams();
  const fallbackTerrain = terrains.find((t) => t.id === parseInt(id, 10));
  const [terrain, setTerrain] = useState(fallbackTerrain);

  useEffect(() => {
    getTerrain(id)
      .then((response) => setTerrain(response.data))
      .catch(() => setTerrain(fallbackTerrain));
  }, [id]);

  if (!terrain) {
    return (
      <SitePage label="404" title="Terrain introuvable">
        <div className="ix-wrap">
          <div className="ix-empty-state">
            <p>Ce terrain n'existe pas ou a été retiré.</p>
            <Link to="/terrains" className="nl-btn nl-btn-mint">Voir tous les terrains</Link>
          </div>
        </div>
      </SitePage>
    );
  }

  const features = terrain.features || [];
  const highlights = terrain.highlights || [];
  const proximity = terrain.proximity || [];
  const gallery = terrain.gallery || [];

  return (
    <SitePage label={terrain.status} title={terrain.title} lead={terrain.location}>
      <div className="ix-wrap">
        <Link to="/terrains" className="ix-back-link">
          <FiArrowLeft /> Terrains
        </Link>

        {/* Image principale */}
        <div className="ix-panorama reveal" style={{ marginBottom: '40px', aspectRatio: '21/9', borderRadius: 0 }}>
          <img src={getImageUrl(terrain.image_url || terrain.image)} alt={terrain.title} />
        </div>

        {/* Layout principal */}
        <div className="ix-duo reveal">
          {/* Colonne gauche - Contenu */}
          <div className="ix-detail-content">
            {/* Prix et infos rapides */}
            <div className="ix-price-banner">
              <div>
                <span className="ix-price-label">Prix</span>
                <strong className="ix-price-value">{terrain.price}</strong>
              </div>
              {terrain.is_promotion && (
                <span className="ix-promo-tag"><FiTrendingUp /> Promotion</span>
              )}
            </div>

            {/* Description */}
            <section className="ix-chapter">
              <h2>À propos de ce terrain</h2>
              <p>{terrain.long_description || terrain.longDescription || terrain.description}</p>
            </section>

            {/* Points forts */}
            {highlights.length > 0 && (
              <section className="ix-chapter">
                <h2>Points forts</h2>
                <ul className="ix-list">
                  {highlights.map((h, i) => (
                    <li key={i}>
                      <FiCheck style={{ color: 'var(--nl-turquoise)', marginRight: '10px' }} />
                      <div>
                        <strong>{h.title}</strong>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: '4px 0 0' }}>{h.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Caractéristiques */}
            {features.length > 0 && (
              <section className="ix-chapter">
                <h2>Caractéristiques</h2>
                <div className="ix-features-grid">
                  {features.map((f, i) => (
                    <div key={i} className="ix-feature-item">
                      <FiCheck /> {f}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Proximité */}
            {proximity.length > 0 && (
              <section className="ix-chapter">
                <h2>À proximité</h2>
                <ul className="ix-proximity">
                  {proximity.map((p, i) => (
                    <li key={i}>
                      <span className="ix-proximity-place">{p.place}</span>
                      <span className="ix-proximity-time"><FiClock /> {p.time}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Galerie */}
            {gallery.length > 1 && (
              <section className="ix-chapter">
                <h2>Galerie</h2>
                <div className="ix-gallery-grid">
                  {gallery.map((img, i) => (
                    <div key={i} className="ix-gallery-thumb">
                      <img src={getImageUrl(img)} alt={`${terrain.title} ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne droite - Sidebar */}
          <aside className="ix-detail-side">
            <div className="ix-side-card">
              <h3>Référence #{terrain.id}</h3>
              <div className="ix-side-info">
                <div className="ix-side-row">
                  <FiMapPin style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Localisation</span>
                    <strong>{terrain.location}</strong>
                  </div>
                </div>
                <div className="ix-side-row">
                  <FiMaximize style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Surface</span>
                    <strong>{terrain.area}</strong>
                  </div>
                </div>
                <div className="ix-side-row">
                  <FiShield style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Statut</span>
                    <strong>{terrain.status}</strong>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="nl-btn nl-btn-mint" style={{ width: '100%', marginTop: '20px' }}>
                <FiMail /> Demander plus d'infos
              </Link>
              <a href="tel:+237" className="nl-btn nl-btn-outline" style={{ width: '100%', marginTop: '10px' }}>
                <FiPhone /> Appeler
              </a>

              <p className="ix-side-note">
                <FiShield /> Accompagnement gratuit pour les formalités notariales.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </SitePage>
  );
}
