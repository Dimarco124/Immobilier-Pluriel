import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, NavLink, useLocation } from 'react-router-dom';

const fallbackLinks = [
  { to: '/', label: 'Home' },
  { to: '/terrains', label: 'Terrains' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Réalisations' },
  { to: '/team', label: 'Équipe' },
  { to: '/news', label: 'Actualités' },
];

function TreeLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C9 6 6 7 6 10c0 2 1.5 3.5 3 4.5V22h6v-7.5c1.5-1 3-2.5 3-4.5 0-3-3-4-6-8z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const headerClass = [
    'nl-header',
    isHome ? 'nl-header--overlay' : 'nl-header--solid',
    scrolled ? 'nl-header--scrolled' : '',
    menuOpen ? 'nl-header--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      <div className="nl-header-inner">
        <Link to="/" className="nl-brand" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo_immobilier.png" alt="Immobilier Pluriel" className="nl-brand-icon" style={{ width: '50px', height: '50px' }} />
          <div className="nl-brand-text">
            <span>IMMOBILIER</span>
            <span>PLURIEL</span>
            <span>SAR</span>
          </div>
        </Link>

        <nav className="nl-nav" aria-label="Navigation principale">
          {fallbackLinks.map((link) =>
            link.hash && isHome ? (
              <a key={link.label} href={link.hash} className="nl-nav-link">
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nl-nav-link${isActive ? ' is-active' : ''}`}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="nl-header-actions">
          <Link to="/contact" className="nl-btn nl-btn-header">
            Nous contacter
          </Link>
          <button
            type="button"
            className={`nl-hamburger ${menuOpen ? 'is-active' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nl-hamburger-bar"></span>
            <span className="nl-hamburger-bar"></span>
            <span className="nl-hamburger-bar"></span>
          </button>
        </div>
      </div>

      <div className={`nl-mobile-overlay ${menuOpen ? 'is-active' : ''}`}>
        <nav className="nl-mobile-menu" aria-label="Menu mobile">
          <div className="nl-mobile-menu-inner">
            {fallbackLinks.map((link, idx) =>
              link.hash && isHome ? (
                <a
                  key={link.label}
                  href={link.hash}
                  className="nl-mobile-link"
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nl-mobile-link-num">0{idx + 1}</span>
                  <span className="nl-mobile-link-text">{link.label}</span>
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nl-mobile-link${isActive ? ' is-active' : ''}`}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                  onClick={() => setMenuOpen(false)}
                  end={link.to === '/'}
                >
                  <span className="nl-mobile-link-num">0{idx + 1}</span>
                  <span className="nl-mobile-link-text">{link.label}</span>
                </NavLink>
              ),
            )}
            <div className="nl-mobile-footer" style={{ transitionDelay: `${fallbackLinks.length * 0.1}s` }}>
              <Link to="/contact" className="nl-btn nl-btn-mint w-full" onClick={() => setMenuOpen(false)}>
                Nous contacter
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
