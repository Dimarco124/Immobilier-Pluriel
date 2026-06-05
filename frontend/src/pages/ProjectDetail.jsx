import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCheckCircle, FiTarget, FiActivity, FiPlay, FiCalendar, FiTag, FiAward, FiArrowRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { projects } from '../data/companyData';
import { getProject, getImageUrl } from '../services/api';
import '../styles/pages/DetailPages.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const fallbackProject = projects.find((p) => p.id === id);
  const [project, setProject] = useState(fallbackProject);

  useEffect(() => {
    getProject(id)
      .then((response) => setProject(response.data))
      .catch(() => setProject(fallbackProject));
  }, [id]);

  if (!project) {
    return (
      <SitePage label="404" title="Projet introuvable">
        <div className="ix-wrap">
          <div className="ix-empty-state">
            <p>Ce projet n'existe pas.</p>
            <Link to="/portfolio" className="nl-btn nl-btn-mint">Voir toutes les réalisations</Link>
          </div>
        </div>
      </SitePage>
    );
  }

  const videoUrl = project.video_url || project.videoUrl;
  const imageUrl = getImageUrl(project.image_url || project.image);
  const keyFeatures = project.key_features || project.keyFeatures || [];
  const gallery = project.gallery || [];

  return (
    <SitePage label={project.category} title={project.title} lead={`${project.location} · ${project.year}`}>
      <div className="ix-wrap">
        <Link to="/portfolio" className="ix-back-link">
          <FiArrowLeft /> Réalisations
        </Link>

        {/* Image principale */}
        <div className="ix-panorama reveal" style={{ marginBottom: '40px', aspectRatio: '21/9', borderRadius: 0 }}>
          <img src={imageUrl} alt={project.title} />
        </div>

        {/* Badges */}
        <div className="ix-badges reveal" style={{ marginBottom: '32px' }}>
          <span className="ix-badge"><FiTag /> {project.category}</span>
          <span className="ix-badge"><FiCalendar /> {project.year}</span>
          <span className="ix-badge"><FiMapPin /> {project.location}</span>
        </div>

        {/* Layout principal */}
        <div className="ix-duo reveal">
          {/* Colonne gauche - Contenu */}
          <div className="ix-detail-content">
            {/* Vidéo */}
            {videoUrl && (
              <section className="ix-chapter">
                <div className="ix-video-container">
                  <iframe
                    src={videoUrl}
                    title="Vidéo du projet"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            {/* Description */}
            <section className="ix-chapter">
              <h2>Le projet en détails</h2>
              <p>{project.long_description || project.longDescription || project.description}</p>
              {project.highlight && (
                <div className="ix-highlight-box">
                  <FiMapPin style={{ color: 'var(--nl-turquoise)' }} />
                  <span>{project.highlight}</span>
                </div>
              )}
            </section>

            {/* Caractéristiques */}
            {keyFeatures.length > 0 && (
              <section className="ix-chapter">
                <h2>Spécificités</h2>
                <ul className="ix-list">
                  {keyFeatures.map((f, i) => (
                    <li key={i}>
                      <FiCheckCircle style={{ color: 'var(--nl-turquoise)', marginRight: '10px' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Résultats */}
            {project.results?.length > 0 && (
              <section className="ix-chapter">
                <h2>Impact & Résultats</h2>
                <div className="ix-results">
                  {project.results.map((r, i) => (
                    <div key={i} className="ix-result-item">
                      <div className="ix-result-icon">
                        {i === 0 ? <FiTarget /> : i === 1 ? <FiActivity /> : <FiCheckCircle />}
                      </div>
                      <p>{r}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Galerie */}
            {gallery.length > 1 && (
              <section className="ix-chapter">
                <h2>Photos du projet</h2>
                <div className="ix-gallery-grid">
                  {gallery.map((img, i) => (
                    <div key={i} className="ix-gallery-thumb">
                      <img src={getImageUrl(img)} alt={`${project.title} ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne droite - Sidebar */}
          <aside className="ix-detail-side">
            <div className="ix-side-card">
              <h3>Fiche projet</h3>
              <div className="ix-side-info">
                <div className="ix-side-row">
                  <FiAward style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Client</span>
                    <strong>Particuliers & Collectivités</strong>
                  </div>
                </div>
                <div className="ix-side-row">
                  <FiMapPin style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Localisation</span>
                    <strong>{project.location}</strong>
                  </div>
                </div>
                <div className="ix-side-row">
                  <FiCalendar style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Année</span>
                    <strong>{project.year}</strong>
                  </div>
                </div>
                <div className="ix-side-row">
                  <FiTag style={{ color: 'var(--nl-turquoise)' }} />
                  <div>
                    <span className="ix-side-label">Secteur</span>
                    <strong>{project.category}</strong>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="nl-btn nl-btn-mint" style={{ width: '100%', marginTop: '20px' }}>
                Discuter de votre projet
              </Link>
              <Link to="/portfolio" className="nl-btn nl-btn-outline" style={{ width: '100%', marginTop: '10px' }}>
                Autres réalisations
              </Link>
            </div>
          </aside>
        </div>

        {/* CTA */}
        <section className="ix-cta-strip reveal" style={{ borderRadius: 'var(--nl-radius)', margin: '60px 0' }}>
          <div className="ix-wrap">
            <h2>Un projet similaire ?</h2>
            <p>Notre équipe vous accompagne de l'étude à la réalisation.</p>
            <Link to="/contact" className="nl-btn nl-btn-white">
              Nous contacter <FiArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </SitePage>
  );
}
