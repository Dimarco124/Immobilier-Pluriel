import { useEffect, useState } from 'react';
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { contactInfo as fallbackContactInfo } from '../data/companyData';
import { getContactInfo, getCompanyInfo, submitContact } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' ou 'error'
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(fallbackContactInfo);
  const [company, setCompany] = useState(null);

  const loadData = () => {
    getContactInfo()
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length) {
          setContactInfo(response.data);
        }
      })
      .catch(() => setContactInfo(fallbackContactInfo));

    getCompanyInfo()
      .then((res) => {
        if (res.data) setCompany(res.data);
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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitContact(formData);
      setStatus('✓ Merci ! Votre message a ete envoye avec succes.');
      setStatusType('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus('✗ Impossible d\'envoyer le message pour le moment. Veuillez reessayer.');
      setStatusType('error');
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      setStatus('');
      setStatusType('');
    }, 6000);
  }

  return (
    <SitePage
      label="Contact"
      title="Parlons de votre projet"
      lead="Terrain, lotissement, construction ou projet agro-industriel : notre equipe vous repond."
    >
      <div className="ix-contact reveal">
        <aside className="ix-contact-side">
          <div>
            <span className="nl-section-label nl-section-label--light">Coordonnees</span>
            <h2>Restons en contact</h2>
          </div>
          <ul className="ix-contact-list">
            {contactInfo.map((item) => {
              const isPhone = item.label === 'Telephone' || item.label === 'Téléphone';
              const isEmail = item.label === 'Email' || item.label === 'email';
              const isAddr = item.label === 'Adresse' || item.label === 'address';
              const Icon = isAddr
                ? FiMapPin
                : isPhone
                  ? FiPhone
                  : isEmail
                    ? FiMail
                    : FiClock;

              return (
                <li key={item.id || item.label}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    {isPhone ? (
                      <a href={`tel:${item.value.replace(/[^\d+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.value}
                      </a>
                    ) : isEmail ? (
                      <a href={`mailto:${item.value}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.value}
                      </a>
                    ) : isAddr ? (
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(item.value)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        <form className="ix-contact-form" onSubmit={handleSubmit}>
          <span className="nl-section-label">Message</span>
          <label>
            Nom complet
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Votre nom" />
          </label>
          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="vous@exemple.com" />
          </label>
          <label>
            Telephone
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+225 ..." />
          </label>
          <label>
            Sujet
            <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="Objet" />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} value={formData.message} onChange={handleChange} required placeholder="Decrivez votre projet..." />
          </label>
          {status && <p className={`ix-form-status ix-form-status--${statusType}`}>{status}</p>}
          <button type="submit" className="nl-btn nl-btn-mint" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : <>Envoyer <FiSend /></>}
          </button>
        </form>
      </div>

      <div id="google-map" className="ix-contact-map reveal reveal-delay-2">
        {(() => {
          const addrItem = contactInfo.find((i) => i.label === 'Adresse' || i.label === 'address');
          const address = addrItem?.value || "Yamoussoukro, Côte d'Ivoire";
          const mapQuery = company?.latitude && company?.longitude
            ? `${company.latitude},${company.longitude}`
            : address;
          const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

          return (
            <iframe
              src={mapSrc}
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localisation ${company?.name || 'Immobilier Pluriel'}`}
            ></iframe>
          );
        })()}
      </div>
    </SitePage>
  );
}
