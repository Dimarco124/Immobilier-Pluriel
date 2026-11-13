import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaPinterestP, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { company as fallbackCompany, contactInfo as fallbackContactInfo, socialLinks as fallbackSocialLinks } from '../data/companyData';
import { getCompanyInfo, getContactInfo, getSocialLinks } from '../services/api';

export default function Footer() {
  const [company, setCompany] = useState(fallbackCompany);
  const [contactInfo, setContactInfo] = useState(fallbackContactInfo);
  const [socialLinks, setSocialLinks] = useState(fallbackSocialLinks);

  useEffect(() => {
    getCompanyInfo()
      .then((res) => {
        if (res.data && typeof res.data === 'object') {
          setCompany(res.data);
        }
      })
      .catch(() => setCompany(fallbackCompany));

    getContactInfo()
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setContactInfo(res.data);
        }
      })
      .catch(() => setContactInfo(fallbackContactInfo));

    getSocialLinks()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const mapped = { ...fallbackSocialLinks };
          res.data.forEach((item) => {
            if (item.platform && item.url) {
              mapped[item.platform] = item.url;
            }
          });
          setSocialLinks(mapped);
        }
      })
      .catch(() => setSocialLinks(fallbackSocialLinks));

    const handleUpdate = (e) => {
      if (e?.detail) setCompany((prev) => ({ ...prev, ...e.detail }));
    };
    window.addEventListener('company_updated', handleUpdate);
    return () => window.removeEventListener('company_updated', handleUpdate);
  }, []);

  return (
    <footer className="nl-footer">
      <div className="nl-footer-upper">
        <div className="ix-wrap">
          <div className="nl-footer-main-grid">
            <div className="nl-footer-brand-box">
              <Link to="/" className="nl-footer-logo-link">
                <div className="nl-footer-logo-wrapper">
                  <img
                    src="/images/logo_immobilier.png"
                    alt={company?.name || "Immobilier Pluriel"}
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                </div>
                <span className="nl-footer-brand-title">{company?.name || 'Immobilier Pluriel'}</span>
              </Link>
              <p className="nl-footer-description">
                {company?.description || "Expert en aménagement foncier et promotion immobilière. Nous bâtissons les fondations de vos projets de vie avec rigueur et vision à long terme."}
              </p>
              <div className="nl-footer-social-strip">
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FiInstagram />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FiFacebook />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FiLinkedin />
                  </a>
                )}
                {socialLinks.tiktok && (
                  <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <FaTiktok />
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp.startsWith('http') ? socialLinks.whatsapp : `https://wa.me/${socialLinks.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                )}
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
                    {(() => {
                      const addr = Array.isArray(contactInfo) ? contactInfo.find((i) => i.label === 'Adresse')?.value : '';
                      return addr ? (
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(addr)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nl-footer-map-link"
                        >
                          {addr}
                        </a>
                      ) : (
                        <span>-</span>
                      );
                    })()}
                  </div>
                </div>
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiPhone /></div>
                  <div className="nl-contact-text">
                    <strong>Téléphone</strong>
                    {(() => {
                      const val = Array.isArray(contactInfo) ? contactInfo.find((i) => i.label === 'Téléphone' || i.label === 'Telephone')?.value : '';
                      return val ? <a href={`tel:${val.replace(/\s+/g, '')}`}>{val}</a> : <span>-</span>;
                    })()}
                  </div>
                </div>
                <div className="nl-contact-item">
                  <div className="nl-contact-icon"><FiMail /></div>
                  <div className="nl-contact-text">
                    <strong>Email</strong>
                    {(() => {
                      const val = Array.isArray(contactInfo) ? contactInfo.find((i) => i.label === 'Email')?.value : '';
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
              Développé par{' '}
              <a href={socialLinks?.creator?.whatsapp || 'https://wa.me/2250554356019'} target="_blank" rel="noopener noreferrer">
                {socialLinks?.creator?.name || 'Valdes Kouassi'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
