import { useEffect, useState } from 'react';
import { FiMessageCircle, FiPhone, FiMail, FiX, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { socialLinks as fallbackSocialLinks, contactInfo as fallbackContactInfo } from '../data/companyData';
import { getContactInfo, getSocialLinks } from '../services/api';
import '../styles/components/FloatingContact.css';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState(fallbackContactInfo);
  const [socialLinks, setSocialLinks] = useState(fallbackSocialLinks);

  const loadData = () => {
    getContactInfo()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setContactInfo(res.data);
        }
      })
      .catch(() => {});

    getSocialLinks()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = { ...fallbackSocialLinks };
          res.data.forEach((item) => {
            if (item.platform && item.url) {
              mapped[item.platform] = item.url;
            }
          });
          setSocialLinks(mapped);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('company_updated', handleUpdate);
    return () => window.removeEventListener('company_updated', handleUpdate);
  }, []);

  const phoneItem = Array.isArray(contactInfo)
    ? contactInfo.find((i) => i.label === 'Téléphone' || i.label === 'Telephone')
    : null;
  const phone = phoneItem?.value || '';

  const emailItem = Array.isArray(contactInfo)
    ? contactInfo.find((i) => i.label === 'Email' || i.label === 'email')
    : null;
  const email = emailItem?.value || '';

  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const cleanDigits = phone.replace(/[^\d]/g, '');

  const whatsappUrl = socialLinks?.whatsapp
    ? (socialLinks.whatsapp.startsWith('http')
        ? socialLinks.whatsapp
        : `https://wa.me/${socialLinks.whatsapp.replace(/[^\d]/g, '')}`)
    : (cleanDigits ? `https://wa.me/${cleanDigits}` : '');

  return (
    <div className={`floating-contact ${isOpen ? 'is-active' : ''}`}>
      <div className="floating-contact-menu">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-item whatsapp"
            title="WhatsApp"
          >
            <FaWhatsapp />
            <span className="floating-label">WhatsApp</span>
          </a>
        )}

        {cleanPhone && (
          <a
            href={`tel:${cleanPhone}`}
            className="floating-item phone"
            title="Appeler"
          >
            <FiPhone />
            <span className="floating-label">Appeler</span>
          </a>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            className="floating-item email"
            title="Email"
          >
            <FiMail />
            <span className="floating-label">Email</span>
          </a>
        )}

        <a
          href="/contact"
          className="floating-item contact-page"
          title="Message"
        >
          <FiMessageSquare />
          <span className="floating-label">Message</span>
        </a>
      </div>

      <button
        type="button"
        className="floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu de contact"
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
}
