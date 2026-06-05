# 🏢 Immobilier Pluriel - Platform Immobilière

Plateforme immobilière complète pour Immobilier Pluriel avec gestion de terrains, projets, actualités et espace d'administration.

## 🌐 Démo

- **Site Public** : https://immobilierpluriel.com
- **Admin** : https://immobilierpluriel.com/admin

## 🎯 Fonctionnalités

### Pour les Visiteurs
- 📍 Catalogue de terrains avec recherche et filtres
- 🏗️ Portfolio de projets réalisés
- 📰 Actualités et blog
- 👥 Équipe et services
- 📞 Formulaire de contact
- 🎨 Interface responsive et moderne

### Pour les Administrateurs
- 📊 Tableau de bord avec statistiques en temps réel
- 💬 Gestion des messages de contact
- 🏠 CRUD pour les terrains
- 🏗️ CRUD pour les projets
- 📰 Gestion des actualités
- 👥 Gestion de l'équipe
- ⚙️ Paramètres du site
- 🔐 Authentification sécurisée

## 🛠️ Stack Technologique

### Backend
- **Framework** : Laravel 11
- **Base de données** : SQLite (dev) / MySQL (prod)
- **API** : REST API avec Laravel Sanctum
- **Authentification** : Sanctum

### Frontend
- **Framework** : React 19
- **Bundler** : Vite
- **UI** : Tailwind CSS
- **Icônes** : Lucide React
- **HTTP Client** : Axios

## 📦 Installation

### Prérequis

- PHP 8.2+
- Node.js 18+
- Git

### Backend Setup

```bash
cd backend

# Copier le fichier .env
cp .env.example .env

# Installer les dépendances PHP
composer install

# Générer la clé d'application
php artisan key:generate

# Exécuter les migrations
php artisan migrate --seed

# Générer les données de test
php artisan db:test-messages
php artisan db:terrain-views
```

### Frontend Setup

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

## 🚀 Démarrage

### Mode Développement

**Terminal 1 - Backend Laravel**
```bash
cd backend
php artisan serve
# Le serveur démarre sur http://localhost:8000
```

**Terminal 2 - Frontend React**
```bash
cd frontend
npm run dev
# Vite démarre sur http://localhost:5173
```

### En Production

1. Compiler les assets frontend
2. Configurer un serveur web (Nginx, Apache)
3. Configurer les variables d'environnement
4. Configurer les SSL/TLS

## 📝 Configuration

### Variables d'Environnement Essentielles

#### Backend (`backend/.env`)
```env
APP_KEY=base64:...
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=immobilier_db
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

#### Frontend (`frontend/.env.local`)
```env
VITE_API_URL=https://api.immobilierpluriel.com/api
```

Voir [`SECURITY.md`](./SECURITY.md) pour la configuration sécurisée complète.

## 🔐 Authentification Admin

**Identifiants par défaut** (À CHANGER EN PRODUCTION)
- Email : `Admin@immobilierpluriel.com`
- Mot de passe : `Pluriel@2024`

Pour changer le mot de passe :
```bash
php artisan tinker
$user = App\Models\User::where('email', 'Admin@immobilierpluriel.com')->first();
$user->update(['password' => Hash::make('nouveau_mot_de_passe')]);
```

## 📂 Structure du Projet

```
immobilier-pluriel/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/   # Contrôleurs
│   │   ├── Models/             # Modèles Eloquent
│   │   └── Console/Commands/   # Commandes Artisan
│   ├── database/
│   │   ├── migrations/         # Migrations BD
│   │   └── seeders/            # Seeders
│   ├── routes/
│   │   └── api.php             # Routes API
│   └── .env.example            # Exemple de configuration
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── admin/              # Interface admin
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/              # Pages publiques
│   │   └── styles/             # CSS Tailwind
│   ├── public/                 # Fichiers statiques
│   └── vite.config.js          # Configuration Vite
│
├── .env.example                # Exemple env
├── SECURITY.md                 # Guide de sécurité
└── README.md                   # Ce fichier
```

## 📊 Base de Données

### Tables Principales

- `users` - Administrateurs
- `terrains` - Propriétés foncières
- `projects` - Projets réalisés
- `news` - Articles d'actualités
- `team_members` - Équipe
- `services` - Services offerts
- `contact_submissions` - Messages de contact
- `site_settings` - Configuration du site

## 🔗 API Endpoints

### Public
- `GET /api/terrains` - Liste des terrains
- `GET /api/projects` - Liste des projets
- `GET /api/news` - Articles d'actualités
- `GET /api/team` - Équipe
- `POST /api/contact` - Soumettre un message

### Admin (Authentifié)
- `GET /admin/dashboard` - Statistiques
- `GET /admin/{resource}` - Lister une ressource
- `POST /admin/{resource}` - Créer
- `PATCH /admin/{resource}/{id}` - Modifier
- `DELETE /admin/{resource}/{id}` - Supprimer
- `POST /admin/messages/{id}/read` - Marquer message comme lu

## 🧪 Tests

### Tests Manuels

Générer des données de test :
```bash
php artisan db:test-messages    # 5 messages de contact
php artisan db:terrain-views    # Ajouter des vues aux terrains
```

### Tests Automatisés

```bash
cd backend
php artisan test
```

## 🐛 Troubleshooting

### CORS Errors
Vérifier `config/cors.php` et `VITE_API_URL`

### Database Lock
```bash
rm backend/database/database.sqlite
php artisan migrate --seed
```

### Dependencies Issues
```bash
# Backend
composer install --no-dev

# Frontend
rm node_modules package-lock.json
npm install
```

## 📚 Documentation

- [Security Guide](./SECURITY.md) - Guide de sécurité
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

- 📧 Email : contact@immobilierpluriel.com
- 🌐 Site : https://immobilierpluriel.com
- 📱 WhatsApp : [Lien WhatsApp](https://wa.me/message/...)

## 📄 License

Copyright © 2026 Immobilier Pluriel. Tous droits réservés.

## 👥 Team

Développé par Kouassi Valdes Moayé.

---

**Dernière mise à jour** : juin 2026
