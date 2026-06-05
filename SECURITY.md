# 🔒 Guide de Sécurité - Immobilier Pluriel

## Variables Sensibles à Configurer

### Backend (`backend/.env`)

```env
# Application
APP_KEY=base64:votre_clé_générée_par_php_artisan_key:generate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://votre-domaine.com

# Database (SQLite ou MySQL)
DB_CONNECTION=sqlite
# DB_HOST=localhost
# DB_PORT=3306
# DB_DATABASE=immobilier_db
# DB_USERNAME=root
# DB_PASSWORD=votre_mot_de_passe_securise

# Session
SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true

# Mail (configurer selon votre service email)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=votre_username
MAIL_PASSWORD=votre_mot_de_passe
MAIL_FROM_ADDRESS=noreply@immobilierpluriel.com
MAIL_FROM_NAME="Immobilier Pluriel"

# AWS (si vous utilisez S3 pour les uploads)
AWS_ACCESS_KEY_ID=votre_access_key
AWS_SECRET_ACCESS_KEY=votre_secret_key
AWS_DEFAULT_REGION=eu-west-1
AWS_BUCKET=votre-bucket-name
```

### Frontend (optionnel - `frontend/.env`)

```env
VITE_API_URL=https://api.immobilierpluriel.com/api
```

## Identifiants Admin par Défaut

⚠️ **À CHANGER IMMÉDIATEMENT EN PRODUCTION**

- **Email** : Admin@immobilierpluriel.com
- **Mot de passe** : Pluriel@2024

Pour changer le mot de passe admin :

```bash
# Backend
php artisan tinker
$user = App\Models\User::where('email', 'Admin@immobilierpluriel.com')->first();
$user->update(['password' => Hash::make('nouveau_mot_de_passe_securise')]);
```

## Installation Sécurisée

### 1. Cloner le projet
```bash
git clone https://github.com/votre-org/immobilier-pluriel.git
cd immobilier-pluriel
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env
# Éditer .env avec vos configuration sensibles
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### 3. Frontend setup
```bash
cd ../frontend
cp .env.example .env.local
npm install
npm run build
```

## Considérations de Sécurité

### ✅ À Faire

- [ ] Générer une nouvelle `APP_KEY` avec `php artisan key:generate`
- [ ] Modifier le mot de passe admin
- [ ] Configurer HTTPS en production
- [ ] Activer `APP_DEBUG=false` en production
- [ ] Configurer des variables d'environnement sécurisées
- [ ] Utiliser un service de mail professionnel (Mailgun, SendGrid, etc.)
- [ ] Configurer les uploads vers S3 ou un CDN sécurisé
- [ ] Mettre en place des logs sécurisés
- [ ] Configurer les headers de sécurité (CORS, CSP, etc.)
- [ ] Utiliser un certificat SSL/TLS valide

### ❌ À Éviter

- Ne pas commiter le fichier `.env` (déjà dans `.gitignore`)
- Ne pas utiliser les mêmes identifiants en production
- Ne pas stocker les uploads localement en production
- Ne pas utiliser `APP_DEBUG=true` en production
- Ne pas utiliser des mots de passe faibles

## Fichiers à Ne Jamais Commiter

Ces fichiers sont automatiquement ignorés par `.gitignore` :

- `.env` - Variables d'environnement sensibles
- `database/database.sqlite` - Base de données locale
- `vendor/` - Dépendances PHP
- `node_modules/` - Dépendances Node
- `storage/logs/` - Fichiers de logs
- Clés d'API ou tokens

## Déploiement en Production

### Checklist de sécurité

1. **Générer une nouvelle APP_KEY**
   ```bash
   php artisan key:generate
   ```

2. **Changer les identifiants par défaut**
   - Email admin
   - Mot de passe admin

3. **Configurer la base de données**
   - Utiliser MySQL/PostgreSQL au lieu de SQLite
   - Créer un utilisateur DB dédié
   - Configurer les droits appropriés

4. **Configurer HTTPS**
   - Obtenir un certificat SSL/TLS
   - Rediriger HTTP vers HTTPS
   - Activer HSTS

5. **Sauvegardes**
   - Mettre en place une stratégie de backup régulière
   - Tester les restaurations

6. **Monitoring**
   - Configurer les logs
   - Mettre en place une surveillance des erreurs

## Support

Pour toute question de sécurité, contactez : **contact@immobilierpluriel.com**
