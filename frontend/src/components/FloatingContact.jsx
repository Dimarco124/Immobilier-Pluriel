import { useState } from 'react';
import { FiMessageCircle, FiPhone, FiMail, FiX, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { socialLinks, contactInfo } from '../data/companyData';
import '../styles/components/FloatingContact.css';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = contactInfo.find(i => i.label === 'Téléphone')?.value || '';
  const email = contactInfo.find(i => i.label === 'Email')?.value || '';
  const whatsapp = socialLinks.whatsapp;

  return (
    <div className={`floating-contact ${isOpen ? 'is-active' : ''}`}>
      <div className="floating-contact-menu">
        <a
          href={`https://wa.me/${phone.replace(/\s+/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-item whatsapp"
          title="WhatsApp"
        >
          <FaWhatsapp />
          <span className="floating-label">WhatsApp</span>
        </a>

        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="floating-item phone"
          title="Appeler"
        >
          <FiPhone />
          <span className="floating-label">Appeler</span>
        </a>

        <a
          href={`mailto:${email}`}
          className="floating-item email"
          title="Email"
        >
          <FiMail />
          <span className="floating-label">Email</span>
        </a>

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
