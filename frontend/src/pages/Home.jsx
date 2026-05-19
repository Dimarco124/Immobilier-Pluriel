import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiMapPin, FiMaximize, FiCalendar, FiClock, FiMessageCircle } from 'react-icons/fi';
import { company, services, projects, visionStats, visionQuote, news } from '../data/companyData';
import { terrains } from '../data/terrainsData';

const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Aménager le territoire avec vision et nature',
  },
  {
    image: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: "Des terrains viabilisés au cœur de paysages d'exception",
  },
  {
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Construire durablement pour les générations futures',
  },
];

const atelierImage = '/images/photo-95cf3dfb.jpg';
const showcaseProject = projects[0];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const [featuredTerrain, ...otherTerrains] = terrains;

  return (
    <div className="landing-page">
      <section className="nl-hero" id="accueil">
        <div className="nl-hero-media">
          {heroSlides.map((slide, index) => (
            <article
              key={slide.image}
              className={`nl-hero-slide${index === heroIndex ? ' is-active' : ''}`}
              aria-hidden={index !== heroIndex}
            >
              <img src={slide.image} alt="" draggable={false} />
            </article>
          ))}
          <div className="nl-hero-overlay" aria-hidden="true" />
        </div>

        <div className="nl-hero-inner">
          <div className="nl-hero-content">
            <p className="nl-hero-kicker">Immobilier & aménagement</p>
            <h1 key={heroIndex} className="nl-hero-title-animate">
              {heroSlides[heroIndex].title}
            </h1>
            <p className="nl-hero-lead">{company.description}</p>
            <Link to="/terrains" className="nl-btn nl-btn-white">
              Explorer nos terrains
            </Link>
            <div className="nl-hero-dots" aria-label="Navigation du carrousel">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={index === heroIndex ? 'is-active' : ''}
                  onClick={() => setHeroIndex(index)}
                  aria-label={`Image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <aside className="nl-hero-card">
            <div className="nl-hero-card-icon" aria-hidden="true">
              <span className="nl-hero-card-dot" />
            </div>
            <h3>Opportunité du moment</h3>
            <p>
              <strong>{terrains[0].title}</strong>
              <br />
              {terrains[0].location}
            </p>
            <Link to={`/terrains/${terrains[0].id}`} className="nl-btn nl-btn-outline">
              Voir le terrain
            </Link>
          </aside>
        </div>
      </section>

      <section className="nl-manifest" id="decouvrir" aria-labelledby="manifest-title">
        <div className="nl-manifest-watermark" aria-hidden="true">
          {visionStats[0].value}
        </div>
        <div className="nl-manifest-inner">
          <div className="nl-manifest-grid reveal">
            <div className="nl-manifest-copy">
              <span className="nl-section-label">Notre vision</span>
              <h2 id="manifest-title">
                Le territoire
                <br />
                <em>comme projet</em> de long terme
              </h2>
              <p>{company.tagline}</p>
              <p className="nl-manifest-lead">
                De l&apos;étude foncière à la livraison des réseaux, nous orchestrons chaque étape pour
                des quartiers, des routes et des activités qui tiennent dans le temps.
              </p>
              <div className="nl-manifest-ticker" aria-label="Indicateurs clés">
                {visionStats.map((stat, i) => (
                  <div key={stat.label} className="nl-manifest-ticker-item">
                    <span className="nl-manifest-ticker-value">
                      <span>{stat.value}</span>
                      {stat.suffix}
                    </span>
                    <span className="nl-manifest-ticker-label">{stat.label}</span>
                    {i < visionStats.length - 1 && (
                      <span className="nl-manifest-ticker-sep" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <aside className="nl-manifest-voice reveal reveal-delay-1">
              <div className="nl-manifest-voice-inner">
                <p className="nl-manifest-quote">{visionQuote.text}</p>
                <footer className="nl-manifest-author">
                  <img src={visionQuote.image} alt="" width={56} height={56} loading="lazy" />
                  <div>
                    <strong>{visionQuote.author}</strong>
                    <span>{visionQuote.role}</span>
                  </div>
                </footer>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="nl-new-terrains" style={{ padding: '80px 0', background: '#fff' }}>
        <div className="ix-wrap">
          <header className="nl-lands-head reveal">
            <span className="nl-section-label">Nouveautés</span>
            <h2 id="new-lands-title">
              Découvrez nos
              <br />
              <em>Dernières Opportunités</em>
            </h2>
            <p>Une sélection exclusive de nos nouveaux terrains récemment mis sur le marché.</p>
          </header>

          <div className="nl-home-parcel-grid reveal">
            {terrains.slice(0, 5).map((terrain) => (
              <Link key={terrain.id} to={`/terrains/${terrain.id}`} className="nl-home-parcel">
                <img src={terrain.image} alt={terrain.title} loading="lazy" />
                <span className="ix-parcel-badge">{terrain.status}</span>
                <div className="ix-parcel-cap">
                  <h3>{terrain.title}</h3>
                  <p className="ix-parcel-meta">
                    <span>
                      <FiMapPin aria-hidden="true" /> {terrain.location}
                    </span>
                    <span>
                      <FiMaximize aria-hidden="true" /> {terrain.area}
                    </span>
                  </p>
                  <span className="ix-parcel-price">{terrain.price}</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/terrains" className="nl-btn nl-btn-mint">
              Voir tout le catalogue <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="nl-atelier" id="services" aria-labelledby="atelier-title">
        <div className="nl-atelier-hero reveal">
          <img src={atelierImage} alt="" loading="lazy" />
          <div className="nl-atelier-hero-overlay" aria-hidden="true" />
          <div className="nl-atelier-hero-text">
            <span className="nl-section-label nl-section-label--light">Savoir-faire</span>
            <h2 id="atelier-title">Huit métiers, une seule chaîne de valeur</h2>
          </div>
        </div>

        <div className="nl-atelier-body">
          <div className="nl-atelier-inner">
            <div className="nl-services-marquee reveal" aria-label="Nos huit services">
              <div className="nl-services-marquee-track">
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    className="nl-services-marquee-group"
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {services.map((item) => (
                      <li key={`${copy}-${item.title}`}>
                        <figure className="nl-services-marquee-card">
                          <div className="nl-services-marquee-img">
                            <img src={item.image} alt={item.title} loading="lazy" />
                          </div>
                          <figcaption className="nl-services-marquee-title">{item.title}</figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <p className="nl-services-marquee-foot reveal reveal-delay-1">
              <Link to="/services" className="nl-link-arrow">
                En savoir plus sur nos activités <FiArrowRight />
              </Link>
            </p>

            <header className="nl-lands-head reveal" style={{ marginTop: '100px' }}>
              <span className="nl-section-label">Réalisations</span>
              <h2 id="projects-title">
                L&apos;expertise
                <br />
                <em>en action</em> sur le terrain
              </h2>
              <p>Chaque projet est une preuve de notre engagement pour un aménagement durable et de qualité.</p>
            </header>

            <div className="nl-atelier-spotlight reveal reveal-delay-2">
              <div className="nl-atelier-spotlight-media">
                <img src={showcaseProject.image} alt="" loading="lazy" />
                {showcaseProject.results && (
                  <div className="nl-atelier-spotlight-results">
                    {showcaseProject.results.slice(0, 2).map((res, idx) => (
                      <span key={idx} className="nl-result-badge">{res}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="nl-atelier-spotlight-copy">
                <div className="nl-spotlight-header">
                  <span className="nl-atelier-spotlight-label">Réalisation récente</span>
                  <span className="nl-spotlight-year">{showcaseProject.year}</span>
                </div>
                <h3>{showcaseProject.title}</h3>
                <p>{showcaseProject.description}</p>
                <div className="nl-spotlight-footer">
                  <Link to={`/portfolio/${showcaseProject.id}`} className="nl-atelier-spotlight-link">
                    Voir le dossier complet <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px' }} className="reveal">
              <Link to="/portfolio" className="nl-btn nl-btn-mint">
                Découvrir toutes nos réalisations <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="nl-home-cta-promo reveal">
        <div className="ix-wrap">
          <div className="nl-cta-promo-box">
            <div className="nl-cta-promo-content">
              <span className="nl-cta-label">Votre Avenir Immobilier</span>
              <h2>Investissez en toute sérénité avec Immobilier Pluriel</h2>
              <p>Nous vous accompagnons dans l&apos;acquisition de parcelles stratégiques, entièrement viabilisées et juridiquement sécurisées pour vos projets de vie.</p>
              <div className="nl-cta-actions">
                <Link to="/terrains" className="nl-btn nl-btn-mint">
                  Découvrir nos terrains
                </Link>
                <Link to="/contact" className="nl-btn nl-btn-white-outline">
                  <FiMessageCircle /> Demander un conseil
                </Link>
              </div>
            </div>
            <div className="nl-cta-promo-stats">
              <div className="nl-cta-stat">
                <strong>ACD</strong>
                <span>Titres Sécurisés</span>
              </div>
              <div className="nl-cta-stat">
                <strong>100%</strong>
                <span>Expertise Foncière</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nl-lands" id="terrains" aria-labelledby="lands-title">
        <div className="nl-lands-inner">
          <header className="nl-lands-head reveal">
            <span className="nl-section-label">Notre Sélection</span>
            <h2 id="lands-title">
              Opportunités
              <br />
              <em>Immobilières</em>
            </h2>
            <p>Découvrez notre sélection exclusive de parcelles prêtes à bâtir dans les zones à forte croissance.</p>
          </header>

          <Link to={`/terrains/${featuredTerrain.id}`} className="nl-lands-featured reveal">
            <img src={featuredTerrain.image} alt={featuredTerrain.title} loading="lazy" />
            <div className="nl-lands-featured-cap">
              <span className="nl-lands-tag nl-lands-tag--promo">Sélection d&apos;Exception</span>
              <h3>{featuredTerrain.title}</h3>
              <p>
                <FiMapPin aria-hidden="true" /> {featuredTerrain.location} · {featuredTerrain.area}
              </p>
              <div className="nl-lands-price-box">
                <strong className="nl-lands-price-new">{featuredTerrain.price}</strong>
              </div>
            </div>
          </Link>

          <div className="nl-lands-promo-slider-container reveal reveal-delay-1">
            <div className="nl-lands-promo-track">
              {[...terrains.slice(0, 6), ...terrains.slice(0, 6)].map((terrain, index) => (
                <Link key={`${terrain.id}-${index}`} to={`/terrains/${terrain.id}`} className="nl-lands-tile nl-lands-tile--promo">
                  <img src={terrain.image} alt={terrain.title} loading="lazy" />
                  <div className="nl-lands-tile-cap">
                    <span className="nl-lands-tile-tag">Opportunité</span>
                    <h3>{terrain.title}</h3>
                    <div className="nl-lands-tile-prices">
                      <span className="nl-lands-tile-price-new">{terrain.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <p className="nl-lands-foot reveal reveal-delay-2">
            <Link to="/terrains" className="nl-btn nl-btn-mint">
              Voir toutes nos offres <FiArrowRight />
            </Link>
          </p>
        </div>
      </section>

      <section className="nl-home-news" style={{ padding: '100px 0', background: '#f9fbfc' }}>
        <div className="ix-wrap">
          <header className="nl-lands-head reveal">
            <span className="nl-section-label">Actualités</span>
            <h2 id="news-title">
              Suivez notre
              <br />
              <em>Actualité</em>
            </h2>
            <p>Découvrez les derniers projets, signatures d&apos;accords et innovations du groupe.</p>
          </header>

          <div className="nl-home-news-grid reveal reveal-delay-1">
            {news.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="nl-news-card-home">
                <div className="nl-news-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="nl-news-card-cat">{item.category}</span>
                </div>
                <div className="nl-news-card-content">
                  <div className="nl-news-card-meta">
                    <span><FiCalendar /> {item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="nl-news-card-link">Lire la suite <FiArrowRight /></span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/news" className="nl-btn nl-btn-outline">
              Toutes les actualités
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
