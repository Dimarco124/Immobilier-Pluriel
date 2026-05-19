import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaPinterestP, FaTiktok } from 'react-icons/fa6';
import { company, contactInfo, socialLinks } from '../data/companyData';

export default function Footer() {
  return (
    <footer className="nl-footer">
      <div className="nl-footer-upper">
        <div className="ix-wrap">
          <div className="nl-footer-main-grid">
            <div className="nl-footer-brand-box">
              <Link to="/" className="nl-footer-logo-link">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C9 6 6 7 6 10c0 2 1.5 3.5 3 4.5V22h6v-7.5c1.5-1 3-2.5 3-4.5 0-3-3-4-6-8z" />
                </svg>
                <span className="nl-brand-name">{company.name}</span>
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
                  <Link to="/faq">Questions fréquentes</Link>
                  <Link to="/legal">Mentions légales</Link>
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
                    <span>{contactInfo.find((i) => i.label === 'Adresse')?.value}</span>
                  </div>
                </div>
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiPhone /></div>
                  <div className="nl-contact-text">
                    <strong>Téléphone</strong>
                    <span>{contactInfo.find((i) => i.label === 'Téléphone')?.value}</span>
                  </div>
                </div>
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiMail /></div>
                  <div className="nl-contact-text">
                    <strong>Email</strong>
                    <span>{contactInfo.find((i) => i.label === 'Email')?.value}</span>
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
