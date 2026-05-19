import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { company, principles, team } from '../data/companyData';

const milestones = [
  { year: '2009', title: 'Création du groupe', text: "Début des activités sur le foncier et l'aménagement." },
  { year: '2016', title: 'Extension régionale', text: 'Ouverture de nouveaux pôles pour les grands projets.' },
  { year: '2021', title: 'Diversification', text: 'Hôtellerie, métal et agro-industrie.' },
  { year: '2026', title: 'Vision intégrée', text: 'Une offre complète pour le territoire.' },
];

export default function AboutUs() {
  return (
    <SitePage
      label="Équipe"
      title={company.name}
      lead="Une entreprise qui conçoit, équipe et transforme les territoires en espaces utiles et durables."
    >
      <div className="ix-panorama reveal">
        <img src="/images/photo-95cf3dfb.jpg" alt="Aménagement territorial" loading="lazy" />
      </div>

      <section className="ix-chapter reveal">
        <div className="ix-wrap">
          <span className="ix-chapter-num">01</span>
          <div className="ix-duo">
            <div>
              <span className="nl-section-label">Mission</span>
              <h2>Rendre les projets lisibles, faisables et durables</h2>
              <p>
                Nous intervenons sur le foncier, la voirie, les bâtiments et les activités de production
                pour des projets cohérents de bout en bout.
              </p>
            </div>
            <div>
              <span className="nl-section-label">Vision</span>
              <h2>Construire des quartiers, des activités et des opportunités</h2>
              <p>
                Chaque opération crée de la valeur pour les habitants, les investisseurs et les
                collectivités.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ix-chapter ix-chapter--dark reveal">
        <div className="ix-wrap">
          <span className="ix-chapter-num">02</span>
          <span className="nl-section-label nl-section-label--light">Parcours</span>
          <h2>Notre histoire</h2>
          <div className="ix-scroll-years">
            {milestones.map((m) => (
              <article key={m.year} className="ix-year-card">
                <strong>{m.year}</strong>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ix-chapter reveal">
        <div className="ix-wrap">
          <span className="ix-chapter-num">03</span>
          <span className="nl-section-label">Valeurs</span>
          <h2>Nos principes</h2>
          <ul className="ix-principles">
            {principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ix-chapter reveal">
        <div className="ix-wrap">
          <span className="ix-chapter-num">04</span>
          <span className="nl-section-label">Humain</span>
          <h2>L&apos;équipe</h2>
          <p>Des experts terrain, ingénieurs et gestionnaires au service de vos projets.</p>
          <div className="ix-team-row">
            {team.map((person) => (
              <article key={person.name} className="ix-team-card">
                <img src={person.image} alt={person.name} loading="lazy" />
                <div>
                  <h3>{person.name}</h3>
                  <span>{person.role}</span>
                  <p>{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link to="/contact" className="nl-btn nl-btn-mint">
              Rencontrer l&apos;équipe <FiArrowRight />
            </Link>
          </p>
        </div>
      </section>
    </SitePage>
  );
}
