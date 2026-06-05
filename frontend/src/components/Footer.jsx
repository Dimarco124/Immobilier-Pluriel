import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaPinterestP, FaTiktok } from 'react-icons/fa6';
import { company as fallbackCompany, contactInfo as fallbackContactInfo, socialLinks as fallbackSocialLinks } from '../data/companyData';
import { getCompanyInfo, getContactInfo, getSocialLinks } from '../services/api';

export default function Footer() {
  const [company, setCompany] = useState(fallbackCompany);
  const [contactInfo, setContactInfo] = useState(fallbackContactInfo);
  const [socialLinks, setSocialLinks] = useState(fallbackSocialLinks);

  useEffect(() => {
    getCompanyInfo().then((res) => setCompany(res.data || fallbackCompany)).catch(() => setCompany(fallbackCompany));
    getContactInfo().then((res) => setContactInfo(res.data.length ? res.data : fallbackContactInfo)).catch(() => setContactInfo(fallbackContactInfo));
    getSocialLinks()
      .then((res) => {
        const mapped = { ...fallbackSocialLinks };
        res.data.forEach((item) => {
          mapped[item.platform] = item.url;
        });
        setSocialLinks(mapped);
      })
      .catch(() => setSocialLinks(fallbackSocialLinks));
  }, []);

  return (
    <footer className="nl-footer">
      <div className="nl-footer-upper">
        <div className="ix-wrap">
          <div className="nl-footer-main-grid">
            <div className="nl-footer-brand-box">
              <Link to="/" className="nl-footer-logo-link">
                <div className="nl-footer-logo-wrapper">
                  <img src="/images/logo_immobilier.png" alt="Immobilier Pluriel" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                </div>
              </Link>
              <p className="nl-footer-description">
                Expert en aménagement foncier et promotion immobilière. Nous bâtissons les fondations de vos projets de vie avec rigueur et vision à long terme.
              </p>
              <div className="nl-footer-social-strip">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              </div>
            </div>

            <div className="nl-footer-links-group">
              <div className="nl-footer-nav-col">
                <h4>Navigation</h4>
                <nav>
                  <Link to="/">Accueil</Link>
                  <Link to="/about-us">Notre Expertise</Link>
                  <Link to="/services">Services</Link>
                  <Link to="/terrains">Catalogue Terrains</Link>
                  <Link to="/portfolio">Réalisations</Link>
                </nav>
              </div>

              <div className="nl-footer-nav-col">
                <h4>Support</h4>
                <nav>
                  <Link to="/news">Actualités</Link>
                  <Link to="/contact">Contactez-nous</Link>
                  <Link to="/team">Notre équipe</Link>
                  <Link to="/legal">Mentions légales</Link>
                  <Link to="/privacy">Politique de confidentialité</Link>
                </nav>
              </div>
            </div>

            <div className="nl-footer-contact-box">
              <h4>Contact & Siège</h4>
              <div className="nl-footer-contact-details">
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiMapPin /></div>
                  <div className="nl-contact-text">
                    <strong>Adresse</strong>
                    <a
                      href="https://www.google.com/maps/search/Yamoussoukro+Quartier+Millionnaire"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nl-footer-map-link"
                    >
                      {contactInfo.find((i) => i.label === 'Adresse')?.value}
                    </a>
                  </div>
                </div>
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiPhone /></div>
                  <div className="nl-contact-text">
                    <strong>Téléphone</strong>
                    {(() => {
                      const val = contactInfo.find((i) => i.label === 'Téléphone' || i.label === 'Telephone')?.value;
                      return val ? <a href={`tel:${val.replace(/\s+/g, '')}`}>{val}</a> : <span>-</span>;
                    })()}
                  </div>
                </div>
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiMail /></div>
                  <div className="nl-contact-text">
                    <strong>Email</strong>
                    {(() => {
                      const val = contactInfo.find((i) => i.label === 'Email')?.value;
                      return val ? <a href={`mailto:${val}`}>{val}</a> : <span>-</span>;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nl-footer-lower">
        <div className="ix-wrap">
          <div className="nl-footer-bottom-flex">
            <div className="nl-copyright">
              © {new Date().getFullYear()} <strong>{company.name}</strong>. Tous droits réservés.
            </div>
            <div className="nl-creator-credit">
              Propulsé par{' '}
              <a href={socialLinks.creator.whatsapp} target="_blank" rel="noopener noreferrer">
                {socialLinks.creator.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
