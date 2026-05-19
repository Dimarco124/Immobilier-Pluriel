import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCheckCircle, FiTarget, FiActivity } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { projects } from '../data/companyData';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <SitePage label="404" title="Projet introuvable">
        <div className="ix-wrap ix-empty">
          <Link to="/portfolio" className="nl-btn nl-btn-mint">
            Retour aux réalisations
          </Link>
        </div>
      </SitePage>
    );
  }

  return (
    <SitePage label={project.category} title={project.title} lead={`${project.location} · ${project.year}`}>
      <div className="ix-wrap ix-dossier reveal">
        <Link to="/portfolio" className="ix-dossier-back">
          <FiArrowLeft /> Réalisations
        </Link>
        
        <div className="ix-dossier-cover">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="ix-dossier-layout">
          <div className="ix-dossier-content">
            <div className="ix-dossier-section">
              <h3>À propos du projet</h3>
              <p className="ix-dossier-text">{project.longDescription || project.description}</p>
              <p className="ix-highlight">
                <FiMapPin aria-hidden="true" /> {project.highlight}
              </p>
            </div>

            {project.keyFeatures && (
              <div className="ix-dossier-section">
                <h3>Spécificités techniques</h3>
                <ul className="ix-checklist">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i}>
                      <FiCheckCircle aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && (
              <div className="ix-dossier-section">
                <h3>Impact & Résultats</h3>
                <div className="ix-results-grid">
                  {project.results.map((r, i) => (
                    <div key={i} className="ix-result-card">
                      <div className="ix-result-icon">
                        {i === 0 && <FiTarget />}
                        {i === 1 && <FiActivity />}
                        {i === 2 && <FiCheckCircle />}
                      </div>
                      <p>{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.gallery && project.gallery.length > 1 && (
              <div className="ix-dossier-section">
                <h3>Galerie du projet</h3>
                <div className="ix-dossier-gallery">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="ix-gallery-item">
                      <img src={img} alt={`${project.title} - photo ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ix-dossier-section" style={{ marginTop: '48px' }}>
              <div className="ix-cta-box">
                <h3>Vous avez un projet similaire ?</h3>
                <p>Nos experts vous accompagnent de la conception à la réalisation.</p>
                <Link to="/contact" className="nl-btn nl-btn-mint">
                  Parlons de votre projet
                </Link>
              </div>
            </div>
          </div>

          <aside className="ix-dossier-aside">
            <div className="ix-aside-sticky">
              <h3>Détails</h3>
              <ul className="ix-dossier-facts">
                <li>
                  <strong>Client :</strong> Particuliers & Collectivités
                </li>
                <li>
                  <strong>Lieu :</strong> {project.location}
                </li>
                <li>
                  <strong>Année :</strong> {project.year}
                </li>
                <li>
                  <strong>Secteur :</strong> {project.category}
                </li>
              </ul>
              
              <div className="ix-aside-badge-list">
                <span className="ix-parcel-badge">Réalisation terminée</span>
                <span className="ix-parcel-badge">Qualité Premium</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SitePage>
  );
}
