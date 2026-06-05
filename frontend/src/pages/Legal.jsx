import { useEffect, useState } from 'react';
import SitePage from '../components/SitePage';
import Loader from '../components/Loader';
import { getLegalSections } from '../services/api';
import '../modern-pages.css';

export default function Legal() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLegalSections('legal')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setSections(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SitePage label="Informations Légales" title="Mentions Légales" lead="Découvrez les mentions légales de notre entreprise.">
      {loading ? (
        <div style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
          <Loader message="Chargement des mentions légales..." />
        </div>
      ) : sections.length > 0 ? (
        <div className="ix-wrap" style={{ padding: '40px 0 80px' }}>
          <div className="legal-doc-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '50px', alignItems: 'start' }}>
            {/* Sticky Table of Contents */}
            <aside className="legal-doc-sidebar" style={{ position: 'sticky', top: '120px', background: '#f9fbfc', padding: '24px', borderRadius: '12px', border: '1px solid #edf1f5' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Sommaire</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScrollToSection(`section-${section.id}`)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', color: '#666', cursor: 'pointer', transition: 'all 0.2s ease', padding: 0, fontWeight: '500' }}
                    onMouseEnter={(e) => e.target.style.color = '#097969'}
                    onMouseLeave={(e) => e.target.style.color = '#666'}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Cards */}
            <div className="legal-doc-content" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={`section-${section.id}`}
                  className="reveal"
                  style={{ background: '#fff', border: '1px solid #edf1f5', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)' }}
                >
                  <h2 style={{ fontSize: '22px', color: '#1a5f4a', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 'bold', margin: '0 0 20px 0', borderBottom: '1px solid #f2f5f8', paddingBottom: '12px' }}>
                    {section.title}
                  </h2>
                  <p style={{ whiteSpace: 'pre-line', fontSize: '15px', color: '#444', lineHeight: '1.8', margin: 0 }}>
                    {section.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="ix-wrap">
          <div className="ix-empty-state" style={{ padding: '60px 0', textAlign: 'center' }}>
            <p>Aucune section n'a été configurée pour cette page.</p>
          </div>
        </div>
      )}
    </SitePage>
  );
}
