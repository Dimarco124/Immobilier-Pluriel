import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { services } from '../data/companyData';

export default function Services() {
  return (
    <SitePage
      label="Services"
      title="Une offre intégrée pour valoriser chaque mètre carré"
      lead="Huit pôles d'expertise couvrant la chaîne de valeur immobilière et territoriale."
    >
      {services.map((service, index) => (
        <article
          key={service.title}
          className={`ix-band reveal${index % 2 === 1 ? ' ix-band--flip' : ''}${index % 2 === 1 ? ' ix-band--alt' : ''}`}
        >
          <div className="ix-band-visual">
            <span className="ix-band-num">{String(index + 1).padStart(2, '0')}</span>
            <img src={service.image} alt={service.title} loading="lazy" />
          </div>
          <div className="ix-band-copy">
            <span className="nl-section-label">Service</span>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <blockquote className="ix-band-example">{service.example}</blockquote>
            <p className="ix-band-result">Résultat : {service.result}</p>
          </div>
        </article>
      ))}

      <section className="ix-cta-strip reveal">
        <div className="ix-wrap">
          <h2>Besoin d&apos;une solution sur mesure ?</h2>
          <p>Nos experts étudient votre projet et vous proposent une réponse adaptée.</p>
          <Link to="/contact" className="nl-btn nl-btn-white">
            Nous contacter <FiArrowRight />
          </Link>
        </div>
      </section>
    </SitePage>
  );
}
