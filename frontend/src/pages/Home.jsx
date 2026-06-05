import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiMapPin, FiMaximize, FiCalendar, FiClock, FiMessageCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  company as fallbackCompany,
  services as fallbackServices,
  projects as fallbackProjects,
  visionStats as fallbackVisionStats,
  visionQuote as fallbackVisionQuote,
  news as fallbackNews,
} from '../data/companyData';
import { terrains as fallbackTerrains } from '../data/terrainsData';
import { getCompanyInfo, getHeroSlides, getNews, getProjects, getServices, getTerrains, getVision, getImageUrl, getTestimonials } from '../services/api';
import Loader from '../components/Loader';

const fallbackHeroSlides = [
  {
    image: getImageUrl('/images/bannieres/hero-default.jpg'),
    title: 'Aménager le territoire avec vision et nature',
  },
  {
    image: '/images/bannieres/viabiliser.png',
    title: "Des terrains viabilisés, une nature préservée",
  },
  {
    image: '/images/bannieres/yooooo.png',
    title: (
      <>
        Bâtir aujourd&apos;hui,
        <br />
        penser demain.
      </>
    ),
  },
];

const atelierImage = '/images/photo-95cf3dfb.jpg';

function Counter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = (node) => {
    if (node !== null && !started) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
    }
  };

  useEffect(() => {
    if (!started) return;

    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setCount(end || 0);
      return;
    }

    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentCount = Math.floor(easedProgress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [started, value, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroSlides, setHeroSlides] = useState(fallbackHeroSlides);
  const [company, setCompany] = useState(fallbackCompany);
  const [services, setServices] = useState(fallbackServices);
  const [projects, setProjects] = useState(fallbackProjects);
  const [news, setNews] = useState(fallbackNews);
  const [featuredTerrains, setFeaturedTerrains] = useState(fallbackTerrains.slice(0, 5));
  const [promoTerrains, setPromoTerrains] = useState(fallbackTerrains.slice(0, 6));
  const [visionStats, setVisionStats] = useState(fallbackVisionStats);
  const [visionQuote, setVisionQuote] = useState(fallbackVisionQuote);

  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    // Charger les hero slides
    getHeroSlides()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHeroSlides(res.data.map((slide) => ({
            image: slide.image_url,
            title: slide.title,
          })));
        }
      })
      .catch(() => {
        // Garder les fallback slides en cas d'erreur
      });

    // Charger les infos de l'entreprise
    getCompanyInfo()
      .then((res) => {
        if (res.data) {
          setCompany(res.data);
        }
      })
      .catch(() => {
        // Garder les fallback company en cas d'erreur
      });

    // Charger les services
    getServices()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        }
      })
      .catch(() => {
        // Garder les fallback services en cas d'erreur
      });

    // Charger les projets avec loader
    setLoadingProjects(true);
    getProjects({ per_page: 100, sort: 'latest' })
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setProjects(res.data.data);
        }
      })
      .catch(() => {
        // Garder les fallback projects en cas d'erreur
      })
      .finally(() => {
        setLoadingProjects(false);
      });

    // Charger les actualités avec loader
    setLoadingNews(true);
    getNews({ per_page: 3 })
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setNews(res.data.data);
        }
      })
      .catch(() => {
        // Garder les fallback news en cas d'erreur
      })
      .finally(() => {
        setLoadingNews(false);
      });

    // Charger les terrains en vedette avec loader
    setLoadingFeatured(true);
    getTerrains({ featured: true, per_page: 5 })
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setFeaturedTerrains(res.data.data);
        }
      })
      .catch(() => {
        // Garder les fallback terrains en cas d'erreur
      })
      .finally(() => {
        setLoadingFeatured(false);
      });

    // Charger les terrains en promotion avec loader
    setLoadingPromo(true);
    getTerrains({ is_promotion: true, sort: 'latest', per_page: 6 })
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setPromoTerrains(res.data.data);
        }
      })
      .catch(() => {
        // Garder les fallback terrains en cas d'erreur
      })
      .finally(() => {
        setLoadingPromo(false);
      });

    // Charger la vision
    getVision()
      .then((res) => {
        if (res.data.stats && res.data.stats.length > 0) {
          setVisionStats(res.data.stats);
        }
        if (res.data.section) {
          setVisionQuote({
            text: res.data.section.quote_text,
            author: res.data.section.quote_author,
            role: res.data.section.quote_role,
            image: res.data.section.quote_image_url,
          });
        }
      })
      .catch(() => {
        // Garder les fallback vision en cas d'erreur
      });

    // Charger les témoignages
    setLoadingTestimonials(true);
    getTestimonials()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        }
      })
      .catch(() => {
        // Ignorer en cas d'erreur
      })
      .finally(() => {
        setLoadingTestimonials(false);
      });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const [featuredTerrain] = featuredTerrains;
  const latestPromoTerrain = promoTerrains[0] || featuredTerrains[0] || fallbackTerrains[0];
  const showcaseProject = [...projects]
    .sort((a, b) => {
      const dateA = new Date(a.date || a.year || a.created_at || 0);
      const dateB = new Date(b.date || b.year || b.created_at || 0);
      return dateB - dateA;
    })[0] || fallbackProjects[0];

  return (
    <div className="landing-page">
      <section className="nl-hero" id="accueil">
        <div className="nl-hero-media">
          {heroSlides.map((slide, index) => (
            <article
              key={`${slide.image}-${index}`}
              className={`nl-hero-slide${index === heroIndex ? ' is-active' : ''}`}
              aria-hidden={index !== heroIndex}
            >
              <img src={getImageUrl(slide.image)} alt="" draggable={false} />
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
                  key={`${slide.image}-${index}`}
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
            <span className="nl-hero-card-tag">Promotion</span>
            <h3>Opportunité du moment</h3>
            <p>
              <strong>{latestPromoTerrain?.title}</strong>
              <br />
              {latestPromoTerrain?.location}
            </p>
            <Link to={`/terrains/${latestPromoTerrain?.id}`} className="nl-btn nl-btn-outline">
              Voir le terrain
            </Link>
          </aside>
        </div>
      </section>

      <section className="nl-manifest" id="decouvrir" aria-labelledby="manifest-title">
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
                      <Counter value={stat.value} />
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
                  <img src={getImageUrl(visionQuote.image)} alt="" width={56} height={56} loading="lazy" />
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

          {loadingFeatured ? (
            <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          ) : (
            <div className="nl-home-parcel-grid reveal">
              {featuredTerrains.map((terrain) => (
                <Link key={terrain.id} to={`/terrains/${terrain.id}`} className="nl-home-parcel">
                  <img src={getImageUrl(terrain.image_url || terrain.image)} alt={terrain.title} loading="lazy" />
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
          )}

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
                            <img src={getImageUrl(item.image_url || item.image)} alt={item.title} loading="lazy" />
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

            {loadingProjects ? (
              <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
                <Loader />
              </div>
            ) : (
              <div className="nl-atelier-spotlight reveal reveal-delay-2">
                <div className="nl-atelier-spotlight-media">
                  <img src={showcaseProject.image_url || showcaseProject.image} alt="" loading="lazy" />
                </div>
                <div className="nl-atelier-spotlight-copy">
                  <div className="nl-spotlight-header">
                    <span className="nl-atelier-spotlight-label">Réalisation récente</span>
                    <span className="nl-spotlight-year">{showcaseProject.year}</span>
                  </div>
                  <h3>{showcaseProject.title}</h3>
                  <p>{showcaseProject.description}</p>
                  <div className="nl-spotlight-footer">
                    <Link to={`/portfolio/${showcaseProject.slug || showcaseProject.id}`} className="nl-atelier-spotlight-link">
                      Voir le dossier complet <FiArrowUpRight />
                    </Link>
                  </div>
                </div>
              </div>
            )}

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
                <a href="/contact#google-map" className="nl-btn nl-btn-white-outline">
                  <FiMapPin /> Voir notre localisation
                </a>
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
            <img src={featuredTerrain.image_url || featuredTerrain.image} alt={featuredTerrain.title} loading="lazy" />
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

          {loadingPromo ? (
            <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          ) : (
            <div className="nl-lands-promo-slider-container reveal reveal-delay-1">
              <div className="nl-lands-promo-track">
                {promoTerrains.slice(0, 6).map((terrain, index) => (
                  <Link key={`${terrain.id}-${index}`} to={`/terrains/${terrain.id}`} className="nl-lands-tile nl-lands-tile--promo">
                    <img src={terrain.image_url || terrain.image} alt={terrain.title} loading="lazy" />
                    <div className="nl-lands-tile-cap">
                      <span className="nl-lands-tile-tag">Promo</span>
                      <h3>{terrain.title}</h3>
                      <div className="nl-lands-tile-prices">
                        <span className="nl-lands-tile-price-new">{terrain.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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

          {loadingNews ? (
            <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          ) : (
            <div className="nl-home-news-grid reveal reveal-delay-1">
              {news.slice(0, 3).map((item) => (
                <Link key={item.slug || item.id} to={`/news/${item.slug || item.id}`} className="nl-news-card-home">
                  <div className="nl-news-card-img">
                    <img src={item.image_url || item.image} alt={item.title} loading="lazy" />
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
          )}

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/news" className="nl-btn nl-btn-outline">
              Toutes les actualités
            </Link>
          </div>
        </div>
      </section>

      <section className="nl-home-testimonials" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="ix-wrap">
          <header className="nl-lands-head reveal">
            <span className="nl-section-label">Témoignages</span>
            <h2 id="testimonials-title">
              Ce que disent
              <br />
              <em>nos clients</em>
            </h2>
            <p>Leur satisfaction est notre plus belle réussite et la preuve de notre engagement.</p>
          </header>

          {loadingTestimonials ? (
            <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          ) : testimonials.length > 0 ? (
            <div className="nl-testimonials-carousel-wrapper reveal reveal-delay-1">
              <div className="nl-testimonials-info">
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#666', margin: 0 }}>
                  Découvrez les retours d'expérience de nos acquéreurs et partenaires qui nous font confiance pour leurs investissements fonciers et immobiliers.
                </p>
                <div className="nl-testimonials-nav">
                  <button
                    onClick={handlePrevTestimonial}
                    className="nl-testimonials-nav-btn"
                    aria-label="Témoignage précédent"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="nl-testimonials-nav-btn"
                    aria-label="Témoignage suivant"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="nl-testimonials-carousel-container">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === activeTestimonial;
                  return (
                    <div
                      key={testimonial.id}
                      className={`nl-testimonial-card-slide${isActive ? ' is-active' : ''}`}
                    >
                      <div>
                        <div className="nl-testimonial-quote-icon">“</div>
                        <p className="nl-testimonial-text">"{testimonial.content}"</p>
                      </div>
                      
                      <div className="nl-testimonial-client">
                        {testimonial.image_url ? (
                          <img
                            src={getImageUrl(testimonial.image_url)}
                            alt={testimonial.name}
                            className="nl-testimonial-avatar"
                            loading="lazy"
                          />
                        ) : (
                          <div className="nl-testimonial-avatar-placeholder">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                        <div className="nl-testimonial-client-info">
                          <h4>{testimonial.name}</h4>
                          <span>{testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {testimonials.length > 1 && (
            <div className="nl-testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`nl-testimonials-dot${index === activeTestimonial ? ' is-active' : ''}`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
