import React, { useState } from 'react';
import axios from 'axios';
import { ArrowUpRight, Leaf, Loader2, LockKeyhole, Mail } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('Admin@immobilierpluriel.com');
  const [password, setPassword] = useState('Pluriel@2024');
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
              Controle les terrains, projets, services, actualites et demandes client depuis Laravel.
            </p>
          </div>

          <div className="admin-login-stats">
            {[
              ['25', 'terrains'],
              ['8', 'services'],
              ['6', 'articles'],
            ].map(([value, label]) => (
              <div key={label} className="admin-login-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-login-form-panel">
          <p className="admin-login-kicker">Connexion</p>
          <h2 className="admin-login-heading">Bienvenue</h2>
          <p className="admin-login-subtitle">Entre tes identifiants pour ouvrir le panneau admin.</p>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-field admin-field-icon">
              <label>Email</label>
              <span>
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </span>
            </div>

            <div className="admin-field admin-field-icon">
              <label>Mot de passe</label>
              <span>
                <LockKeyhole size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
