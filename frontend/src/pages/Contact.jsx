import { useState } from 'react';
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { contactInfo } from '../data/companyData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('Merci ! Votre message a été envoyé.');
    setTimeout(() => setStatus(''), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  }

  return (
    <SitePage
      label="Contact"
      title="Parlons de votre projet"
      lead="Terrain, lotissement, construction ou projet agro-industriel : notre équipe vous répond."
    >
      <div className="ix-contact reveal">
        <aside className="ix-contact-side">
          <div>
            <span className="nl-section-label nl-section-label--light">Coordonnées</span>
            <h2>Restons en contact</h2>
          </div>
          <ul className="ix-contact-list">
            {contactInfo.map((item) => {
              const Icon =
                item.label === 'Adresse'
                  ? FiMapPin
                  : item.label === 'Téléphone'
                    ? FiPhone
                    : item.label === 'Email'
                      ? FiMail
                      : FiClock;
              return (
                <li key={item.label}>
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
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="vous@exemple.com"
            />
          </label>
          <label>
            Téléphone
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+226 …" />
          </label>
          <label>
            Sujet
            <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="Objet" />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Décrivez votre projet…"
            />
          </label>
          {status && <p className="ix-form-status">{status}</p>}
          <button type="submit" className="nl-btn nl-btn-mint">
            Envoyer <FiSend />
          </button>
        </form>
      </div>
    </SitePage>
  );
}
