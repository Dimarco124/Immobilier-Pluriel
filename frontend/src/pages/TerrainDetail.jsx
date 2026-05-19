import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiMapPin, FiMaximize, FiShield, FiTrendingUp, FiClock, FiStar } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { terrains } from '../data/terrainsData';

export default function TerrainDetail() {
  const { id } = useParams();
  const terrain = terrains.find((t) => t.id === parseInt(id, 10));

  if (!terrain) {
    return (
      <SitePage label="404" title="Terrain introuvable">
        <div className="ix-wrap ix-empty">
          <Link to="/terrains" className="nl-btn nl-btn-mint">
            Retour aux terrains
          </Link>
        </div>
      </SitePage>
    );
  }

  return (
    <SitePage label={terrain.status} title={terrain.title} lead={terrain.location}>
      <div className="ix-wrap ix-dossier reveal">
        <Link to="/terrains" className="ix-dossier-back">
          <FiArrowLeft /> Terrains
        </Link>

        <div className="ix-dossier-cover">
          <img src={terrain.image} alt={terrain.title} />
        </div>

        <div className="ix-dossier-layout">
          <div className="ix-dossier-content">
            <div className="ix-dossier-section">
              <h3>Description</h3>
              <p className="ix-dossier-text">{terrain.longDescription || terrain.description}</p>
            </div>

            {terrain.highlights && (
              <div className="ix-dossier-section">
                <h3>Points forts</h3>
                <div className="ix-highlights-grid">
                  {terrain.highlights.map((h, i) => (
                    <div key={i} className="ix-highlight-card">
                      <div className="ix-highlight-icon">
                        {i === 0 && <FiStar />}
                        {i === 1 && <FiShield />}
                        {i === 2 && <FiTrendingUp />}
                      </div>
                      <div>
                        <h4>{h.title}</h4>
                        <p>{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ix-dossier-section">
              <h3>Caractéristiques techniques</h3>
              <ul className="ix-checklist">
                {terrain.features.map((f) => (
                  <li key={f}>
                    <FiCheck aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {terrain.proximity && (
              <div className="ix-dossier-section">
                <h3>À proximité</h3>
                <ul className="ix-proximity-list">
                  {terrain.proximity.map((p, i) => (
                    <li key={i}>
                      <span className="ix-proximity-place">{p.place}</span>
                      <span className="ix-proximity-time"><FiClock /> {p.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {terrain.gallery && terrain.gallery.length > 1 && (
              <div className="ix-dossier-section">
                <h3>Galerie photos</h3>
                <div className="ix-dossier-gallery">
                  {terrain.gallery.map((img, i) => (
                    <div key={i} className="ix-gallery-item">
                      <img src={img} alt={`${terrain.title} - vue ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="ix-dossier-aside">
            <div className="ix-aside-sticky">
              <h3>Fiche terrain</h3>
              <ul className="ix-dossier-facts">
                <li>
                  <FiMapPin aria-hidden="true" /> {terrain.location}
                </li>
                <li>
                  <FiMaximize aria-hidden="true" /> {terrain.area}
                </li>
              </ul>
              <div className="ix-aside-price-tag">
                <span className="ix-parcel-badge">{terrain.status}</span>
                <strong className="ix-dossier-price">{terrain.price}</strong>
              </div>

              <div className="ix-aside-actions">
                <Link to="/contact" className="nl-btn nl-btn-mint w-full">
                  Demander une visite
                </Link>
                <p className="ix-aside-note">Accompagnement gratuit pour les formalités notariales.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SitePage>
  );
}
