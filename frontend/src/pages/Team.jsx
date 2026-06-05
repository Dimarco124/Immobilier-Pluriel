import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTarget, FiEye, FiCheckCircle } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { getTeam } from '../services/api';
import { company as fallbackCompany, principles as fallbackPrinciples, team as fallbackTeam } from '../data/companyData';
import '../modern-pages.css';
import '../styles/pages/Team.css';

export default function Team() {
  const [header, setHeader] = useState({ label: 'Notre Groupe', title: 'Expertise & Vision', lead: "Une entreprise qui conçoit, équipe et transforme les territoires en espaces utiles et durables." });
  const [companyInfo, setCompanyInfo] = useState(fallbackCompany);
  const [principles, setPrinciples] = useState(fallbackPrinciples);
  const [members, setMembers] = useState(fallbackTeam);

  useEffect(() => {
    getTeam()
      .then((response) => {
        const data = response.data;

        if (data.header) setHeader(data.header);
        if (data.company) setCompanyInfo(data.company);
        if (Array.isArray(data.principles) && data.principles.length) setPrinciples(data.principles.map((item) => item.text || item));
        if (Array.isArray(data.members) && data.members.length) setMembers(data.members);
      })
      .catch(() => {
        setHeader((current) => ({ ...current }));
        setCompanyInfo(fallbackCompany);
        setPrinciples(fallbackPrinciples);
        setMembers(fallbackTeam);
      });
  }, []);

  return (
    <SitePage label={header.label} title={header.title} lead={header.lead}>
      <div className="ix-wrap">
        <section className="ix-chapter reveal" style={{ paddingTop: '40px' }}>
          <div className="ix-duo">
            <div>
              <span className="nl-section-label">L'Entreprise</span>
              <h2 style={{ marginTop: '16px' }}>{companyInfo.name}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{companyInfo.description}</p>
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <FiTarget style={{ color: 'var(--nl-turquoise)', fontSize: '1.5rem', marginBottom: '12px' }} />
                  <h4 style={{ marginBottom: '8px' }}>Notre Mission</h4>
                  <p style={{ fontSize: '0.85rem' }}>{companyInfo.mission || 'Aménager avec rigueur pour créer des espaces de vie durables.'}</p>
                </div>
                <div>
                  <FiEye style={{ color: 'var(--nl-turquoise)', fontSize: '1.5rem', marginBottom: '12px' }} />
                  <h4 style={{ marginBottom: '8px' }}>Notre Vision</h4>
                  <p style={{ fontSize: '0.85rem' }}>{companyInfo.vision || 'Devenir la référence régionale de l’aménagement intégré.'}</p>
                </div>
              </div>
            </div>
            <div className="ix-panorama" style={{ borderRadius: 'var(--nl-radius)', height: '100%' }}>
              <img src={companyInfo.image_url || '/images/placeholder-company.jpg'} alt={companyInfo.name} />
            </div>
          </div>
        </section>

        <section className="ix-chapter reveal">
          <span className="nl-section-label">Nos Engagements</span>
          <h2 style={{ margin: '16px 0 32px' }}>Ce qui nous définit</h2>
          <div className="ix-principles">
            {principles.map((text, index) => (
              <li key={index}>
                <FiCheckCircle style={{ color: 'var(--nl-turquoise)', marginRight: '8px' }} />
                {text}
              </li>
            ))}
          </div>
        </section>

        <section className="ix-chapter reveal">
          <span className="nl-section-label">L'Humain</span>
          <h2 style={{ margin: '16px 0 40px' }}>Les visages de l'expertise</h2>
          <div className="team-grid-modern">
            {members.map((member) => (
              <article key={member.name} className="team-card-modern">
                <div className="team-image-modern">
                  <img src={member.image_url || member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="team-info-modern">
                  <span className="team-role-modern">{member.role}</span>
                  <h3 className="team-name-modern">{member.name}</h3>
                  <p className="team-bio-modern">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ix-cta-strip reveal" style={{ borderRadius: 'var(--nl-radius)', margin: '60px 0 80px' }}>
          <div className="ix-wrap">
            <h2>Prêt à lancer votre projet ?</h2>
            <p>Notre équipe pluridisciplinaire vous apporte une réponse technique et stratégique adaptée.</p>
            <Link to="/contact" className="nl-btn nl-btn-white">
              Nous contacter <FiArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </SitePage>
  );
}

