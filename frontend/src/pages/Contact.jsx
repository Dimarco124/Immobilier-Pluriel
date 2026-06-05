import { useEffect, useState } from 'react';
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { contactInfo as fallbackContactInfo } from '../data/companyData';
import { getContactInfo, submitContact } from '../services/api';

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

  useEffect(() => {
    getContactInfo()
      .then((response) => setContactInfo(response.data.length ? response.data : fallbackContactInfo))
      .catch(() => setContactInfo(fallbackContactInfo));
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
              const Icon =
                item.label === 'Adresse'
                  ? FiMapPin
                  : item.label === 'Telephone' || item.label === 'Téléphone'
                    ? FiPhone
                    : item.label === 'Email'
                      ? FiMail
                      : FiClock;
              return (
                <li key={item.id || item.label}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    {item.value}
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d713.0461712633953!2d-5.257579834231061!3d6.821292362792746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfb8913c12676259%3A0x855ef29541b8a727!2sImmobilier%20Pluriel!5e0!3m2!1sen!2sci!4v1780665732375!5m2!1sen!2sci"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Immobilier Pluriel - Yamoussoukro"
        ></iframe>
      </div>
    </SitePage>
  );
}
