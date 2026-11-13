import React, { useState } from 'react';
import axios from 'axios';
import { ArrowUpRight, Leaf, Loader2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/admin/login`, { email, password }, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      setError('Identifiants incorrects ou backend indisponible.');
      console.error('Erreur login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <section className="admin-login-visual">
          <div>
            <div className="admin-login-mark">
              <Leaf size={22} />
            </div>
            <p className="admin-login-kicker">Dashboard</p>
            <h1 className="admin-login-title">Immobilier Pluriel Admin</h1>
            <p className="admin-login-text">
              Gérez les terrains, projets, services, actualités et demandes clients en toute simplicité.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '13px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <ShieldCheck size={18} color="#34d399" />
            <span>Espace de gestion sécurisé • Immobilier Pluriel</span>
          </div>
        </section>

        <section className="admin-login-form-panel">
          <p className="admin-login-kicker">Connexion</p>
          <h2 className="admin-login-heading">Bienvenue</h2>
          <p className="admin-login-subtitle">Entrez vos identifiants pour ouvrir le panneau d'administration.</p>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-field admin-field-icon">
              <label htmlFor="admin-email">Email</label>
              <span>
                <Mail size={18} />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@immobilierpluriel.com"
                  autoComplete="email"
                  required
                />
              </span>
            </div>

            <div className="admin-field admin-field-icon">
              <label htmlFor="admin-password">Mot de passe</label>
              <span>
                <LockKeyhole size={18} />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                />
              </span>
            </div>

            {error && <p className="admin-error">{error}</p>}

            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? <Loader2 className="spin" size={18} /> : <ArrowUpRight size={18} />}
              Se connecter
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
